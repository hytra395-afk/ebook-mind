import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      )
    }

    // Get order by public token
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          ebook_id,
          combo_id
        )
      `)
      .eq('public_token', token)
      .single()

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // If order is completed, get download tokens
    const downloadTokens: any[] = []
    if (order.status === 'completed') {
      const { data: licenses } = await supabaseAdmin
        .from('licenses')
        .select(`
          *,
          ebooks (id, title, cover_url, external_url),
          download_tokens (token, expires_at, used_count)
        `)
        .eq('order_id', order.id)

      if (licenses && Array.isArray(licenses)) {
        licenses.forEach((license: any) => {
          downloadTokens.push({
            ebook_id: license.ebook_id,
            ebook_title: license.ebooks?.title,
            ebook_cover: license.ebooks?.cover_url,
            download_token: license.download_tokens?.[0]?.token,
            download_url: license.download_tokens?.[0]?.token 
              ? `/api/download?token=${license.download_tokens[0].token}`
              : null,
            drive_url: license.ebooks?.external_url || null,
            expires_at: license.download_tokens?.[0]?.expires_at,
            used_count: license.download_tokens?.[0]?.used_count || 0,
            download_quota: license.download_quota,
          })
        })
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        public_token: order.public_token,
        payment_code: order.payment_code,
        status: order.status,
        amount: order.amount,
        currency: order.currency,
        email: order.email,
        created_at: order.created_at,
        updated_at: order.updated_at,
        items: order.order_items,
        download_tokens: downloadTokens,
      }
    })

  } catch (error) {
    console.error('Get order status error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
