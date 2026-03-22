const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ckohoqembjurgwxvvzcf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrb2hvcWVtYmp1cmd3eHZ2emNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIyMjgwNCwiZXhwIjoyMDgxNzk4ODA0fQ.NRT890aHVK5oJ_2PsW7bcY1b-0Sc2dU40eGNLP6L9Yo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedPosts() {
  console.log('Seeding 20 blog posts...\n')
  
  const posts = [
    {
      title: 'Kinh Doanh Vốn Nhỏ 2026: Top 15 Ý Tưởng Lãi 300% Từ 5 Triệu',
      slug: 'kinh-doanh-von-nho-2026-top-15-y-tuong',
      category: 'Kinh Doanh Vốn Nhỏ',
      excerpt: 'Khám phá 15 ý tưởng kinh doanh vốn nhỏ đang bùng nổ 2026 với lợi nhuận lên đến 300%. Hướng dẫn chi tiết từ A-Z, phù hợp với người mới bắt đầu chỉ từ 5 triệu đồng.',
      content: '<h2>Tại Sao 2026 Là Thời Điểm Vàng Để Bắt Đầu Kinh Doanh Vốn Nhỏ?</h2><p>Năm 2026 đang chứng kiến sự bùng nổ của các mô hình kinh doanh tinh gọn và linh hoạt. Theo báo cáo của Bộ Kế hoạch và Đầu tư, 2 tháng đầu năm 2026 có gần 64,500 doanh nghiệp thành lập mới và quay trở lại hoạt động, tăng 29.4% so với cùng kỳ năm trước.</p><h2>15 Ý Tưởng Kinh Doanh Vốn Nhỏ Đang Bùng Nổ 2026</h2><h3>1. Dropshipping và Affiliate Marketing</h3><p>Mô hình không cần tồn kho với lợi nhuận 200-300%. Vốn khởi điểm chỉ 2-5 triệu cho marketing và website.</p><h3>2. Bán Đồ Ăn Vặt Healthy Online</h3><p>Xu hướng ăn uống lành mạnh đang lên ngôi. Tỷ suất lợi nhuận 40-60% với vốn 2-5 triệu.</p><h3>3. Dịch Vụ Livestream Bán Hàng Thuê</h3><p>Cung cấp dịch vụ livestream với giá 300k-1 triệu/buổi. Vốn cần 3-5 triệu cho thiết bị.</p><p>...và 12 ý tưởng khác với hướng dẫn chi tiết trong bài viết đầy đủ.</p><h2>Lộ Trình Từ 5 Triệu Đến 50 Triệu Trong 6 Tháng</h2><p><strong>Tháng 1-2:</strong> Test sản phẩm, mục tiêu 8-12 triệu/tháng</p><p><strong>Tháng 3-4:</strong> Mở rộng marketing, mục tiêu 20-30 triệu/tháng</p><p><strong>Tháng 5-6:</strong> Scale up, mục tiêu 40-50 triệu/tháng</p>',
      featured_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
      meta_title: 'Kinh Doanh Vốn Nhỏ 2026: 15 Ý Tưởng Lãi 300% Từ 5 Triệu | Ebook Mind',
      meta_description: 'Top 15 ý tưởng kinh doanh vốn nhỏ 2026 lãi cao. Hướng dẫn chi tiết từ A-Z, case study thực tế. Bắt đầu từ 5 triệu, lợi nhuận 200-300%. Đọc ngay!',
      keywords: ['kinh doanh vốn nhỏ 2026', 'vốn nhỏ kinh doanh gì', 'ít vốn kinh doanh gì', 'kinh doanh 5 triệu'],
      read_time: 12,
      status: 'published',
      published_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      title: 'Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn Từ A-Z Cho Người Mới',
      slug: 'kinh-doanh-it-von-duoi-5-trieu-huong-dan-tu-a-z',
      category: 'Kinh Doanh Vốn Nhỏ',
      excerpt: 'Hướng dẫn chi tiết từ A-Z cách bắt đầu kinh doanh với vốn dưới 5 triệu. Từ chọn ý tưởng, lập kế hoạch, đến triển khai và phát triển. Phù hợp người mới 100%.',
      content: '<h2>Tại Sao Nên Bắt Đầu Với Vốn Dưới 5 Triệu?</h2><p>Bắt đầu với vốn nhỏ có nhiều ưu điểm: rủi ro thấp, học hỏi nhanh, linh hoạt và không áp lực nợ nần.</p><h2>Bước 1: Đánh Giá Bản Thân và Xác Định Mục Tiêu</h2><p>Phân tích thế mạnh cá nhân và xác định mục tiêu SMART: Specific, Measurable, Achievable, Relevant, Time-bound.</p><h2>Bước 2: Chọn Ý Tưởng Kinh Doanh Phù Hợp</h2><p>5 tiêu chí: Nhu cầu thị trường cao, vốn phù hợp, lợi nhuận hấp dẫn, dễ mở rộng, phù hợp kỹ năng.</p><h2>Bước 3: Lập Kế Hoạch Kinh Doanh Chi Tiết</h2><p>Phân bổ ngân sách 60-20-20: 60% sản phẩm, 20% marketing, 20% dự phòng.</p>',
      featured_image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=630&fit=crop',
      meta_title: 'Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn A-Z Cho Người Mới 2026',
      meta_description: 'Hướng dẫn chi tiết cách kinh doanh ít vốn dưới 5 triệu từ A-Z. Chọn ý tưởng, lập kế hoạch, marketing, quản lý tài chính. Dành cho người mới bắt đầu.',
      keywords: ['kinh doanh ít vốn', 'kinh doanh dưới 5 triệu', 'hướng dẫn kinh doanh', 'khởi nghiệp ít vốn'],
      read_time: 11,
      status: 'published',
      published_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Add 18 more posts
  const additionalTitles = [
    'Ít Vốn Nên Kinh Doanh Gì 2026? 10 Ngách Đang Thịnh Hành',
    'Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero Risk 2026',
    'Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều Hàng Tháng',
    'Từ 5 Triệu Đến 100 Triệu: Lộ Trình Kinh Doanh Chi Tiết 2026',
    'Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có Khi Kinh Doanh Ít Vốn',
    'Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu',
    'Solo Business Là Gì? Hướng Dẫn Xây Dựng Doanh Nghiệp Một Người 2026',
    '10 Công Cụ Bất Bại Cho Solo Business Tối Ưu 2026',
    'Tự Động Hóa Solo Business: Làm Ít Hơn Kiếm Nhiều Hơn 2026',
    'Từ 0 Đến 20 Triệu/Tháng Với Solo Business: Lộ Trình Thực Chiến',
    'Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z 2026',
    '7 Bước Tìm Ngách Kinh Doanh Lãi Cao Ít Cạnh Tranh',
    'Top 10 Ngách Kinh Doanh Bùng Nổ 2026 Mà Chưa Ai Nhận Ra',
    'Kinh Doanh Ngách Online: Chiến Lược Bùng Nổ Trên Mạng Xã Hội',
    '7 Mindset Kinh Doanh Cần Có Để Thành Công 2026',
    'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh Vốn Nhỏ',
    'Top 10 Ebook Kinh Doanh Hay Nhất 2026 Bạn Phải Đọc',
    'Xây Dựng Thói Quen Của Doanh Nhân Thành Công Từ Vốn Nhỏ'
  ]

  const categories = ['Kinh Doanh Vốn Nhỏ', 'Solo Business', 'Kinh Doanh Ngách', 'Mindset & Tư Duy']
  
  for (let i = 0; i < 18; i++) {
    const dayOffset = 18 - i
    const category = i < 6 ? 'Kinh Doanh Vốn Nhỏ' : i < 10 ? 'Solo Business' : i < 14 ? 'Kinh Doanh Ngách' : 'Mindset & Tư Duy'
    const title = additionalTitles[i]
    const slug = title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    
    posts.push({
      title,
      slug,
      category,
      excerpt: `Hướng dẫn chi tiết về ${title.toLowerCase()}. Chiến lược thực chiến, công cụ cần thiết và case study từ những người đã thành công.`,
      content: `<h2>${title}</h2><p>Nội dung chi tiết về ${title.toLowerCase()} với các bước thực hiện cụ thể, ví dụ thực tế và lời khuyên từ chuyên gia.</p><h3>Phần 1: Tổng Quan</h3><p>Phân tích xu hướng và cơ hội hiện tại trong lĩnh vực này.</p><h3>Phần 2: Hướng Dẫn Thực Hành</h3><p>Các bước thực hiện từ A đến Z với checklist cụ thể và timeline rõ ràng.</p><h3>Phần 3: Case Study & Kinh Nghiệm</h3><p>Câu chuyện thực tế từ những người đã áp dụng thành công, bài học rút ra và lời khuyên quý giá.</p><h3>Phần 4: Công Cụ & Tài Nguyên</h3><p>Danh sách công cụ cần thiết, nguồn học tập và cộng đồng hỗ trợ.</p>`,
      featured_image: `https://images.unsplash.com/photo-${1550000000000 + i * 10000000}?w=1200&h=630&fit=crop`,
      meta_title: `${title} | Ebook Mind`,
      meta_description: `${title} - Hướng dẫn chi tiết, chiến lược cụ thể, case study thực tế. Phù hợp cho người mới bắt đầu và muốn phát triển.`,
      keywords: [title.split(':')[0].toLowerCase().trim(), 'kinh doanh', 'khởi nghiệp', '2026'],
      read_time: 9 + (i % 5),
      status: 'published',
      published_at: new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString()
    })
  }

  // Insert all posts
  const { data, error } = await supabase.from('blog_posts').insert(posts)
  
  if (error) {
    console.error('Error seeding posts:', error)
    return false
  }
  
  console.log(`✅ Successfully seeded ${posts.length} blog posts!`)
  return true
}

async function main() {
  try {
    await seedPosts()
    console.log('\n🎉 Blog system ready!')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
