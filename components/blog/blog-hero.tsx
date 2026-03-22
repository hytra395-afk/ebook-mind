import { BookOpen, TrendingUp } from 'lucide-react'

export default function BlogHero() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-violet-50 to-fuchsia-50 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-violet-200 text-violet-700 text-sm font-medium px-4 py-2 rounded-full mb-6 shadow-sm">
            <BookOpen className="w-4 h-4" />
            Blog Ebook Mind
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Kiến Thức Phát Triển
            </span>
            <br />
            <span className="text-gray-900">Tốt Nhất 2026</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Khám phá bí quyết kinh doanh vốn nhỏ, solo business, và kinh doanh ngách từ những người đã thành công. 
            Kiến thức thực tế, dễ áp dụng, giúp bạn bắt đầu và phát triển doanh nghiệp.
          </p>

          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { icon: '💰', text: 'Kinh Doanh Vốn Nhỏ' },
              { icon: '🚀', text: 'Solo Business' },
              { icon: '🎯', text: 'Kinh Doanh Ngách' },
              { icon: '🧠', text: 'Mindset & Kỹ Năng' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <span>{item.icon}</span>
                <span className="font-medium text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/30 to-violet-200/30 blur-3xl" style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-fuchsia-200/30 to-pink-200/30 blur-3xl" style={{ right: '10%', bottom: '20%' }} />
      </div>
    </section>
  )
}
