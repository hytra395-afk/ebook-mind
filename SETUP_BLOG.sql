-- =====================================================
-- CHẠY SCRIPT NÀY TRONG SUPABASE SQL EDITOR
-- Truy cập: https://supabase.com/dashboard/project/ckohoqembjurgwxvvzcf/sql
-- =====================================================

-- 1. Tạo bảng blog_posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  read_time INTEGER,
  views INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Tạo indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- 3. Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. Tạo policies
DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON public.blog_posts;
CREATE POLICY "Blog posts are viewable by everyone" ON public.blog_posts 
  FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Admins can do everything with blog posts" ON public.blog_posts;
CREATE POLICY "Admins can do everything with blog posts" ON public.blog_posts 
  FOR ALL USING (auth.jwt() ->> 'email' = 'admin@ebookmind.com');

-- 5. Seed 20 blog posts
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at) VALUES
('Kinh Doanh Vốn Nhỏ 2026: Top 15 Ý Tưởng Lãi 300% Từ 5 Triệu', 'kinh-doanh-von-nho-2026-top-15-y-tuong', 'Kinh Doanh Vốn Nhỏ', 'Khám phá 15 ý tưởng kinh doanh vốn nhỏ đang bùng nổ 2026 với lợi nhuận lên đến 300%. Hướng dẫn chi tiết từ A-Z.', '<h2>Tại Sao 2026 Là Thời Điểm Vàng?</h2><p>Năm 2026 chứng kiến sự bùng nổ của kinh doanh tinh gọn với 64,500 doanh nghiệp mới.</p><h2>15 Ý Tưởng Kinh Doanh</h2><h3>1. Dropshipping</h3><p>Lợi nhuận 200-300%, vốn 2-5 triệu.</p><h3>2. Đồ Ăn Healthy</h3><p>Tỷ suất 40-60%.</p>', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop', 'Kinh Doanh Vốn Nhỏ 2026: 15 Ý Tưởng Lãi 300% | Ebook Mind', 'Top 15 ý tưởng kinh doanh vốn nhỏ 2026 lãi cao. Hướng dẫn A-Z, case study thực tế.', ARRAY['kinh doanh vốn nhỏ 2026', 'vốn nhỏ kinh doanh gì'], 12, 'published', NOW() - INTERVAL '20 days'),

('Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn A-Z', 'kinh-doanh-it-von-duoi-5-trieu-huong-dan-tu-a-z', 'Kinh Doanh Vốn Nhỏ', 'Hướng dẫn chi tiết từ A-Z cách bắt đầu kinh doanh với vốn dưới 5 triệu.', '<h2>Bước 1: Đánh Giá Bản Thân</h2><p>Phân tích thế mạnh và mục tiêu SMART.</p><h2>Bước 2: Chọn Ý Tưởng</h2><p>5 tiêu chí quan trọng.</p>', 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=630&fit=crop', 'Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn A-Z 2026', 'Hướng dẫn chi tiết kinh doanh ít vốn. Chọn ý tưởng, lập kế hoạch, marketing.', ARRAY['kinh doanh ít vốn', 'khởi nghiệp ít vốn'], 11, 'published', NOW() - INTERVAL '19 days'),

('Ít Vốn Nên Kinh Doanh Gì 2026? 10 Ngách Thịnh Hành', 'it-von-nen-kinh-doanh-gi-2026-10-ngach-thinh-hanh', 'Kinh Doanh Vốn Nhỏ', 'Phân tích 10 ngách kinh doanh đang thịnh hành 2026 phù hợp với người ít vốn.', '<h2>10 Ngách Đang Thịnh Hành</h2><h3>1. Đồ Ăn Kiêng</h3><p>Thị trường tăng 45%.</p><h3>2. Chăm Sóc Thú Cưng</h3><p>Nhu cầu cao.</p>', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop', 'Ít Vốn Nên Kinh Doanh Gì 2026? 10 Ngách Thịnh Hành', '10 ngách kinh doanh thịnh hành 2026. Phân tích chi tiết, case study.', ARRAY['ít vốn nên kinh doanh gì', 'ngách kinh doanh'], 10, 'published', NOW() - INTERVAL '18 days'),

('Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero Risk', 'kinh-doanh-online-khong-can-von-5-mo-hinh-zero-risk-2026', 'Kinh Doanh Vốn Nhỏ', 'Khám phá 5 mô hình kinh doanh online không cần vốn đầu tư ban đầu.', '<h2>5 Mô Hình Không Cần Vốn</h2><h3>1. Affiliate Marketing</h3><p>Kiếm hoa hồng từ giới thiệu sản phẩm.</p>', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=630&fit=crop', 'Kinh Doanh Online Không Cần Vốn: 5 Mô Hình 2026', 'Top 5 mô hình kinh doanh online không cần vốn. Affiliate, dropshipping.', ARRAY['kinh doanh không cần vốn', 'kinh doanh online'], 9, 'published', NOW() - INTERVAL '17 days'),

('Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều', 'kinh-doanh-nho-tai-nha-2026-20-y-tuong-lai-deu-hang-thang', 'Kinh Doanh Vốn Nhỏ', 'Top 20 ý tưởng kinh doanh nhỏ tại nhà với thu nhập ổn định.', '<h2>20 Ý Tưởng Tại Nhà</h2><p>Không cần mặt bằng, làm việc linh hoạt.</p>', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop', 'Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều', '20 ý tưởng kinh doanh tại nhà. Thu nhập ổn định, không cần mặt bằng.', ARRAY['kinh doanh tại nhà', 'home business'], 10, 'published', NOW() - INTERVAL '16 days'),

('Từ 5 Triệu Đến 100 Triệu: Lộ Trình Chi Tiết', 'tu-5-trieu-den-100-trieu-lo-trinh-kinh-doanh-chi-tiet-2026', 'Kinh Doanh Vốn Nhỏ', 'Lộ trình cụ thể từng bước để scale doanh nghiệp từ 5 triệu lên 100 triệu.', '<h2>Lộ Trình Scale</h2><p>Từng giai đoạn với mục tiêu rõ ràng.</p>', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop', 'Từ 5 Triệu Đến 100 Triệu: Lộ Trình Chi Tiết 2026', 'Lộ trình scale doanh nghiệp. Chiến lược cụ thể, case study thực tế.', ARRAY['scale doanh nghiệp', 'tăng trưởng doanh thu'], 13, 'published', NOW() - INTERVAL '15 days'),

('Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có', 'quan-ly-von-hieu-qua-7-ky-nang-can-co-khi-kinh-doanh-it-von', 'Kinh Doanh Vốn Nhỏ', 'Bí quyết quản lý vốn hiệu quả cho doanh nghiệp nhỏ.', '<h2>7 Kỹ Năng Quản Lý Vốn</h2><p>Từ ghi chép đến phân bổ ngân sách.</p>', 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop', 'Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có 2026', 'Bí quyết quản lý vốn. 7 kỹ năng tài chính, công cụ miễn phí.', ARRAY['quản lý vốn', 'tài chính doanh nghiệp'], 9, 'published', NOW() - INTERVAL '14 days'),

('Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu', 'case-study-5-nguoi-thanh-cong-voi-von-duoi-10-trieu', 'Kinh Doanh Vốn Nhỏ', 'Câu chuyện thực tế của 5 người khởi nghiệp thành công với vốn nhỏ.', '<h2>5 Case Study Thực Tế</h2><p>Chiến lược, con số cụ thể, bài học quý giá.</p>', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop', 'Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu', 'Câu chuyện thực tế. Chiến lược cụ thể, con số thật, bài học quý giá.', ARRAY['case study kinh doanh', 'success story'], 11, 'published', NOW() - INTERVAL '13 days'),

('Solo Business Là Gì? Hướng Dẫn Xây Dựng 2026', 'solo-business-la-gi-huong-dan-xay-dung-doanh-nghiep-mot-nguoi-2026', 'Solo Business', 'Tìm hiểu solo business là gì, ưu nhược điểm, cách xây dựng và phát triển.', '<h2>Solo Business Là Gì?</h2><p>Mô hình kinh doanh một người đang bùng nổ.</p>', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop', 'Solo Business Là Gì? Hướng Dẫn Xây Dựng 2026', 'Solo business là gì? Ưu nhược điểm, 10 mô hình phổ biến, lộ trình chi tiết.', ARRAY['solo business', 'kinh doanh một mình'], 10, 'published', NOW() - INTERVAL '12 days'),

('10 Công Cụ Bất Bại Cho Solo Business', '10-cong-cu-bat-bai-cho-solo-business-toi-uu-2026', 'Solo Business', 'Danh sách 10 công cụ không thể thiếu cho solo business.', '<h2>10 Công Cụ Thiết Yếu</h2><p>Từ quản lý dự án đến marketing, phần lớn miễn phí.</p>', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop', '10 Công Cụ Bất Bại Cho Solo Business 2026', 'Top 10 công cụ thiết yếu. Quản lý, marketing, tài chính. Phần lớn miễn phí.', ARRAY['công cụ solo business', 'tools freelancer'], 9, 'published', NOW() - INTERVAL '11 days'),

('Tự Động Hóa Solo Business: Làm Ít Kiếm Nhiều', 'tu-dong-hoa-solo-business-lam-it-hon-kiem-nhieu-hon-2026', 'Solo Business', 'Bí quyết tự động hóa solo business để tăng thu nhập mà giảm thời gian.', '<h2>Tự Động Hóa Là Chìa Khóa</h2><p>5 lĩnh vực cần tự động hóa ngay.</p>', 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop', 'Tự Động Hóa Solo Business: Làm Ít Kiếm Nhiều 2026', 'Bí quyết tự động hóa. Marketing, bán hàng, chăm sóc KH tự động.', ARRAY['tự động hóa kinh doanh', 'automation'], 11, 'published', NOW() - INTERVAL '10 days'),

('Từ 0 Đến 20 Triệu/Tháng Với Solo Business', 'tu-0-den-20-trieu-thang-voi-solo-business-lo-trinh-thuc-chien', 'Solo Business', 'Lộ trình cụ thể để đạt 20 triệu/tháng với solo business.', '<h2>Lộ Trình 6 Tháng</h2><p>Từ 0 đến 20 triệu với 3 mô hình hiệu quả.</p>', 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop', 'Từ 0 Đến 20 Triệu/Tháng Solo Business 2026', 'Lộ trình đạt 20 triệu/tháng. 3 mô hình hiệu quả, chiến lược cụ thể.', ARRAY['thu nhập solo business', 'kiếm tiền online'], 12, 'published', NOW() - INTERVAL '9 days'),

('Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z', 'kinh-doanh-ngach-la-gi-tim-hieu-tu-a-z-2026', 'Kinh Doanh Ngách', 'Giải thích chi tiết kinh doanh ngách là gì, ưu nhược điểm, cách tìm ngách.', '<h2>Kinh Doanh Ngách Là Gì?</h2><p>Tập trung vào phân khúc nhỏ với nhu cầu đặc thù.</p>', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=630&fit=crop', 'Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z 2026', 'Kinh doanh ngách là gì? Ưu nhược điểm, 10 ví dụ thực tế.', ARRAY['kinh doanh ngách', 'niche business'], 10, 'published', NOW() - INTERVAL '8 days'),

('7 Bước Tìm Ngách Kinh Doanh Lãi Cao', '7-buoc-tim-ngach-kinh-doanh-lai-cao-it-canh-tranh', 'Kinh Doanh Ngách', 'Phương pháp 7 bước để tìm ngách kinh doanh lãi cao, ít cạnh tranh.', '<h2>7 Bước Tìm Ngách</h2><p>Từ liệt kê sở thích đến validate ý tưởng.</p>', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop', '7 Bước Tìm Ngách Kinh Doanh Lãi Cao 2026', 'Phương pháp 7 bước. Công cụ nghiên cứu, phân tích đối thủ, validate.', ARRAY['tìm ngách kinh doanh', 'niche research'], 11, 'published', NOW() - INTERVAL '7 days'),

('Top 10 Ngách Kinh Doanh Bùng Nổ 2026', 'top-10-ngach-kinh-doanh-bung-no-2026-ma-chua-ai-nhan-ra', 'Kinh Doanh Ngách', 'Khám phá 10 ngách kinh doanh đang bùng nổ 2026 với tiềm năng lớn.', '<h2>10 Ngách Bùng Nổ</h2><p>Eco-friendly, pet care, plant-based và nhiều hơn.</p>', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop', 'Top 10 Ngách Kinh Doanh Bùng Nổ 2026', '10 ngách đang bùng nổ. Eco-friendly, pet care, AI consulting.', ARRAY['ngách kinh doanh 2026', 'xu hướng kinh doanh'], 10, 'published', NOW() - INTERVAL '6 days'),

('Kinh Doanh Ngách Online: Chiến Lược MXH', 'kinh-doanh-ngach-online-chien-luoc-bung-no-tren-mang-xa-hoi', 'Kinh Doanh Ngách', 'Chiến lược marketing ngách trên Facebook, TikTok, Instagram.', '<h2>Marketing Ngách Trên MXH</h2><p>Chiến lược cho từng nền tảng cụ thể.</p>', 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop', 'Kinh Doanh Ngách Online: Chiến Lược MXH 2026', 'Chiến lược marketing ngách. Facebook, TikTok, Instagram hiệu quả.', ARRAY['kinh doanh ngách online', 'marketing ngách'], 11, 'published', NOW() - INTERVAL '5 days'),

('7 Mindset Kinh Doanh Cần Có Để Thành Công', '7-mindset-kinh-doanh-can-co-de-thanh-cong-2026', 'Mindset & Tư Duy', 'Khám phá 7 tư duy quan trọng nhất của doanh nhân thành công.', '<h2>7 Mindset Quan Trọng</h2><p>Growth mindset, abundance, long-term thinking.</p>', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop', '7 Mindset Kinh Doanh Cần Có 2026', '7 tư duy quan trọng. Growth mindset, abundance. Cách rèn luyện.', ARRAY['mindset kinh doanh', 'tư duy doanh nhân'], 9, 'published', NOW() - INTERVAL '4 days'),

('Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh', 'vuot-qua-noi-so-that-bai-khi-kinh-doanh-von-nho', 'Mindset & Tư Duy', 'Cách vượt qua nỗi sợ thất bại - rào cản lớn nhất của người khởi nghiệp.', '<h2>Vượt Qua Nỗi Sợ</h2><p>5 bước cụ thể và kỹ thuật tâm lý hiệu quả.</p>', 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=630&fit=crop', 'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh 2026', 'Cách vượt qua sợ hãi. 5 bước cụ thể, kỹ thuật tâm lý.', ARRAY['vượt qua sợ hãi', 'fear of failure'], 8, 'published', NOW() - INTERVAL '3 days'),

('Top 10 Ebook Kinh Doanh Hay Nhất 2026', 'top-10-ebook-kinh-doanh-hay-nhat-2026-ban-phai-doc', 'Ebook & Học Tập', 'Danh sách 10 ebook kinh doanh hay nhất 2026 cho người khởi nghiệp.', '<h2>10 Ebook Hay Nhất</h2><p>Lean Startup, Zero to One, $100 Startup và nhiều hơn.</p>', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop', 'Top 10 Ebook Kinh Doanh Hay Nhất 2026', '10 ebook hay nhất. Lean Startup, Zero to One. Review chi tiết.', ARRAY['ebook kinh doanh', 'sách kinh doanh'], 11, 'published', NOW() - INTERVAL '2 days'),

('Xây Dựng Thói Quen Của Doanh Nhân Thành Công', 'xay-dung-thoi-quen-cua-doanh-nhan-thanh-cong-tu-von-nho', 'Mindset & Tư Duy', 'Thói quen hàng ngày của những doanh nhân thành công.', '<h2>10 Thói Quen Quan Trọng</h2><p>Dậy sớm, morning routine, time blocking và nhiều hơn.</p>', 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop', 'Thói Quen Doanh Nhân Thành Công 2026', '10 thói quen quan trọng. Morning routine, time blocking, learning.', ARRAY['thói quen doanh nhân', 'habits'], 10, 'published', NOW() - INTERVAL '1 day');

-- Hoàn tất!
SELECT 'Blog system setup complete! ' || COUNT(*)::text || ' posts created.' as result FROM blog_posts;
