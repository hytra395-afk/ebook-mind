import { getSupabase } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, ShoppingCart, BookOpen, ArrowLeft } from 'lucide-react'
import AddToCartButton from '@/components/add-to-cart-button'

export const revalidate = 60

export default async function EbookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: ebook } = await supabase
    .from('ebooks')
    .select('*, categories(name), levels(name), authors(name, bio, avatar_url)')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!ebook) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('ebook_id', ebook.id)
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/ebooks" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Quay lại Ebook Store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
          <Image
            src={ebook.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600'}
            alt={ebook.title}
            fill
            className="object-cover"
            priority
          />
          {ebook.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-sm font-bold px-3 py-1 rounded-full">
              Bestseller
            </span>
          )}
        </div>

        <div>
          <div className="mb-2">
            {ebook.categories?.name && (
              <span className="text-sm text-purple-600 font-medium">{ebook.categories.name}</span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{ebook.title}</h1>

          {ebook.authors?.name && (
            <p className="text-gray-500 mb-4">Tác giả: <span className="font-medium text-gray-700">{ebook.authors.name}</span></p>
          )}

          <div className="flex items-center gap-4 mb-4">
            {ebook.rating_avg > 0 && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{Number(ebook.rating_avg).toFixed(1)}</span>
                <span className="text-gray-400">({ebook.rating_count} đánh giá)</span>
              </div>
            )}
            {ebook.sales_count > 0 && (
              <span className="text-gray-400">{ebook.sales_count} đã bán</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{ebook.description}</p>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
            {ebook.levels?.name && (
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" /> {ebook.levels.name}
              </span>
            )}
            {ebook.pages > 0 && <span>{ebook.pages} trang</span>}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="text-3xl font-bold text-purple-600 mb-4">
              {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
            </div>
            <AddToCartButton ebook={ebook} />
          </div>
        </div>
      </div>

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ độc giả</h2>
          <div className="space-y-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-white border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  {review.reviewer_name && <span className="text-sm font-medium">{review.reviewer_name}</span>}
                </div>
                {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                {review.content && <p className="text-gray-600 text-sm">{review.content}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
