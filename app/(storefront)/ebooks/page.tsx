import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'
import EbooksFilter from '@/components/ebooks-filter'
import { Suspense } from 'react'
import { BookOpen, Star, Users, NotebookPen, Search, Lightbulb, Rocket } from 'lucide-react'

export const revalidate = 60 // ISR: revalidate every 60 seconds
export const dynamic = 'force-dynamic' // Enable dynamic rendering for filters

const ITEMS_PER_PAGE = 9

export default async function EbooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; level?: string; search?: string; sort?: string; page?: string }>
}) {
  const params = await searchParams
  const supabase = getSupabase()
  const page = Math.max(1, parseInt(params.page || '1', 10))
  const offset = (page - 1) * ITEMS_PER_PAGE

  // Optimize query - only select needed fields
  let query = supabase
    .from('ebooks')
    .select('id, slug, title, description, price, cover_url, rating_avg, rating_count, sales_count, pages, featured, bestseller, category_id, categories!inner(name, slug), levels(name)', { count: 'exact' })
    .eq('active', true)

  if (params.category) {
    query = query.eq('categories.slug', params.category)
  }
  if (params.search) {
    query = query.ilike('title', `%${params.search}%`)
  }

  const sortMap: Record<string, { col: string; asc: boolean }> = {
    newest: { col: 'created_at', asc: false },
    bestseller: { col: 'sales_count', asc: false },
    price_asc: { col: 'price', asc: true },
    price_desc: { col: 'price', asc: false },
    rating: { col: 'rating_avg', asc: false },
  }
  const sort = sortMap[params.sort || 'newest'] ?? sortMap.newest
  query = query.order(sort.col, { ascending: sort.asc }).range(offset, offset + ITEMS_PER_PAGE - 1)

  const { data: ebooks, count: totalCount } = await query
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)

  // Parallel queries for better performance
  const [categoriesResult, levelsResult] = await Promise.all([
    supabase.from('categories').select('id, name, slug'),
    supabase.from('levels').select('id, name')
  ])
  
  // Custom order for categories
  const categoryOrder = [
    'tu-duy-solo-business',
    'kinh-doanh-ngach',
    'phat-trien-ban-than',
    'cong-nghe',
    'suc-khoe'
  ]
  
  const categories = categoriesResult.data?.sort((a, b) => {
    const indexA = categoryOrder.indexOf(a.slug)
    const indexB = categoryOrder.indexOf(b.slug)
    return indexA - indexB
  })
  
  const levels = levelsResult.data
  const currentCategory = categories?.find(c => c.slug === params.category)

  return (
    <div>
      {/* Store Header */}
      <section className="hero-gradient py-11 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/60 border border-purple-200 text-purple-600 text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            {currentCategory?.name || 'Ebook Store'}
          </div>
          <h1 className="text-4xl sm:text-[2.75rem] font-extrabold text-gray-900 mb-3">
            <span className="gradient-text-purple">{params.category ? currentCategory?.name : 'Ebook Store'}</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto">
            Nội dung được thu thập từ những kinh nghiệm thật, kiến thức thật của hàng trăm người
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 mt-6 text-base text-gray-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-[1.125rem] h-[1.125rem] text-purple-400" />
              100+ ebook
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-[1.125rem] h-[1.125rem] text-yellow-400" />
              Đánh giá 4.9/5⭐
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-[1.125rem] h-[1.125rem] text-teal-400" />
              10,000+ độc giả
            </span>
          </div>
        </div>
      </section>

      {/* Reading Effectively Block - Reduced 8% */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[1.29rem] sm:text-[1.56rem] font-bold text-gray-900">Đọc ebook hiệu quả</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            {/* Step 1 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5 hover:bg-white transition shadow-xs">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white mb-2.5 shadow-sm">
                <NotebookPen className="w-[1.29rem] h-[1.29rem]" />
              </div>
              <div className="text-[0.86rem] font-semibold text-gray-900 mb-1">Bước 1</div>
              <p className="text-[0.86rem] text-gray-600">Đọc và ghi chép lại những kiến thức hữu ích.</p>
            </div>

            {/* Step 2 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5 hover:bg-white transition shadow-xs">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white mb-2.5 shadow-sm">
                <Search className="w-[1.29rem] h-[1.29rem]" />
              </div>
              <div className="text-[0.86rem] font-semibold text-gray-900 mb-1">Bước 2</div>
              <p className="text-[0.86rem] text-gray-600">Tìm thêm tài liệu liên quan để hiểu sâu hơn.</p>
            </div>

            {/* Step 3 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5 hover:bg-white transition shadow-xs">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white mb-2.5 shadow-sm">
                <Lightbulb className="w-[1.29rem] h-[1.29rem]" />
              </div>
              <div className="text-[0.86rem] font-semibold text-gray-900 mb-1">Bước 3</div>
              <p className="text-[0.86rem] text-gray-600">Phản biện và chọn lọc ý tưởng một cách chủ động.</p>
            </div>

            {/* Step 4 */}
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5 hover:bg-white transition shadow-xs">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white mb-2.5 shadow-sm">
                <Rocket className="w-[1.29rem] h-[1.29rem]" />
              </div>
              <div className="text-[0.86rem] font-semibold text-gray-900 mb-1">Bước 4</div>
              <p className="text-[0.86rem] text-gray-600">Hành động ngay — tránh đọc xong để đó.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100 rounded-xl" />}>
          <EbooksFilter
            categories={categories ?? []}
            levels={levels ?? []}
            activeCategory={params.category}
            activeSort={params.sort || 'newest'}
            search={params.search || ''}
          />
        </Suspense>

        {/* Grid */}
        <Suspense fallback={
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/4] rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        }>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
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
                bestseller={ebook.bestseller}
                category={ebook.categories?.name}
                level={ebook.levels?.name}
                pages={ebook.pages}
              />
            ))}
          </div>
        </Suspense>

        {(!ebooks || ebooks.length === 0) && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">
              {params.search ? `Không tìm thấy ebook nào cho "${params.search}"` : 'Chưa có ebook nào.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3 bg-gray-50 rounded-xl p-6">
            {page > 1 && (
              <a
                href={`/ebooks?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([k]) => k !== 'page')), page: String(page - 1) }).toString()}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Trước
              </a>
            )}
            
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              if (totalPages <= 5) return i + 1
              if (page <= 3) return i + 1
              if (page >= totalPages - 2) return totalPages - 4 + i
              return page - 2 + i
            }).map((p) => (
              <a
                key={p}
                href={`/ebooks?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([k]) => k !== 'page')), page: String(p) }).toString()}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  p === page
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                {p}
              </a>
            ))}

            {page < totalPages && (
              <a
                href={`/ebooks?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).filter(([k]) => k !== 'page')), page: String(page + 1) }).toString()}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition"
              >
                Sau
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
