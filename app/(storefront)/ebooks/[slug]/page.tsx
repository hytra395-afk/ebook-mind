import { getSupabase } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, BookOpen, ShieldCheck, Zap, Download, ChevronRight, FileText } from 'lucide-react'
import AddToCartButton from '@/components/add-to-cart-button'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()
  const { data: ebook } = await supabase.from('ebooks').select('title, description').eq('slug', slug).single()
  if (!ebook) return {}
  return {
    title: `${ebook.title} – Ebook Mind`,
    description: ebook.description?.slice(0, 160),
  }
}

export default async function EbookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: ebook } = await supabase
    .from('ebooks')
    .select('*, categories(name, slug), levels(name), authors(name, bio, avatar_url)')
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

  const { data: related } = await supabase
    .from('ebooks')
    .select('id, slug, title, price, cover_url, rating_avg, sales_count, featured, categories(name)')
    .eq('active', true)
    .eq('category_id', ebook.category_id)
    .neq('id', ebook.id)
    .limit(4)

  const ratingStars = Math.round(Number(ebook.rating_avg))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: ebook.title,
    description: ebook.description,
    image: ebook.cover_url,
    author: ebook.authors?.name ? { '@type': 'Person', name: ebook.authors.name } : undefined,
    numberOfPages: ebook.pages || undefined,
    offers: {
      '@type': 'Offer',
      price: ebook.price,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: ebook.rating_avg > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: Number(ebook.rating_avg).toFixed(1),
      reviewCount: ebook.rating_count,
    } : undefined,
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <nav className="flex items-center gap-1 text-sm text-gray-400">
          <Link href="/" className="hover:text-purple-600 transition-colors">Trang chủ</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/ebooks" className="hover:text-purple-600 transition-colors">Ebook Store</Link>
          {ebook.categories?.name && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/ebooks?category=${ebook.categories.slug}`} className="hover:text-purple-600 transition-colors">
                {ebook.categories.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-600 font-medium line-clamp-1">{ebook.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: Cover ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100">
                <Image
                  src={ebook.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600'}
                  alt={ebook.title}
                  fill
                  className="object-cover"
                  priority
                />
                {ebook.featured && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                    Bestseller
                  </span>
                )}
              </div>

              {/* Mini trust row under cover */}
              <div className="flex items-center justify-around mt-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> An toàn</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-yellow-500" /> Nhận ngay</span>
                <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5 text-blue-500" /> PDF</span>
              </div>
            </div>
          </div>

          {/* ── Center: Info ── */}
          <div className="lg:col-span-1">
            {ebook.categories?.name && (
              <Link href={`/ebooks?category=${ebook.categories.slug}`}
                className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full mb-3 hover:bg-purple-100 transition">
                {ebook.categories.name}
              </Link>
            )}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              {ebook.title}
            </h1>

            {ebook.authors?.name && (
              <p className="text-sm text-gray-500 mb-3">
                Tác giả: <span className="font-semibold text-gray-700">{ebook.authors.name}</span>
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              {ebook.rating_avg > 0 && (
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= ratingStars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="text-sm font-semibold text-gray-700 ml-1">{Number(ebook.rating_avg).toFixed(1)}</span>
                  <span className="text-sm text-gray-400">({ebook.rating_count})</span>
                </div>
              )}
              {ebook.sales_count > 0 && (
                <span className="text-sm text-gray-400">{ebook.sales_count.toLocaleString('vi-VN')} đã bán</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mb-5">{ebook.description}</p>

            {/* Metadata pills */}
            <div className="flex flex-wrap gap-2 mb-6 text-sm text-gray-500">
              {ebook.levels?.name && (
                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs">
                  <BookOpen className="w-3.5 h-3.5" /> {ebook.levels.name}
                </span>
              )}
              {ebook.pages > 0 && (
                <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs">
                  <FileText className="w-3.5 h-3.5" /> {ebook.pages} trang
                </span>
              )}
              <span className="flex items-center gap-1.5 bg-gray-100 px-3 py-1 rounded-full text-xs">
                <Download className="w-3.5 h-3.5" /> File PDF
              </span>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden bg-gray-50 rounded-2xl p-5 mb-6">
              <div className="text-3xl font-extrabold text-purple-600 mb-3">
                {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
              </div>
              <AddToCartButton ebook={ebook} />
            </div>
          </div>

          {/* ── Right: Sticky CTA + Author ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">

              {/* Buy Box */}
              <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm hidden lg:block">
                <div className="text-4xl font-extrabold text-purple-600 mb-1">
                  {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
                </div>
                <p className="text-xs text-gray-500 mb-4">Rẻ hơn một cốc trà sữa</p>
                <AddToCartButton ebook={ebook} />

                <button className="w-full mt-3 py-2.5 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50 transition rounded-lg border border-gray-200">
                  Thêm vào giỏ hàng
                </button>

                {/* Trust bullets */}
                <div className="mt-5 space-y-3 text-xs text-gray-600 border-t pt-4">
                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Tải về ngay sau khi thanh toán</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>Truy cập không giới hạn</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Đảm bảo hoàn tiền 100%</span>
                  </div>
                </div>
              </div>

              {/* Author Card */}
              {ebook.authors?.name && (
                <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Tác giả</p>
                  <div className="flex items-start gap-3">
                    {ebook.authors.avatar_url ? (
                      <Image
                        src={ebook.authors.avatar_url}
                        alt={ebook.authors.name}
                        width={44}
                        height={44}
                        className="rounded-full flex-shrink-0 object-cover"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full gradient-purple flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                        {ebook.authors.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{ebook.authors.name}</p>
                      {ebook.authors.bio && (
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-4">{ebook.authors.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Reviews ── */}
        {reviews && reviews.length > 0 && (
          <section className="mt-16 max-w-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-5">
              Đánh giá từ độc giả
              <span className="ml-2 text-sm font-normal text-gray-400">({reviews.length})</span>
            </h2>
            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`h-3.5 w-3.5 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    {review.reviewer_name && (
                      <span className="text-sm font-semibold text-gray-700">{review.reviewer_name}</span>
                    )}
                  </div>
                  {review.title && <h4 className="font-medium text-sm mb-1">{review.title}</h4>}
                  {review.content && <p className="text-gray-500 text-sm leading-relaxed">{review.content}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Related Ebooks ── */}
        {related && related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-gray-900 mb-5">Ebook liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((rel: any) => (
                <Link key={rel.id} href={`/ebooks/${rel.slug}`} className="group block">
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                    <div className="relative aspect-[3/4] bg-gray-100">
                      <Image
                        src={rel.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300'}
                        alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">{rel.title}</p>
                      <p className="text-sm font-bold text-purple-600 mt-1">{new Intl.NumberFormat('vi-VN').format(rel.price)}đ</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
