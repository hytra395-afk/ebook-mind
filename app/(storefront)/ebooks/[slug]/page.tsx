import { getSupabase } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Star, BookOpen, ShieldCheck, Zap, Download, ChevronRight, FileText, Users } from 'lucide-react'
import AddToCartButton from '@/components/add-to-cart-button'
import EbookTabs from '@/components/ebook-tabs'
import EbookImageGallery from '@/components/ebook-image-gallery'
import { convertDriveUrl } from '@/lib/utils'

export const revalidate = 300 // ISR: revalidate every 5 minutes
export const dynamic = 'auto' // Auto rendering for better performance

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()
  const { data: ebook } = await supabase
    .from('ebooks')
    .select('title, description, cover_url')
    .eq('slug', slug)
    .single()
  
  if (!ebook) return {}
  
  const ogImage = ebook.cover_url ? convertDriveUrl(ebook.cover_url) : 'https://ebookmind.com/og-image.png'
  
  return {
    title: `${ebook.title} – Ebook Mind`,
    description: ebook.description?.slice(0, 160),
    openGraph: {
      title: ebook.title,
      description: ebook.description?.slice(0, 160),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ebook.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ebook.title,
      description: ebook.description?.slice(0, 160),
      images: [ogImage],
    }
  }
}

export default async function EbookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: ebook } = await supabase
    .from('ebooks')
    .select('*, content, preview_images, author_name, author_title, author_bio, author_avatar, categories(name, slug), levels(name), authors(name, bio, avatar_url)')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!ebook) notFound()

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('ebook_id', ebook.id)
    .order('review_date', { ascending: false })

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* ── Left: Cover Gallery ── */}
          <div className="lg:col-span-1">
            <div className="max-w-xs">
              <EbookImageGallery
                coverUrl={convertDriveUrl(ebook.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600')}
                previewImages={(ebook.preview_images || []).map((url: string) => convertDriveUrl(url))}
                title={ebook.title}
                featured={ebook.featured}
              />
            </div>
          </div>

          {/* ── Center: Info ── */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              {ebook.categories?.name && (
                <Link href={`/ebooks?category=${ebook.categories.slug}`}
                  className="inline-block text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full hover:bg-purple-100 transition">
                  {ebook.categories.name}
                </Link>
              )}
              {ebook.levels?.name && (
                <span className="inline-block text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                  {ebook.levels.name}
                </span>
              )}
            </div>
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight mb-4">
              {ebook.title}
            </h1>

            {/* Rating & Stats - New Design */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Stars + Rating */}
              {ebook.rating_avg > 0 && (
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-5 h-5 ${s <= ratingStars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-base font-semibold text-gray-700">{Number(ebook.rating_avg).toFixed(1)}</span>
                  <span className="text-sm text-gray-400">({ebook.rating_count} đánh giá)</span>
                </div>
              )}
              
              {/* Lượt mua */}
              {ebook.sales_count > 0 && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{ebook.sales_count.toLocaleString('vi-VN')} lượt mua</span>
                </div>
              )}

              {/* Số trang */}
              {ebook.pages > 0 && (
                <div className="flex items-center gap-1.5 text-gray-500">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">{ebook.pages} trang</span>
                </div>
              )}
            </div>

            {/* Điểm nổi bật */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Điểm nổi bật:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {ebook.highlights && ebook.highlights.length > 0 ? (
                  ebook.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">💡</span>
                      <span>{highlight}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">💡</span>
                      <span>{ebook.pages || 320} trang nội dung chi tiết và dễ hiểu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">💡</span>
                      <span>Kiến thức thực tế từ các chuyên gia và doanh nhân thành công</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">💡</span>
                      <span>Tải về ngay sau khi thanh toán, không cần chờ đợi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold mt-0.5">💡</span>
                      <span>Truy cập không giới hạn, đọc lại bao nhiêu lần tùy thích</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm mb-8">{ebook.description}</p>

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
                <div className="text-center">
                  <div className="text-4xl font-extrabold text-purple-600 mb-1">
                    {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Rẻ hơn cả một chiếc áo</p>
                </div>
                <AddToCartButton ebook={ebook} />

                {/* Trust bullets */}
                <div className="mt-5 space-y-3 text-xs text-gray-600 border-t pt-4">
                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span>Tải về ngay sau khi thanh toán</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span>Kiến thức thực tế</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                    <span>Đọc trọn đời</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Tabs: Nội dung ebook & Đánh giá */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <EbookTabs content={ebook.content} reviews={reviews || []} />

              {/* Tác giả - Ưu tiên custom fields trước */}
              {(ebook.author_name || ebook.authors?.name) && (
                <div className="mb-8 border-t pt-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Về tác giả</h2>
                  <div className="flex gap-4">
                    {(ebook.author_avatar || ebook.authors?.avatar_url) ? (
                      <Image
                        src={convertDriveUrl(ebook.author_avatar || ebook.authors.avatar_url)}
                        alt={ebook.author_name || ebook.authors.name}
                        width={80}
                        height={80}
                        className="rounded-full flex-shrink-0 object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full gradient-purple flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                        {(ebook.author_name || ebook.authors.name)[0]}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{ebook.author_name || ebook.authors.name}</p>
                      {ebook.author_title && (
                        <p className="text-sm text-purple-600 font-medium">{ebook.author_title}</p>
                      )}
                      {(ebook.author_bio || ebook.authors?.bio) && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ebook.author_bio || ebook.authors.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>


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
                        src={convertDriveUrl(rel.cover_url) || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300'}
                        alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized={true}
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
