import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Chính sách Cookie – Ebook Mind',
  description: 'Tìm hiểu cách Ebook Mind sử dụng cookies để cải thiện trải nghiệm của bạn',
}

export default function CookiesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại trang chủ
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chính sách Cookie</h1>
          <p className="text-gray-500 mb-8">Cập nhật lần cuối: 12/03/2026</p>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ebook Mind sử dụng cookies và công nghệ tương tự để cải thiện trải nghiệm của bạn, 
              phân tích lưu lượng truy cập và cá nhân hóa nội dung. Trang này giải thích cách chúng tôi sử dụng cookies.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Cookie là gì?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies là các tệp văn bản nhỏ được lưu trữ trên thiết bị của bạn (máy tính, điện thoại, máy tính bảng) 
              khi bạn truy cập website. Chúng giúp website "nhớ" thông tin về lượt truy cập của bạn.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Ví dụ:</strong> Cookies giúp bạn không phải đăng nhập lại mỗi lần truy cập, 
              hoặc ghi nhớ các ebook trong giỏ hàng của bạn.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Các loại cookies chúng tôi sử dụng</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2.1. Cookies cần thiết</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Những cookies này là bắt buộc để website hoạt động. Bạn không thể tắt chúng.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Duy trì phiên đăng nhập của bạn</li>
              <li>Lưu trữ giỏ hàng tạm thời</li>
              <li>Bảo mật và xác thực</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2.2. Cookies chức năng</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Giúp ghi nhớ tùy chọn của bạn và cung cấp trải nghiệm cá nhân hóa.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Ghi nhớ danh mục ebook yêu thích</li>
              <li>Lưu tùy chọn hiển thị</li>
              <li>Ngôn ngữ và múi giờ</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">2.3. Cookies phân tích</h3>
            <p className="text-gray-700 leading-relaxed">
              Giúp chúng tôi hiểu cách người dùng tương tác với website để cải thiện dịch vụ.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Cookies của bên thứ ba</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Chúng tôi sử dụng dịch vụ của bên thứ ba có thể đặt cookies trên thiết bị của bạn:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                <p className="text-sm text-gray-600 mb-2">Phân tích lưu lượng truy cập và hành vi người dùng</p>
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Chính sách riêng tư →
                </a>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Vercel Analytics</h4>
                <p className="text-sm text-gray-600 mb-2">Giám sát hiệu suất website</p>
                <a 
                  href="https://vercel.com/legal/privacy-policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-600 hover:underline"
                >
                  Chính sách riêng tư →
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Quản lý cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Bạn có thể kiểm soát và xóa cookies thông qua cài đặt trình duyệt:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">🌐 Chrome</h4>
                <p className="text-sm text-gray-600">Settings → Privacy and security → Cookies and other site data</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-gray-900 mb-2">🦊 Firefox</h4>
                <p className="text-sm text-gray-600">Options → Privacy & Security → Cookies and Site Data</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">🧭 Safari</h4>
                <p className="text-sm text-gray-600">Preferences → Privacy → Manage Website Data</p>
              </div>

              <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200">
                <h4 className="font-semibold text-gray-900 mb-2">🌊 Edge</h4>
                <p className="text-sm text-gray-600">Settings → Cookies and site permissions → Cookies and site data</p>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="text-sm text-yellow-800">
                <strong>Lưu ý:</strong> Nếu bạn chặn hoặc xóa cookies, một số tính năng của website 
                (như giỏ hàng, đăng nhập) có thể không hoạt động đúng cách.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Do Not Track (DNT)</h2>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi tôn trọng tín hiệu "Do Not Track" từ trình duyệt của bạn. Khi DNT được bật, 
              chúng tôi sẽ không sử dụng cookies phân tích hoặc theo dõi hành vi của bạn.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Cập nhật chính sách</h2>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi có thể cập nhật chính sách cookies này theo thời gian. Thay đổi sẽ được đăng trên trang này 
              với ngày cập nhật mới. Chúng tôi khuyến khích bạn xem lại định kỳ.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Liên hệ</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nếu bạn có câu hỏi về chính sách cookies, vui lòng liên hệ:
            </p>
            <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:ebookmind0@gmail.com" className="text-purple-600 hover:underline">
                  ebookmind0@gmail.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Website:</strong>{' '}
                <a href="https://ebookmind.com" className="text-purple-600 hover:underline">
                  https://ebookmind.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
