#!/usr/bin/env python3
"""
Script to seed 20 SEO-optimized blog posts into Supabase
Run: python3 scripts/seed-20-blog-posts.py
"""

import os
from datetime import datetime, timedelta
from supabase import create_client, Client

# Supabase credentials
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL', 'https://ckohoqembjurgwxvvzcf.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 20 blog posts data
blog_posts = [
    # Posts 1-8: Kinh Doanh Vốn Nhỏ (already created in SQL)
    # Posts 9-12: Solo Business (already created in SQL)
    # Posts 13-16: Kinh Doanh Ngách
    
    # Post 14
    {
        'title': '7 Bước Tìm Ngách Kinh Doanh Lãi Cao Ít Cạnh Tranh',
        'slug': '7-buoc-tim-ngach-kinh-doanh-lai-cao',
        'category': 'Kinh Doanh Ngách',
        'excerpt': 'Phương pháp 7 bước để tìm ngách kinh doanh lãi cao, ít cạnh tranh. Công cụ nghiên cứu, cách phân tích và validate ý tưởng.',
        'content': '''<h2>Tại Sao Cần Tìm Ngách Đúng?</h2>
<p>Chọn đúng ngách = 50% thành công. Ngách tốt giúp bạn cạnh tranh ít, lợi nhuận cao và khách hàng trung thành.</p>

<h2>7 Bước Tìm Ngách Kinh Doanh</h2>

<h3>Bước 1: Liệt Kê Sở Thích và Kỹ Năng</h3>
<p>Viết ra 10-20 điều bạn thích làm và giỏi. Ví dụ: nấu ăn, chụp ảnh, viết lách, thiết kế...</p>

<h3>Bước 2: Nghiên Cứu Nhu Cầu Thị Trường</h3>
<p>Sử dụng Google Trends, Facebook Groups, Forums để tìm vấn đề mọi người đang gặp.</p>

<h3>Bước 3: Phân Tích Đối Thủ</h3>
<p>Tìm 5-10 đối thủ trong ngách. Xem họ làm gì tốt, chưa tốt ở đâu.</p>

<h3>Bước 4: Xác Định Khách Hàng Mục Tiêu</h3>
<p>Tạo customer persona chi tiết: tuổi, nghề nghiệp, thu nhập, vấn đề, mong muốn.</p>

<h3>Bước 5: Tính Toán Tiềm Năng Lợi Nhuận</h3>
<p>Ước tính: Số khách hàng tiềm năng × Giá bán × Tỷ lệ chuyển đổi</p>

<h3>Bước 6: Test Với Nhóm Nhỏ</h3>
<p>Tạo MVP (sản phẩm tối thiểu), bán cho 10-20 người đầu tiên, thu thập feedback.</p>

<h3>Bước 7: Validate và Mở Rộng</h3>
<p>Nếu có ít nhất 30% khách hàng test sẵn sàng mua lại, ngách có tiềm năng.</p>

<h2>Công Cụ Nghiên Cứu Ngách</h2>
<ul>
<li><strong>Google Trends:</strong> Xem xu hướng tìm kiếm</li>
<li><strong>Facebook Audience Insights:</strong> Phân tích đối tượng</li>
<li><strong>Amazon Best Sellers:</strong> Xem sản phẩm bán chạy</li>
<li><strong>Reddit/Quora:</strong> Tìm vấn đề thực tế</li>
</ul>

<h2>5 Dấu Hiệu Ngách Tốt</h2>
<ol>
<li>Có nhu cầu rõ ràng (search volume 1000+/tháng)</li>
<li>Cạnh tranh vừa phải (không quá đông, không quá vắng)</li>
<li>Khách hàng sẵn sàng trả tiền</li>
<li>Bạn có kiến thức/đam mê về lĩnh vực</li>
<li>Có thể mở rộng sau này</li>
</ol>''',
        'featured_image': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
        'meta_title': '7 Bước Tìm Ngách Kinh Doanh Lãi Cao 2026 | Ebook Mind',
        'meta_description': 'Phương pháp 7 bước tìm ngách kinh doanh lãi cao, ít cạnh tranh. Công cụ nghiên cứu, phân tích đối thủ, validate ý tưởng.',
        'keywords': ['tìm ngách kinh doanh', 'niche research', 'phân tích thị trường', 'chọn ngách'],
        'read_time': 11,
        'published_at': (datetime.now() - timedelta(days=7)).isoformat()
    },
    
    # Post 15
    {
        'title': 'Top 10 Ngách Kinh Doanh Bùng Nổ 2026 Mà Chưa Ai Nhận Ra',
        'slug': 'top-10-ngach-kinh-doanh-bung-no-2026',
        'category': 'Kinh Doanh Ngách',
        'excerpt': 'Khám phá 10 ngách kinh doanh đang bùng nổ 2026 với tiềm năng lớn nhưng ít người biết. Cơ hội vàng cho người khởi nghiệp.',
        'content': '''<h2>10 Ngách Đang Bùng Nổ 2026</h2>

<h3>1. Sản Phẩm Eco-Friendly Cho Gen Z</h3>
<p>Thị trường xanh tăng 60% năm 2026. Túi vải, ống hút tre, bàn chải tre có nhu cầu cao.</p>

<h3>2. Dịch Vụ Chăm Sóc Thú Cưng Cao Cấp</h3>
<p>Pet grooming, pet hotel, pet photography. Thị trường 500 tỷ/năm tại VN.</p>

<h3>3. Đồ Ăn Plant-Based</h3>
<p>Thịt chay, sữa hạt, bánh vegan. Tăng trưởng 45%/năm.</p>

<h3>4. Dịch Vụ Tư Vấn AI Cho Doanh Nghiệp Nhỏ</h3>
<p>Giúp SME áp dụng AI, chatbot, automation. Giá 10-50 triệu/dự án.</p>

<h3>5. Sản Phẩm Cho Người Cao Tuổi</h3>
<p>VN đang già hóa dân số. Đồ dùng, thực phẩm, dịch vụ cho người già có nhu cầu lớn.</p>

<h3>6. Đồ Handmade Cá Nhân Hóa Cao Cấp</h3>
<p>Quà tặng custom, trang sức khắc tên, album ảnh handmade. Lợi nhuận 60-80%.</p>

<h3>7. Dịch Vụ Tổ Chức Sự Kiện Nhỏ</h3>
<p>Tiệc sinh nhật, baby shower, bridal shower tại nhà. 5-15 triệu/sự kiện.</p>

<h3>8. Đồ Nội Thất Tái Chế</h3>
<p>Tân trang đồ cũ thành đồ mới. Xu hướng vintage, retro đang lên.</p>

<h3>9. Khóa Học Kỹ Năng Mềm Online</h3>
<p>Giao tiếp, leadership, time management cho dân văn phòng. 500k-2 triệu/khóa.</p>

<h3>10. Dịch Vụ Meal Prep Healthy</h3>
<p>Chuẩn bị sẵn bữa ăn healthy cho cả tuần. 800k-1.5 triệu/tuần/người.</p>

<h2>Cách Đánh Giá Ngách Có Tiềm Năng</h2>
<ul>
<li>Search volume tăng đều qua các năm</li>
<li>Ít đối thủ lớn thống trị</li>
<li>Khách hàng sẵn sàng trả giá cao</li>
<li>Có community/group lớn</li>
</ul>''',
        'featured_image': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
        'meta_title': 'Top 10 Ngách Kinh Doanh Bùng Nổ 2026 | Ebook Mind',
        'meta_description': '10 ngách kinh doanh đang bùng nổ 2026 với tiềm năng lớn. Eco-friendly, pet care, plant-based, AI consulting và nhiều hơn.',
        'keywords': ['ngách kinh doanh 2026', 'xu hướng kinh doanh', 'ý tưởng mới', 'cơ hội kinh doanh'],
        'read_time': 10,
        'published_at': (datetime.now() - timedelta(days=6)).isoformat()
    },
    
    # Post 16
    {
        'title': 'Kinh Doanh Ngách Online: Chiến Lược Bùng Nổ Trên Mạng Xã Hội',
        'slug': 'kinh-doanh-ngach-online-chien-luoc-mxh',
        'category': 'Kinh Doanh Ngách',
        'excerpt': 'Chiến lược marketing ngách trên Facebook, TikTok, Instagram. Cách tìm khách hàng, tạo nội dung và bán hàng hiệu quả.',
        'content': '''<h2>Tại Sao Ngách Phù Hợp Với Online?</h2>
<p>Marketing online cho phép target chính xác đối tượng nhỏ với chi phí thấp. Đây là lợi thế lớn của kinh doanh ngách.</p>

<h2>Chiến Lược Marketing Ngách Trên Từng Nền Tảng</h2>

<h3>Facebook: Xây Dựng Community</h3>
<p><strong>Bước 1: Tạo Group riêng</strong></p>
<ul>
<li>Tên group cụ thể: "Mẹ Bỉm Sữa Ăn Chay Sài Gòn"</li>
<li>Chia sẻ giá trị trước khi bán hàng</li>
<li>Tổ chức mini game, Q&A</li>
</ul>

<p><strong>Bước 2: Facebook Ads Targeting</strong></p>
<ul>
<li>Detailed targeting: sở thích, hành vi cụ thể</li>
<li>Lookalike audience từ khách hàng hiện tại</li>
<li>Retargeting người đã tương tác</li>
</ul>

<h3>TikTok: Viral Content</h3>
<p><strong>Content Ideas:</strong></p>
<ul>
<li>Behind the scenes sản xuất</li>
<li>Before/After transformation</li>
<li>Tips & tricks liên quan ngách</li>
<li>Customer testimonials</li>
</ul>

<h3>Instagram: Visual Storytelling</h3>
<ul>
<li>Feed đẹp, nhất quán về màu sắc</li>
<li>Stories hàng ngày để tương tác</li>
<li>Reels về use case sản phẩm</li>
<li>Collaborate với micro-influencers</li>
</ul>

<h2>Content Strategy Cho Ngách</h2>

<p><strong>Quy tắc 80-20:</strong></p>
<ul>
<li>80% nội dung giá trị (tips, education, entertainment)</li>
<li>20% nội dung bán hàng</li>
</ul>

<p><strong>Content Pillars:</strong></p>
<ol>
<li>Educational: Hướng dẫn, tips</li>
<li>Inspirational: Success stories, quotes</li>
<li>Entertaining: Memes, challenges</li>
<li>Promotional: Sản phẩm, ưu đãi</li>
</ol>

<h2>Cách Tìm Khách Hàng Ngách</h2>
<ul>
<li>Join groups/forums liên quan</li>
<li>Comment trên posts của influencers</li>
<li>Chạy ads với targeting hẹp</li>
<li>Collaborate với brands bổ sung</li>
<li>SEO cho long-tail keywords</li>
</ul>''',
        'featured_image': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=630&fit=crop',
        'meta_title': 'Kinh Doanh Ngách Online: Chiến Lược MXH 2026 | Ebook Mind',
        'meta_description': 'Chiến lược marketing ngách trên Facebook, TikTok, Instagram. Tìm khách hàng, tạo content, bán hàng hiệu quả.',
        'keywords': ['kinh doanh ngách online', 'marketing ngách', 'social commerce', 'bán hàng mạng xã hội'],
        'read_time': 11,
        'published_at': (datetime.now() - timedelta(days=5)).isoformat()
    },
    
    # Posts 17-20: Mindset & Kỹ Năng
    
    # Post 17
    {
        'title': '7 Mindset Kinh Doanh Cần Có Để Thành Công 2026',
        'slug': '7-mindset-kinh-doanh-can-co',
        'category': 'Mindset & Tư Duy',
        'excerpt': 'Khám phá 7 tư duy quan trọng nhất của doanh nhân thành công. Cách rèn luyện mindset và áp dụng vào thực tế.',
        'content': '''<h2>Tại Sao Mindset Quan Trọng Hơn Kỹ Năng?</h2>
<p>Kỹ năng có thể học, nhưng mindset quyết định bạn có kiên trì đủ lâu để thành công hay không.</p>

<h2>7 Mindset Cần Có</h2>

<h3>1. Growth Mindset - Tư Duy Phát Triển</h3>
<p>Tin rằng mọi thứ đều có thể học và cải thiện. Thất bại là cơ hội học hỏi, không phải dấu hiệu bạn không phù hợp.</p>

<h3>2. Abundance Mindset - Tư Duy Dồi Dào</h3>
<p>Tin rằng có đủ cơ hội cho tất cả mọi người. Không ganh tị với thành công của người khác mà học hỏi từ họ.</p>

<h3>3. Long-term Thinking - Tư Duy Dài Hạn</h3>
<p>Tập trung vào mục tiêu 5-10 năm, không chỉ lợi nhuận ngắn hạn. Đầu tư vào xây dựng thương hiệu, không chỉ bán hàng.</p>

<h3>4. Customer-Centric - Tư Duy Khách Hàng Là Trung Tâm</h3>
<p>Mọi quyết định đều xuất phát từ lợi ích khách hàng. Giải quyết vấn đề thực sự, không chỉ bán sản phẩm.</p>

<h3>5. Ownership Mindset - Tư Duy Chủ Động</h3>
<p>Chịu trách nhiệm 100% cho kết quả. Không đổ lỗi cho hoàn cảnh, thị trường hay đối thủ.</p>

<h3>6. Continuous Learning - Học Hỏi Liên Tục</h3>
<p>Đọc sách, tham gia khóa học, networking. Dành 10% thu nhập cho phát triển bản thân.</p>

<h3>7. Resilience - Kiên Cường</h3>
<p>Chấp nhận thất bại là phần của hành trình. Đứng dậy nhanh hơn sau mỗi lần vấp ngã.</p>

<h2>Cách Rèn Luyện Mindset</h2>
<ul>
<li>Đọc sách về mindset 30 phút/ngày</li>
<li>Journaling mỗi tối</li>
<li>Meditation 10 phút/ngày</li>
<li>Kết nối với người cùng tư duy</li>
<li>Tham gia mastermind groups</li>
</ul>''',
        'featured_image': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=630&fit=crop',
        'meta_title': '7 Mindset Kinh Doanh Cần Có 2026 | Ebook Mind',
        'meta_description': '7 tư duy quan trọng của doanh nhân thành công. Growth mindset, abundance, long-term thinking. Cách rèn luyện cụ thể.',
        'keywords': ['mindset kinh doanh', 'tư duy doanh nhân', 'growth mindset', 'tư duy thành công'],
        'read_time': 9,
        'published_at': (datetime.now() - timedelta(days=4)).isoformat()
    },
    
    # Post 18
    {
        'title': 'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh Vốn Nhỏ',
        'slug': 'vuot-qua-noi-so-that-bai-kinh-doanh',
        'category': 'Mindset & Tư Duy',
        'excerpt': 'Cách vượt qua nỗi sợ thất bại - rào cản lớn nhất của người khởi nghiệp. Kỹ thuật tâm lý và bài tập thực hành.',
        'content': '''<h2>Nỗi Sợ Thất Bại Là Gì?</h2>
<p>Nỗi sợ thất bại (fear of failure) là lo lắng về những hậu quả tiêu cực nếu không thành công: mất tiền, mất mặt, bị đánh giá.</p>

<h2>Tại Sao Chúng Ta Sợ Thất Bại?</h2>
<ul>
<li><strong>Văn hóa xã hội:</strong> Thất bại bị coi là xấu hổ</li>
<li><strong>Áp lực gia đình:</strong> Kỳ vọng phải thành công</li>
<li><strong>So sánh với người khác:</strong> Thấy người khác thành công</li>
<li><strong>Perfectionism:</strong> Muốn mọi thứ hoàn hảo</li>
</ul>

<h2>5 Bước Vượt Qua Nỗi Sợ</h2>

<h3>Bước 1: Nhận Diện Nỗi Sợ</h3>
<p>Viết ra cụ thể bạn sợ điều gì: Mất 5 triệu? Bị bạn bè chê cười? Thất vọng bản thân?</p>

<h3>Bước 2: Worst Case Scenario</h3>
<p>Tưởng tượng tình huống tệ nhất có thể xảy ra. Thường thì không tệ như bạn nghĩ.</p>

<h3>Bước 3: Reframe Thất Bại</h3>
<p>Thất bại = Feedback, không phải Final. Mỗi lần thất bại là một bài học quý giá.</p>

<h3>Bước 4: Start Small</h3>
<p>Bắt đầu với vốn nhỏ (3-5 triệu) để giảm rủi ro. Test ý tưởng với nhóm nhỏ trước.</p>

<h3>Bước 5: Celebrate Small Wins</h3>
<p>Ăn mừng mỗi milestone nhỏ: bán được đơn đầu tiên, có khách hàng review tốt...</p>

<h2>Kỹ Thuật Tâm Lý</h2>

<p><strong>1. Visualization:</strong> Tưởng tượng bản thân thành công mỗi ngày 5 phút</p>
<p><strong>2. Affirmations:</strong> Nhắc nhở bản thân "Tôi có thể làm được"</p>
<p><strong>3. Growth Mindset:</strong> Thay "Tôi không thể" bằng "Tôi chưa biết cách"</p>

<h2>Câu Chuyện Thất Bại Của Những Người Thành Công</h2>
<ul>
<li><strong>Steve Jobs:</strong> Bị đuổi khỏi Apple, quay lại và tạo nên iPhone</li>
<li><strong>Jack Ma:</strong> Bị từ chối 30 lần, giờ là tỷ phú</li>
<li><strong>Colonel Sanders:</strong> Bị từ chối 1009 lần trước khi KFC thành công</li>
</ul>''',
        'featured_image': 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=630&fit=crop',
        'meta_title': 'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh 2026 | Ebook Mind',
        'meta_description': 'Cách vượt qua nỗi sợ thất bại khi khởi nghiệp. 5 bước cụ thể, kỹ thuật tâm lý, câu chuyện truyền cảm hứng.',
        'keywords': ['vượt qua sợ hãi', 'fear of failure', 'tâm lý khởi nghiệp', 'mindset'],
        'read_time': 8,
        'published_at': (datetime.now() - timedelta(days=3)).isoformat()
    },
    
    # Post 19
    {
        'title': 'Top 10 Ebook Kinh Doanh Hay Nhất 2026 Bạn Phải Đọc',
        'slug': 'top-10-ebook-kinh-doanh-hay-nhat-2026',
        'category': 'Ebook & Học Tập',
        'excerpt': 'Danh sách 10 ebook kinh doanh hay nhất 2026 cho người khởi nghiệp. Từ mindset, chiến lược đến thực hành cụ thể.',
        'content': '''<h2>Tại Sao Nên Đọc Ebook Kinh Doanh?</h2>
<p>Ebook giúp bạn học từ kinh nghiệm của người đi trước, tiết kiệm thời gian và tiền bạc từ việc mắc sai lầm.</p>

<h2>Top 10 Ebook Kinh Doanh 2026</h2>

<h3>1. "The Lean Startup" - Eric Ries</h3>
<p><strong>Nội dung:</strong> Phương pháp khởi nghiệp tinh gọn, test nhanh, học nhanh</p>
<p><strong>Phù hợp:</strong> Người mới bắt đầu, vốn nhỏ</p>
<p><strong>Bài học:</strong> Build-Measure-Learn, MVP, pivot</p>

<h3>2. "Zero to One" - Peter Thiel</h3>
<p><strong>Nội dung:</strong> Tạo ra điều mới thay vì cạnh tranh</p>
<p><strong>Phù hợp:</strong> Người muốn tạo breakthrough</p>

<h3>3. "$100 Startup" - Chris Guillebeau</h3>
<p><strong>Nội dung:</strong> Khởi nghiệp với vốn dưới $100</p>
<p><strong>Phù hợp:</strong> Người ít vốn, muốn bắt đầu ngay</p>

<h3>4. "The 4-Hour Workweek" - Tim Ferriss</h3>
<p><strong>Nội dung:</strong> Tự động hóa, outsourcing, lifestyle design</p>
<p><strong>Phù hợp:</strong> Solo business, digital nomad</p>

<h3>5. "Traction" - Gabriel Weinberg</h3>
<p><strong>Nội dung:</strong> 19 kênh marketing để tăng trưởng</p>
<p><strong>Phù hợp:</strong> Người cần khách hàng nhanh</p>

<h3>6. "The E-Myth Revisited" - Michael Gerber</h3>
<p><strong>Nội dung:</strong> Xây dựng hệ thống, không làm việc trong business</p>
<p><strong>Phù hợp:</strong> Chủ doanh nghiệp nhỏ</p>

<h3>7. "Start With Why" - Simon Sinek</h3>
<p><strong>Nội dung:</strong> Tìm mục đích sâu xa của business</p>
<p><strong>Phù hợp:</strong> Người cần động lực, vision</p>

<h3>8. "Atomic Habits" - James Clear</h3>
<p><strong>Nội dung:</strong> Xây dựng thói quen tốt cho thành công</p>
<p><strong>Phù hợp:</strong> Mọi doanh nhân</p>

<h3>9. "Crushing It!" - Gary Vaynerchuk</h3>
<p><strong>Nội dung:</strong> Xây dựng personal brand trên social media</p>
<p><strong>Phù hợp:</strong> Content creators, influencers</p>

<h3>10. "The Mom Test" - Rob Fitzpatrick</h3>
<p><strong>Nội dung:</strong> Cách hỏi khách hàng đúng cách</p>
<p><strong>Phù hợp:</strong> Người đang validate ý tưởng</p>

<h2>Cách Đọc Ebook Hiệu Quả</h2>
<ul>
<li>Đọc 30 phút mỗi ngày</li>
<li>Ghi chú những điểm quan trọng</li>
<li>Áp dụng ngay 1-2 ý tưởng</li>
<li>Chia sẻ với người khác để nhớ lâu</li>
</ul>''',
        'featured_image': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&h=630&fit=crop',
        'meta_title': 'Top 10 Ebook Kinh Doanh Hay Nhất 2026 | Ebook Mind',
        'meta_description': '10 ebook kinh doanh hay nhất 2026. Lean Startup, Zero to One, $100 Startup. Review chi tiết, phù hợp với ai.',
        'keywords': ['ebook kinh doanh', 'sách kinh doanh', 'business books', 'sách hay'],
        'read_time': 11,
        'published_at': (datetime.now() - timedelta(days=2)).isoformat()
    },
    
    # Post 20
    {
        'title': 'Xây Dựng Thói Quen Của Doanh Nhân Thành Công Từ Vốn Nhỏ',
        'slug': 'xay-dung-thoi-quen-doanh-nhan-thanh-cong',
        'category': 'Mindset & Tư Duy',
        'excerpt': 'Thói quen hàng ngày của những doanh nhân thành công. Cách xây dựng routine hiệu quả cho người kinh doanh vốn nhỏ.',
        'content': '''<h2>Thói Quen Quyết Định Thành Công</h2>
<p>Bạn là tổng hợp của những gì bạn làm hàng ngày. Thói quen tốt = Thành công dài hạn.</p>

<h2>10 Thói Quen Của Doanh Nhân Thành Công</h2>

<h3>1. Dậy Sớm (5-6h Sáng)</h3>
<p>Có thời gian yên tĩnh để lập kế hoạch, học hỏi trước khi bắt đầu ngày.</p>

<h3>2. Morning Routine Cố Định</h3>
<p>Ví dụ: Meditation 10 phút → Tập thể dục 20 phút → Đọc sách 30 phút → Lập kế hoạch ngày</p>

<h3>3. Ưu Tiên 3 Việc Quan Trọng Nhất</h3>
<p>Mỗi ngày chỉ focus vào 3 việc tạo impact lớn nhất. Hoàn thành trước 12h trưa.</p>

<h3>4. Time Blocking</h3>
<p>Chia ngày thành các khối thời gian cụ thể cho từng công việc. Không multitasking.</p>

<h3>5. Đọc Sách/Học Hỏi Mỗi Ngày</h3>
<p>30-60 phút đọc sách, nghe podcast, xem video học tập.</p>

<h3>6. Networking Đều Đặn</h3>
<p>Gặp gỡ 1-2 người mới mỗi tuần. Tham gia events, workshops.</p>

<h3>7. Review Cuối Ngày</h3>
<p>Đánh giá ngày hôm nay: Làm được gì? Học được gì? Cải thiện gì ngày mai?</p>

<h3>8. Tập Thể Dục Đều Đặn</h3>
<p>30 phút/ngày. Cơ thể khỏe → Đầu óc minh mẫn → Quyết định tốt hơn.</p>

<h3>9. Ngủ Đủ Giấc (7-8 Tiếng)</h3>
<p>Không hy sinh giấc ngủ để làm việc. Ngủ đủ giúp năng suất cao hơn.</p>

<h3>10. Gratitude Journal</h3>
<p>Viết 3 điều biết ơn mỗi tối. Giúp mindset tích cực, giảm stress.</p>

<h2>Cách Xây Dựng Thói Quen Mới</h2>

<p><strong>Quy tắc 21/90:</strong></p>
<ul>
<li>21 ngày để tạo thói quen</li>
<li>90 ngày để thói quen trở thành tự nhiên</li>
</ul>

<p><strong>Habit Stacking:</strong></p>
<p>Gắn thói quen mới vào thói quen cũ. Ví dụ: "Sau khi đánh răng, tôi sẽ meditation 5 phút"</p>

<p><strong>Start Small:</strong></p>
<p>Bắt đầu với 5 phút/ngày, tăng dần. Đừng quá tham vọng ban đầu.</p>

<h2>Routine Mẫu Cho Doanh Nhân Vốn Nhỏ</h2>

<p><strong>5:30 - 6:00:</strong> Dậy, uống nước, meditation</p>
<p><strong>6:00 - 6:30:</strong> Tập thể dục</p>
<p><strong>6:30 - 7:00:</strong> Đọc sách</p>
<p><strong>7:00 - 8:00:</strong> Ăn sáng, lập kế hoạch ngày</p>
<p><strong>8:00 - 12:00:</strong> Deep work - 3 việc quan trọng nhất</p>
<p><strong>12:00 - 13:00:</strong> Ăn trưa, nghỉ ngơi</p>
<p><strong>13:00 - 17:00:</strong> Meetings, emails, admin tasks</p>
<p><strong>17:00 - 18:00:</strong> Học hỏi, networking</p>
<p><strong>18:00 - 21:00:</strong> Thời gian cá nhân, gia đình</p>
<p><strong>21:00 - 22:00:</strong> Review ngày, gratitude journal</p>
<p><strong>22:00:</strong> Đi ngủ</p>''',
        'featured_image': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
        'meta_title': 'Thói Quen Doanh Nhân Thành Công 2026 | Ebook Mind',
        'meta_description': '10 thói quen của doanh nhân thành công. Morning routine, time blocking, learning. Cách xây dựng thói quen mới hiệu quả.',
        'keywords': ['thói quen doanh nhân', 'habits', 'morning routine', 'productivity'],
        'read_time': 10,
        'published_at': (datetime.now() - timedelta(days=1)).isoformat()
    }
]

def seed_posts():
    """Seed all blog posts to Supabase"""
    try:
        for i, post in enumerate(blog_posts, start=14):
            print(f"Seeding post {i}/20: {post['title']}")
            
            data = {
                'title': post['title'],
                'slug': post['slug'],
                'category': post['category'],
                'excerpt': post['excerpt'],
                'content': post['content'],
                'featured_image': post['featured_image'],
                'meta_title': post['meta_title'],
                'meta_description': post['meta_description'],
                'keywords': post['keywords'],
                'read_time': post['read_time'],
                'status': 'published',
                'published_at': post['published_at']
            }
            
            result = supabase.table('blog_posts').insert(data).execute()
            print(f"✓ Seeded: {post['title']}")
        
        print("\n✅ Successfully seeded all blog posts!")
        
    except Exception as e:
        print(f"\n❌ Error seeding posts: {str(e)}")

if __name__ == '__main__':
    print("Starting to seed 20 blog posts...")
    seed_posts()
