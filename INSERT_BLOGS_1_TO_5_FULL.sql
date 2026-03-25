-- INSERT ĐẦY ĐỦ BÀI 1-5 - CHẠY TRÊN SUPABASE
-- Chạy script này sau khi đã có bài 6, 7, 8

-- Bài 1: 10 Mindset Kinh Doanh
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  '10 Mindset Kinh Doanh Cần Có Để Không Chỉ Sống Sót Mà Còn "Thắng" Trong 3 Năm Đầu',
  '10-mindset-kinh-doanh-can-co-de-khong-chi-song-sot-ma-con-thang-trong-3-nam-dau',
  'Mindset Kinh Doanh',
  'Hầu hết người mới khởi nghiệp thất bại không phải vì thiếu vốn, mà vì mang tư duy nhân viên vào làm chủ. Đây là 10 mindset kinh doanh thực chiến đã giúp hàng trăm người không chỉ "sống sót" mà còn thực sự "thắng" trong 3 năm đầu.',
  '<p>Bạn đang chuẩn bị bước chân vào kinh doanh? Hay bạn đã thử vài tháng, thậm chí vài năm, nhưng vẫn loay hoay giữa đủ thứ áp lực?</p><p>Tôi từng chứng kiến hàng trăm người mới khởi nghiệp. <strong>90% trong số họ thất bại không phải vì thiếu vốn, không phải vì thị trường cạnh tranh khốc liệt, mà đơn giản chỉ vì… họ mang tư duy của một nhân viên văn phòng vào làm chủ.</strong></p><h2>1. Mindset "Kinh Doanh Là Giải Quyết Vấn Đề Cho Người Khác"</h2><p>Hầu hết người mới nghĩ: "Tôi cần kiếm tiền → tôi bán cái gì đó". Sai lầm chết người.</p><p>Tư duy đúng là: "Người khác đang đau đầu với vấn đề gì → tôi giúp họ giải quyết → họ tự nguyện trả tiền".</p><h2>2. Tư Duy Dài Hạn vs Tư Duy "Nhanh Giàu"</h2><p>"Nhanh giàu" là từ khoá được search nhiều nhất trong nhóm người mới kinh doanh. Nhưng thực tế, <strong>3 năm đầu là giai đoạn bạn "trồng cây".</strong></p>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
  '10 Mindset Kinh Doanh Cần Có Để Thắng Trong 3 Năm Đầu | Ebook Mind',
  '10 mindset kinh doanh thực chiến giúp bạn không chỉ sống sót mà còn thắng trong 3 năm đầu.',
  ARRAY['mindset kinh doanh', 'tư duy doanh nhân', 'khởi nghiệp thành công'],
  15,
  'published',
  NOW() - INTERVAL '15 days'
);

-- Bài 2: 15 Năm Kinh Doanh
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  '15 Năm Kinh Doanh, Từ Thất Bại Nhiều Lần, Tôi Phát Hiện Ra 5 Sự Thật "Ngược Đời" Mà Không Ai Dám Nói Thẳng',
  '15-nam-kinh-doanh-tu-that-bai-nhieu-lan-toi-phat-hien-ra-5-su-that-nguoc-doi',
  'Kinh Nghiệm Kinh Doanh',
  'Sau 15 năm lăn lộn từ mất trắng 200 triệu đến xây dựng doanh nghiệp ổn định, tôi phát hiện 5 sự thật ngược đời mà không ai dám nói thẳng với người mới kinh doanh.',
  '<p>Năm 25 tuổi, tôi bỏ việc văn phòng ổn định, vay mượn thêm người thân, dồn hết 200 triệu vào một dự án "chắc thắng". Ba tháng sau, cửa hàng đóng cửa, tài khoản âm sạch, nợ nần chất đống.</p><h2>Sự Thật 1: Vốn Nhiều Không Phải Lợi Thế – Vốn Ít Mới Buộc Bạn Sáng Tạo</h2><p>Hầu hết mọi người nghĩ: "Có nhiều tiền thì dễ thành công hơn". Tôi cũng nghĩ vậy. Lần đầu tiên tôi có 200 triệu nên tôi làm lớn luôn: thuê mặt bằng đẹp, mua hàng tồn kho đầy kho, chạy quảng cáo rầm rộ. Kết quả? Tiền chảy ra như nước, khách không đến, hàng ế.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  '15 Năm Kinh Doanh - 5 Sự Thật Ngược Đời | Ebook Mind',
  '5 sự thật ngược đời trong kinh doanh sau 15 năm lăn lộn.',
  ARRAY['kinh nghiệm kinh doanh', 'sự thật kinh doanh'],
  12,
  'published',
  NOW() - INTERVAL '14 days'
);

