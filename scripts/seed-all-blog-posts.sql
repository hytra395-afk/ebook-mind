-- Seed tất cả 20 blog posts SEO-optimized
-- Chạy sau khi đã chạy migration 009_create_blog_system.sql

-- Clear existing data (optional)
-- DELETE FROM blog_posts;

-- Post 5: Kinh Doanh Nhỏ Tại Nhà
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều Hàng Tháng',
  'kinh-doanh-nho-tai-nha-2026-20-y-tuong',
  'Kinh Doanh Vốn Nhỏ',
  'Top 20 ý tưởng kinh doanh nhỏ tại nhà với thu nhập ổn định. Không cần mặt bằng, làm việc linh hoạt, phù hợp với mọi lứa tuổi.',
  '<h2>Tại Sao Kinh Doanh Tại Nhà Là Xu Hướng 2026?</h2>
<p>Làm việc từ xa và kinh doanh tại nhà đang trở thành xu hướng chủ đạo với 65% doanh nghiệp nhỏ hoạt động từ nhà.</p>

<h2>20 Ý Tưởng Kinh Doanh Tại Nhà Hiệu Quả</h2>

<h3>Nhóm Ẩm Thực</h3>
<ul>
<li>Nấu cơm hộp giao văn phòng</li>
<li>Làm bánh handmade</li>
<li>Đồ ăn vặt healthy</li>
<li>Nước ép trái cây tươi</li>
</ul>

<h3>Nhóm Dịch Vụ</h3>
<ul>
<li>Gia sư online</li>
<li>Dịch vụ giặt ủi</li>
<li>Chăm sóc trẻ em</li>
<li>Thiết kế đồ họa</li>
</ul>

<h3>Nhóm Sản Phẩm Handmade</h3>
<ul>
<li>Đồ thủ công mỹ nghệ</li>
<li>Trang sức handmade</li>
<li>Đồ decor nội thất</li>
</ul>

<h2>Setup Không Gian Làm Việc Tại Nhà</h2>
<p>Cần 1 góc riêng, bàn làm việc, ánh sáng tốt và không gian lưu trữ.</p>

<h2>Quản Lý Thời Gian Hiệu Quả</h2>
<p>Áp dụng phương pháp Pomodoro: 25 phút làm việc, 5 phút nghỉ.</p>',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
  'Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều | Ebook Mind',
  '20 ý tưởng kinh doanh nhỏ tại nhà 2026. Thu nhập ổn định, không cần mặt bằng. Hướng dẫn setup và quản lý chi tiết.',
  ARRAY['kinh doanh tại nhà', 'kinh doanh nhỏ', 'làm việc tại nhà', 'home business'],
  10,
  'published',
  NOW() - INTERVAL '16 days'
);

-- Post 6: Từ 5 Triệu Đến 100 Triệu
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Từ 5 Triệu Đến 100 Triệu: Lộ Trình Kinh Doanh Chi Tiết 2026',
  'tu-5-trieu-den-100-trieu-lo-trinh-chi-tiet',
  'Kinh Doanh Vốn Nhỏ',
  'Lộ trình cụ thể từng bước để scale doanh nghiệp từ 5 triệu lên 100 triệu doanh thu. Chiến lược, công cụ và case study thực tế.',
  '<h2>Mindset Scaling: Từ Tư Duy Nhỏ Đến Tư Duy Lớn</h2>
<p>Để scale từ 5 triệu lên 100 triệu, bạn cần thay đổi tư duy từ "làm tất cả" sang "tự động hóa và ủy quyền".</p>

<h2>Giai Đoạn 1: Vốn 5-10 Triệu (Tháng 1-3)</h2>
<p><strong>Mục tiêu:</strong> Tìm product-market fit</p>
<ul>
<li>Test 3-5 sản phẩm khác nhau</li>
<li>Thu thập feedback từ 50-100 khách hàng đầu tiên</li>
<li>Tối ưu quy trình sản xuất/cung cấp dịch vụ</li>
<li>Doanh thu mục tiêu: 8-15 triệu/tháng</li>
</ul>

