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
  pages?: number
  featured?: boolean
  bestseller?: boolean
  category?: string
  level?: string
  priority?: boolean
}

export default function EbookCard({
  slug, title, description, price, cover_url,
  rating_avg, rating_count, sales_count, pages, featured, bestseller, category, level, priority = false
}: EbookCardProps) {
  return (
    <div className="group relative">
      {/* Gradient border wrapper */}
      <div className="absolute inset-0 bg-gradient-aurora rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      
      <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Cover */}
        <Link href={`/ebooks/${slug}`} className="block">
          <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-2xl scale-[0.92]">
            <Image
              src={convertDriveUrl(cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400')}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Badges */}
            {bestseller && (
              <span className="absolute top-2.5 left-2.5 badge-sunset text-white text-[0.81rem] font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                Bestseller
              </span>
            )}
          </div>
        </Link>

        {/* Info - Reduced 8% */}
        <div className="p-4">
          {/* Category + Level */}
          {(level || category) && (
            <p className="text-[0.69rem] text-gray-500 font-medium mb-1.5">
              {level && <span>{level}</span>}
              {level && category && <span className="text-gray-300 mx-1">·</span>}
              {category && <span>{category}</span>}
            </p>
          )}

          {/* Title */}
          <Link href={`/ebooks/${slug}`}>
            <h3 className="font-bold text-gray-900 text-[1.01rem] leading-tight group-hover:text-purple-600 transition-colors mb-1.5">
              {title}
            </h3>
          </Link>

          {/* Description */}
          {description && (
            <p className="text-[0.69rem] text-gray-600 line-clamp-3 mb-2.5">
              {description}
            </p>
          )}

          {/* Rating + sales */}
          <div className="flex items-center gap-2.5 text-[0.81rem] text-gray-500 mb-3">
            {rating_avg > 0 && (
              <span className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-medium text-gray-700">{Number(rating_avg).toFixed(1)}</span>
                {rating_count > 0 && <span className="text-gray-400">({rating_count})</span>}
              </span>
            )}
            {sales_count > 0 && (
              <span className="flex items-center gap-1">
                <span className="text-gray-400">👁</span>
                <span>{sales_count.toLocaleString('vi-VN')} lượt mua</span>
              </span>
            )}
          </div>

          {/* Pages info */}
          {pages && pages > 0 && (
            <p className="text-[0.69rem] text-gray-400 mb-3">{pages} trang</p>
          )}
          {!pages || pages === 0 && (
            <p className="text-[0.69rem] text-gray-400 mb-3">320 trang</p>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[1.15rem] font-bold text-purple-600">
              {new Intl.NumberFormat('vi-VN').format(price)}đ
            </span>
            <Link
              href={`/ebooks/${slug}`}
              className="text-[0.69rem] font-semibold gradient-purple text-white px-4 py-2 rounded-lg hover:opacity-90 transition whitespace-nowrap"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
