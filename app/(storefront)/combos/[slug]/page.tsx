import { getSupabase } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Gift, ArrowLeft } from 'lucide-react'
import BuyComboButton from './buy-combo-button'
import { convertDriveUrl } from '@/lib/utils'

export const revalidate = 60

export default async function ComboDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: combo } = await supabase
    .from('combos')
    .select('*, combo_items(*, ebooks(id, slug, title, description, cover_url, price, categories(name)))')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (!combo) notFound()

  const originalPrice = combo.combo_items?.reduce((sum: number, item: any) => sum + (item.ebooks?.price || 0), 0) || 0
  const discount = originalPrice > 0 ? Math.round((1 - combo.price / originalPrice) * 100) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/combos" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-purple-600 mb-6">
        <ArrowLeft className="h-4 w-4" /> Quay lại Combo
      </Link>

      <div className="gradient-purple rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="h-6 w-6" />
          <span className="font-medium opacity-80">{combo.combo_items?.length || 0} ebook trong combo</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">{combo.title}</h1>
        <p className="text-white/80 mb-6">{combo.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold">{new Intl.NumberFormat('vi-VN').format(combo.price)}đ</span>
          {discount > 0 && (
            <>
              <span className="text-lg line-through opacity-60">{new Intl.NumberFormat('vi-VN').format(originalPrice)}đ</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">Tiết kiệm {discount}%</span>
            </>
          )}
        </div>
      </div>

      <BuyComboButton combo={combo} />

      <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-6">Ebook trong combo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combo.combo_items?.map((item: any) => (
          <Link key={item.id} href={`/ebooks/${item.ebooks?.slug}`} className="flex gap-4 bg-white border rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={convertDriveUrl(item.ebooks?.cover_url || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200')}
                alt={item.ebooks?.title || ''}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{item.ebooks?.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.ebooks?.description}</p>
              <span className="text-sm text-purple-600 font-medium mt-2 inline-block">
                {new Intl.NumberFormat('vi-VN').format(item.ebooks?.price || 0)}đ
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
