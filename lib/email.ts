import { sendViaNodemailer } from '@/lib/email-nodemailer'

interface DownloadItem {
  title: string
  downloadUrl: string
  coverUrl?: string
}

interface OrderDetails {
  publicToken: string
  successUrl?: string
}

interface SendOrderEmailParams {
  toEmail: string
  orderId: string
  items: DownloadItem[]
  totalAmount: number
  publicToken?: string
  userName?: string
}

export async function sendOrderConfirmationEmail({
  toEmail,
  orderId,
  items,
  totalAmount,
  publicToken,
  userName,
}: SendOrderEmailParams): Promise<boolean> {
  console.log('📧 [EMAIL] Sending order confirmation email via Nodemailer...')
  
  // Use Nodemailer directly (no Brevo)
  return await sendViaNodemailer({
    toEmail,
    orderId,
    items,
    totalAmount,
    publicToken,
    userName,
  })
}
