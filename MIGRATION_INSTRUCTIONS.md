# Migration Instructions

## Run migration 005_add_bestseller_field.sql

**Cần chạy migration này trên Supabase Dashboard:**

1. Vào https://supabase.com/dashboard/project/ckohoqembjurgwxvvzcf/sql/new
2. Copy nội dung file `migrations/005_add_bestseller_field.sql`
3. Paste vào SQL Editor
4. Click "Run" để thực thi

**Hoặc sử dụng Supabase CLI:**

```bash
supabase db push
```

**Migration này sẽ:**
- Thêm column `bestseller` (BOOLEAN, default false) vào table `ebooks`
- Tạo index cho performance
- Thêm comments để phân biệt `featured` vs `bestseller`

**Phân biệt 2 fields:**
- `featured`: Ebook hiển thị trong section "Ebook Nổi Bật" trên homepage
- `bestseller`: Chỉ hiển thị badge "Bestseller" trên ebook card (không ảnh hưởng homepage)
