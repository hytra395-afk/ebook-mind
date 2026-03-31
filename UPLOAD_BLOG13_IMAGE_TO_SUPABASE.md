# Upload Ảnh Bài #13 Lên Supabase Storage

## Bước 1: Tạo Bucket (nếu chưa có)
1. Mở Supabase Dashboard → Chọn project Ebook Mind
2. Vào "Storage" → "Buckets"
3. Click "New bucket"
4. Tên: `blog-images`
5. Public: ✅ Tích chọn
6. Click "Create bucket"

## Bước 2: Upload Ảnh
1. Vào bucket `blog-images`
2. Click "Upload file"
3. Chọn ảnh về dòng tiền/cash flow (1200x630px)
4. Tên file: `blog-13-cash-flow.jpg`
5. Click "Upload"

## Bước 3: Copy URL
1. Click vào file đã upload
2. Copy URL từ Supabase Storage

## Bước 4: Update Database
Chạy SQL query:
```sql
UPDATE public.blog_posts
SET featured_image = 'YOUR_SUPABASE_STORAGE_URL/blog-images/blog-13-cash-flow.jpg'
WHERE slug = 'tai-sao-nhieu-nguoi-kinh-doanh-gioi-van-ngheo-su-that-ve-dong-tien-ma-truong-dai-hoc-khong-day-ban';
```

## Kết quả
✅ Ảnh sẽ hiển thị ngay lập tức
✅ Không bị CORS block
✅ Hoạt động tốt với `unoptimized={true}`
✅ Không tốn Vercel Image Optimization quota
