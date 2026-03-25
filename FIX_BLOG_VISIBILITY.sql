-- FIX BLOG VISIBILITY - ĐẢM BẢO TẤT CẢ BÀI BLOG HIỂN THỊ
-- Chạy trong Supabase SQL Editor

-- Bước 1: Kiểm tra tất cả bài blog hiện có
SELECT 
  id,
  title,
  slug,
  status,
  published_at,
  LENGTH(content) as content_length
FROM public.blog_posts 
ORDER BY published_at DESC;

-- Bước 2: Cập nhật tất cả bài blog để chắc chắn có status = 'published' và published_at hợp lệ
UPDATE public.blog_posts 
SET 
  status = 'published',
  published_at = CASE 
    WHEN published_at IS NULL THEN NOW() - INTERVAL '1 day'
    WHEN published_at > NOW() THEN NOW() - INTERVAL '1 day'
    ELSE published_at
  END
WHERE status != 'published' OR published_at IS NULL OR published_at > NOW();

-- Bước 3: Kiểm tra lại sau khi cập nhật
SELECT COUNT(*) as total_published FROM public.blog_posts WHERE status = 'published';

-- Bước 4: Xem chi tiết tất cả bài đã published
SELECT 
  title,
  slug,
  status,
  published_at,
  category
FROM public.blog_posts 
WHERE status = 'published'
ORDER BY published_at DESC;
