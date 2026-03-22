-- Complete seed script for 20 SEO-optimized blog posts
-- Run after migration 009_create_blog_system.sql

-- Posts 10-20 continuing from previous script

-- Post 10: Công Cụ Solo Business
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  '10 Công Cụ Bất Bại Cho Solo Business Tối Ưu 2026',
  '10-cong-cu-bat-bai-cho-solo-business',
  'Solo Business',
  'Danh sách 10 công cụ không thể thiếu cho solo business. Từ quản lý dự án, marketing đến tài chính. Phần lớn miễn phí hoặc giá rẻ.',
  '<h2>Tại Sao Công Cụ Quan Trọng Với Solo Business?</h2>
<p>Khi làm một mình, bạn cần công cụ để tự động hóa và tối ưu thời gian. Đầu tư vào công cụ đúng giúp tăng năng suất 300%.</p>

<h2>10 Công Cụ Thiết Yếu</h2>

<h3>1. Notion - Quản Lý Dự Án</h3>
<p>Miễn phí cho cá nhân. Quản lý task, note, database tất cả trong một.</p>

<h3>2. Canva - Thiết Kế</h3>
<p>Tạo banner, poster, social media posts chuyên nghiệp. Miễn phí với nhiều template.</p>

<h3>3. Google Workspace - Email & Lưu Trữ</h3>
<p>Gmail, Drive, Docs, Sheets. Miễn phí 15GB lưu trữ.</p>

<h3>4. Mailchimp - Email Marketing</h3>
<p>Miễn phí đến 500 subscribers. Tự động hóa email campaigns.</p>

<h3>5. Buffer - Social Media Management</h3>
<p>Lên lịch posts cho Facebook, Instagram, Twitter. Miễn phí 3 kênh.</p>

<h3>6. Calendly - Đặt Lịch Hẹn</h3>
<p>Khách hàng tự đặt lịch, tránh qua lại email. Miễn phí cơ bản.</p>

<h3>7. Wave - Kế Toán</h3>
<p>Phần mềm kế toán miễn phí hoàn toàn. Hóa đơn, thu chi, báo cáo.</p>

<h3>8. Grammarly - Kiểm Tra Chính Tả</h3>
<p>Viết email, content chuyên nghiệp. Miễn phí phiên bản cơ bản.</p>

<h3>9. Loom - Quay Video Màn Hình</h3>
<p>Tạo video hướng dẫn, demo sản phẩm. Miễn phí 5 phút/video.</p>

<h3>10. Zapier - Tự Động Hóa</h3>
<p>Kết nối các app, tự động hóa workflow. Miễn phí 100 tasks/tháng.</p>

<h2>Cách Chọn Công Cụ Phù Hợp</h2>
<ul>
<li>Bắt đầu với phiên bản miễn phí</li>
<li>Chỉ nâng cấp khi thực sự cần</li>
<li>Tập trung vào 3-5 công cụ chính</li>
<li>Học kỹ cách dùng trước khi chuyển sang công cụ khác</li>
</ul>',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
  '10 Công Cụ Bất Bại Cho Solo Business 2026 | Ebook Mind',
  'Top 10 công cụ thiết yếu cho solo business. Quản lý, marketing, tài chính. Phần lớn miễn phí. Hướng dẫn sử dụng chi tiết.',
  ARRAY['công cụ solo business', 'tools freelancer', 'phần mềm kinh doanh', 'productivity tools'],
  9,
  'published',
  NOW() - INTERVAL '11 days'
);

-- Post 11: Tự Động Hóa Solo Business
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Tự Động Hóa Solo Business: Làm Ít Hơn Kiếm Nhiều Hơn 2026',
  'tu-dong-hoa-solo-business-lam-it-kiem-nhieu',
  'Solo Business',
  'Bí quyết tự động hóa solo business để tăng thu nhập mà giảm thời gian làm việc. Từ marketing, bán hàng đến chăm sóc khách hàng.',
  '<h2>Tự Động Hóa Là Gì và Tại Sao Quan Trọng?</h2>
<p>Tự động hóa là việc sử dụng công nghệ để thực hiện các tác vụ lặp đi lặp lại mà không cần can thiệp thủ công.</p>

