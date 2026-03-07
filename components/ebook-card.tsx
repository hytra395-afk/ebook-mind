import Link from 'next/link'
import Image from 'next/image'

interface EbookCardProps {
  id: string
  slug: string
  title: string
  description: string
  price: number
  cover_url: string
  rating_avg: number
  rating_count: number
  sales_count: number
  featured?: boolean
  category?: string
}

export default function EbookCard({ slug, title, description, price, cover_url, rating_avg, sales_count, featured, category }: EbookCardProps) {
  return (
    <Link href={`/ebooks/${slug}`} className="group block">
      <div className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <span className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {category && (
            <span className="absolute top-2 right-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-purple-600">
              {new Intl.NumberFormat('vi-VN').format(price)}đ
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              {rating_avg > 0 && (
                <>
                  <span className="text-yellow-400">★</span>
                  <span>{rating_avg.toFixed(1)}</span>
                </>
              )}
              {sales_count > 0 && (
                <span className="ml-1">· {sales_count} đã bán</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
