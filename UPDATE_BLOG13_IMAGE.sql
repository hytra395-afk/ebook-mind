-- UPDATE ẢNH BÌA BÀI #13 - DÒNG TIỀN KINH DOANH
-- Chạy trong Supabase SQL Editor
-- Google Drive URL sẽ được convert tự động sang thumbnail API bởi convertBlogImageUrl()

UPDATE public.blog_posts
SET featured_image = 'https://drive.google.com/file/d/1mta2SLna4KPP4WA7gtNEpqH5aTt-sRGH/view?usp=sharing'
WHERE slug = 'tai-sao-nhieu-nguoi-kinh-doanh-gioi-van-ngheo-su-that-ve-dong-tien-ma-truong-dai-hoc-khong-day-ban';

SELECT 'Updated featured image for blog post #13' as result;
SELECT title, slug, featured_image FROM public.blog_posts WHERE slug = 'tai-sao-nhieu-nguoi-kinh-doanh-gioi-van-ngheo-su-that-ve-dong-tien-ma-truong-dai-hoc-khong-day-ban';
