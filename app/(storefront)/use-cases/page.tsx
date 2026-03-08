import { BookOpen, Lightbulb, TrendingUp, Users, Briefcase, GraduationCap, Rocket, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function UseCasesPage() {
  const cases = [
    { 
      icon: GraduationCap, 
      title: 'Sinh viên', 
      desc: 'Bổ sung kiến thức ngoài giảng đường với giá cả phải chăng. Combo ebook giúp tiết kiệm chi phí học tập.',
      gradient: 'from-indigo-500 to-violet-500',
      examples: ['Kỹ năng học tập', 'Tài liệu tham khảo', 'Phát triển bản thân']
    },
    { 
      icon: Briefcase, 
      title: 'Người đi làm', 
      desc: 'Nâng cao kỹ năng chuyên môn, phát triển sự nghiệp với các ebook về quản lý, kinh doanh, công nghệ.',
      gradient: 'from-violet-500 to-fuchsia-500',
      examples: ['Quản lý thời gian', 'Kỹ năng lãnh đạo', 'Chuyên môn nghiệp vụ']
    },
    { 
      icon: Rocket, 
      title: 'Khởi nghiệp', 
      desc: 'Trang bị kiến thức nền tảng về marketing, tài chính, quản lý dự án cho hành trình khởi nghiệp.',
      gradient: 'from-teal-400 to-cyan-400',
      examples: ['Marketing & Growth', 'Fundraising', 'Product Development']
    },
    { 
      icon: Building2, 
      title: 'Doanh nghiệp', 
      desc: 'Đào tạo nhân viên với chi phí thấp. Mua combo ebook cho team với ưu đãi đặc biệt.',
      gradient: 'from-orange-400 to-rose-500',
      examples: ['Đào tạo nội bộ', 'Upskilling team', 'Knowledge base']
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-purple-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Ebook Mind cho <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">mọi người</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dù bạn là sinh viên, người đi làm, khởi nghiệp hay doanh nghiệp - chúng tôi có ebook phù hợp cho bạn
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cases.map((c, i) => (
            <div key={i} className="group relative">
              {/* Gradient glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${c.gradient} rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300`}></div>
              
              <div className="relative bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Icon with gradient background */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${c.gradient} flex items-center justify-center mb-5 shadow-lg`}>
                  <c.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{c.desc}</p>
                
                {/* Examples tags */}
                <div className="flex flex-wrap gap-2">
                  {c.examples.map((ex, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 bg-purple-50 text-purple-700 rounded-full font-medium">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Khám phá hàng trăm ebook chất lượng cao với giá chỉ bằng một cốc trà sữa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ebooks"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Khám phá Ebook
            </Link>
            <Link
              href="/combos"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all"
            >
              Xem Combo Ưu Đãi
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
