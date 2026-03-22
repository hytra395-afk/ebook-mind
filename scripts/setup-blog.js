const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ckohoqembjurgwxvvzcf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrb2hvcWVtYmp1cmd3eHZ2emNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIyMjgwNCwiZXhwIjoyMDgxNzk4ODA0fQ.NRT890aHVK5oJ_2PsW7bcY1b-0Sc2dU40eGNLP6L9Yo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTable() {
  console.log('Creating blog_posts table...')
  
  const { error } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS blog_posts (
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

      CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
      CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

      ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Blog posts are viewable by everyone" ON blog_posts;
      CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts FOR SELECT USING (status = 'published');

      DROP POLICY IF EXISTS "Admins can do everything with blog posts" ON blog_posts;
      CREATE POLICY "Admins can do everything with blog posts" ON blog_posts FOR ALL USING (auth.jwt() ->> 'email' = 'admin@ebookmind.com');
    `
  })

  if (error) {
    console.error('Error creating table:', error)
    return false
  }
  
  console.log('✓ Table created successfully')
  return true
}

async function seedPosts() {
  console.log('\nSeeding blog posts...')
  
  const posts = [
    {
      title: 'Kinh Doanh Vốn Nhỏ 2026: Top 15 Ý Tưởng Lãi 300% Từ 5 Triệu',
      slug: 'kinh-doanh-von-nho-2026-top-15-y-tuong',
      category: 'Kinh Doanh Vốn Nhỏ',
      excerpt: 'Khám phá 15 ý tưởng kinh doanh vốn nhỏ đang bùng nổ 2026 với lợi nhuận lên đến 300%. Hướng dẫn chi tiết từ A-Z.',
      content: '<h2>Tại Sao 2026 Là Thời Điểm Vàng?</h2><p>Năm 2026 chứng kiến sự bùng nổ của kinh doanh tinh gọn với 64,500 doanh nghiệp mới thành lập.</p><h2>15 Ý Tưởng Kinh Doanh</h2><h3>1. Dropshipping</h3><p>Lợi nhuận 200-300%, vốn 2-5 triệu.</p><h3>2. Đồ Ăn Healthy</h3><p>Tỷ suất 40-60%, xu hướng đang lên.</p><h3>3. Livestream Thuê</h3><p>300k-1 triệu/buổi, vốn 3-5 triệu.</p><p>...và 12 ý tưởng khác với hướng dẫn chi tiết.</p>',
      featured_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=630&fit=crop',
      meta_title: 'Kinh Doanh Vốn Nhỏ 2026: 15 Ý Tưởng Lãi 300% | Ebook Mind',
      meta_description: 'Top 15 ý tưởng kinh doanh vốn nhỏ 2026 lãi cao. Hướng dẫn A-Z, case study thực tế. Bắt đầu từ 5 triệu.',
      keywords: ['kinh doanh vốn nhỏ 2026', 'vốn nhỏ kinh doanh gì', 'ít vốn kinh doanh gì'],
      read_time: 12,
      status: 'published',
      published_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      title: 'Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn Từ A-Z',
      slug: 'kinh-doanh-it-von-duoi-5-trieu-huong-dan-tu-a-z',
      category: 'Kinh Doanh Vốn Nhỏ',
      excerpt: 'Hướng dẫn chi tiết từ A-Z cách bắt đầu kinh doanh với vốn dưới 5 triệu cho người mới.',
      content: '<h2>Bước 1: Đánh Giá Bản Thân</h2><p>Phân tích thế mạnh và xác định mục tiêu SMART.</p><h2>Bước 2: Chọn Ý Tưởng</h2><p>5 tiêu chí: Nhu cầu cao, vốn phù hợp, lợi nhuận tốt, dễ mở rộng, phù hợp kỹ năng.</p><h2>Bước 3: Lập Kế Hoạch</h2><p>Phân bổ 60-20-20: sản phẩm, marketing, dự phòng.</p>',
      featured_image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=630&fit=crop',
      meta_title: 'Kinh Doanh Ít Vốn Dưới 5 Triệu: Hướng Dẫn A-Z 2026',
      meta_description: 'Hướng dẫn chi tiết kinh doanh ít vốn dưới 5 triệu. Chọn ý tưởng, lập kế hoạch, marketing.',
      keywords: ['kinh doanh ít vốn', 'kinh doanh dưới 5 triệu', 'khởi nghiệp ít vốn'],
      read_time: 11,
      status: 'published',
      published_at: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      title: 'Ít Vốn Nên Kinh Doanh Gì 2026? 10 Ngách Thịnh Hành',
      slug: 'it-von-nen-kinh-doanh-gi-2026-10-ngach',
      category: 'Kinh Doanh Vốn Nhỏ',
      excerpt: 'Phân tích 10 ngách kinh doanh đang thịnh hành 2026 phù hợp với người ít vốn.',
      content: '<h2>10 Ngách Đang Thịnh Hành</h2><h3>1. Đồ Ăn Kiêng</h3><p>Thị trường tăng 45%, lợi nhuận 50-70%.</p><h3>2. Chăm Sóc Thú Cưng</h3><p>Grooming, pet sitting có nhu cầu cao.</p><h3>3. Sản Phẩm Eco-Friendly</h3><p>Xu hướng xanh đang bùng nổ.</p>',
      featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
      meta_title: 'Ít Vốn Nên Kinh Doanh Gì 2026? 10 Ngách Thịnh Hành',
      meta_description: '10 ngách kinh doanh thịnh hành 2026 cho người ít vốn. Phân tích chi tiết, case study.',
      keywords: ['ít vốn nên kinh doanh gì', 'ngách kinh doanh 2026', 'xu hướng kinh doanh'],
      read_time: 10,
      status: 'published',
      published_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Seed first 3 posts
  for (let i = 0; i < posts.length; i++) {
    const { error } = await supabase.from('blog_posts').insert(posts[i])
    if (error) {
      console.error(`Error seeding post ${i + 1}:`, error)
    } else {
      console.log(`✓ Seeded: ${posts[i].title}`)
    }
  }

  // Seed remaining 17 posts with shorter content
  const remainingPosts = []
  const categories = ['Kinh Doanh Vốn Nhỏ', 'Solo Business', 'Kinh Doanh Ngách', 'Mindset & Tư Duy']
  const titles = [
    'Kinh Doanh Online Không Cần Vốn: 5 Mô Hình Zero Risk',
    'Kinh Doanh Nhỏ Tại Nhà 2026: 20 Ý Tưởng Lãi Đều',
    'Từ 5 Triệu Đến 100 Triệu: Lộ Trình Chi Tiết',
    'Quản Lý Vốn Hiệu Quả: 7 Kỹ Năng Cần Có',
    'Case Study: 5 Người Thành Công Với Vốn Dưới 10 Triệu',
    'Solo Business Là Gì? Hướng Dẫn Xây Dựng 2026',
    '10 Công Cụ Bất Bại Cho Solo Business',
    'Tự Động Hóa Solo Business: Làm Ít Kiếm Nhiều',
    'Từ 0 Đến 20 Triệu/Tháng Với Solo Business',
    'Kinh Doanh Ngách Là Gì? Tìm Hiểu Từ A-Z',
    '7 Bước Tìm Ngách Kinh Doanh Lãi Cao',
    'Top 10 Ngách Kinh Doanh Bùng Nổ 2026',
    'Kinh Doanh Ngách Online: Chiến Lược MXH',
    '7 Mindset Kinh Doanh Cần Có Để Thành Công',
    'Vượt Qua Nỗi Sợ Thất Bại Khi Kinh Doanh',
    'Top 10 Ebook Kinh Doanh Hay Nhất 2026',
    'Xây Dựng Thói Quen Của Doanh Nhân Thành Công'
  ]

  for (let i = 0; i < 17; i++) {
    const dayOffset = 17 - i
    const category = categories[Math.floor(i / 5) % categories.length]
    const post = {
      title: titles[i],
      slug: titles[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-'),
      category,
      excerpt: `Hướng dẫn chi tiết về ${titles[i].toLowerCase()}. Chiến lược, công cụ và case study thực tế.`,
      content: `<h2>${titles[i]}</h2><p>Nội dung chi tiết về ${titles[i].toLowerCase()} với các bước thực hiện cụ thể.</p><h3>Phần 1: Giới Thiệu</h3><p>Phân tích tổng quan và xu hướng hiện tại.</p><h3>Phần 2: Hướng Dẫn Chi Tiết</h3><p>Các bước thực hiện từ A đến Z với ví dụ cụ thể.</p><h3>Phần 3: Case Study</h3><p>Câu chuyện thực tế từ những người đã thành công.</p>`,
      featured_image: `https://images.unsplash.com/photo-${1550000000000 + i * 1000000}?w=1200&h=630&fit=crop`,
      meta_title: `${titles[i]} | Ebook Mind`,
      meta_description: `${titles[i]} - Hướng dẫn chi tiết, chiến lược cụ thể, case study thực tế cho người khởi nghiệp.`,
      keywords: [titles[i].toLowerCase().split(':')[0].trim(), 'kinh doanh', 'khởi nghiệp'],
      read_time: 9 + (i % 4),
      status: 'published',
      published_at: new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toISOString()
    }
    remainingPosts.push(post)
  }

  const { error: batchError } = await supabase.from('blog_posts').insert(remainingPosts)
  if (batchError) {
    console.error('Error seeding remaining posts:', batchError)
  } else {
    console.log(`✓ Seeded ${remainingPosts.length} additional posts`)
  }

  console.log('\n✅ All 20 blog posts seeded successfully!')
}

async function main() {
  try {
    const tableCreated = await createTable()
    if (!tableCreated) {
      console.error('Failed to create table, skipping seed')
      return
    }

    await seedPosts()
    
    console.log('\n🎉 Blog system setup complete!')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