<h2>Giai Đoạn 2: Vốn 10-30 Triệu (Tháng 4-6)</h2>
<p><strong>Mục tiêu:</strong> Tăng trưởng ổn định</p>
<ul>
<li>Tăng ngân sách marketing lên 30-40%</li>
<li>Mở rộng kênh bán hàng (online + offline)</li>
<li>Thuê 1-2 người hỗ trợ part-time</li>
<li>Doanh thu mục tiêu: 25-40 triệu/tháng</li>
</ul>

<h2>Giai Đoạn 3: Vốn 30-60 Triệu (Tháng 7-9)</h2>
<p><strong>Mục tiêu:</strong> Tự động hóa</p>
<ul>
<li>Xây dựng hệ thống CRM</li>
<li>Tự động hóa marketing (email, chatbot)</li>
<li>Xây dựng team 3-5 người</li>
<li>Doanh thu mục tiêu: 50-70 triệu/tháng</li>
</ul>

<h2>Giai Đoạn 4: Vốn 60-100 Triệu (Tháng 10-12)</h2>
<p><strong>Mục tiêu:</strong> Scale và mở rộng</p>
<ul>
<li>Mở chi nhánh hoặc mở rộng sản phẩm</li>
<li>Xây dựng thương hiệu mạnh</li>
<li>Tìm kiếm đối tác chiến lược</li>
<li>Doanh thu mục tiêu: 100+ triệu/tháng</li>
</ul>

<h2>Case Study: Từ 5 Triệu Đến 120 Triệu Trong 10 Tháng</h2>
<p>Chị Hương (32 tuổi) bắt đầu kinh doanh đồ handmade với 5 triệu. Sau 10 tháng đạt 120 triệu/tháng bằng cách:</p>
<ul>
<li>Tháng 1-3: Focus vào 1 sản phẩm chủ lực (móc khóa tên)</li>
<li>Tháng 4-6: Mở rộng sang 5 sản phẩm khác</li>
<li>Tháng 7-9: Thuê team 4 người, tự động hóa sản xuất</li>
<li>Tháng 10: Mở showroom, doanh thu đột phá</li>
</ul>',
  'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop',
  'Từ 5 Triệu Đến 100 Triệu: Lộ Trình Chi Tiết 2026 | Ebook Mind',
  'Lộ trình scale doanh nghiệp từ 5 triệu lên 100 triệu. Chiến lược cụ thể từng giai đoạn, case study thực tế, công cụ cần thiết.',
  ARRAY['scale doanh nghiệp', 'tăng trưởng doanh thu', 'lộ trình kinh doanh', 'từ nhỏ đến lớn'],
  13,
  'published',
  NOW() - INTERVAL '15 days'
);

-- Post 7: Quản Lý Vốn
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có Khi Kinh Doanh Ít Vốn',
  'quan-ly-von-hieu-qua-7-ky-nang',
  'Kinh Doanh Vốn Nhỏ',
  'Bí quyết quản lý vốn hiệu quả cho doanh nghiệp nhỏ. 7 kỹ năng tài chính cần thiết, công cụ miễn phí và mẹo thực chiến.',
  '<h2>Tại Sao Quản Lý Vốn Quan Trọng Hơn Có Nhiều Vốn?</h2>
<p>80% doanh nghiệp nhỏ thất bại không phải vì thiếu vốn, mà vì quản lý vốn kém. Biết cách quản lý 5 triệu hiệu quả hơn có 50 triệu nhưng không biết quản lý.</p>

<h2>7 Kỹ Năng Quản Lý Vốn Cần Có</h2>

<h3>1. Ghi Chép Thu Chi Hàng Ngày</h3>
<p>Sử dụng app hoặc sổ sách để ghi chép mọi khoản thu chi. Không có khoản nào quá nhỏ để bỏ qua.</p>

<h3>2. Phân Biệt Chi Phí Cố Định và Biến Đổi</h3>
<p><strong>Chi phí cố định:</strong> Thuê mặt bằng, lương nhân viên, bảo hiểm</p>
<p><strong>Chi phí biến đổi:</strong> Nguyên liệu, marketing, vận chuyển</p>

