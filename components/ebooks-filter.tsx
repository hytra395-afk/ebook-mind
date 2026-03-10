'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

interface Level {
  id: string
  name: string
}

interface EbooksFilterProps {
  categories: Category[]
  levels: Level[]
  activeCategory?: string
  activeSort: string
  search: string
}

export default function EbooksFilter({
  categories,
  activeCategory,
  activeSort,
  search,
}: EbooksFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`/ebooks?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const val = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value.trim()
    updateParam('search', val || undefined)
  }

  return (
    <div className="space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <input
            name="search"
            type="text"
            defaultValue={search}
            placeholder="Tìm kiếm ebook..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
          />
        </form>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <select
            value={activeSort}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="border border-gray-200 rounded-xl text-sm px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer text-gray-700"
          >
            <option value="newest">Mới nhất</option>
            <option value="bestseller">Bán chạy nhất</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="price_asc">Giá: Thấp → Cao</option>
            <option value="price_desc">Giá: Cao → Thấp</option>
          </select>
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => updateParam('category', undefined)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
              !activeCategory
                ? 'gradient-purple text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => updateParam('category', cat.slug)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                activeCategory === cat.slug
                  ? 'gradient-purple text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
