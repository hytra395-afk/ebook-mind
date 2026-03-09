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
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            <Image
              src={cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Badges */}
            {featured && (
              <span className="absolute top-2 left-2 badge-sunset text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                Bestseller
              </span>
            )}
            {category && (
              <span className="absolute top-2 right-2 glass border-0 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                {category}
              </span>
            )}
          </div>
        </Link>

        {/* Info */}
        <div className="p-4">
          <Link href={`/ebooks/${slug}`}>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
              {title}
            </h3>
          </Link>

          {description && (
            <p className="text-xs text-gray-400 line-clamp-2 mb-3">{description}</p>
          )}

          {/* Rating + sales */}
          {(rating_avg > 0 || sales_count > 0) && (
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
              {rating_avg > 0 && (
                <span className="flex items-center gap-0.5">
                  <span className="text-yellow-400">★</span>
                  <span className="font-medium text-gray-600">{Number(rating_avg).toFixed(1)}</span>
                  {rating_count > 0 && <span>({rating_count})</span>}
                </span>
              )}
              {sales_count > 0 && (
                <span className="text-gray-300">·</span>
              )}
              {sales_count > 0 && (
                <span>{sales_count.toLocaleString('vi-VN')} đã bán</span>
              )}
            </div>
          )}

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-base font-bold text-purple-600">
              {new Intl.NumberFormat('vi-VN').format(price)}đ
            </span>
            <Link
              href={`/ebooks/${slug}`}
              className="text-xs font-semibold gradient-purple text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition whitespace-nowrap"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
