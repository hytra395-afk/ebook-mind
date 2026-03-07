import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'

export const revalidate = 60

export default async function EbooksPage() {
  const supabase = getSupabase()
  const { data: ebooks } = await supabase
    .from('ebooks')
    .select('*, categories(name)')
    .eq('active', true)
    .order('created_at', { ascending: false })

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ebook Store</h1>
      <p className="text-gray-500 mb-8">Khám phá bộ sưu tập ebook chất lượng cao</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <span className="px-4 py-2 bg-purple-600 text-white text-sm rounded-full font-medium">Tất cả</span>
        {categories?.map((cat: any) => (
          <span key={cat.id} className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-200 cursor-pointer">
            {cat.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ebooks?.map((ebook: any) => (
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

      {(!ebooks || ebooks.length === 0) && (
        <p className="text-center text-gray-400 py-20">Chưa có ebook nào. Hãy thêm ebook trong Admin Dashboard.</p>
      )}
    </div>
  )
}
