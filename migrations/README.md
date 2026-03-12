# Database Migrations

## Hướng dẫn chạy migrations trên Supabase

### Bước 1: Truy cập Supabase Dashboard
1. Vào https://supabase.com/dashboard
2. Chọn project của bạn
3. Vào **SQL Editor** (menu bên trái)

### Bước 2: Chạy migrations theo thứ tự

#### Migration 003: Ebook & Combo Upgrade
- File: `003_ebook_combo_upgrade.sql`
- Mục đích: Thêm các columns mới cho ebooks, combos, reviews
- **Trạng thái**: ⏳ Chưa chạy

#### Migration 004: Update Categories
- File: `004_update_categories.sql`
- Mục đích: Cập nhật danh mục mới
  - Tư duy solo business
  - Kinh doanh ngách
  - Phát triển bản thân
  - Công nghệ
  - Sức khỏe
- **Trạng thái**: ⏳ Chưa chạy

### Bước 3: Copy & Paste SQL
1. Mở file migration
2. Copy toàn bộ nội dung SQL
3. Paste vào SQL Editor
4. Click **Run** để thực thi

### Lưu ý quan trọng
- ⚠️ Chạy migrations theo đúng thứ tự (003 → 004)
- ⚠️ Migration 004 sẽ xóa tất cả categories cũ và tạo mới
- ⚠️ Backup dữ liệu trước khi chạy nếu cần

### Kiểm tra sau khi chạy
```sql
-- Kiểm tra categories mới
SELECT * FROM categories ORDER BY sort_order;

-- Kiểm tra ebooks columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ebooks';
```
