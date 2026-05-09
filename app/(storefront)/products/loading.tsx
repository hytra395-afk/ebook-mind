import { BookOpen, Star, Users } from 'lucide-react'

export default function EbooksLoading() {
  return (
    <div>
      {/* Store Header Skeleton */}
      <section className="hero-gradient py-11 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/60 border border-purple-200 text-purple-600 text-sm font-medium px-3.5 py-1.5 rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <div className="h-4 w-20 bg-purple-200 rounded animate-pulse"></div>
          </div>
          <div className="h-10 w-64 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse"></div>
          <div className="h-6 w-96 bg-gray-100 rounded mx-auto animate-pulse"></div>

          {/* Stats bar */}
          <div className="flex items-center justify-center gap-6 mt-6 text-base text-gray-400">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-[1.125rem] h-[1.125rem]" />
              100+ ebook
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Star className="w-[1.125rem] h-[1.125rem]" />
              Đánh giá 4.9/5⭐
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-[1.125rem] h-[1.125rem]" />
              10,000+ độc giả
            </span>
          </div>
        </div>
      </section>

      {/* Reading Effectively Block Skeleton */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="h-8 w-48 bg-gray-200 rounded mb-5 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
                <div className="w-10 h-10 rounded-full bg-gray-200 mb-2.5 animate-pulse"></div>
                <div className="h-4 w-16 bg-gray-200 rounded mb-1 animate-pulse"></div>
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Grid Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter Skeleton */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-9 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-10 flex-1 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-xl mb-3"></div>
              <div className="h-5 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-purple-600">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            <span className="text-sm font-medium">Đang tải ebooks...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