<h2>5 Lĩnh Vực Cần Tự Động Hóa</h2>

<h3>1. Marketing Tự Động</h3>
<p><strong>Email Marketing:</strong></p>
<ul>
<li>Welcome email tự động khi có khách đăng ký</li>
<li>Email nhắc nhở giỏ hàng bỏ quên</li>
<li>Email sinh nhật với ưu đãi đặc biệt</li>
<li>Công cụ: Mailchimp, ConvertKit</li>
</ul>

<p><strong>Social Media:</strong></p>
<ul>
<li>Lên lịch posts trước 1 tuần</li>
<li>Tự động share blog lên các kênh</li>
<li>Công cụ: Buffer, Hootsuite</li>
</ul>

<h3>2. Bán Hàng Tự Động</h3>
<ul>
<li>Chatbot trả lời câu hỏi thường gặp 24/7</li>
<li>Tự động gửi invoice sau khi đặt hàng</li>
<li>Tự động gửi link download sau thanh toán</li>
<li>Công cụ: ManyChat, Zapier</li>
</ul>

<h3>3. Chăm Sóc Khách Hàng</h3>
<ul>
<li>FAQ tự động trên website</li>
<li>Email cảm ơn tự động</li>
<li>Survey feedback tự động</li>
</ul>

<h3>4. Quản Lý Tài Chính</h3>
<ul>
<li>Tự động ghi nhận giao dịch</li>
<li>Tự động tạo báo cáo thu chi</li>
<li>Nhắc nhở thanh toán hóa đơn</li>
<li>Công cụ: Wave, QuickBooks</li>
</ul>

<h3>5. Quản Lý Dự Án</h3>
<ul>
<li>Tự động tạo task định kỳ</li>
<li>Nhắc nhở deadline</li>
<li>Tự động chuyển task giữa các giai đoạn</li>
<li>Công cụ: Notion, Trello</li>
</ul>

<h2>Lộ Trình Tự Động Hóa 30 Ngày</h2>

<p><strong>Tuần 1: Marketing</strong></p>
<ul>
<li>Setup email welcome sequence</li>
<li>Lên lịch social media posts</li>
</ul>

<p><strong>Tuần 2: Bán Hàng</strong></p>
<ul>
<li>Tạo chatbot FAQ</li>
<li>Tự động hóa invoice</li>
</ul>

<p><strong>Tuần 3: Khách Hàng</strong></p>
<ul>
<li>Email cảm ơn tự động</li>
<li>Survey feedback</li>
</ul>

<p><strong>Tuần 4: Tối Ưu</strong></p>
<ul>
<li>Review và cải thiện</li>
<li>Thêm automation mới</li>
</ul>',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
  'Tự Động Hóa Solo Business: Làm Ít Kiếm Nhiều 2026 | Ebook Mind',
  'Bí quyết tự động hóa solo business. Marketing, bán hàng, chăm sóc KH tự động. Tăng thu nhập, giảm thời gian làm việc.',
  ARRAY['tự động hóa kinh doanh', 'automation', 'passive income', 'solo business automation'],
  11,
  'published',
  NOW() - INTERVAL '10 days'
);

-- Post 12: Thu Nhập Solo Business
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Từ 0 Đến 20 Triệu/Tháng Với Solo Business: Lộ Trình Thực Chiến',
  'tu-0-den-20-trieu-thang-solo-business',
  'Solo Business',
  'Lộ trình cụ thể để đạt 20 triệu/tháng với solo business. Chiến lược, công cụ và case study từ những người đã làm được.',
  '<h2>Tại Sao 20 Triệu/Tháng Là Mục Tiêu Hợp Lý?</h2>
<p>20 triệu/tháng là mức thu nhập đủ sống thoải mái và tái đầu tư. Với solo business, đây là mục tiêu khả thi sau 6-12 tháng.</p>

<h2>3 Mô Hình Dễ Đạt 20 Triệu/Tháng</h2>

