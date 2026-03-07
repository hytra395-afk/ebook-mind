import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { config } from '@/lib/config'
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

function verifySignature(payload: string, signature: string): boolean {
  // If no webhook secret configured, skip verification
  if (!config.sepay.webhookSecret) {
    return true
  }

  // If webhook secret is a URL (misconfigured), skip verification
  if (config.sepay.webhookSecret.startsWith('http')) {
    return true
  }

  const expectedSignature = crypto
    .createHmac('sha256', config.sepay.webhookSecret)
    .update(payload)
    .digest('hex')

  return signature === expectedSignature
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-sepay-signature') || ''

    // Verify signature
    if (!verifySignature(body, signature)) {
      console.error('Invalid webhook signature')
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    const webhookData: SepayWebhookPayload = JSON.parse(body)
    console.log('Sepay webhook received:', webhookData)

    // Only process successful transactions
    if (webhookData.status !== 'success') {
      return NextResponse.json({ message: 'Transaction not successful' })
    }

    // Extract order token from content
    const contentMatch = webhookData.content.match(/([A-Za-z0-9_-]{16})/)
    if (!contentMatch) {
      console.error('Could not extract order token from content:', webhookData.content)
      return NextResponse.json(
        { error: 'Invalid transaction content' },
        { status: 400 }
      )
    }

    const orderToken = contentMatch[1]

    // Find the order
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
      .eq('public_token', orderToken)
      .eq('status', 'pending')
      .single()

    if (orderError || !order) {
      console.error('Order not found:', orderToken, orderError)
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

    // Create licenses and download tokens for ebooks
    for (const item of order.order_items) {
      if (item.ebook_id) {
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

          const { error: tokenError } = await supabaseAdmin
            .from('download_tokens')
            .insert({
              license_id: license.id,
              token: downloadToken,
              expires_at: expiresAt.toISOString(),
            })

          if (tokenError) {
            console.error('Failed to create combo download token:', tokenError)
          }

          // Increment ebook sales count
          await supabaseAdmin.rpc('increment_ebook_sales', {
            ebook_id: comboItem.ebook_id,
            increment_by: item.quantity || 1
          })
        }
      }
    }

    // TODO: Send email with download links using Resend
    // if (order.email) {
    //   await sendDownloadEmail(order.email, order.id)
    // }

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
