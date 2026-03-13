import { Gift, Sparkles, BookOpen, Zap, Target } from 'lucide-react'

export default function ComboHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl mb-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="relative px-8 py-16 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Gift className="w-4 h-4" />
          <span>Ưu đãi đặc biệt</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          Combo Ưu Đãi
          <span className="block mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Tiết Kiệm Đến 40%
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Mua combo ebook - Học toàn diện, giá tốt nhất. 
          Đầu tư thông minh cho sự phát triển của bạn.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm md:text-base">
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-green-600" />
            </div>
            <span>Tiết kiệm 20-40%</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <span>Kiến thức đầy đủ</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-600" />
            </div>
            <span>Học có hệ thống</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-700">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-orange-600" />
            </div>
            <span>Kiến thức thực tế</span>
          </div>
        </div>
      </div>
    </div>
  )
}
