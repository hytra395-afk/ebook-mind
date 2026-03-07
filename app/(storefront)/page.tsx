import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'
import Link from 'next/link'
import { Gift } from 'lucide-react'

export const revalidate = 60

export default async function HomePage() {
  const supabase = getSupabase()
  const { data: featuredEbooks } = await supabase
    .from('ebooks')
    .select('*, categories(name)')
    .eq('active', true)
    .eq('featured', true)
    .order('sales_count', { ascending: false })
    .limit(8)

  const { data: combos } = await supabase
    .from('combos')
    .select('*')
    .eq('active', true)
    .eq('featured', true)
    .limit(4)

  const { data: allEbooks } = await supabase
    .from('ebooks')
    .select('*, categories(name)')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-purple text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kiến thức giá bằng một cốc trà sữa
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Khám phá bộ sưu tập ebook chất lượng cao, được biên soạn kỹ lưỡng bởi các chuyên gia hàng đầu.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/ebooks"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Khám phá Ebook
            </Link>
            <Link
              href="/combos"
              className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Xem Combo Ưu Đãi
            </Link>
          </div>
        </div>
      </section>

      {/* Combo Banner */}
      {combos && combos.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <Link href="/combos" className="block bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition">
            <div className="flex items-center gap-3">
              <Gift className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-700">Combo Ưu Đãi</span>
              <span className="text-sm text-purple-500">Tiết kiệm đến 50% khi mua combo</span>
            </div>
          </Link>
        </section>
      )}

      {/* Featured Ebooks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Ebook <span className="text-purple-600">Nổi Bật</span>
          </h2>
          <p className="text-gray-500 mt-2">Được yêu thích và đánh giá cao nhất từ cộng đồng</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredEbooks?.map((ebook: any) => (
            <EbookCard
              key={ebook.id}
              id={ebook.id}
              slug={ebook.slug}
              title={ebook.title}
              description={ebook.description}
              price={ebook.price}
              cover_url={ebook.cover_url}
              rating_avg={ebook.rating_avg}
              rating_count={ebook.rating_count}
              sales_count={ebook.sales_count}
              featured={ebook.featured}
              category={ebook.categories?.name}
            />
          ))}
        </div>
        {(!featuredEbooks || featuredEbooks.length === 0) && (
          <p className="text-center text-gray-400 py-12">Chưa có ebook nổi bật. Hãy thêm ebook trong Admin Dashboard.</p>
        )}
      </section>

      {/* All Ebooks */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Ebook Mới Nhất</h2>
              <p className="text-gray-500 mt-1">Cập nhật liên tục mỗi tuần</p>
            </div>
            <Link href="/ebooks" className="text-purple-600 font-semibold hover:underline">
              Xem tất cả →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allEbooks?.map((ebook: any) => (
              <EbookCard
                key={ebook.id}
                id={ebook.id}
                slug={ebook.slug}
                title={ebook.title}
                description={ebook.description}
                price={ebook.price}
                cover_url={ebook.cover_url}
                rating_avg={ebook.rating_avg}
                rating_count={ebook.rating_count}
                sales_count={ebook.sales_count}
                featured={ebook.featured}
                category={ebook.categories?.name}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
