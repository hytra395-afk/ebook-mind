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

  const getGradientBg = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-cyan-400 via-cyan-500 to-teal-600',
      'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600'
    ]
    return gradients[index % gradients.length]
  }

  const getAccentColor = (index: number) => {
    const colors = [
      'bg-cyan-500 text-white',
      'bg-emerald-500 text-white'
    ]
    return colors[index % colors.length]
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                {/* Gradient Background with Decorative Elements */}
                <div className={`relative h-80 ${getGradientBg(index)} overflow-hidden flex items-center justify-center`}>
                  {/* Decorative circles */}
                  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/10 -ml-16 -mb-16"></div>
                  <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/5"></div>

                  {/* Featured Image - positioned as accent */}
                  {post.featured_image && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 opacity-30">
                      <Image
                        src={convertBlogImageUrl(post.featured_image)}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized={true}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 p-8 text-white">
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${getAccentColor(index)}`}>
                      {post.category}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:opacity-90 transition-opacity">
                      {capitalizeTitle(post.title)}
                    </h3>
                    <p className="text-white/90 text-base line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.read_time} phút đọc
                      </span>
                    </div>
                  </div>

                  {/* Arrow icon */}
                  <div className="absolute bottom-6 right-6 z-10">
                    <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Bottom Info Bar */}
                <div className="bg-white px-8 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    {post.author && (
                      <>
                        <span className="font-medium">{post.author}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{post.read_time} phút</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
