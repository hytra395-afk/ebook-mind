# 🚀 Morii Vn - Setup Guide

## ✅ Đã Hoàn Thành

### 1. Project Setup
- ✅ Tạo folder `morii-vn` từ `ebook-mind`
- ✅ Setup Git repository
- ✅ Push code lên GitHub: https://github.com/webappsaasai-lab/morii-vn.git
- ✅ Update package.json
- ✅ Tạo .env.local với Supabase credentials

### 2. Code Refactoring
- ✅ Rename folders: `ebooks` → `products`
- ✅ Rename components:
  - `EbookCard` → `ProductCard`
  - `EbookImageGallery` → `ProductImageGallery`
  - `EbookTabs` → `ProductTabs`
  - `EbooksFilter` → `ProductsFilter`
- ✅ Update all imports and references
- ✅ Commit và push lên GitHub

### 3. Database Migration
- ✅ Tạo file migration: `migrations/001_rename_to_products.sql`
- ⏳ **CẦN CHẠY** migration trên Supabase

---

## 📝 Các Bước Tiếp Theo

### Bước 1: Chạy Database Migration trên Supabase

1. **Truy cập Supabase Dashboard:**
   - URL: https://supabase.com/dashboard
   - Project: https://upkkfxlpfmfnrtkpuloh.supabase.co

2. **Mở SQL Editor:**
   - Click **SQL Editor** ở sidebar trái
   - Click **New query**

3. **Copy & Paste Migration:**
   - Mở file: `/Users/admin/Documents/Morii Vn/morii-vn/migrations/001_rename_to_products.sql`
   - Copy toàn bộ nội dung
   - Paste vào SQL Editor

4. **Chạy Migration:**
   - Click **Run** (hoặc Cmd/Ctrl + Enter)
   - Đợi kết quả: "Migration 001 completed successfully!"

5. **Kiểm tra Tables:**
   - Click **Table Editor** ở sidebar
   - Xác nhận các tables:
     - ✅ `products` (đã rename từ `ebooks`)
     - ✅ `product_variants` (mới tạo)
     - ✅ `orders` (đã thêm shipping fields)
     - ✅ `order_items` (đã thêm variant_id)

---

### Bước 2: Chạy Development Server

```bash
cd "/Users/admin/Documents/Morii Vn/morii-vn"

# Nếu npm install chưa xong, đợi hoặc chạy lại:
npm install

# Chạy dev server
npm run dev
```

Server sẽ chạy tại: **http://localhost:3000**

---

### Bước 3: Test Website Local

1. **Trang chủ:** http://localhost:3000
2. **Products listing:** http://localhost:3000/products
3. **Product detail:** http://localhost:3000/products/[slug]
4. **Admin:** http://localhost:3000/admin
   - Username: `admin`
   - Password: `morii2026`

---

### Bước 4: Seed Sample Data (Optional)

Nếu database trống, bạn có thể thêm sample products:

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Bookmark', 'bookmark', 'Handmade bookmarks'),
('Sticker', 'sticker', 'Decorative stickers'),
('Postcard', 'postcard', 'Artistic postcards'),
('Keychain', 'keychain', 'Cute keychains');

-- Insert sample product
INSERT INTO products (
  slug, title, description, category_id, price, 
  cover_url, preview_images, active, featured
) VALUES (
  'sample-bookmark',
  'Floral Bookmark',
  'Beautiful handmade bookmark with floral design',
  (SELECT id FROM categories WHERE slug = 'bookmark'),
  49000,
  'https://drive.google.com/uc?id=YOUR_IMAGE_ID',
  '[]'::jsonb,
  true,
  true
);
```

---

## 🎨 Logo Files

Logo và mascot đã có sẵn:
- Logo: `/Users/admin/Documents/Morii Vn/logo/1.psd`
- Mascot: `/Users/admin/Documents/Morii Vn/logo/2.psd`

**Cần làm:**
1. Export logo thành PNG/SVG
2. Thêm vào `public/` folder
3. Update trong `components/navbar.tsx` và `components/footer.tsx`

---

## 🔄 Git Workflow

Mỗi khi có thay đổi:

```bash
git add .
git commit -m "Your message"
git push
```

Vercel sẽ tự động deploy khi push lên GitHub!

---

## 📊 Current Status

| Task | Status |
|------|--------|
| Project Setup | ✅ Done |
| Code Refactoring | ✅ Done |
| Database Migration File | ✅ Created |
| **Run Migration on Supabase** | ⏳ **TODO** |
| Install Dependencies | ⏳ In Progress |
| Run Dev Server | ⏳ Pending |
| Test Website | ⏳ Pending |
| Deploy to Vercel | ⏳ Pending |

---

## 🆘 Troubleshooting

### Lỗi: Cannot find module
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Lỗi: Database connection
- Kiểm tra `.env.local` có đúng Supabase credentials
- Kiểm tra đã chạy migration chưa

### Lỗi: Build failed
```bash
npm run build
# Xem lỗi chi tiết và fix
```

---

## 📞 Next Steps Summary

1. ⏳ **Chạy migration trên Supabase** (quan trọng nhất!)
2. ⏳ Đợi `npm install` hoàn thành
3. ⏳ Chạy `npm run dev`
4. ⏳ Test website trên localhost
5. ⏳ Export logo và thêm vào project
6. ⏳ Deploy lên Vercel

**Bạn muốn tôi tiếp tục với bước nào?**
