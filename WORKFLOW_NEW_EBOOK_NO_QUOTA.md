# Workflow: Thêm Ebook - Không Tốn Vercel Image Optimization Quota

## 🎯 Giải Pháp Đơn Giản

**TẤT CẢ ebook (cũ và mới) đều dùng Google Drive thumbnail API → Không tốn Vercel quota**

---

## 📝 Cách Thêm Ebook

### **Bước 1: Upload Ảnh Lên Google Drive**
1. Upload ảnh cover ebook lên Google Drive
2. Right-click → Share → **"Anyone with the link can view"**
3. Copy link gốc: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`

### **Bước 2: Insert Vào Database**
```sql
INSERT INTO ebooks (
  title,
  slug,
  cover_url,
  ...
) VALUES (
  'Tên Ebook',
  'slug-ebook',
  'https://drive.google.com/file/d/FILE_ID/view?usp=sharing',
  ...
);
```

**Chỉ cần copy link gốc từ Google Drive, hệ thống tự động xử lý.**

---

## 🔧 Cách Hoạt Động

```
Database: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    ↓
convertDriveUrl() tự động convert sang:
    ↓
https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
    ↓
unoptimized={true} (luôn bật)
    ↓
✅ Không tốn Vercel Image Optimization quota
```

---

## ✅ Kết Quả

- ✅ Tất cả ebook hiển thị bình thường
- ✅ **0 Vercel Image Optimization quota**
- ✅ Load nhanh từ Google Drive CDN
- ✅ Không phân biệt ebook cũ hay mới

---

## 🎯 Tóm Tắt

1. Upload ảnh lên Google Drive
2. Set quyền "Anyone with the link can view"
3. Copy link gốc
4. Paste vào database
5. **Xong** ✅

**Đơn giản, không lằng nhằng.**
