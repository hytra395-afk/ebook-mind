import { getSupabase } from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Gift, Star } from 'lucide-react'
import ComboHero from '@/components/combo-hero'
import ComboBenefits from '@/components/combo-benefits'
import { convertDriveUrl } from '@/lib/utils'

export const revalidate = 60

export default async function CombosPage() {
  const supabase = getSupabase()
  const { data: combos } = await supabase
    .from('combos')
    .select('*, combo_items(*, ebooks(id, title, cover_url, price))')
    .eq('active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero Section */}
      <ComboHero />

      {/* Benefits Section */}
      <ComboBenefits />

      {/* Combos Grid */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Tất cả Combos
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combos?.map((combo: any) => {
          const originalPrice = combo.combo_items?.reduce((sum: number, item: any) => sum + (item.ebooks?.price || 0), 0) || 0
          const discount = originalPrice > 0 ? Math.round((1 - combo.price / originalPrice) * 100) : 0
          const savings = originalPrice - combo.price
          
          return (
            <Link key={combo.id} href={`/combos/${combo.slug}`} className="group block">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                {/* Cover Image */}
                <div className="relative h-48 bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100">
                  {combo.cover_url ? (
                    <Image
                      src={convertDriveUrl(combo.cover_url)}
                      alt={combo.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="w-16 h-16 text-purple-300" />
                    </div>
                  )}
                  
                  {/* Ebook Count Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <Gift className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {combo.combo_items?.length || 0} ebooks
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {combo.featured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                      Nổi bật
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {combo.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {combo.description}
                  </p>

                  {/* Rating */}
                  {combo.rating_avg > 0 && (
                    <div className="flex items-center gap-1.5 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(combo.rating_avg)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {Number(combo.rating_avg).toFixed(1)}
                      </span>
                      <span className="text-sm text-gray-400">
                        ({combo.rating_count})
                      </span>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-bold text-purple-600">
                        {new Intl.NumberFormat('vi-VN').format(combo.price)}đ
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            {new Intl.NumberFormat('vi-VN').format(originalPrice)}đ
                          </span>
                          <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                            -{discount}%
                          </span>
                        </>
                      )}
                    </div>

                    {/* Savings Highlight */}
                    {savings > 0 && (
                      <div className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
                        <span>💰</span>
                        <span>Tiết kiệm {new Intl.NumberFormat('vi-VN').format(savings)}đ</span>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <button className="mt-4 w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {(!combos || combos.length === 0) && (
        <div className="text-center py-20">
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Chưa có combo nào</p>
          <p className="text-gray-400 text-sm">Hãy quay lại sau để khám phá các combo ưu đãi</p>
        </div>
      )}
    </div>
  )
}
