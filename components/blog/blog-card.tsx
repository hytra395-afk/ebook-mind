import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  featured_image: string
  category: string
  published_at: string
  read_time: number
  featured?: boolean
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  featured_image,
  category,
  published_at,
  read_time,
  featured = false
}: BlogCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Kinh Doanh Vốn Nhỏ': 'bg-gradient-to-r from-indigo-500 to-violet-500',
      'Solo Business': 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
      'Kinh Doanh Ngách': 'bg-gradient-to-r from-teal-400 to-cyan-400',
      'Mindset & Tư Duy': 'bg-gradient-to-r from-orange-400 to-rose-500',
      'Kỹ Năng': 'bg-gradient-to-r from-blue-500 to-cyan-500',
      'Ebook & Học Tập': 'bg-gradient-to-r from-purple-500 to-pink-500'
    }
    return colors[cat] || 'bg-gradient-to-r from-gray-500 to-gray-600'
  }

  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="block group">
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="relative h-80 overflow-hidden">
            <Image
              src={featured_image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-semibold mb-3 ${getCategoryColor(category)}`}>
                {category}
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                {title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-2 mb-3">
                {excerpt}
              </p>
              <div className="flex items-center gap-4 text-gray-300 text-xs">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(published_at)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {read_time} phút đọc
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={featured_image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <span className={`inline-block px-2.5 py-1 rounded-full text-white text-xs font-semibold mb-3 self-start ${getCategoryColor(category)}`}>
            {category}
          </span>
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
          <div className="flex items-center gap-3 text-gray-500 text-xs pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {read_time} phút
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
