import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { config } from '@/lib/config'

const MAX_RESEND_COUNT = 3

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Token không hợp lệ' },
        { status: 400 }
      )
    }

    // Lấy order từ public_token
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('public_token', token)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Không tìm thấy đơn hàng' },
        { status: 404 }
      )
    }

    // Kiểm tra order đã completed chưa
    if (order.status !== 'completed') {
      return NextResponse.json(
        { error: 'Đơn hàng chưa được thanh toán' },
        { status: 400 }
      )
    }

    // Kiểm tra rate limit - max 3 lần gửi email
    const emailLogs = order.metadata?.email_logs || []
    const manualResendCount = emailLogs.filter(
      (log: any) => log.trigger === 'manual_resend'
    ).length

    if (manualResendCount >= MAX_RESEND_COUNT) {
      return NextResponse.json(
        { 
          error: 'Bạn đã gửi quá nhiều lần. Vui lòng liên hệ support nếu vẫn chưa nhận được email.',
          maxReached: true 
        },
        { status: 429 }
      )
    }

    // Lấy download tokens
    const { data: licenses } = await supabaseAdmin
      .from('licenses')
      .select(`
        *,
        ebook:ebooks(id, title, cover_url),
        download_tokens(token, expires_at)
      `)
      .eq('order_id', order.id)

    if (!licenses || licenses.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy ebook trong đơn hàng' },
        { status: 404 }
      )
    }

    // Build download items
    const downloadItems = licenses
      .filter((license: any) => license.download_tokens && license.download_tokens.length > 0)
      .map((license: any) => ({
        title: license.ebook?.title || 'Ebook',
        downloadUrl: `${config.app.url}/api/download?token=${license.download_tokens[0].token}`,
        coverUrl: license.ebook?.cover_url,
      }))

    if (downloadItems.length === 0) {
      return NextResponse.json(
        { error: 'Không tìm thấy link tải' },
        { status: 404 }
      )
    }

    // Gửi email
    const emailSent = await sendOrderConfirmationEmail({
      toEmail: order.email,
      orderId: order.id,
      items: downloadItems,
      totalAmount: order.amount,
      publicToken: order.public_token,
    })

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Không thể gửi email. Vui lòng thử lại sau.' },
        { status: 500 }
      )
    }

    // Log email status
    await supabaseAdmin
      .from('orders')
      .update({
        metadata: {
          ...order.metadata,
          email_logs: [
            ...emailLogs,
            {
              sent_at: new Date().toISOString(),
              status: 'success',
              trigger: 'manual_resend',
              recipient: order.email,
            }
          ]
        }
      })
      .eq('id', order.id)

    console.log('Email resent successfully to:', order.email)

    return NextResponse.json({
      success: true,
      message: `Email đã được gửi đến ${order.email}`,
    })

  } catch (error) {
    console.error('Resend email error:', error)
    return NextResponse.json(
      { error: 'Lỗi server. Vui lòng thử lại sau.' },
      { status: 500 }
    )
  }
}
