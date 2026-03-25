-- SCRIPT ĐƠN GIẢN: INSERT 8 BÀI BLOG
-- Chạy trong Supabase SQL Editor

-- Xóa hết bài cũ
DELETE FROM public.blog_posts;

-- Bài 1-8: Sử dụng nội dung ngắn gọn để test
-- Sau khi test thành công, bạn có thể chạy lại các file UPDATE để cập nhật nội dung đầy đủ

INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at) VALUES
('10 Mindset Kinh Doanh Cần Có Để Không Chỉ Sống Sót Mà Còn "Thắng" Trong 3 Năm Đầu', '10-mindset-kinh-doanh-can-co', 'Mindset Kinh Doanh', 'Hầu hết người mới khởi nghiệp thất bại không phải vì thiếu vốn, mà vì mang tư duy nhân viên vào làm chủ.', '<p>Nội dung bài 1 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop', '10 Mindset Kinh Doanh | Ebook Mind', '10 mindset kinh doanh thực chiến', ARRAY['mindset kinh doanh'], 15, 'published', NOW() - INTERVAL '15 days'),

('15 Năm Kinh Doanh, Từ Thất Bại Nhiều Lần, Tôi Phát Hiện Ra 5 Sự Thật "Ngược Đời"', '15-nam-kinh-doanh-5-su-that-nguoc-doi', 'Kinh Nghiệm Kinh Doanh', 'Sau 15 năm lăn lộn từ mất trắng 200 triệu đến xây dựng doanh nghiệp ổn định.', '<p>Nội dung bài 2 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop', '15 Năm Kinh Doanh | Ebook Mind', '5 sự thật ngược đời trong kinh doanh', ARRAY['kinh nghiệm kinh doanh'], 12, 'published', NOW() - INTERVAL '14 days'),

('Từ Nhân Viên Văn Phòng Lương 12 Triệu Đến Chủ Doanh Nghiệp Thu 200 Triệu/Tháng', 'tu-nhan-vien-van-phong-den-chu-doanh-nghiep', 'Câu Chuyện Thành Công', 'Hành trình từ nhân viên văn phòng lương 12 triệu đến chủ doanh nghiệp thu 200 triệu/tháng.', '<p>Nội dung bài 3 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop', 'Từ Nhân Viên Đến Chủ Doanh Nghiệp | Ebook Mind', 'Câu chuyện thành công kinh doanh', ARRAY['câu chuyện thành công'], 10, 'published', NOW() - INTERVAL '13 days'),

('Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero-Risk Ai Cũng Làm Được Năm 2026', 'kinh-doanh-online-khong-can-von-5-mo-hinh-zero-risk-2026', 'Kinh Doanh Online', 'Kinh doanh online không cần vốn: 5 mô hình zero-risk ai cũng làm được năm 2026.', '<p>Nội dung bài 4 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop', 'Kinh Doanh Online Không Cần Vốn | Ebook Mind', '5 mô hình kinh doanh online không cần vốn', ARRAY['kinh doanh online'], 11, 'published', NOW() - INTERVAL '12 days'),

('Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh Vốn Nhỏ', 'vuot-qua-noi-so-that-bai-khi-kinh-doanh-von-nho', 'Kinh Doanh Vốn Nhỏ', 'Vượt qua nỗi sợ thất bại khi kinh doanh vốn nhỏ - bài học từ những người đã thành công.', '<p>Nội dung bài 5 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop', 'Vượt Qua Nỗi Sợ Thất Bại | Ebook Mind', 'Vượt qua nỗi sợ thất bại kinh doanh', ARRAY['kinh doanh vốn nhỏ'], 9, 'published', NOW() - INTERVAL '11 days'),

('Mới Kinh Doanh Cái Gì Cũng Muốn Đầu Tư – Cẩn Thận Bạn Đang Rơi Vào "Bẫy Nhiệt Huyết"', 'moi-kinh-doanh-cai-gi-cung-muon-dau-tu-bay-nhiet-huyet', 'Kinh Doanh Vốn Nhỏ', 'Bẫy Nhiệt Huyết: khi cảm xúc hứng khởi lấn át tư duy thực tế.', '<p>Nội dung bài 6 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop', 'Bẫy Nhiệt Huyết | Ebook Mind', 'Bẫy nhiệt huyết khi mới kinh doanh', ARRAY['bẫy nhiệt huyết'], 9, 'published', NOW() - INTERVAL '10 days'),

('Kinh Doanh Ngách Là Gì? Tại Sao Người Bán Thứ "Lạ Hơn" Lại Thường Kiếm Được Nhiều Tiền Hơn', 'kinh-doanh-ngach-la-gi-tai-sao-nguoi-ban-thu-la-hon-lai-thuong-kiem-duoc-nhieu-tien-hon', 'Kinh Doanh Ngách', 'Kinh doanh ngách là gì? Tại sao người bán thứ lạ hơn lại thường kiếm được nhiều tiền hơn?', '<p>Nội dung bài 7 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=630&fit=crop', 'Kinh Doanh Ngách Là Gì | Ebook Mind', 'Kinh doanh ngách là gì', ARRAY['kinh doanh ngách'], 10, 'published', NOW() - INTERVAL '9 days'),

('Solo Business Là Gì? Xu Hướng "Một Người Làm Chủ" Đang Thay Đổi Cách Người Trẻ Việt Nghĩ Về Kinh Doanh', 'solo-business-la-gi-xu-huong-mot-nguoi-lam-chu', 'Solo Business', 'Solo business là gì? Xu hướng một người làm chủ đang bùng nổ tại Việt Nam.', '<p>Nội dung bài 8 - sẽ cập nhật đầy đủ sau</p>', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop', 'Solo Business Là Gì | Ebook Mind', 'Solo business là gì', ARRAY['solo business'], 11, 'published', NOW() - INTERVAL '8 days');

-- Kiểm tra kết quả
SELECT COUNT(*) as total_posts FROM public.blog_posts WHERE status = 'published';
SELECT title, slug, category, published_at FROM public.blog_posts ORDER BY published_at DESC;
