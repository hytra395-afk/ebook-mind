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

// Generate payment code: EBOOK + 3-10 digit number
function generatePaymentCode(): string {
  const randomNumber = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0')
  return `EBOOK${randomNumber}`
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

    // Generate public token for order (for URL)
    const publicToken = nanoid(16)
    
    // Generate payment code for Sepay (EBOOK + 10 digits)
    const paymentCode = generatePaymentCode()

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        public_token: publicToken,
        payment_code: paymentCode,
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

    // Sepay payment info (manual transfer - no API call needed)
    // User will transfer money manually using payment_code as content
    console.log('Order created with payment_code:', paymentCode)

    // Return redirect URL to processing page
    const redirectUrl = `${config.app.url}/payment/processing?token=${publicToken}`

    return NextResponse.json({
      success: true,
      order_id: order.id,
      public_token: publicToken,
      payment_code: paymentCode,
      amount: totalAmount,
      redirect_url: redirectUrl,
    })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
