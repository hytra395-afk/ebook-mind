# Migration Instructions

## QUAN TRỌNG: Chạy 2 migrations theo thứ tự

### 1. Migration 005 - Add bestseller field to ebooks

**Chạy trên Supabase Dashboard:**

1. Vào https://supabase.com/dashboard/project/ckohoqembjurgwxvvzcf/sql/new
2. Copy nội dung file `migrations/005_add_bestseller_field.sql`
3. Paste vào SQL Editor
4. Click "Run" để thực thi

**Migration này sẽ:**
- Thêm column `bestseller` (BOOLEAN, default false) vào table `ebooks`
- Tạo index cho performance
- Thêm comments để phân biệt `featured` vs `bestseller`

**Phân biệt 2 fields:**
- `featured`: Ebook hiển thị trong section "Ebook Nổi Bật" trên homepage
- `bestseller`: Chỉ hiển thị badge "Bestseller" trên ebook card (không ảnh hưởng homepage)

---

### 2. Migration 006 - Upgrade combos table (FIX meta_description ERROR)

**Chạy trên Supabase Dashboard:**

1. Vào https://supabase.com/dashboard/project/ckohoqembjurgwxvvzcf/sql/new
2. Copy nội dung file `migrations/006_upgrade_combos_table.sql`
3. Paste vào SQL Editor
4. Click "Run" để thực thi

**Migration này sẽ:**
- **FIX LỖI**: Thêm `meta_description`, `meta_title`, `og_image_url`, `keywords` (sửa lỗi "Could not find the 'meta_description' column")
- Thêm `cover_url`, `highlights`, `content`, `preview_images` (giống ebooks)
- Thêm `rating_avg`, `rating_count`, `sales_count` (cho reviews)
- Thêm `bestseller` field (giống ebooks)
- Tạo table `combo_reviews` (cho phép thêm đánh giá vào combos)
- Tạo indexes cho performance

**Sau khi chạy migration này:**
- ✅ Lỗi meta_description sẽ được fix
- ✅ Có thể thêm đánh giá vào combos
- ✅ Có thể thêm ảnh & nội dung vào combos
- ✅ Combos có đầy đủ tính năng như ebooks

---

## Hoặc sử dụng Supabase CLI (chạy cả 2 migrations):

```bash
supabase db push
```
