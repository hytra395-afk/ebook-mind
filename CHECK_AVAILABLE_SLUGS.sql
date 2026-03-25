-- KIỂM TRA TẤT CẢ SLUG CÓ SẴN TRONG DATABASE
-- Chạy trong Supabase SQL Editor

-- Xem tất cả các slug hiện có
SELECT 
  title,
  slug,
  category,
  status,
  LENGTH(content) as content_length,
  published_at
FROM public.blog_posts 
ORDER BY published_at DESC;

-- Đếm tổng số bài
SELECT COUNT(*) as total_posts FROM public.blog_posts WHERE status = 'published';
