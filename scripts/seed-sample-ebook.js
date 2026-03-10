const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://ckohoqembjurgwxvvzcf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrb2hvcWVtYmp1cmd3eHZ2emNmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjIyMjgwNCwiZXhwIjoyMDgxNzk4ODA0fQ.NRT890aHVK5oJ_2PsW7bcY1b-0Sc2dU40eGNLP6L9Yo'

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedSampleEbook() {
  try {
    // First, get or create category
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'kinh-doanh')
      .single()

    if (catError && catError.code !== 'PGRST116') {
      throw catError
    }

    let categoryId = categories?.id

    if (!categoryId) {
      const { data: newCat, error: createCatError } = await supabase
        .from('categories')
        .insert([{ name: 'Kinh Doanh', slug: 'kinh-doanh' }])
        .select('id')
        .single()

      if (createCatError) throw createCatError
      categoryId = newCat.id
    }

    // Get or create level
    const { data: levels, error: levelError } = await supabase
      .from('levels')
      .select('id')
      .eq('name', 'Beginner')
      .single()

    if (levelError && levelError.code !== 'PGRST116') {
      throw levelError
    }

    let levelId = levels?.id

    if (!levelId) {
      const { data: newLevel, error: createLevelError } = await supabase
        .from('levels')
        .insert([{ name: 'Beginner', slug: 'beginner' }])
        .select('id')
        .single()

      if (createLevelError) throw createLevelError
      levelId = newLevel.id
    }

    // Get or create author
    const { data: authors, error: authorError } = await supabase
      .from('authors')
      .select('id')
      .eq('name', 'Nguyễn Văn A')
      .single()

    if (authorError && authorError.code !== 'PGRST116') {
      throw authorError
    }

    let authorId = authors?.id

    if (!authorId) {
      const { data: newAuthor, error: createAuthorError } = await supabase
        .from('authors')
        .insert([{
          name: 'Nguyễn Văn A',
          bio: 'Chủ shop mỹ phẩm, TP.HCM',
          avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
        }])
        .select('id')
        .single()

      if (createAuthorError) throw createAuthorError
      authorId = newAuthor.id
    }

    // Check if sample ebook already exists
    const { data: existing } = await supabase
      .from('ebooks')
      .select('id')
      .eq('slug', 'khoi-nghiep-thanh-cong')
      .single()

    if (existing) {
      console.log('Sample ebook already exists')
      return
    }

    // Insert sample ebook
    const { data: ebook, error: ebookError } = await supabase
      .from('ebooks')
      .insert([{
        title: 'Khởi Nghiệp Thành Công',
        slug: 'khoi-nghiep-thanh-cong',
        description: 'Hướng dẫn chi tiết từ ý tưởng đến thực hiện kinh doanh thành công. Bao gồm các bước chuẩn bị, tìm kiếm vốn, xây dựng đội ngũ và phát triển sản phẩm.',
        price: 49000,
        cover_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=600&fit=crop',
        category_id: categoryId,
        level_id: levelId,
        author_id: authorId,
        pages: 320,
        rating_avg: 5.0,
        rating_count: 2,
        sales_count: 1250,
        featured: true,
        active: true
      }])
      .select('id')
      .single()

    if (ebookError) throw ebookError

    console.log('Sample ebook created successfully:', ebook.id)
  } catch (error) {
    console.error('Error seeding sample ebook:', error.message)
    process.exit(1)
  }
}

seedSampleEbook()