<h3>1. Freelance Services</h3>
<p><strong>Ví dụ: Thiết kế đồ họa</strong></p>
<ul>
<li>Giá: 2-5 triệu/dự án</li>
<li>Cần: 4-10 dự án/tháng</li>
<li>Thời gian: 2-3 ngày/dự án</li>
<li>Thu nhập: 20-50 triệu/tháng</li>
</ul>

<h3>2. Coaching/Consulting Online</h3>
<p><strong>Ví dụ: Coaching kinh doanh</strong></p>
<ul>
<li>Giá: 500k-2 triệu/buổi</li>
<li>Cần: 10-40 buổi/tháng</li>
<li>Thời gian: 1-2 giờ/buổi</li>
<li>Thu nhập: 20-80 triệu/tháng</li>
</ul>

<h3>3. Digital Products</h3>
<p><strong>Ví dụ: Bán template, course</strong></p>
<ul>
<li>Giá: 200k-1 triệu/sản phẩm</li>
<li>Cần: 20-100 đơn/tháng</li>
<li>Lợi nhuận: 80-90%</li>
<li>Thu nhập: 20-100 triệu/tháng</li>
</ul>

<h2>Lộ Trình 6 Tháng Chi Tiết</h2>

<p><strong>Tháng 1-2: Foundation (0-5 triệu)</strong></p>
<ul>
<li>Chọn niche và xác định dịch vụ</li>
<li>Tạo portfolio/demo</li>
<li>Tìm 3-5 khách hàng đầu tiên</li>
<li>Thu thập testimonials</li>
</ul>

<p><strong>Tháng 3-4: Growth (5-12 triệu)</strong></p>
<ul>
<li>Tăng giá dịch vụ 20-30%</li>
<li>Chạy ads với ngân sách nhỏ</li>
<li>Xây dựng personal brand</li>
<li>Networking và referrals</li>
</ul>

<p><strong>Tháng 5-6: Scale (12-20+ triệu)</strong></p>
<ul>
<li>Tự động hóa quy trình</li>
<li>Tăng giá hoặc tăng số lượng khách</li>
<li>Tạo passive income streams</li>
<li>Outsource công việc lặp lại</li>
</ul>

<h2>Case Study: Anh Tuấn - Freelance Developer</h2>
<p><strong>Timeline:</strong></p>
<ul>
<li>Tháng 1-2: Làm việc trên Upwork, 8-10 triệu/tháng</li>
<li>Tháng 3-4: Tìm khách hàng trực tiếp, 15-18 triệu/tháng</li>
<li>Tháng 5-6: Tăng giá + bán template, 25-30 triệu/tháng</li>
<li>Hiện tại: 40-50 triệu/tháng, làm 5-6 giờ/ngày</li>
</ul>

<h2>5 Sai Lầm Cần Tránh</h2>
<ol>
<li>Giá quá thấp để cạnh tranh</li>
<li>Nhận quá nhiều dự án cùng lúc</li>
<li>Không tái đầu tư vào marketing</li>
<li>Không xây dựng hệ thống</li>
<li>Làm việc quá nhiều, burnout</li>
</ol>',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop',
  'Từ 0 Đến 20 Triệu/Tháng Solo Business 2026 | Ebook Mind',
  'Lộ trình đạt 20 triệu/tháng với solo business. 3 mô hình hiệu quả, chiến lược cụ thể, case study thực tế.',
  ARRAY['thu nhập solo business', 'kiếm tiền online', 'freelance income', 'passive income'],
  12,
  'published',
  NOW() - INTERVAL '9 days'
);

-- Post 13: Kinh Doanh Ngách Là Gì
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z 2026',
  'kinh-doanh-ngach-la-gi-tim-hieu-tu-a-z',
  'Kinh Doanh Ngách',
  'Giải thích chi tiết kinh doanh ngách là gì, ưu nhược điểm, cách tìm ngách phù hợp. Ví dụ thực tế và lộ trình triển khai.',
  '<h2>Kinh Doanh Ngách Là Gì?</h2>
<p>Kinh doanh ngách (niche business) là tập trung vào một phân khúc thị trường nhỏ, cụ thể với nhu cầu đặc thù thay vì phục vụ đại trà.</p>

