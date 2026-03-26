# Workflow: Thêm Ebook Mới Không Tốn Vercel Image Optimization Quota

## 🎯 Mục Đích
Hướng dẫn thêm ebook mới sử dụng Google Drive thumbnail API để **KHÔNG tốn Vercel Image Optimization quota**.

Ebook cũ vẫn hoạt động bình thường với cấu hình hiện tại.

---

## 📝 Bước 1: Upload Ảnh Lên Google Drive

1. Upload ảnh cover ebook lên Google Drive
2. Right-click → Share → "Anyone with the link can view"
3. Copy link: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

**Lưu ý:** Giữ nguyên link này, KHÔNG convert sang format khác.

---

## 📝 Bước 2: Insert Vào Database

Khi insert ebook mới vào Supabase, dùng **link Google Drive gốc**:

```sql
INSERT INTO ebooks (
  title,
  slug,
  cover_url,
  ...
) VALUES (
  'Tên Ebook Mới',
  'slug-ebook-moi',
  'https://drive.google.com/file/d/FILE_ID/view?usp=sharing',  -- Link gốc
  ...
);
```

**QUAN TRỌNG:** 
- ✅ Dùng link gốc: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
- ❌ KHÔNG convert sang: `https://drive.google.com/uc?export=view&id=FILE_ID`

---

## 🔧 Cách Hoạt Động

### **Ebook Mới (Link Gốc):**
```
Database: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    ↓
convertDriveUrl() tự động convert sang:
    ↓
https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
    ↓
unoptimized={true} (tự động detect)
    ↓
✅ Không tốn Vercel Image Optimization quota
```

### **Ebook Cũ (Link Đã Convert):**
```
Database: https://drive.google.com/uc?export=view&id=FILE_ID
    ↓
convertDriveUrl() giữ nguyên
    ↓
https://drive.google.com/uc?export=view&id=FILE_ID
    ↓
unoptimized={false} (Vercel proxy)
    ↓
❌ Tốn Vercel quota (nhưng vẫn hoạt động bình thường)
```

---

## ✅ Kết Quả

**Ebook mới:**
- ✅ Hiển thị bình thường
- ✅ Không tốn Vercel Image Optimization quota
- ✅ Load trực tiếp từ Google Drive CDN

**Ebook cũ:**
- ✅ Vẫn hoạt động bình thường
- ✅ Không cần thay đổi gì
- ❌ Vẫn tốn quota (nhưng đã tối ưu hóa)

---

## 📊 Ví Dụ Thực Tế

### **Ebook Mới - Không Tốn Quota:**
```sql
INSERT INTO ebooks (title, cover_url) VALUES (
  'Ebook Mới 2026',
  'https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing'
);
```

### **Ebook Cũ - Vẫn Hoạt Động:**
```sql
-- Không cần thay đổi gì
-- Database vẫn giữ: https://drive.google.com/uc?export=view&id=OLD_FILE_ID
```

---

## 🎯 Tóm Tắt

1. **Upload ảnh lên Google Drive** → Set quyền "Anyone with the link"
2. **Copy link gốc** (format: `/file/d/FILE_ID/view`)
3. **Insert vào database** với link gốc
4. **Hệ thống tự động** convert sang thumbnail API
5. **Không tốn Vercel quota** ✅

**Ebook cũ không cần làm gì, vẫn hoạt động bình thường.**
