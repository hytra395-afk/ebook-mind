-- UPDATE ẢNH BÌA BÀI #12 - ĐỌC SÁCH KINH DOANH
-- Chạy trong Supabase SQL Editor

UPDATE public.blog_posts 
SET featured_image = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop'
WHERE slug = 'doc-hang-chuc-cuon-sach-kinh-doanh-va-day-la-7-dieu-that-su-thay-doi-tu-duy-khong-phai-nhung-thu-ban-nghi';

SELECT 'Updated featured image for blog post #12' as result;
SELECT title, slug, featured_image FROM public.blog_posts WHERE slug = 'doc-hang-chuc-cuon-sach-kinh-doanh-va-day-la-7-dieu-that-su-thay-doi-tu-duy-khong-phai-nhung-thu-ban-nghi';
