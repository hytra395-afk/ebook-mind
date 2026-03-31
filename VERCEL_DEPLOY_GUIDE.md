# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL

## Bước 1: Import Project từ GitHub

1. Đăng nhập: https://vercel.com
2. Click "New Project"
3. Import từ GitHub: `hytra395-afk/ebook-mind`
4. Framework: Next.js (auto-detect)
5. Click "Deploy"

## Bước 2: Cấu hình Environment Variables

Vào Settings > Environment Variables, thêm:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Sepay
SEPAY_API_KEY=your_sepay_api_key_here
SEPAY_ACCOUNT_NUMBER=your_account_number_here
SEPAY_WEBHOOK_SECRET=your_webhook_secret_here
SEPAY_TOKEN=your_sepay_token_here
SEPAY_API_URL=https://my.sepay.vn/userapi/transactions/create

# App
NEXT_PUBLIC_APP_URL=https://ebookmind.com
NEXT_PUBLIC_DOMAIN=ebookmind.com

# Download
DOWNLOAD_TOKEN_TTL_HOURS=48
DOWNLOAD_QUOTA_DEFAULT=5
```

## Bước 3: Kết nối Domain ebookmind.com

1. Settings > Domains
2. Add Domain: `ebookmind.com`
3. Add Domain: `www.ebookmind.com`
4. Cấu hình DNS tại nhà cung cấp domain:

```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

## Bước 4: Auto-Deploy Setup

✅ Vercel tự động deploy khi có push mới lên GitHub main branch
✅ Webhook đã được cấu hình sẵn

## Bước 5: Test Production

1. Truy cập: https://ebookmind.com
2. Test thanh toán với số tiền nhỏ
3. Kiểm tra webhook logs trong Vercel Functions

🎉 **Hoàn tất!** Webapp đã sẵn sàng cho user sử dụng.
