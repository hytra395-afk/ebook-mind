-- KIỂM TRA SLUG CỦA BÀI BLOG 4
-- Chạy trong Supabase SQL Editor

-- Tìm bài blog có tiêu đề liên quan đến "kinh doanh online không cần vốn"
SELECT 
  id,
  title,
  slug,
  category,
  status,
  LENGTH(content) as content_length,
  published_at
FROM public.blog_posts 
WHERE slug LIKE '%kinh-doanh-online%' 
   OR slug LIKE '%khong-can-von%'
   OR slug LIKE '%zero-risk%'
ORDER BY published_at DESC;

-- Hoặc xem tất cả các slug hiện có
SELECT slug, title 
FROM public.blog_posts 
ORDER BY published_at DESC;
