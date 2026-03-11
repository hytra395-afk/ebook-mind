import { config } from '@/lib/config'

interface DownloadItem {
  title: string
  downloadUrl: string
  coverUrl?: string
}

interface SendOrderEmailParams {
  toEmail: string
  orderId: string
  items: DownloadItem[]
  totalAmount: number
}

export async function sendOrderConfirmationEmail({
  toEmail,
  orderId,
  items,
  totalAmount,
}: SendOrderEmailParams): Promise<boolean> {
  if (!config.brevo.apiKey) {
    console.warn('BREVO_API_KEY not configured, skipping email')
    return false
  }

  const itemsHtml = items
    .map(
      (item) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
        <strong style="color:#1a1a1a;font-size:15px;">${item.title}</strong><br/>
        <a href="${item.downloadUrl}"
           style="display:inline-block;margin-top:8px;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;text-decoration:none;padding:8px 20px;border-radius:8px;font-size:13px;font-weight:600;">
          📥 Tải xuống PDF
        </a>
      </td>
    </tr>`
    )
    .join('')

  const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#ede9fe,#fce7f3);padding:32px;text-align:center;">
            <div style="display:inline-flex;align-items:center;gap:8px;">
              <div style="width:36px;height:36px;background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:10px;display:inline-block;"></div>
              <span style="font-size:20px;font-weight:700;color:#7c3aed;">Ebook Mind</span>
            </div>
            <h1 style="margin:16px 0 4px;font-size:24px;color:#1a1a1a;font-weight:800;">Thanh toán thành công! 🎉</h1>
            <p style="margin:0;color:#6b7280;font-size:14px;">Đơn hàng #${orderId.substring(0, 8).toUpperCase()} · ${new Intl.NumberFormat('vi-VN').format(totalAmount)}đ</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 8px;color:#374151;font-size:15px;">Xin chào,</p>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
              Cảm ơn bạn đã mua ebook tại <strong>Ebook Mind</strong>. 
              Dưới đây là link tải ebook của bạn. Link có hiệu lực trong <strong>48 giờ</strong>.
            </p>

            <!-- Ebook list -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>

            <!-- Note -->
            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
              <p style="margin:0;color:#166534;font-size:13px;line-height:1.5;">
                💡 <strong>Lưu ý:</strong> Mỗi link tải có giới hạn 5 lượt tải và hết hạn sau 48 giờ. 
                Hãy lưu file PDF vào thiết bị của bạn ngay sau khi tải.
              </p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Gặp vấn đề? Liên hệ <a href="mailto:support@ebookmind.com" style="color:#7c3aed;">support@ebookmind.com</a>
            </p>
            <p style="margin:8px 0 0;color:#d1d5db;font-size:11px;">© ${new Date().getFullYear()} Ebook Mind · Kiến thức ngách thay đổi mindset</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const textContent = items
    .map((item) => `${item.title}\nLink tải: ${item.downloadUrl}`)
    .join('\n\n')

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': config.brevo.apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Ebook Mind',
          email: 'no-reply@ebookmind.com',
        },
        to: [{ email: toEmail }],
        subject: `📚 Link tải ebook của bạn - Đơn hàng #${orderId.substring(0, 8).toUpperCase()}`,
        htmlContent,
        textContent,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Brevo send error:', err)
      return false
    }

    console.log('Email sent via Brevo to:', toEmail)
    return true
  } catch (error) {
    console.error('Brevo email error:', error)
    return false
  }
}
