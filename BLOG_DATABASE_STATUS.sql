-- KIỂM TRA TÌNH TRẠNG DATABASE BLOG HIỆN TẠI
-- Chạy trong Supabase SQL Editor để xem trạng thái

-- 1. Kiểm tra số lượng bài blog hiện có
SELECT 
  COUNT(*) as total_posts,
  COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
  COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts,
  AVG(LENGTH(content)) as avg_content_length
FROM public.blog_posts;

-- 2. Xem danh sách tất cả bài blog
SELECT 
  id,
  title,
  slug,
  category,
  status,
  LENGTH(content) as content_length,
  published_at,
  created_at
FROM public.blog_posts 
ORDER BY published_at DESC;

-- 3. Kiểm tra bài blog có nội dung ngắn (dưới 500 ký tự)
SELECT 
  title,
  slug,
  LENGTH(content) as content_length,
  SUBSTRING(content, 1, 100) as content_preview
FROM public.blog_posts 
WHERE LENGTH(content) < 500
ORDER BY published_at DESC;

-- 4. Kiểm tra bài blog đã có nội dung đầy đủ (trên 2000 ký tự)
SELECT 
  title,
  slug,
  LENGTH(content) as content_length,
  status
FROM public.blog_posts 
WHERE LENGTH(content) > 2000
ORDER BY published_at DESC;
