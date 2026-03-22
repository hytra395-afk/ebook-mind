'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import BlogHero from '@/components/blog/blog-hero'
import BlogCard from '@/components/blog/blog-card'
import CategoryFilter from '@/components/blog/category-filter'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  featured_image: string
  read_time: number
  published_at: string
}

export default function BlogPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false })

        if (category && category !== 'all') {
          query = query.eq('category', category)
        }

        const { data, error } = await query

        if (error) {
          console.error('Error fetching posts:', error)
          return
        }

        setPosts(data || [])
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [category])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200"></div>
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <div className="min-h-screen bg-gray-50">
      <BlogHero />
      
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter currentCategory={category || 'all'} />
      </div>

      <div className="container mx-auto px-4 py-12">
        {featuredPost && (
          <div className="mb-12">
            <BlogCard post={featuredPost} featured={true} />
          </div>
        )}

        {regularPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Không có bài viết nào trong danh mục này.</p>
          </div>
        )}
      </div>

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

export async function generateMetadata() {
  return {
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
}
