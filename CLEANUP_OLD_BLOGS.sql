-- XÓA TẤT CẢ BÀI BLOG CŨ - CHỈ GIỮ 6 BÀI MỚI
-- Chạy trong Supabase SQL Editor
-- CẢNH BÁO: Script này sẽ xóa tất cả bài blog cũ có nội dung ngắn

-- Bước 1: Kiểm tra trước khi xóa
SELECT 
  title,
  slug,
  LENGTH(content) as content_length,
  published_at
FROM public.blog_posts 
ORDER BY published_at DESC;

-- Bước 2: Xóa tất cả bài blog cũ (giữ lại 6 bài mới nhất nếu có)
-- Nếu muốn xóa hết để bắt đầu lại từ đầu, uncomment dòng dưới:
-- DELETE FROM public.blog_posts;

-- Hoặc xóa tất cả bài có nội dung ngắn (< 1000 ký tự)
DELETE FROM public.blog_posts 
WHERE LENGTH(content) < 1000;

-- Kiểm tra lại sau khi xóa
SELECT COUNT(*) as remaining_posts FROM public.blog_posts;
