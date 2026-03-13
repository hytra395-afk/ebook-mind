import { DollarSign, BookOpen, Target, Zap } from 'lucide-react'

const benefits = [
  {
    icon: DollarSign,
    title: 'Tiết kiệm chi phí',
    description: 'Giảm 20-40% so với mua lẻ từng ebook. Đầu tư thông minh cho kiến thức.',
    color: 'green'
  },
  {
    icon: BookOpen,
    title: 'Kiến thức toàn diện',
    description: 'Học có hệ thống. Nội dung được sắp xếp logic.',
    color: 'blue'
  },
  {
    icon: Target,
    title: 'Chọn lọc kỹ càng',
    description: 'Nội dung được thu thập và chọn lọc từ kinh nghiệm thật của hàng trăm người.',
    color: 'purple'
  },
  {
    icon: Zap,
    title: 'Truy cập ngay lập tức',
    description: 'Tải về đọc ngay sau khi thanh toán. Không giới hạn thời gian.',
    color: 'orange'
  }
]

const colorClasses = {
  green: {
    bg: 'bg-green-50',
    icon: 'text-green-600',
    border: 'border-green-100'
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'text-blue-600',
    border: 'border-blue-100'
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'text-purple-600',
    border: 'border-purple-100'
  },
  orange: {
    bg: 'bg-orange-50',
    icon: 'text-orange-600',
    border: 'border-orange-100'
  }
}

export default function ComboBenefits() {
  return (
    <div className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tại sao nên mua Combo?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Combo ebook mang lại nhiều lợi ích vượt trội so với mua lẻ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          const colors = colorClasses[benefit.color as keyof typeof colorClasses]
          
          return (
            <div
              key={index}
              className={`bg-white border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-shadow`}
            >
              <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-7 h-7 ${colors.icon}`} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
