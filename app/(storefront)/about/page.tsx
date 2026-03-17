import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi - Ebook Mind',
  description: 'Ebook Mind là nền tảng ebook chất lượng cao với sứ mệnh mang kiến thức và giá trị thực tế đến gần hơn với mọi người. Kiến thức thực tế, giá cả phù hợp.',
  openGraph: {
    title: 'Về Chúng Tôi - Ebook Mind',
    description: 'Nền tảng ebook chất lượng cao với kiến thức thực tế và giá cả phù hợp',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Về <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Chúng Tôi</span></h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed mb-6">
          <strong>Ebook Mind</strong> là nền tảng ebook chất lượng cao với sứ mệnh mang kiến thức và giá trị thực tế đến gần hơn với mọi người. 
          Chúng tôi tin rằng mỗi người đều có khả năng phát triển bản thân, nâng cao kỹ năng, kiếm thêm thu nhập và xây dựng con đường riêng của mình – 
          miễn là họ có được kiến thức đúng đắn từ những người đã thực sự trải nghiệm nó.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Khác với những khóa học online đắt đỏ hay những cuốn sách giấy nặng nề, Ebook Mind mang đến kiến thức thực tế, 
          dễ tiếp cận, và có giá phù hợp với mọi người. Chúng tôi không chỉ bán ebook – chúng tôi mang lại cơ hội để bạn 
          thay đổi cuộc sống thông qua hành động và kiến thức.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4"><span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Sứ mệnh</span></h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Tạo ra một thư viện ebook phong phú, dễ tiếp cận, giúp mọi người nâng cao kỹ năng, kiếm thêm thu nhập, 
          phát triển tầm nhìn, phát triển hướng đi thông qua việc đọc và hành động.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Giá trị <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">cốt lõi</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">Kiến thức thực tế</h3>
            <p className="text-sm text-gray-600">Nội dung ebook được thu thập từ những kinh nghiệm thật, kiến thức thật được chia sẻ từ những người đã trải nghiệm chúng.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">Giá cả phù hợp</h3>
            <p className="text-sm text-gray-600">Không đắt đỏ như những khóa học. Kiến thức tại Ebook Mind có giá cực phù hợp để ai cũng có thể tiếp cận.</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">Tiện lợi & Hành động</h3>
            <p className="text-sm text-gray-600">Mua và tải ngay, đọc mọi lúc mọi nơi, và quan trọng nhất – hành động ngay để thay đổi cuộc sống.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
