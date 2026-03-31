# Hướng dẫn chạy migration để sửa lỗi thanh toán

## Vấn đề
- QR code không hiển thị
- Nội dung chuyển khoản trống
- Nguyên nhân: Thiếu column `payment_code` trong bảng `orders`

## Giải pháp
Chạy migration SQL sau trên Supabase production database:

### Bước 1: Truy cập Supabase Dashboard
1. Vào https://supabase.com/dashboard
2. Chọn project của bạn (Ebook Mind)
3. Vào **SQL Editor**

### Bước 2: Chạy migration
Copy và paste đoạn SQL sau vào SQL Editor:

```sql
-- Add payment_code field to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_code TEXT;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_payment_code ON orders(payment_code);

-- Add comment
COMMENT ON COLUMN orders.payment_code IS 'Sepay payment code format: EBOOK + 3-10 digit number';
```

### Bước 3: Verify
Chạy query sau để kiểm tra:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'orders' AND column_name = 'payment_code';
```

Kết quả phải trả về:
```
column_name   | data_type
payment_code  | text
```

### Bước 4: Test
1. Tạo đơn hàng mới
2. Kiểm tra payment processing page
3. QR code phải hiển thị
4. Nội dung chuyển khoản phải có format: `EBOOK1234567890`

## Lưu ý
- Migration này an toàn, sử dụng `IF NOT EXISTS`
- Không ảnh hưởng đến dữ liệu cũ
- Các đơn hàng mới sẽ tự động có `payment_code`
