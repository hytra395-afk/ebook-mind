# 📚 EbookMind - Ebook Store Platform

A modern ebook store platform built with Next.js 16, React 19, TypeScript, and Supabase. Features Sepay payment integration for Vietnamese users.

## 🚀 Features

- **Modern UI** - Built with React 19, Tailwind CSS v4, and shadcn/ui
- **Payment Integration** - Sepay payment gateway with webhook support
- **Database** - Supabase PostgreSQL with RLS policies
- **Authentication** - Supabase Auth (ready to implement)
- **File Storage** - Supabase Storage for ebook files
- **Email** - Resend for transactional emails
- **Newsletter** - Brevo for newsletter campaigns

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Payment**: Sepay
- **Email**: Resend
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Sepay merchant account
- Vercel account (for deployment)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/hytra395-afk/ebook-mind.git
cd ebook-mind
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SEPAY_API_KEY=your_sepay_api_key
SEPAY_ACCOUNT_NUMBER=your_account_number
SEPAY_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Setup Supabase**

Run the SQL migrations in Supabase SQL Editor:
- `SUPABASE_MIGRATIONS.sql` - Create all tables and RLS policies
- `SUPABASE_RPC_FUNCTIONS.sql` - Create helper functions

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 Payment Flow

1. User adds items to cart and goes to checkout
2. Checkout page displays order summary
3. User clicks "Thanh toán" (Pay)
4. System creates order in Supabase
5. Sepay generates payment QR code
6. User scans QR or transfers money
7. Sepay webhook confirms payment
8. System creates licenses and download tokens
9. User redirected to success page with download links

## 🗂️ Project Structure

```
ebook-mind/
├── app/
│   ├── api/
│   │   ├── orders/
│   │   │   ├── create/route.ts      # Create order
│   │   │   └── status/route.ts      # Check order status
│   │   └── sepay/
│   │       └── webhook/route.ts     # Sepay webhook
│   ├── checkout/page.tsx             # Checkout page
│   ├── payment/
│   │   └── processing/page.tsx       # Payment processing
│   ├── success/page.tsx              # Success page
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
├── components/
│   └── ui/
│       └── button.tsx                # Button component
├── lib/
│   ├── config.ts                     # Configuration
│   ├── supabase.ts                   # Supabase client
│   └── utils.ts                      # Utility functions
├── SUPABASE_MIGRATIONS.sql           # Database migrations
├── SUPABASE_RPC_FUNCTIONS.sql        # RPC functions
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
└── next.config.js
```

## 🔐 Environment Variables

See `.env.example` for all required environment variables.

### Supabase Setup
1. Create a new Supabase project
2. Run migrations from `SUPABASE_MIGRATIONS.sql`
3. Run RPC functions from `SUPABASE_RPC_FUNCTIONS.sql`
4. Copy your API keys to `.env.local`

### Sepay Setup
1. Create Sepay merchant account
2. Get API key and account number
3. Configure webhook URL: `https://yourdomain.com/api/sepay/webhook`
4. Add webhook secret to environment variables

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git push origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import from GitHub: `hytra395-afk/ebook-mind`
- Click "Deploy"

3. **Add Environment Variables**
- Go to Settings > Environment Variables
- Add all variables from `.env.example`

4. **Connect Domain**
- Go to Settings > Domains
- Add your domain (e.g., `ebookmind.com`)
- Configure DNS records as shown in Vercel

5. **Configure Sepay Webhook**
- Update webhook URL in Sepay dashboard: `https://yourdomain.com/api/sepay/webhook`

## 📝 API Routes

### POST `/api/orders/create`
Create a new order and generate Sepay payment.

**Request:**
```json
{
  "items": [
    {
      "ebook_id": "uuid",
      "quantity": 1
    }
  ],
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "order_id": "uuid",
  "public_token": "token",
  "amount": 79000,
  "redirect_url": "https://ebookmind.com/payment/processing?token=token",
  "sepay_data": {}
}
```

### GET `/api/orders/status?token=token`
Check order status and get download tokens.

**Response:**
```json
{
  "success": true,
  "order": {
    "id": "uuid",
    "status": "completed",
    "amount": 79000,
    "download_tokens": [
      {
        "ebook_id": "uuid",
        "ebook_title": "Ebook Title",
        "download_token": "token",
        "download_url": "/api/download?token=token",
        "expires_at": "2026-03-09T21:47:00Z"
      }
    ]
  }
}
```

### POST `/api/sepay/webhook`
Webhook endpoint for Sepay payment confirmation.

## 🧪 Testing

Test the payment flow:
1. Go to http://localhost:3000/checkout
2. Click "Thanh toán"
3. Check Supabase for created order
4. Verify webhook endpoint is working

## 📚 Database Schema

### Orders Table
- `id` - UUID primary key
- `public_token` - Unique order token
- `status` - pending, completed, failed
- `amount` - Order total
- `email` - Customer email
- `provider_txn_id` - Sepay transaction ID

### Licenses Table
- `id` - UUID primary key
- `order_id` - Reference to order
- `ebook_id` - Reference to ebook
- `download_quota` - Number of downloads allowed

### Download Tokens Table
- `id` - UUID primary key
- `license_id` - Reference to license
- `token` - Unique download token
- `expires_at` - Token expiration time

See `SUPABASE_MIGRATIONS.sql` for complete schema.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@ebookmind.com or open an issue on GitHub.

## 🔗 Links

- [GitHub Repository](https://github.com/hytra395-afk/ebook-mind)
- [Live Website](https://ebookmind.com)
- [Supabase](https://supabase.com)
- [Sepay](https://sepay.vn)
- [Vercel](https://vercel.com)
