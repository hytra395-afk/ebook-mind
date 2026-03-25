-- INSERT BLOG POSTS #3, #4, #5
-- Chạy trong Supabase SQL Editor

-- Bài 3: Từ Nhân Viên Văn Phòng Đến Chủ Doanh Nghiệp
INSERT INTO public.blog_posts (
  title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at
) VALUES (
  'Từ Nhân Viên Văn Phòng Lương 12 Triệu Đến Chủ Doanh Nghiệp Thu 200 Triệu/Tháng: Hành Trình 4 Năm Không Như Mơ Nhưng Đáng Giá Từng Giây',
  'tu-nhan-vien-van-phong-luong-12-trieu-den-chu-doanh-nghiep-thu-200-trieu-thang',
  'Câu Chuyện Thành Công',
  'Hành trình từ nhân viên văn phòng lương 12 triệu đến chủ doanh nghiệp thu 200 triệu/tháng. 4 năm không như mơ nhưng đáng giá từng giây.',
  '<p>Tôi tên Minh, 32 tuổi. Hôm nay tôi ngồi trong quán cà phê nhỏ mà 4 năm trước tôi chỉ dám nhìn qua cửa kính vì giá đắt, gõ những dòng này với tâm trạng vừa tự hào vừa muốn khóc.</p><p>4 năm trước, tôi là nhân viên văn phòng lương 12 triệu. Hôm nay, tôi là chủ một doanh nghiệp nhỏ thu nhập ổn định 200 triệu/tháng.</p><p>Nhưng con đường từ 12 triệu đến 200 triệu không phải màu hồng như bạn nghĩ. Đó là 4 năm đầy nước mắt, thất bại, nghi ngờ bản thân và những quyết định khó khăn nhất đời tôi.</p><p>Hôm nay tôi viết bài này không phải để khoe khoang. Tôi viết để chia sẻ với bạn – người đang ngồi trong văn phòng, nhìn ra ngoài cửa sổ và tự hỏi: "Liệu mình có thể?"</p><p>Câu trả lời là: <strong>Có. Nhưng không dễ. Và đây là những gì tôi ước mình biết từ ngày đầu.</strong></p>',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=630&fit=crop',
  'Từ Nhân Viên Đến Chủ Doanh Nghiệp | Ebook Mind',
  'Câu chuyện thành công từ nhân viên văn phòng đến chủ doanh nghiệp.',
  ARRAY['câu chuyện thành công', 'từ nhân viên đến chủ', 'kinh doanh thành công'],
  13,
  'published',
  NOW() - INTERVAL '13 days'
);

-- Bài 4: Kinh Doanh Online Không Cần Vốn
INSERT INTO public.blog_posts (
  title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at
) VALUES (
  'Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero-Risk Ai Cũng Làm Được Năm 2026',
  'kinh-doanh-online-khong-can-von-5-mo-hinh-zero-risk-ai-cung-lam-duoc-nam-2026',
  'Kinh Doanh Online',
  'Kinh doanh online không cần vốn: 5 mô hình zero-risk ai cũng làm được năm 2026. Từ affiliate marketing đến bán khóa học online.',
  '<p>Bạn muốn kinh doanh online nhưng không có vốn? Bạn sợ rủi ro mất tiền? Bạn không biết bắt đầu từ đâu?</p><p>Năm 2026, kinh doanh online không cần vốn không còn là giấc mơ xa vời. Đây là 5 mô hình zero-risk ai cũng có thể làm được.</p><h2>Mô Hình 1: Affiliate Marketing</h2><p>Bán sản phẩm của người khác, nhận hoa hồng. Không cần vốn, không cần kho hàng, không cần ship.</p><p>Bạn chỉ cần: một trang web hoặc kênh social media, tham gia chương trình affiliate của các thương hiệu lớn, chia sẻ link sản phẩm và nhận hoa hồng khi có người mua.</p><h2>Mô Hình 2: Dropshipping</h2><p>Bán hàng mà không cần tồn kho. Khi có đơn, bạn mới đặt hàng từ nhà cung cấp và họ ship thẳng cho khách.</p><h2>Mô Hình 3: Bán Khóa Học Online</h2><p>Nếu bạn giỏi một kỹ năng nào đó, hãy dạy người khác. Tạo khóa học một lần, bán mãi mãi.</p><h2>Mô Hình 4: Content Creator</h2><p>Tạo nội dung trên YouTube, TikTok, Blog và kiếm tiền từ quảng cáo, sponsorship.</p><h2>Mô Hình 5: Freelancing</h2><p>Bán kỹ năng của bạn: viết content, thiết kế, lập trình, marketing... Làm việc từ xa, nhận tiền qua chuyển khoản.</p>',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
  'Kinh Doanh Online Không Cần Vốn 2026 | Ebook Mind',
  '5 mô hình kinh doanh online không cần vốn năm 2026.',
  ARRAY['kinh doanh online', 'không cần vốn', 'zero-risk', 'affiliate marketing'],
  11,
  'published',
  NOW() - INTERVAL '12 days'
);

