-- Update Blog Posts Published Dates - Phân bổ từ 5/3/2026 đến 30/3/2026
-- Chạy trong Supabase SQL Editor

-- Blog Post 14: 5/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-05 09:00:00',
    updated_at = '2026-03-05 09:00:00'
WHERE slug = 'personal-brand-la-gi-va-tai-sao-day-la-tai-san-quan-trong-nhat-ban-co-the-xay-dung-khi-kinh-doanh-mot-minh';

-- Blog Post 15: 8/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-08 10:00:00',
    updated_at = '2026-03-08 10:00:00'
WHERE slug = 'ban-hang-online-khong-kho-kho-la-ban-dang-co-ban-cho-tat-ca-moi-nguoi-thay-vi-dung-nguoi';

-- Blog Post 16: 12/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-12 14:00:00',
    updated_at = '2026-03-12 14:00:00'
WHERE slug = 'phat-trien-ban-than-cho-nguoi-kinh-doanh-5-thoi-quen-hang-ngay-cua-nguoi-kiem-8-chu-so-ma-khong-ai-noi-cho-ban';

-- Blog Post 17: 16/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-16 11:00:00',
    updated_at = '2026-03-16 11:00:00'
WHERE slug = 'ebook-kinh-doanh-co-that-su-huu-ich-hang-chuc-ebook-da-duoc-danh-gia-va-day-la-nhung-gi-thuc-su-co-gia-tri';

-- Blog Post 18: 20/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-20 15:00:00',
    updated_at = '2026-03-20 15:00:00'
WHERE slug = 'khoi-nghiep-that-bai-khong-dang-so-dieu-dang-so-la-that-bai-vi-nhung-ly-do-co-the-tranh-duoc';

-- Blog Post 19: 25/3/2026
UPDATE public.blog_posts 
SET published_at = '2026-03-25 09:00:00',
    updated_at = '2026-03-25 09:00:00'
WHERE slug = 'ngach-kinh-doanh-nao-it-canh-tranh-nhat-hien-nay-8-ngach-it-nguoi-de-y-nhung-co-nhu-cau-that';

-- Kiểm tra lại ngày sau khi update
SELECT 
  slug,
  title,
  published_at,
  created_at,
  updated_at
FROM public.blog_posts 
WHERE status = 'published'
ORDER BY published_at ASC;