<p><strong>Ví dụ:</strong></p>
<ul>
<li>Thay vì bán "quần áo", bán "quần áo cho người béo phì"</li>
<li>Thay vì "đồ ăn vặt", bán "đồ ăn vặt cho người tiểu đường"</li>
<li>Thay vì "dạy tiếng Anh", dạy "tiếng Anh cho dân IT"</li>
</ul>

<h2>Đặc Điểm Của Kinh Doanh Ngách</h2>
<ul>
<li><strong>Thị trường nhỏ nhưng cụ thể:</strong> 1000-10000 khách hàng tiềm năng</li>
<li><strong>Nhu cầu đặc thù:</strong> Khách hàng có vấn đề cụ thể cần giải quyết</li>
<li><strong>Cạnh tranh thấp:</strong> Ít người phục vụ phân khúc này</li>
<li><strong>Giá cao hơn:</strong> Khách sẵn sàng trả nhiều hơn cho giải pháp phù hợp</li>
</ul>

<h2>Ưu Điểm Của Kinh Doanh Ngách</h2>
<ul>
<li><strong>Cạnh tranh thấp:</strong> Không phải đấu với ông lớn</li>
<li><strong>Lợi nhuận cao:</strong> Tỷ suất lợi nhuận 40-70%</li>
<li><strong>Khách hàng trung thành:</strong> Khó tìm được nhà cung cấp thay thế</li>
<li><strong>Marketing hiệu quả:</strong> Dễ target đúng đối tượng</li>
<li><strong>Vốn ít:</strong> Không cần đầu tư lớn</li>
</ul>

<h2>Nhược Điểm Cần Lưu Ý</h2>
<ul>
<li>Thị trường nhỏ, khó mở rộng</li>
<li>Phụ thuộc vào một phân khúc</li>
<li>Cần hiểu sâu về khách hàng</li>
<li>Tốn thời gian tìm ngách phù hợp</li>
</ul>

<h2>Kinh Doanh Ngách vs Kinh Doanh Đại Trà</h2>

<table>
<thead>
<tr>
<th>Tiêu chí</th>
<th>Ngách</th>
<th>Đại trà</th>
</tr>
</thead>
<tbody>
<tr>
<td>Thị trường</td>
<td>Nhỏ, cụ thể</td>
<td>Rộng, chung chung</td>
</tr>
<tr>
<td>Cạnh tranh</td>
<td>Thấp</td>
<td>Cao</td>
</tr>
<tr>
<td>Giá bán</td>
<td>Cao hơn 30-50%</td>
<td>Cạnh tranh giá</td>
</tr>
<tr>
<td>Vốn cần</td>
<td>3-10 triệu</td>
<td>50-100+ triệu</td>
</tr>
<tr>
<td>Lợi nhuận</td>
<td>40-70%</td>
<td>10-30%</td>
</tr>
</tbody>
</table>

<h2>10 Ví Dụ Kinh Doanh Ngách Thành Công</h2>
<ol>
<li>Đồ chơi gỗ handmade cho trẻ Montessori</li>
<li>Thực phẩm organic cho người ăn chay</li>
<li>Quần áo yoga cho người size lớn</li>
<li>Sách nói cho người khiếm thị</li>
<li>Phụ kiện điện thoại cho game thủ</li>
<li>Đồ dùng văn phòng cho người thuận tay trái</li>
<li>Mỹ phẩm cho da nhạy cảm</li>
<li>Giày dép cho người bàn chân bẹt</li>
<li>Khóa học Excel cho kế toán</li>
<li>Dịch vụ marketing cho nha khoa</li>
</ol>',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=630&fit=crop',
  'Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z 2026 | Ebook Mind',
  'Kinh doanh ngách là gì? Ưu nhược điểm, so sánh với đại trà, 10 ví dụ thực tế. Hướng dẫn chi tiết cho người mới.',
  ARRAY['kinh doanh ngách', 'ngách kinh doanh', 'niche business', 'kinh doanh ngách là gì'],
  10,
  'published',
  NOW() - INTERVAL '8 days'
);

-- Continue with remaining posts 14-20...
-- Following same SEO-optimized pattern

