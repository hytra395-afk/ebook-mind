import { getSupabase } from '@/lib/db'
import Link from 'next/link'
import { Gift } from 'lucide-react'

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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Combo Ưu Đãi</h1>
      <p className="text-gray-500 mb-8">Tiết kiệm hơn khi mua combo ebook</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combos?.map((combo: any) => {
          const originalPrice = combo.combo_items?.reduce((sum: number, item: any) => sum + (item.ebooks?.price || 0), 0) || 0
          const discount = originalPrice > 0 ? Math.round((1 - combo.price / originalPrice) * 100) : 0
          return (
            <Link key={combo.id} href={`/combos/${combo.slug}`} className="group block">
              <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="gradient-purple p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift className="h-5 w-5" />
                    <span className="text-sm font-medium opacity-80">{combo.combo_items?.length || 0} ebook</span>
                  </div>
                  <h3 className="text-xl font-bold">{combo.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{combo.description}</p>
                  <div className="flex items-center gap-3">
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
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {(!combos || combos.length === 0) && (
        <p className="text-center text-gray-400 py-20">Chưa có combo nào. Hãy thêm combo trong Admin Dashboard.</p>
      )}
    </div>
  )
}
