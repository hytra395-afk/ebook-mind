# 🚀 Checklist Triển Khai - Fix Admin Ebooks

## Bước 1: Chạy Migration Database (BẮT BUỘC)

### Truy cập Supabase Dashboard
1. Đăng nhập: https://supabase.com/dashboard
2. Project: `ckohoqembjurgwxvvzcf` (Ebook Mind)
3. Menu: **SQL Editor** → **New Query**

### Chạy Migration SQL
Copy và paste nội dung sau vào SQL Editor:

```sql
-- =====================================================
-- MIGRATION 006: Fix Author Avatar Column
-- =====================================================

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

-- Verify columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'ebooks' 
  AND column_name IN ('author_name', 'author_title', 'author_bio', 'author_avatar', 'content', 'highlights', 'preview_images', 'og_image_url', 'keywords', 'status')
ORDER BY column_name;
```

4. Nhấn **RUN** (hoặc Ctrl+Enter)
5. Kiểm tra kết quả: Phải thấy 10 rows với các column names

---

## Bước 2: Deploy Code Mới

### Option A: Tự động qua Git (Khuyến nghị)
```bash
cd "/Users/admin/Documents/Ebook app/ebook-mind"
git add .
git commit -m "Fix: Admin ebooks - database schema & rich text editor improvements"
git push origin main
```

Vercel sẽ tự động deploy trong vòng 2-3 phút.

### Option B: Manual Deploy qua Vercel Dashboard
1. Vào https://vercel.com/dashboard
2. Chọn project **ebook-mind**
3. Tab **Deployments** → **Redeploy**

---

## Bước 3: Test Trên Production

### Test Case 1: Tạo Ebook Mới
1. Vào https://ebookmind.com/admin/ebooks
2. Nhấn **"Tạo Ebook mới"**
3. Điền thông tin cơ bản:
   - Tên ebook: "Test Ebook"
   - Category: Chọn bất kỳ
   - Level: Chọn bất kỳ
   - Giá: 49000
4. Tab **"Nội dung"**:
   - Test Rich Text Editor
   - Chọn text → Nhấn H1, H2, H3, H4
   - Test Bold, Italic, Underline
   - ✅ Tất cả buttons phải hoạt động
5. Tab **"Đánh giá"**:
   - Điền "Số sao TB": 4.5
   - Điền "Lượt đánh giá": 100
   - Điền "Lượt mua": 50
   - ✅ Tất cả input phải cho phép nhập
6. Nhấn **"Đăng bài"**
   - ✅ Không có lỗi `author_avatar`
   - ✅ Ebook được tạo thành công

### Test Case 2: Rich Text Editor
1. Tab "Nội dung" → "Giới thiệu chi tiết"
2. Gõ text: "Đây là tiêu đề"
3. Bôi đen text → Nhấn **H1**
   - ✅ Text phải chuyển thành heading 1
4. Gõ thêm text → Test H2, H3, H4
   - ✅ Tất cả phải hoạt động
5. Test Bold, Italic, List
   - ✅ Toolbar phải responsive và có tooltip tiếng Việt

### Test Case 3: Preview
1. Khi tạo ebook mới (chưa lưu):
   - ✅ Nút "Xem trước" phải disabled
   - ✅ Tooltip: "Vui lòng lưu ebook trước khi xem trước"
2. Sau khi lưu nháp:
   - ✅ Nút "Xem trước" phải active
   - ✅ Click mở tab mới với preview

---

## ✅ Checklist Hoàn Thành

- [ ] Migration database đã chạy thành công
- [ ] Code đã deploy lên Vercel
- [ ] Test tạo ebook mới - không lỗi `author_avatar`
- [ ] Rich text editor H1-H4 hoạt động
- [ ] Input fields đánh giá cho phép nhập
- [ ] Preview button hoạt động đúng

---

## 🐛 Nếu Vẫn Gặp Lỗi

### Lỗi: "Could not find the 'author_avatar' column"
→ **Nguyên nhân**: Migration chưa chạy
→ **Giải pháp**: Quay lại Bước 1, chạy lại migration

### Lỗi: Rich text editor không hoạt động
→ **Nguyên nhân**: Cache browser
→ **Giải pháp**: Hard refresh (Ctrl+Shift+R hoặc Cmd+Shift+R)

### Lỗi: Preview 404
→ **Nguyên nhân**: Ebook chưa được lưu
→ **Giải pháp**: Lưu nháp trước, sau đó mới preview

---

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:
1. Supabase logs: Dashboard → Logs
2. Vercel logs: Dashboard → Deployments → View Function Logs
3. Browser console: F12 → Console tab
