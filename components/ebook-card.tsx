import Link from 'next/link'
import Image from 'next/image'
import { convertDriveUrl } from '@/lib/utils'

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
  priority?: boolean
}

export default function EbookCard({
  slug, title, description, price, cover_url,
  rating_avg, rating_count, sales_count, featured, category, priority = false
}: EbookCardProps) {
  return (
    <div className="group relative">
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 bg-gradient-aurora rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Cover */}
        <Link href={`/ebooks/${slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-2xl">
            <Image
              src={convertDriveUrl(cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400')}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Badges */}
            {featured && (
              <span className="absolute top-3 left-3 badge-sunset text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                Bestseller
              </span>
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="p-6">
          {/* Category */}
          {category && (
            <p className="text-sm text-gray-500 font-medium mb-3">
              Cơ bản <span className="text-gray-300">·</span> {category}
            </p>
          )}

          {/* Title */}
          <Link href={`/ebooks/${slug}`}>
            <h3 className="font-bold text-gray-900 text-xl leading-tight group-hover:text-purple-600 transition-colors mb-2">
              {title}
            </h3>
          </Link>

          {/* Description */}
          {description && (
            <p className="text-sm text-gray-600 line-clamp-4 mb-4">
              {description}
            </p>
          )}

          {/* Rating + sales */}
          <div className="flex items-center gap-4 text-base text-gray-500 mb-5">
            {rating_avg > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="font-medium text-gray-700">{Number(rating_avg).toFixed(1)}</span>
                {rating_count > 0 && <span className="text-gray-400">({rating_count})</span>}
              </span>
            )}
            {sales_count > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">👁</span>
                <span>{sales_count.toLocaleString('vi-VN')} lượt mua</span>
              </span>
            )}
          </div>

          {/* Pages info */}
          <p className="text-sm text-gray-400 mb-5">320 trang</p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl font-bold text-purple-600">
              {new Intl.NumberFormat('vi-VN').format(price)}đ
            </span>
            <Link
              href={`/ebooks/${slug}`}
              className="text-sm font-semibold gradient-purple text-white px-6 py-3 rounded-lg hover:opacity-90 transition whitespace-nowrap"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
