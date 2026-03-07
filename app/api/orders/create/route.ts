import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { config } from '@/lib/config'
import { nanoid } from 'nanoid'

interface OrderItem {
  ebook_id?: string
  combo_id?: string
  quantity?: number
}

interface CreateOrderRequest {
  items: OrderItem[]
  email?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json()
    const { items, email } = body

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      )
    }

    // Calculate total amount
    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      if (item.ebook_id) {
        // Get ebook price
        const { data: ebook, error } = await supabaseAdmin
          .from('ebooks')
          .select('id, price, title')
          .eq('id', item.ebook_id)
          .eq('active', true)
          .single()

        if (error || !ebook) {
          return NextResponse.json(
            { error: `Ebook not found: ${item.ebook_id}` },
            { status: 404 }
          )
        }

        const quantity = item.quantity || 1
        totalAmount += ebook.price * quantity
        orderItems.push({
          ebook_id: ebook.id,
          unit_price: ebook.price,
          quantity,
        })
      } else if (item.combo_id) {
        // Get combo price
        const { data: combo, error } = await supabaseAdmin
          .from('combos')
          .select('id, price, title')
          .eq('id', item.combo_id)
          .eq('active', true)
          .single()

        if (error || !combo) {
          return NextResponse.json(
            { error: `Combo not found: ${item.combo_id}` },
            { status: 404 }
          )
        }

        const quantity = item.quantity || 1
        totalAmount += combo.price * quantity
        orderItems.push({
          combo_id: combo.id,
          unit_price: combo.price,
          quantity,
        })
      }
    }

    // Generate public token for order
    const publicToken = nanoid(16)

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        public_token: publicToken,
        status: 'pending',
        amount: totalAmount,
        currency: 'VND',
        email: email || null,
        provider: 'sepay',
        metadata: { items: orderItems },
      })
      .select()
      .single()

    if (orderError) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Create order items
    const orderItemsWithOrderId = orderItems.map(item => ({
      ...item,
      order_id: order.id,
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItemsWithOrderId)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    // Create Sepay payment
    const sepayPayload = {
      accountNumber: config.sepay.accountNumber,
      amount: totalAmount,
      content: `Thanh toan don hang ${publicToken}`,
    }

    const sepayResponse = await fetch(config.sepay.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.sepay.apiKey}`,
      },
      body: JSON.stringify(sepayPayload),
    })

    if (!sepayResponse.ok) {
      console.error('Sepay API error:', await sepayResponse.text())
      return NextResponse.json(
        { error: 'Failed to create payment' },
        { status: 500 }
      )
    }

    const sepayData = await sepayResponse.json()

    // Update order with Sepay transaction ID
    if (sepayData.transactionId) {
      await supabaseAdmin
        .from('orders')
        .update({ 
          provider_txn_id: sepayData.transactionId,
          metadata: { 
            ...order.metadata, 
            sepay_data: sepayData 
          }
        })
        .eq('id', order.id)
    }

    // Return redirect URL to processing page
    const redirectUrl = `${config.app.url}/payment/processing?token=${publicToken}`

    return NextResponse.json({
      success: true,
      order_id: order.id,
      public_token: publicToken,
      amount: totalAmount,
      redirect_url: redirectUrl,
      sepay_data: sepayData,
    })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