-- Bài 3: Từ Nhân Viên Đến Chủ Doanh Nghiệp
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Từ Nhân Viên Văn Phòng Lương 12 Triệu Đến Chủ Doanh Nghiệp Thu 200 Triệu/Tháng: Hành Trình 4 Năm Không Như Mơ Nhưng Đáng Giá Từng Giây',
  'tu-nhan-vien-van-phong-luong-12-trieu-den-chu-doanh-nghiep-thu-200-trieu-thang',
  'Câu Chuyện Thành Công',
  'Hành trình từ nhân viên văn phòng lương 12 triệu đến chủ doanh nghiệp thu 200 triệu/tháng. 4 năm không như mơ nhưng đáng giá từng giây.',
  '<p>Tôi tên Minh, 32 tuổi. Hôm nay tôi ngồi trong quán cà phê nhỏ mà 4 năm trước tôi chỉ dám nhìn qua cửa kính vì giá đắt, gõ những dòng này với tâm trạng vừa tự hào vừa muốn khóc.</p><p>4 năm trước, tôi là nhân viên văn phòng lương 12 triệu. Hôm nay, tôi là chủ một doanh nghiệp nhỏ thu nhập ổn định 200 triệu/tháng.</p>',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
  'Từ Nhân Viên Đến Chủ Doanh Nghiệp | Ebook Mind',
  'Câu chuyện thành công từ nhân viên văn phòng đến chủ doanh nghiệp.',
  ARRAY['câu chuyện thành công', 'từ nhân viên đến chủ'],
  13,
  'published',
  NOW() - INTERVAL '13 days'
);

-- Bài 4: Kinh Doanh Online Không Cần Vốn
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero-Risk Ai Cũng Làm Được Năm 2026',
  'kinh-doanh-online-khong-can-von-5-mo-hinh-zero-risk-ai-cung-lam-duoc-nam-2026',
  'Kinh Doanh Online',
  'Kinh doanh online không cần vốn: 5 mô hình zero-risk ai cũng làm được năm 2026. Từ affiliate marketing đến bán khóa học online.',
  '<p>Bạn muốn kinh doanh online nhưng không có vốn? Bạn sợ rủi ro mất tiền? Bạn không biết bắt đầu từ đâu?</p><p>Năm 2026, kinh doanh online không cần vốn không còn là giấc mơ xa vời. Đây là 5 mô hình zero-risk ai cũng có thể làm được.</p><h2>Mô Hình 1: Affiliate Marketing</h2><p>Bán sản phẩm của người khác, nhận hoa hồng. Không cần vốn, không cần kho hàng, không cần ship.</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  'Kinh Doanh Online Không Cần Vốn 2026 | Ebook Mind',
  '5 mô hình kinh doanh online không cần vốn năm 2026.',
  ARRAY['kinh doanh online', 'không cần vốn', 'zero-risk'],
  11,
  'published',
  NOW() - INTERVAL '12 days'
);

-- Bài 5: Vượt Qua Nỗi Sợ Thất Bại
INSERT INTO public.blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh Vốn Nhỏ: Bài Học Từ Những Người Đã Thành Công',
  'vuot-qua-noi-so-that-bai-khi-kinh-doanh-von-nho-bai-hoc-tu-nhung-nguoi-da-thanh-cong',
  'Kinh Doanh Vốn Nhỏ',
  'Vượt qua nỗi sợ thất bại khi kinh doanh vốn nhỏ - bài học từ những người đã thành công. Cách đối mặt với nỗi sợ và biến nó thành động lực.',
  '<p>Nỗi sợ thất bại là rào cản lớn nhất của người mới kinh doanh. Đặc biệt khi bạn chỉ có vốn nhỏ, mỗi quyết định đều nặng nề.</p><p>Nhưng những người thành công đã vượt qua nỗi sợ đó như thế nào? Đây là bài học từ họ.</p><h2>Chấp Nhận Thất Bại Là Một Phần Của Hành Trình</h2><p>Thất bại không phải là kết thúc. Đó là bài học đắt giá nhất bạn có thể có.</p>',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
  'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh | Ebook Mind',
  'Cách vượt qua nỗi sợ thất bại khi kinh doanh vốn nhỏ.',
  ARRAY['vượt qua nỗi sợ', 'kinh doanh vốn nhỏ', 'thất bại'],
  10,
  'published',
  NOW() - INTERVAL '11 days'
);

-- Kiểm tra kết quả
SELECT COUNT(*) as total_posts FROM public.blog_posts WHERE status = 'published';
SELECT title, slug, category, published_at FROM public.blog_posts ORDER BY published_at DESC;
