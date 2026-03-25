-- INSERT TẤT CẢ 8 BÀI BLOG - CHẠY MỘT LẦN DUY NHẤT
-- Chạy trong Supabase SQL Editor
-- Chạy sau khi đã chạy CLEANUP_ALL_BLOGS.sql

-- Xóa hết bài cũ trước
DELETE FROM public.blog_posts;

-- Bài 1: 10 Mindset Kinh Doanh
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  '10 Mindset Kinh Doanh Cần Có Để Không Chỉ Sống Sót Mà Còn "Thắng" Trong 3 Năm Đầu',
  '10-mindset-kinh-doanh-can-co-de-khong-chi-song-sot-ma-con-thang-trong-3-nam-dau',
  'Mindset Kinh Doanh',
  'Hầu hết người mới khởi nghiệp thất bại không phải vì thiếu vốn, mà vì mang tư duy nhân viên vào làm chủ. Đây là 10 mindset kinh doanh thực chiến đã giúp hàng trăm người không chỉ "sống sót" mà còn thực sự "thắng" trong 3 năm đầu.',
  '<p>Bạn đang chuẩn bị bước chân vào kinh doanh? Hay bạn đã thử vài tháng, thậm chí vài năm, nhưng vẫn loay hoay giữa đủ thứ áp lực?</p><p>Tôi từng chứng kiến hàng trăm người mới khởi nghiệp. <strong>90% trong số họ thất bại không phải vì thiếu vốn, không phải vì thị trường cạnh tranh khốc liệt, mà đơn giản chỉ vì… họ mang tư duy của một nhân viên văn phòng vào làm chủ.</strong></p><p>Hôm nay, sau hơn 10 năm quan sát và tự mình trải qua đủ thất bại, tôi tổng hợp lại 10 mindset kinh doanh quan trọng nhất.</p><h2>1. Mindset "Kinh Doanh Là Giải Quyết Vấn Đề Cho Người Khác"</h2><p>Hầu hết người mới nghĩ: "Tôi cần kiếm tiền → tôi bán cái gì đó". Sai lầm chết người.</p><p>Tư duy đúng là: "Người khác đang đau đầu với vấn đề gì → tôi giúp họ giải quyết → họ tự nguyện trả tiền".</p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
  '10 Mindset Kinh Doanh Cần Có Để Thắng Trong 3 Năm Đầu | Ebook Mind',
  '10 mindset kinh doanh thực chiến giúp bạn không chỉ sống sót mà còn thắng trong 3 năm đầu.',
  ARRAY['mindset kinh doanh', 'tư duy doanh nhân', 'khởi nghiệp thành công'],
  15,
  'published',
  NOW() - INTERVAL '15 days'
);

-- Kiểm tra
SELECT COUNT(*) as total_posts FROM public.blog_posts;
SELECT title, slug, status, published_at FROM public.blog_posts ORDER BY published_at DESC;