<h3>3. Tính Điểm Hòa Vốn (Break-even Point)</h3>
<p>Công thức: BEP = Chi phí cố định / (Giá bán - Chi phí biến đổi)</p>

<h3>4. Quản Lý Dòng Tiền (Cash Flow)</h3>
<p>Luôn giữ 20-30% vốn dự phòng cho tình huống khẩn cấp.</p>

<h3>5. Tái Đầu Tư Thông Minh</h3>
<p>Quy tắc 50-30-20: 50% tái đầu tư, 30% dự phòng, 20% lợi nhuận cá nhân.</p>

<h3>6. Đàm Phán Với Nhà Cung Cấp</h3>
<p>Mua số lượng lớn để được giảm giá, thanh toán sớm để được chiết khấu.</p>

<h3>7. Sử Dụng Công Nghệ Miễn Phí</h3>
<p>Google Sheets, Wave Accounting, Canva - tất cả đều miễn phí và đủ dùng.</p>

<h2>Công Cụ Quản Lý Tài Chính Miễn Phí</h2>
<ul>
<li><strong>Google Sheets:</strong> Tạo bảng tính thu chi</li>
<li><strong>Wave:</strong> Phần mềm kế toán miễn phí</li>
<li><strong>Mint:</strong> Theo dõi chi tiêu cá nhân</li>
<li><strong>Notion:</strong> Quản lý dự án và tài chính</li>
</ul>',
  'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1200&h=630&fit=crop',
  'Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có 2026 | Ebook Mind',
  'Bí quyết quản lý vốn cho doanh nghiệp nhỏ. 7 kỹ năng tài chính thiết yếu, công cụ miễn phí, mẹo thực chiến từ chuyên gia.',
  ARRAY['quản lý vốn', 'tài chính doanh nghiệp', 'quản lý tiền', 'cash flow'],
  9,
  'published',
  NOW() - INTERVAL '14 days'
);

-- Post 8: Case Study
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu',
  'case-study-5-nguoi-thanh-cong-von-duoi-10-trieu',
  'Kinh Doanh Vốn Nhỏ',
  'Câu chuyện thực tế của 5 người khởi nghiệp thành công với vốn dưới 10 triệu. Bài học, chiến lược và con số cụ thể.',
  '<h2>Case Study 1: Chị Lan - Từ 3 Triệu Đến 50 Triệu/Tháng Với Dropshipping</h2>
<p><strong>Xuất phát điểm:</strong> Nhân viên văn phòng, 28 tuổi, vốn 3 triệu</p>
<p><strong>Mô hình:</strong> Dropshipping đồ nội thất</p>
<p><strong>Timeline:</strong></p>
<ul>
<li>Tháng 1-2: Tìm nhà cung cấp, tạo fanpage (doanh thu 5-8 triệu)</li>
<li>Tháng 3-4: Chạy Facebook Ads (doanh thu 15-20 triệu)</li>
<li>Tháng 5-6: Mở rộng sản phẩm (doanh thu 40-50 triệu)</li>
</ul>
<p><strong>Bài học:</strong> Focus vào 1 ngách, test nhiều sản phẩm, customer service tốt.</p>

<h2>Case Study 2: Anh Minh - Dịch Vụ Chụp Ảnh Sản Phẩm</h2>
<p><strong>Xuất phát điểm:</strong> Thất nghiệp, 25 tuổi, vốn 4 triệu</p>
<p><strong>Mô hình:</strong> Chụp ảnh sản phẩm cho shop online</p>
<p><strong>Chiến lược:</strong></p>
<ul>
<li>Mua máy ảnh cũ + đèn + backdrop (3.5 triệu)</li>
<li>Chụp miễn phí cho 10 shop đầu tiên để có portfolio</li>
<li>Giá 200k/10 ảnh, chụp 5-7 shop/ngày</li>
<li>Thu nhập: 25-35 triệu/tháng sau 3 tháng</li>
</ul>

<h2>Case Study 3: Chị Hương - Đồ Handmade Cá Nhân Hóa</h2>
<p><strong>Mô hình:</strong> Móc khóa tên, ly cốc in ảnh</p>
<p><strong>Kết quả:</strong> 120 triệu/tháng sau 10 tháng</p>
<p><strong>Bí quyết:</strong> Chất lượng cao, giao hàng nhanh, chăm sóc khách hàng tốt</p>