-- Bài 5: Vượt Qua Nỗi Sợ Thất Bại
INSERT INTO public.blog_posts (
  title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at
) VALUES (
  'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh Vốn Nhỏ: Bài Học Từ Những Người Đã Thành Công',
  'vuot-qua-noi-so-that-bai-khi-kinh-doanh-von-nho-bai-hoc-tu-nhung-nguoi-da-thanh-cong',
  'Kinh Doanh Vốn Nhỏ',
  'Vượt qua nỗi sợ thất bại khi kinh doanh vốn nhỏ - bài học từ những người đã thành công. Cách đối mặt với nỗi sợ và biến nó thành động lực.',
  '<p>Nỗi sợ thất bại là rào cản lớn nhất của người mới kinh doanh. Đặc biệt khi bạn chỉ có vốn nhỏ, mỗi quyết định đều nặng nề.</p><p>Nhưng những người thành công đã vượt qua nỗi sợ đó như thế nào? Đây là bài học từ họ.</p><h2>Chấp Nhận Thất Bại Là Một Phần Của Hành Trình</h2><p>Thất bại không phải là kết thúc. Đó là bài học đắt giá nhất bạn có thể có.</p><p>Mỗi lần thất bại, bạn học được một điều mới. Bạn biết cách nào không hiệu quả. Bạn trở nên mạnh mẽ hơn.</p><h2>Bắt Đầu Nhỏ Để Giảm Rủi Ro</h2><p>Đừng đổ hết vốn vào một dự án lớn. Hãy test nhỏ trước, học hỏi, rồi mở rộng dần.</p><p>Khi bạn bắt đầu nhỏ, thất bại cũng nhỏ. Bạn có thể đứng dậy nhanh hơn.</p><h2>Tìm Mentor Và Cộng Đồng</h2><p>Đừng đi một mình. Tìm người đã đi trước, học hỏi từ họ. Tham gia cộng đồng kinh doanh để được hỗ trợ.</p><h2>Ghi Chép Và Phản Tư</h2><p>Mỗi lần thất bại, hãy ghi lại: Tôi sai ở đâu? Lần sau tôi sẽ làm gì khác?</p><p>Việc ghi chép giúp bạn học nhanh hơn và không lặp lại sai lầm.</p><h2>Kết Luận</h2><p>Nỗi sợ thất bại là bình thường. Nhưng đừng để nó ngăn cản bạn. Hãy chấp nhận, học hỏi và tiếp tục.</p>',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=630&fit=crop',
  'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh | Ebook Mind',
  'Cách vượt qua nỗi sợ thất bại khi kinh doanh vốn nhỏ.',
  ARRAY['vượt qua nỗi sợ', 'kinh doanh vốn nhỏ', 'thất bại', 'mindset'],
  10,
  'published',
  NOW() - INTERVAL '11 days'
);

-- Kiểm tra kết quả
SELECT COUNT(*) as total_posts FROM public.blog_posts WHERE status = 'published';
SELECT title, slug, category, published_at FROM public.blog_posts ORDER BY published_at DESC;
