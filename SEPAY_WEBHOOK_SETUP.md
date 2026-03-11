# Hướng dẫn cấu hình Sepay Webhook

## Vấn đề
Sau khi chuyển khoản thành công, trang thanh toán không tự động cập nhật trạng thái.

## Nguyên nhân
Sepay webhook chưa được cấu hình hoặc webhook URL chưa đúng.

## Giải pháp

### Bước 1: Cấu hình Webhook URL trên Sepay Dashboard

1. Đăng nhập vào Sepay Dashboard: https://my.sepay.vn
2. Vào **Cài đặt** → **Webhook**
3. Nhập Webhook URL: `https://ebookmind.com/api/sepay/webhook`
4. Chọn sự kiện: **Transaction Success**
5. Lưu cấu hình

### Bước 2: Verify Webhook Secret

Đảm bảo biến môi trường `SEPAY_WEBHOOK_SECRET` đã được cấu hình đúng trên Vercel:

1. Vào Vercel Dashboard
2. Chọn project **ebook-mind**
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra biến: `SEPAY_WEBHOOK_SECRET`
5. Giá trị phải khớp với webhook secret trên Sepay Dashboard

### Bước 3: Test Webhook

Sau khi cấu hình xong:

1. Tạo đơn hàng mới
2. Chuyển khoản theo thông tin
3. Trong vòng 1-2 phút, trang thanh toán sẽ tự động chuyển sang trang success

### Bước 4: Kiểm tra Logs (nếu vẫn lỗi)

Vào Vercel Dashboard → **Deployments** → Chọn deployment mới nhất → **Functions** → Tìm `/api/sepay/webhook`

Kiểm tra logs để xem:
- Webhook có được gọi không?
- Payment code có match không?
- Có lỗi gì trong quá trình xử lý không?

## Lưu ý quan trọng

### Format nội dung chuyển khoản
- Sepay sẽ gửi webhook với `content` = nội dung chuyển khoản
- Nội dung phải chính xác: `EBOOK1234567890` (10 chữ số)
- Webhook sẽ tìm order theo `payment_code` này

### Nếu webhook không hoạt động
Hệ thống vẫn có cơ chế polling mỗi 5 giây để check order status. Tuy nhiên, điều này yêu cầu:
1. Sepay API phải hỗ trợ query transaction by content
2. Hoặc admin phải manually update order status trong database

### Manual Update (tạm thời)
Nếu webhook chưa hoạt động, bạn có thể manually update order status:

```sql
-- Tìm order theo payment_code
SELECT id, status, amount, payment_code 
FROM orders 
WHERE payment_code = 'EBOOK1234567890';

-- Update status thành completed
UPDATE orders 
SET status = 'completed', 
    updated_at = NOW()
WHERE payment_code = 'EBOOK1234567890';
```

Sau khi update, trang thanh toán sẽ tự động redirect sang success page.
