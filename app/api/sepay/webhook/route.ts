import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { config } from '@/lib/config'
import { sendOrderConfirmationEmail } from '@/lib/email'
import crypto from 'crypto'
import { nanoid } from 'nanoid'

interface SepayWebhookPayload {
  transactionId: string
  accountNumber: string
  amount: number
  content: string
  status: string
  timestamp: number
  signature?: string
}

function verifyApiKey(request: NextRequest): boolean {
  // Sepay sends API Key in Authorization header: "Apikey YOUR_API_KEY"
  const authHeader = request.headers.get('authorization') || ''
  
  // Extract API key from "Apikey YOUR_API_KEY" format
  const apiKeyMatch = authHeader.match(/^Apikey\s+(.+)$/i)
  if (!apiKeyMatch) {
    console.error('Invalid authorization header format:', authHeader)
    return false
  }
  
  const providedApiKey = apiKeyMatch[1]
  const expectedApiKey = config.sepay.webhookSecret
  
  if (providedApiKey !== expectedApiKey) {
    console.error('API key mismatch')
    return false
  }
  
  return true
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Sepay Webhook Called ===')
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    
    // Verify API Key authentication
    if (!verifyApiKey(request)) {
      console.error('Webhook authentication failed')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.text()
    console.log('Raw body:', body)
    
    const webhookData: SepayWebhookPayload = JSON.parse(body)
    console.log('Parsed webhook data:', JSON.stringify(webhookData, null, 2))

    // Only process successful transactions
    if (webhookData.status !== 'success') {
      return NextResponse.json({ message: 'Transaction not successful' })
    }

    // Extract payment code from content (format: EBOOK1234567890)
    const paymentCode = webhookData.content.trim()
    
    console.log('Looking for order with payment_code:', paymentCode)

    // Find the order by payment_code
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          ebook_id,
          combo_id
        )
      `)
      .eq('payment_code', paymentCode)
      .eq('status', 'pending')
      .single()

    if (orderError || !order) {
      console.error('Order not found with payment_code:', paymentCode, orderError)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Verify amount matches
    if (Math.abs(order.amount - webhookData.amount) > 0.01) {
      console.error('Amount mismatch:', order.amount, webhookData.amount)
      return NextResponse.json(
        { error: 'Amount mismatch' },
        { status: 400 }
      )
    }

    // Update order status
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'completed',
        provider_txn_id: webhookData.transactionId,
        updated_at: new Date().toISOString(),
        metadata: {
          ...order.metadata,
          webhook_data: webhookData,
          completed_at: new Date().toISOString(),
        }
      })
      .eq('id', order.id)

    if (updateError) {
      console.error('Failed to update order:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // Collect download items for email
    const downloadItems: Array<{ title: string; downloadUrl: string }> = []

    // Create licenses and download tokens for ebooks
    for (const item of order.order_items) {
      if (item.ebook_id) {
        // Get ebook info for email
        const { data: ebookInfo } = await supabaseAdmin
          .from('ebooks')
          .select('title, cover_url')
          .eq('id', item.ebook_id)
          .single()
        // Create license
        const { data: license, error: licenseError } = await supabaseAdmin
          .from('licenses')
          .insert({
            order_id: order.id,
            ebook_id: item.ebook_id,
            download_quota: config.downloadToken.defaultQuota,
          })
          .select()
          .single()

        if (licenseError) {
          console.error('Failed to create license:', licenseError)
          continue
        }

        // Create download token
        const downloadToken = nanoid(32)
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + config.downloadToken.ttlHours)

        const { error: tokenError } = await supabaseAdmin
          .from('download_tokens')
          .insert({
            license_id: license.id,
            token: downloadToken,
            expires_at: expiresAt.toISOString(),
          })

        if (tokenError) {
          console.error('Failed to create download token:', tokenError)
        } else {
          downloadItems.push({
            title: ebookInfo?.title || 'Ebook',
            downloadUrl: `${config.app.url}/api/download?token=${downloadToken}`,
          })
        }

        // Increment ebook sales count
        await supabaseAdmin.rpc('increment_ebook_sales', {
          ebook_id: item.ebook_id,
          increment_by: item.quantity || 1
        })
      } else if (item.combo_id) {
        // Handle combo items - get all ebooks in combo
        const { data: comboItems, error: comboError } = await supabaseAdmin
          .from('combo_items')
          .select('ebook_id')
          .eq('combo_id', item.combo_id)

        if (comboError) {
          console.error('Failed to get combo items:', comboError)
          continue
        }

        // Create licenses for each ebook in combo
        for (const comboItem of comboItems) {
          const { data: license, error: licenseError } = await supabaseAdmin
            .from('licenses')
            .insert({
              order_id: order.id,
              ebook_id: comboItem.ebook_id,
              download_quota: config.downloadToken.defaultQuota,
            })
            .select()
            .single()

          if (licenseError) {
            console.error('Failed to create combo license:', licenseError)
            continue
          }

          // Create download token
          const downloadToken = nanoid(32)
          const expiresAt = new Date()
          expiresAt.setHours(expiresAt.getHours() + config.downloadToken.ttlHours)

          const { data: comboEbookInfo } = await supabaseAdmin
            .from('ebooks')
            .select('title')
            .eq('id', comboItem.ebook_id)
            .single()

          const { error: tokenError } = await supabaseAdmin
            .from('download_tokens')
            .insert({
              license_id: license.id,
              token: downloadToken,
              expires_at: expiresAt.toISOString(),
            })

          if (tokenError) {
            console.error('Failed to create combo download token:', tokenError)
          } else {
            downloadItems.push({
              title: comboEbookInfo?.title || 'Ebook',
              downloadUrl: `${config.app.url}/api/download?token=${downloadToken}`,
            })
          }

          // Increment ebook sales count
          await supabaseAdmin.rpc('increment_ebook_sales', {
            ebook_id: comboItem.ebook_id,
            increment_by: item.quantity || 1
          })
        }
      }
    }

    // Send email với download links qua Brevo
    if (order.email && downloadItems.length > 0) {
      await sendOrderConfirmationEmail({
        toEmail: order.email,
        orderId: order.id,
        items: downloadItems,
        totalAmount: order.amount,
      })
    }

    console.log('Order processed successfully:', order.id)

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
