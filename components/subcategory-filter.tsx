'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface Subcategory {
  id: string
  name: string
  slug: string
  icon?: string
}

interface SubcategoryFilterProps {
  subcategories: Subcategory[]
  activeSubcategory?: string
}

export default function SubcategoryFilter({
  subcategories,
  activeSubcategory,
}: SubcategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set('subcategory', value)
      } else {
        params.delete('subcategory')
      }
      
      // Reset page to 1 when changing subcategory
      params.delete('page')
      
      const queryString = params.toString()
      router.push(queryString ? `/ebooks?${queryString}` : '/ebooks')
    },
    [router, searchParams]
  )

  if (!subcategories || subcategories.length === 0) {
    return null
  }

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-medium text-gray-700">Phân loại chi tiết:</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParam(undefined)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer border ${
            !activeSubcategory
              ? 'bg-purple-50 text-purple-700 border-purple-200'
              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
        >
          Tất cả
        </button>
        {subcategories.map((subcat) => (
          <button
            key={subcat.id}
            type="button"
            onClick={() => updateParam(subcat.slug)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition cursor-pointer border ${
              activeSubcategory === subcat.slug
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {subcat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
