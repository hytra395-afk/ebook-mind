import { Metadata } from 'next'
import { getSupabase } from '@/lib/db'
import BlogHero from '@/components/blog/blog-hero'
import BlogCard from '@/components/blog/blog-card'
import CategoryFilter from '@/components/blog/category-filter'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog Kinh Doanh 2026 - Kiến Thức Vốn Nhỏ, Solo Business | Ebook Mind',
  description: 'Khám phá bí quyết kinh doanh vốn nhỏ, solo business, kinh doanh ngách từ những người thành công. Hướng dẫn chi tiết, thực chiến, dễ áp dụng.',
  keywords: ['blog kinh doanh', 'kinh doanh vốn nhỏ', 'solo business', 'kinh doanh ngách', 'ít vốn kinh doanh gì', 'ebook kinh doanh'],
  openGraph: {
    title: 'Blog Kinh Doanh 2026 - Kiến Thức Vốn Nhỏ, Solo Business',
    description: 'Khám phá bí quyết kinh doanh vốn nhỏ, solo business, kinh doanh ngách từ những người thành công.',
    type: 'website',
    url: 'https://ebookmind.com/blog',
  }
}

export const revalidate = 3600

interface PageProps {
  searchParams: { category?: string }
}

export default async function BlogPage({ searchParams }: PageProps) {
  const supabase = getSupabase()
  const category = searchParams.category

  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (category && category !== 'Tất cả') {
    query = query.eq('category', category)
  }

  const { data: posts } = await query

  const featuredPost = posts?.[0]
  const regularPosts = posts?.slice(1) || []

  return (
    <div>
      <BlogHero />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilter />
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bài Viết Nổi Bật</h2>
            <BlogCard {...featuredPost} featured />
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {category && category !== 'Tất cả' ? category : 'Tất Cả Bài Viết'}
          </h2>
          
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Chưa có bài viết nào trong danh mục này.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Muốn Học Sâu Hơn?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Khám phá hàng trăm ebook kinh doanh chất lượng cao với kiến thức chuyên sâu, 
            case study thực tế và lộ trình chi tiết.
          </p>
          <a
            href="/ebooks"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Xem Ebook Ngay
          </a>
        </div>
      </section>
    </div>
  )
}
