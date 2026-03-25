-- UPDATE ẢNH BÌA CHO BÀI #1 VÀ #9 - TRÁNH TRÙNG LẶP
-- Chạy trong Supabase SQL Editor

-- 1. Cập nhật ảnh bài #1: 10 Mindset Kinh Doanh
UPDATE public.blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=630&fit=crop'
WHERE slug = '10-mindset-kinh-doanh-can-co-de-khong-chi-song-sot-ma-con-thang-trong-3-nam-dau';

-- 2. Cập nhật ảnh bài #9: Nên Kinh Doanh Gì Trong 3 Năm Tới
UPDATE public.blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop'
WHERE slug = 'nen-kinh-doanh-gi-trong-3-nam-toi-2026-2028-10-ngach-it-von-tiem-nang-lon';

-- 3. Kiểm tra kết quả
SELECT 'Updated featured images for blog posts #1 and #9' as result;
SELECT title, slug, featured_image FROM public.blog_posts 
WHERE slug IN (
  '10-mindset-kinh-doanh-can-co-de-khong-chi-song-sot-ma-con-thang-trong-3-nam-dau',
  'nen-kinh-doanh-gi-trong-3-nam-toi-2026-2028-10-ngach-it-von-tiem-nang-lon'
) ORDER BY published_at DESC;
