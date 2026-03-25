-- XÓA TẤT CẢ BÀI BLOG - BẮT ĐẦU LẠI TỪ ĐẦU
-- Chạy trong Supabase SQL Editor

-- Xóa tất cả bài blog
DELETE FROM public.blog_posts;

-- Kiểm tra lại
SELECT COUNT(*) as remaining_posts FROM public.blog_posts;