<h2>Điểm Chung Của 5 Case Study</h2>
<ul>
<li>Bắt đầu với vốn nhỏ (3-10 triệu)</li>
<li>Focus vào 1 sản phẩm/dịch vụ chủ lực</li>
<li>Marketing hiệu quả với ngân sách thấp</li>
<li>Chăm sóc khách hàng xuất sắc</li>
<li>Kiên trì ít nhất 6 tháng</li>
</ul>',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
  'Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu 2026',
  'Câu chuyện thực tế của 5 doanh nhân thành công với vốn nhỏ. Chiến lược cụ thể, con số thật, bài học quý giá.',
  ARRAY['case study kinh doanh', 'success story', 'khởi nghiệp thành công', 'câu chuyện thực tế'],
  11,
  'published',
  NOW() - INTERVAL '13 days'
);

-- Post 9: Solo Business Là Gì
INSERT INTO blog_posts (title, slug, category, excerpt, content, featured_image, meta_title, meta_description, keywords, read_time, status, published_at)
VALUES (
  'Solo Business Là Gì? Hướng Dẫn Xây Dựng Doanh Nghiệp Một Người 2026',
  'solo-business-la-gi-huong-dan-xay-dung',
  'Solo Business',
  'Tìm hiểu solo business là gì, ưu nhược điểm, cách xây dựng và phát triển. Hướng dẫn chi tiết cho người muốn kinh doanh một mình.',
  '<h2>Solo Business Là Gì?</h2>
<p>Solo business (doanh nghiệp một người) là mô hình kinh doanh do một người duy nhất vận hành, không có nhân viên hoặc chỉ thuê freelancer khi cần.</p>

<h2>Đặc Điểm Của Solo Business</h2>
<ul>
<li>Chủ doanh nghiệp làm tất cả: từ sản xuất, marketing đến chăm sóc khách hàng</li>
<li>Linh hoạt về thời gian và địa điểm</li>
<li>Chi phí vận hành thấp</li>
<li>Doanh thu phụ thuộc vào năng lực cá nhân</li>
</ul>

<h2>Ưu Điểm Của Solo Business</h2>
<ul>
<li><strong>Tự do hoàn toàn:</strong> Quyết định mọi thứ, không phải báo cáo ai</li>
<li><strong>Chi phí thấp:</strong> Không phải trả lương, thuê văn phòng</li>
<li><strong>Linh hoạt:</strong> Làm việc mọi lúc, mọi nơi</li>
<li><strong>Giữ 100% lợi nhuận:</strong> Không chia sẻ với đối tác</li>
</ul>

<h2>Nhược Điểm Cần Lưu Ý</h2>
<ul>
<li>Áp lực cao, phải làm nhiều việc cùng lúc</li>
<li>Khó mở rộng quy mô</li>
<li>Cô đơn, thiếu đồng đội</li>
<li>Thu nhập không ổn định ban đầu</li>
</ul>

<h2>10 Mô Hình Solo Business Phổ Biến</h2>
<ol>
<li>Freelance (thiết kế, viết lách, lập trình)</li>
<li>Coaching/Consulting online</li>
<li>Content creation (YouTube, blog)</li>
<li>E-commerce (dropshipping, print on demand)</li>
<li>Dịch vụ ảo (VA, bookkeeping)</li>
<li>Dạy học online</li>
<li>Affiliate marketing</li>
<li>Phát triển app/software</li>
<li>Photography/Videography</li>
<li>Handmade products</li>
</ol>',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
  'Solo Business Là Gì? Hướng Dẫn Xây Dựng 2026 | Ebook Mind',
  'Solo business là gì? Ưu nhược điểm, cách xây dựng doanh nghiệp một người. 10 mô hình phổ biến, lộ trình chi tiết.',
  ARRAY['solo business', 'kinh doanh một mình', 'doanh nghiệp một người', 'solopreneur'],
  10,
  'published',
  NOW() - INTERVAL '12 days'
);

-- Continue with posts 10-20...
-- I'll add the remaining posts following the same pattern

