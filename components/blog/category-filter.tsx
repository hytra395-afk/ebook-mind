'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = [
  'Tất cả',
  'Kinh Doanh Vốn Nhỏ',
  'Solo Business',
  'Kinh Doanh Ngách',
  'Mindset & Tư Duy',
  'Kỹ Năng',
  'Ebook & Học Tập'
]

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category') || 'Tất cả'

  const handleCategoryChange = (category: string) => {
    if (category === 'Tất cả') {
      router.push('/blog')
    } else {
      router.push(`/blog?category=${encodeURIComponent(category)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            currentCategory === category
              ? 'bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:shadow-md'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
