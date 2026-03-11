# 🔴 FIX WEBHOOK NGAY - API KEY MISMATCH

## Vấn đề
Vercel logs báo lỗi:
```
API key mismatch
Webhook authentication failed
```

## Nguyên nhân
`SEPAY_WEBHOOK_SECRET` trên Vercel đang được set **SAI**:
- ❌ Hiện tại: `https://ebookmind.com/api/webhook/sepay` (đây là URL, không phải secret key)
- ✅ Phải là: `I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O` (API key thật)

## Giải pháp - Làm ngay trong 2 phút

### Bước 1: Vào Vercel Dashboard
1. Truy cập: https://vercel.com/dashboard
2. Chọn project: **ebook-mind**
3. Vào **Settings** → **Environment Variables**

### Bước 2: Sửa SEPAY_WEBHOOK_SECRET
1. Tìm biến: `SEPAY_WEBHOOK_SECRET`
2. Click **Edit**
3. Đổi value từ:
   ```
   https://ebookmind.com/api/webhook/sepay
   ```
   Thành:
   ```
   I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O
   ```
4. Click **Save**

### Bước 3: Redeploy
1. Vào **Deployments**
2. Chọn deployment mới nhất
3. Click **...** (3 chấm) → **Redeploy**
4. Chọn **Use existing Build Cache** → **Redeploy**

### Bước 4: Verify
Sau khi redeploy xong (1-2 phút):
1. Tạo đơn hàng test mới
2. Chuyển khoản theo thông tin
3. Kiểm tra Vercel logs → Không còn lỗi "API key mismatch"
4. Trang thanh toán tự động chuyển sang success

## Lưu ý quan trọng

### SEPAY_WEBHOOK_SECRET là gì?
- Đây là **API key** mà Sepay gửi trong header `Authorization: Apikey YOUR_KEY`
- Webhook code sẽ verify API key này để đảm bảo request đến từ Sepay
- **KHÔNG PHẢI** là webhook URL

### Webhook URL ở đâu?
- Webhook URL được cấu hình **trên Sepay Dashboard**, không phải trong code
- URL: `https://ebookmind.com/api/sepay/webhook`
- Đã cấu hình đúng rồi, không cần đổi

## Sau khi fix

### Test với đơn hàng cũ
Các đơn hàng đã thanh toán trước đó sẽ KHÔNG tự động update vì webhook đã fail.
Bạn cần manually update bằng SQL (xem file `MANUAL_UPDATE_ORDERS.sql`).

### Test với đơn hàng mới
1. Tạo đơn hàng mới
2. Chuyển khoản đúng số tiền và nội dung
3. Trong 1-2 phút, Sepay sẽ gọi webhook
4. Webhook verify API key thành công
5. Order status update thành `completed`
6. Trang thanh toán tự động redirect sang `/success`
7. User nhận email với download links

## Kiểm tra logs sau khi fix

Vào Vercel → Deployments → Functions → `/api/sepay/webhook`

Logs phải hiển thị:
```
=== Sepay Webhook Called ===
Headers: { authorization: "Apikey I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O", ... }
Raw body: { ... }
Parsed webhook data: { ... }
Looking for order with payment_code: EBOOK1234567890
```

**KHÔNG còn lỗi:**
- ❌ API key mismatch
- ❌ Webhook authentication failed

## Tóm tắt
1. Vào Vercel Settings → Environment Variables
2. Sửa `SEPAY_WEBHOOK_SECRET` = `I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O`
3. Redeploy
4. Test với đơn hàng mới
5. ✅ Webhook hoạt động, trang tự động update!
