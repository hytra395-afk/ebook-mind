'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { convertBlogImageUrl } from '@/lib/utils'

interface FeaturedPost {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  featured_image: string
  read_time: number
  published_at: string
  author?: string
}

interface FeaturedPostsSectionProps {
  posts: FeaturedPost[]
}

export default function FeaturedPostsSection({ posts }: FeaturedPostsSectionProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const capitalizeTitle = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
  }

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Kinh Doanh Vốn Nhỏ': 'bg-gradient-to-r from-indigo-500 to-violet-500',
      'Solo Business': 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
      'Kinh Doanh Ngách': 'bg-gradient-to-r from-teal-400 to-cyan-400',
      'Mindset & Tư Duy': 'bg-gradient-to-r from-orange-400 to-rose-500',
      'Kỹ Năng': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'Ebook & Học Tập': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Mindset Kinh Doanh': 'bg-gradient-to-r from-orange-400 to-rose-500',
      'Kinh Nghiệm Kinh Doanh': 'bg-gradient-to-r from-blue-500 to-indigo-500',
      'Kinh Doanh Online': 'bg-gradient-to-r from-green-500 to-teal-500',
      'Câu Chuyện Thành Công': 'bg-gradient-to-r from-purple-500 to-pink-500',
      'Kinh Doanh': 'bg-gradient-to-r from-indigo-500 to-purple-500',
      'Phát Triển Bản Thân': 'bg-gradient-to-r from-emerald-500 to-green-500',
      'Công Nghệ': 'bg-gradient-to-r from-cyan-500 to-blue-500',
      'Chuyên môn': 'bg-gradient-to-r from-cyan-500 to-blue-500',
      'Sức Khỏe': 'bg-gradient-to-r from-rose-500 to-pink-500'
    }
    return colors[cat] || 'bg-gradient-to-r from-gray-500 to-gray-600'
  }

  return (
    <section className="py-12 mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Bài Viết Nổi Bật
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </div>

        {/* Featured Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.slice(0, 2).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                {/* Featured Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={convertBlogImageUrl(post.featured_image)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Badge */}
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {capitalizeTitle(post.title)}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-3 text-gray-500 text-xs pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.published_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.read_time} phút đọc
                    </span>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-gray-600 text-xs font-medium">{post.read_time} phút</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
