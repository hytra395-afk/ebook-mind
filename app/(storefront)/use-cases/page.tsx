import { BookOpen, Lightbulb, TrendingUp, Users } from 'lucide-react'

export default function UseCasesPage() {
  const cases = [
    { icon: BookOpen, title: 'Sinh viên', desc: 'Bổ sung kiến thức ngoài giảng đường với giá cả phải chăng. Combo ebook giúp tiết kiệm chi phí học tập.' },
    { icon: TrendingUp, title: 'Người đi làm', desc: 'Nâng cao kỹ năng chuyên môn, phát triển sự nghiệp với các ebook về quản lý, kinh doanh, công nghệ.' },
    { icon: Lightbulb, title: 'Khởi nghiệp', desc: 'Trang bị kiến thức nền tảng về marketing, tài chính, quản lý dự án cho hành trình khởi nghiệp.' },
    { icon: Users, title: 'Doanh nghiệp', desc: 'Đào tạo nhân viên với chi phí thấp. Mua combo ebook cho team với ưu đãi đặc biệt.' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Use Cases</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Ebook Mind phục vụ nhiều đối tượng khác nhau, từ sinh viên đến doanh nghiệp</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <div key={i} className="bg-white border rounded-xl p-8 hover:shadow-lg transition-shadow">
            <c.icon className="h-10 w-10 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">{c.title}</h3>
            <p className="text-gray-600 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
