import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react'
import { getSupabase } from '@/lib/db'
import BlogContent from '@/components/blog/blog-content'
import TableOfContents from '@/components/blog/table-of-contents'
import RelatedPosts from '@/components/blog/related-posts'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = getSupabase()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return {
      title: 'Bài viết không tồn tại | Ebook Mind'
    }
  }

  return {
    title: post.meta_title || `${post.title} | Blog Ebook Mind`,
    description: post.meta_description || post.excerpt,
    keywords: post.keywords || [],
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: ['Ebook Mind'],
      images: [post.featured_image],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: [post.featured_image],
    }
  }
}

export const revalidate = 3600

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = getSupabase()
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  // Get related posts from same category
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('category', post.category)
    .eq('status', 'published')
    .neq('slug', slug)
    .limit(3)

  // Extract headings for TOC
  const headingRegex = /<h([23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/g
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(post.content)) !== null) {
    headings.push({
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ''),
      level: parseInt(match[1])
    })
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Kinh Doanh Vốn Nhỏ': 'from-indigo-500 to-violet-500',
      'Solo Business': 'from-violet-500 to-fuchsia-500',
      'Kinh Doanh Ngách': 'from-teal-400 to-cyan-400',
      'Mindset & Tư Duy': 'from-orange-400 to-rose-500',
      'Kỹ Năng': 'from-blue-500 to-cyan-500',
      'Ebook & Học Tập': 'from-purple-500 to-pink-500'
    }
    return colors[cat] || 'from-gray-500 to-gray-600'
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featured_image,
    author: {
      '@type': 'Organization',
      name: 'Ebook Mind'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ebook Mind',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ebookmind.com/logo.png'
      }
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    description: post.excerpt,
    keywords: post.keywords?.join(', ')
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/blog" className="hover:text-purple-600 transition">
                Blog
              </Link>
              <span>/</span>
              <span className="text-gray-400">{post.category}</span>
              <span>/</span>
              <span className="text-gray-900 font-medium truncate">{post.title}</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-6 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại Blog
            </Link>

            <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-4 bg-gradient-to-r ${getCategoryColor(post.category)}`}>
              {post.category}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time} phút đọc
              </span>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={true}
                />
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogContent content={post.content} />
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg border border-purple-100 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Đọc nội dung chuyên sâu hơn? Khám phá ebook thực chiến từ A → Z
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Bài viết này chỉ là phần nổi của tảng băng chìm. Trong bộ sưu tập ebook của chúng tôi, 
                bạn sẽ tìm thấy những kiến thức chuyên sâu, case study thực tế, và lộ trình từng bước 
                chi tiết để bắt đầu kinh doanh hay áp dụng ngay vào business của bạn.
              </p>
              <div className="flex justify-center">
                <Link
                  href="/ebooks"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Xem Tất Cả Ebook
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <RelatedPosts posts={relatedPosts} />
        )}
      </div>
    </>
  )
}
