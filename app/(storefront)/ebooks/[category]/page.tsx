import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'
import EbooksFilter from '@/components/ebooks-filter'
import { Suspense } from 'react'
import { BookOpen, Star, Users } from 'lucide-react'

export const revalidate = 300
export const dynamic = 'force-static'

const ITEMS_PER_PAGE = 9

export default async function CategoryEbooksPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>
  searchParams: Promise<{ level?: string; search?: string; sort?: string; page?: string }>
}) {
  const { category } = await params
  const queryParams = await searchParams
  const supabase = getSupabase()
  const page = Math.max(1, parseInt(queryParams.page || '1', 10))
  const offset = (page - 1) * ITEMS_PER_PAGE

  // Optimize query - only select needed fields
  let query = supabase
    .from('ebooks')
    .select('id, slug, title, description, price, cover_url, rating_avg, rating_count, sales_count, featured, categories(name, slug)', { count: 'exact' })
    .eq('active', true)
    .eq('categories.slug', category)

  if (queryParams.search) {
    query = query.ilike('title', `%${queryParams.search}%`)
  }

  const sortMap: Record<string, { col: string; asc: boolean }> = {
    newest: { col: 'created_at', asc: false },
    bestseller: { col: 'sales_count', asc: false },
    price_asc: { col: 'price', asc: true },
    price_desc: { col: 'price', asc: false },
    rating: { col: 'rating_avg', asc: false },
  }
  const sort = sortMap[queryParams.sort || 'newest'] ?? sortMap.newest
  query = query.order(sort.col, { ascending: sort.asc }).range(offset, offset + ITEMS_PER_PAGE - 1)

  const { data: ebooks, count: totalCount } = await query
  const totalPages = Math.ceil((totalCount || 0) / ITEMS_PER_PAGE)

  // Parallel queries for better performance
  const [categoriesResult, levelsResult] = await Promise.all([
    supabase.from('categories').select('id, name, slug').order('name'),
    supabase.from('levels').select('id, name')
  ])
  
  const categories = categoriesResult.data
  const levels = levelsResult.data
  const currentCategory = categories?.find(c => c.slug === category)

  const totalEbooks = ebooks?.length ?? 0

  return (
    <div>
      {/* Store Header */}
      <section className="hero-gradient py-10 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/60 border border-purple-200 text-purple-600 text-xs font-medium px-3 py-1 rounded-full mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            {currentCategory?.name || 'Ebook Store'}
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            <span className="gradient-text-purple">{currentCategory?.name || 'Ebook Store'}</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-lg mx-auto">
            Nội dung được thu thập từ những kinh nghiệm thật, kiến thức thật của hàng trăm người
          </p>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-purple-400" />
              100+ ebook
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400" />
              Đánh giá 4.9⭐
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-teal-400" />
              10,000+ độc giả
            </span>
          </div>
        </div>
      </section>

      {/* Filter + Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100 rounded-xl" />}>
          <EbooksFilter
            categories={categories ?? []}
            levels={levels ?? []}
            activeCategory={category}
            activeSort={queryParams.sort || 'newest'}
            search={queryParams.search || ''}
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
                category={ebook.categories?.name}
              />
            ))}
          </div>
        </Suspense>

        {(!ebooks || ebooks.length === 0) && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm">
              {queryParams.search ? `Không tìm thấy ebook nào cho "${queryParams.search}"` : 'Chưa có ebook nào.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3 bg-gray-50 rounded-xl p-6">
            {page > 1 && (
              <a
                href={`/ebooks/${category}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(queryParams).filter(([k]) => k !== 'page')), page: String(page - 1) }).toString()}`}
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
                href={`/ebooks/${category}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(queryParams).filter(([k]) => k !== 'page')), page: String(p) }).toString()}`}
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
                href={`/ebooks/${category}?${new URLSearchParams({ ...Object.fromEntries(Object.entries(queryParams).filter(([k]) => k !== 'page')), page: String(page + 1) }).toString()}`}
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
