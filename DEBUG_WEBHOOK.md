# Debug Webhook - Trang không tự động cập nhật

## Vấn đề
Sepay đã nhận được tiền nhưng trang `/payment/processing` không tự động cập nhật.

## Transactions từ Sepay
1. `EBOOK8430587480` - 49,000đ - Tiền vào (09:37:42)
2. `EBOOK4436103028` - 49,000đ - Tiền vào (09:57:52)

## Các bước debug

### 1. Kiểm tra Vercel Logs
Vào Vercel Dashboard → Deployments → Functions → `/api/sepay/webhook`

Tìm logs:
```
=== Sepay Webhook Called ===
Headers: { ... }
Raw body: { ... }
```

### 2. Kiểm tra webhook có được gọi không

**Nếu KHÔNG có logs:**
- Sepay webhook URL sai hoặc chưa được cấu hình
- Kiểm tra Sepay Dashboard → Webhook URL: `https://ebookmind.com/api/sepay/webhook`

**Nếu CÓ logs nhưng lỗi 401:**
- API key không khớp
- Check `SEPAY_WEBHOOK_SECRET` trên Vercel
- Phải khớp với API key trên Sepay: `I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O`

### 3. Kiểm tra payload format

Webhook payload từ Sepay có thể có format:
```json
{
  "transactionId": "44859480",
  "accountNumber": "542896026186",
  "amount": 49000,
  "content": "EBOOK8430587480",
  "status": "success",
  "timestamp": 1710140262000
}
```

### 4. Kiểm tra database

Chạy query để xem order có tồn tại không:
```sql
SELECT id, public_token, payment_code, status, amount, created_at
FROM orders 
WHERE payment_code IN ('EBOOK8430587480', 'EBOOK4436103028');
```

**Nếu không tìm thấy:**
- Order chưa được tạo
- Migration chưa chạy
- payment_code không được lưu

**Nếu tìm thấy nhưng status vẫn 'pending':**
- Webhook không được gọi HOẶC
- Webhook bị lỗi khi update order

### 5. Test webhook manually

Tạo test request:
```bash
curl -X POST https://ebookmind.com/api/sepay/webhook \
  -H "Content-Type: application/json" \
  -H "Authorization: Apikey I9P04DWXMP0BH8MIRRBYXHZ7C6OUBLNSUYDZFFDSLOTJ3MU5JKGK9RWP5GEHEG4O" \
  -d '{
    "transactionId": "test123",
    "accountNumber": "VQRQAGAHK6020",
    "amount": 49000,
    "content": "EBOOK8430587480",
    "status": "success",
    "timestamp": 1710140262000
  }'
```

Response phải là 200 OK.

### 6. Manual fix (tạm thời)

Nếu webhook không hoạt động, manually update order:
```sql
UPDATE orders 
SET status = 'completed', 
    updated_at = NOW(),
    provider_txn_id = '44859480'
WHERE payment_code = 'EBOOK8430587480';
```

Sau khi update, refresh trang `/payment/processing` sẽ tự động redirect.

## Nguyên nhân có thể

1. **Webhook không được gọi:**
   - Sepay webhook URL chưa cấu hình
   - Sepay chỉ gọi webhook khi có "sự kiện" mới, không gọi cho giao dịch cũ

2. **Webhook bị lỗi 401:**
   - API key không khớp
   - Header format sai

3. **Webhook bị lỗi 404:**
   - Order không tìm thấy với payment_code
   - payment_code trong database khác với content từ Sepay

4. **Webhook thành công nhưng không update:**
   - Logic update order có bug
   - Database connection lỗi

## Giải pháp

### Ngắn hạn
Manually update orders trong database.

### Dài hạn
1. Fix webhook authentication
2. Add retry mechanism
3. Add webhook logs to database
4. Add admin panel to view webhook history
