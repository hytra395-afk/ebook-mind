import nodemailer from 'nodemailer'
import { config } from '@/lib/config'

interface DownloadItem {
  title: string
  downloadUrl: string
  coverUrl?: string
}

interface SendEmailParams {
  toEmail: string
  orderId: string
  items: DownloadItem[]
  totalAmount: number
  publicToken?: string
  userName?: string
}

export async function sendViaNodemailer(params: SendEmailParams): Promise<boolean> {
  const { toEmail, orderId, items, totalAmount, publicToken, userName } = params

  console.log('📧 [NODEMAILER] Attempting to send email via Gmail SMTP...')

  // Check if Gmail credentials are configured
  const gmailUser = process.env.GMAIL_USER
  const gmailPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPassword) {
    console.error('❌ [NODEMAILER] Gmail credentials not configured')
    console.error('❌ [NODEMAILER] Please set GMAIL_USER and GMAIL_APP_PASSWORD in environment variables')
    return false
  }

  console.log('✅ [NODEMAILER] Gmail credentials found:', gmailUser)

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    })

    // Build HTML content
    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding:16px 0;border-bottom:1px solid #f0f0f0;">
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="80" style="padding-right:16px;">
                ${item.coverUrl ? `<img src="${item.coverUrl}" alt="${item.title}" style="width:80px;height:106px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" />` : ''}
              </td>
              <td style="vertical-align:middle;">
                <strong style="color:#1a1a1a;font-size:15px;display:block;margin-bottom:8px;">${item.title}</strong>
                <a href="${item.downloadUrl}"
                   style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;text-decoration:none;padding:10px 24px;border-radius:8px;font-size:13px;font-weight:600;">
                  📥 Tải xuống PDF
                </a>
              </td>
            </tr>
          </table>
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
            <p style="margin:0 0 8px;color:#374151;font-size:15px;">Xin chào${userName ? ` ${userName}` : ''},</p>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;line-height:1.6;">
              Cảm ơn bạn đã tin tưởng và mua ebook tại <strong>Ebook Mind</strong>! 🎉<br/>
              Dưới đây là link tải ebook của bạn. <strong>Link có hiệu lực vĩnh viễn</strong>, bạn có thể tải lại bất cứ lúc nào.
            </p>

            <!-- Ebook list -->
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>

            <!-- Note -->
            <div style="margin-top:24px;padding:16px;background:#f0fdf4;border-radius:10px;border:1px solid #bbf7d0;">
              <p style="margin:0;color:#166534;font-size:13px;line-height:1.5;">
                💡 <strong>Lưu ý:</strong> Link tải có hiệu lực vĩnh viễn. Bạn có thể tải lại bất cứ lúc nào. 
                Hãy lưu file PDF vào thiết bị để đọc offline.
              </p>
            </div>
            
            <!-- CTA Button -->
            ${publicToken ? `
            <div style="margin-top:24px;text-align:center;">
              <a href="${config.app.url}/success?token=${publicToken}"
                 style="display:inline-block;background:#fff;color:#7c3aed;text-decoration:none;padding:12px 32px;border-radius:10px;font-size:14px;font-weight:600;border:2px solid #7c3aed;">
                📋 Xem chi tiết đơn hàng
              </a>
            </div>` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #f0f0f0;text-align:center;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Gặp vấn đề? Liên hệ <a href="mailto:ebookmind0@gmail.com" style="color:#7c3aed;">ebookmind0@gmail.com</a>
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

    // Send email
    const info = await transporter.sendMail({
      from: `"Ebook Mind" <${gmailUser}>`,
      to: toEmail,
      subject: `📚 Link tải ebook của bạn - Đơn hàng #${orderId.substring(0, 8).toUpperCase()}`,
      html: htmlContent,
      text: textContent,
    })

    console.log('✅ [NODEMAILER] Email sent successfully:', {
      messageId: info.messageId,
      to: toEmail,
    })

    return true
  } catch (error) {
    console.error('❌ [NODEMAILER] Failed to send email:', error)
    return false
  }
}
