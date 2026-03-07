export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Về Chúng Tôi</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed mb-6">
          <strong>Ebook Mind</strong> là nền tảng ebook chất lượng cao với sứ mệnh mang kiến thức đến gần hơn với mọi người.
          Chúng tôi tin rằng kiến thức không nên bị giới hạn bởi giá cả – mỗi cuốn ebook chỉ có giá bằng một cốc trà sữa.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Sứ mệnh</h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Tạo ra một thư viện ebook phong phú, dễ tiếp cận, giúp mọi người phát triển bản thân, nâng cao kỹ năng
          và mở rộng tầm nhìn thông qua việc đọc sách.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Giá trị cốt lõi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold text-purple-700 mb-2">Chất lượng</h3>
            <p className="text-sm text-gray-600">Mỗi ebook được biên soạn kỹ lưỡng bởi các chuyên gia</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold text-purple-700 mb-2">Giá cả hợp lý</h3>
            <p className="text-sm text-gray-600">Kiến thức giá bằng một cốc trà sữa</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-6">
            <h3 className="font-bold text-purple-700 mb-2">Tiện lợi</h3>
            <p className="text-sm text-gray-600">Mua và tải ngay, đọc mọi lúc mọi nơi</p>
          </div>
        </div>
      </div>
    </div>
  )
}
