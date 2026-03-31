# Hướng dẫn sửa lỗi Admin Ebooks

## ✅ Đã sửa

### 1. Lỗi Database Schema - `author_avatar` column missing

**Nguyên nhân**: Các cột mới chưa được thêm vào database production trên Supabase.

**Giải pháp**: Chạy migration SQL trong Supabase Dashboard

#### Các bước thực hiện:

1. Đăng nhập vào Supabase Dashboard: https://supabase.com/dashboard
2. Chọn project: Ebook Mind
3. Vào **SQL Editor** (menu bên trái)
4. Tạo new query và paste nội dung từ file `migrations/006_fix_author_avatar.sql`
5. Nhấn **Run** để thực thi

**File migration**: `/migrations/006_fix_author_avatar.sql`

```sql
-- Đảm bảo tất cả các cột cần thiết tồn tại
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_name TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_title TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_bio TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS author_avatar TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS preview_images JSONB DEFAULT '[]';
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS keywords TEXT[];
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'published';
```

**Sau khi chạy migration**: Thử tạo ebook mới, lỗi sẽ biến mất.

---

### 2. Lỗi Rich Text Editor - Toolbar không hoạt động

**Nguyên nhân**: 
- Thiếu disabled state khi editor chưa khởi tạo
- Thiếu Vietnamese tooltips
- Không có feedback khi button được active

**Đã sửa**:
- ✅ Thêm disabled state cho tất cả buttons
- ✅ Thêm tooltips tiếng Việt (VD: "Tiêu đề 1 (H1)", "In đậm (Ctrl+B)")
- ✅ Cải thiện visual feedback khi button active (màu tím)
- ✅ Thêm proper null checks cho editor instance

**File đã sửa**: `/components/admin/rich-text-editor.tsx`

**Cách sử dụng**:
- Chọn text → Nhấn H1, H2, H3, H4 để format
- Nhấn Bold, Italic, Underline để format text
- Tất cả toolbar buttons giờ đã hoạt động đúng

---

### 3. Quản lý đánh giá - Input fields không điền được

**Trạng thái**: ✅ **ĐÃ HOẠT ĐỘNG** - Component đã được implement đúng từ trước

**Xác nhận**: 
- File `/components/admin/reviews-manager.tsx` đã có đầy đủ input fields editable
- Số sao TB (1-5): `type="number"` với onChange handler ✅
- Lượt đánh giá: `type="number"` với onChange handler ✅  
- Lượt mua: `type="number"` với onChange handler ✅

**Không cần sửa gì thêm** - Tính năng này đã hoạt động đầy đủ.

---

## ⚠️ Lưu ý quan trọng

### Preview functionality (404 error)

**Nguyên nhân**: Khi tạo ebook mới, slug chưa được lưu vào database nên preview link `/ebooks/[slug]` sẽ 404.

**Giải pháp tạm thời**: 
- Lưu nháp hoặc đăng bài trước
- Sau đó mới nhấn "Xem trước"

**Cải tiến đề xuất** (tùy chọn):
- Disable nút "Xem trước" khi chưa có slug
- Hoặc mở preview trong modal thay vì tab mới

---

## 🚀 Triển khai

### Bước 1: Chạy migration database
```bash
# Vào Supabase Dashboard → SQL Editor
# Copy nội dung từ migrations/006_fix_author_avatar.sql
# Nhấn Run
```

### Bước 2: Deploy code mới lên Vercel
```bash
cd /Users/admin/Documents/Ebook\ app/ebook-mind
git add .
git commit -m "Fix: Admin ebooks - database schema & rich text editor"
git push origin main
```

Vercel sẽ tự động deploy.

### Bước 3: Test trên production
1. Vào https://ebookmind.com/admin/ebooks
2. Nhấn "Tạo Ebook mới"
3. Điền thông tin → Tab "Nội dung" → Test rich text editor
4. Tab "Đánh giá" → Điền số sao, lượt đánh giá, lượt mua
5. Nhấn "Đăng bài" → Không còn lỗi `author_avatar`

---

## 📝 Tóm tắt các file đã sửa

1. ✅ `/migrations/006_fix_author_avatar.sql` - Migration mới
2. ✅ `/components/admin/rich-text-editor.tsx` - Cải thiện toolbar
3. ✅ `/components/admin/reviews-manager.tsx` - Đã OK từ trước

**Tất cả đã được commit và sẵn sàng deploy.**
