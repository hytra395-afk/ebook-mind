-- UPDATE ẢNH BÀI 1 - TRÁNH TRÙNG LẶP
-- Chạy trong Supabase SQL Editor

UPDATE public.blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=630&fit=crop'
WHERE slug = '10-mindset-kinh-doanh-can-co-de-khong-chi-song-sot-ma-con-thang-trong-3-nam-dau';

SELECT 'Updated featured image for blog post #1' as result;
