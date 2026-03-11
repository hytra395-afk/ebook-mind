export const config = {
  app: {
    name: 'EbookMind',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
  },
  
  downloadToken: {
    ttlHours: parseInt(process.env.DOWNLOAD_TOKEN_TTL_HOURS || '48'),
    defaultQuota: parseInt(process.env.DOWNLOAD_QUOTA_DEFAULT || '5'),
  },
  
  sepay: {
    apiKey: process.env.SEPAY_API_KEY!,
    accountNumber: process.env.SEPAY_ACCOUNT_NUMBER!,
    webhookSecret: process.env.SEPAY_WEBHOOK_SECRET!,
    token: process.env.SEPAY_TOKEN!,
  },
  
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
  
  brevo: {
    apiKey: process.env.BREVO_API_KEY,
  },
}
