import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Chính sách bảo mật – Ebook Mind',
  description: 'Tìm hiểu cách Ebook Mind bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn',
}

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chính sách bảo mật</h1>
          <p className="text-gray-500 mb-8">Cập nhật lần cuối: 12/03/2026</p>
          
          <div className="prose prose-purple max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Tại Ebook Mind, chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của bạn. 
              Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Thông tin chúng tôi thu thập</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1.1. Thông tin cá nhân</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Họ tên, email khi bạn mua ebook</li>
              <li>Thông tin thanh toán (được xử lý qua cổng thanh toán bảo mật)</li>
              <li>Lịch sử mua hàng và ebook đã tải</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">1.2. Thông tin tự động</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Địa chỉ IP, loại trình duyệt, thiết bị</li>
              <li>Thời gian truy cập và các trang bạn xem</li>
              <li>Cookies và công nghệ theo dõi tương tự</li>
              <li>Hành vi duyệt ebook và tương tác với nội dung</li>
              <li>Dữ liệu hiệu suất website</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Cách chúng tôi sử dụng thông tin</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Cung cấp và cải thiện dịch vụ Ebook Mind</li>
              <li>Xử lý đơn hàng và gửi link tải ebook</li>
              <li>Xử lý thanh toán và quản lý giao dịch</li>
              <li>Gửi email xác nhận đơn hàng và thông tin ebook</li>
              <li>Gửi thông báo về ebook mới, khuyến mãi (nếu bạn đồng ý)</li>
              <li>Phân tích và cải thiện trải nghiệm người dùng</li>
              <li>Bảo vệ chống gian lận và lạm dụng</li>
              <li>Tuân thủ nghĩa vụ pháp lý</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Bảo mật thông tin</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ dữ liệu của bạn:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Mã hóa SSL/TLS:</strong> Tất cả dữ liệu truyền tải được mã hóa</li>
              <li><strong>Lưu trữ an toàn:</strong> Dữ liệu được lưu trữ trên nền tảng bảo mật cấp doanh nghiệp</li>
              <li><strong>Thanh toán an toàn:</strong> Xử lý qua cổng thanh toán uy tín</li>
              <li><strong>Kiểm tra bảo mật:</strong> Định kỳ kiểm tra và cập nhật hệ thống</li>
              <li><strong>Quyền truy cập hạn chế:</strong> Chỉ nhân viên được ủy quyền mới có quyền truy cập</li>
              <li><strong>Backup định kỳ:</strong> Sao lưu dữ liệu để phòng ngừa mất mát</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Quyền của bạn</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Bạn có các quyền sau:</p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Quyền truy cập</h4>
                <p className="text-sm text-gray-600">Xem thông tin cá nhân chúng tôi lưu trữ về bạn</p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Quyền chỉnh sửa</h4>
                <p className="text-sm text-gray-600">Cập nhật hoặc sửa thông tin không chính xác</p>
              </div>

              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Quyền xóa</h4>
                <p className="text-sm text-gray-600">Yêu cầu xóa tài khoản và dữ liệu của bạn</p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Quyền xuất dữ liệu</h4>
                <p className="text-sm text-gray-600">Tải xuống bản sao lịch sử mua hàng và ebook của bạn</p>
              </div>

              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2">✓ Quyền từ chối</h4>
                <p className="text-sm text-gray-600">Không đồng ý với email marketing (vẫn nhận email đơn hàng)</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Để thực hiện các quyền này, vui lòng liên hệ:{' '}
              <a href="mailto:ebookmind0@gmail.com" className="text-purple-600 hover:underline font-medium">
                ebookmind0@gmail.com
              </a>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Chia sẻ thông tin</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800 font-semibold">
                Chúng tôi KHÔNG bán thông tin cá nhân của bạn cho bất kỳ bên thứ ba nào.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">Chúng tôi chỉ chia sẻ thông tin với:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Nhà cung cấp dịch vụ:</strong> Các đối tác cung cấp dịch vụ lưu trữ, email và công cụ hỗ trợ</li>
              <li><strong>Cổng thanh toán:</strong> Để xử lý thanh toán an toàn</li>
              <li><strong>Yêu cầu pháp lý:</strong> Khi được yêu cầu bởi cơ quan có thẩm quyền theo quy định pháp luật</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Lưu trữ dữ liệu</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Dữ liệu của bạn được lưu trữ:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li><strong>Thông tin tài khoản:</strong> Lưu trữ vô thời hạn cho đến khi bạn yêu cầu xóa</li>
              <li><strong>Lịch sử mua hàng:</strong> Lưu trữ tối thiểu 5 năm theo quy định pháp luật về hóa đơn</li>
              <li><strong>Link tải ebook:</strong> Có hiệu lực vĩnh viễn (bạn có thể tải lại bất cứ lúc nào)</li>
              <li><strong>Sau khi xóa tài khoản:</strong> Dữ liệu cá nhân sẽ bị xóa vĩnh viễn trong vòng 30 ngày</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Chúng tôi sử dụng cookies để:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Lưu trữ giỏ hàng tạm thời</li>
              <li>Ghi nhớ tùy chọn của bạn</li>
              <li>Phân tích cách sử dụng website</li>
              <li>Cải thiện trải nghiệm người dùng</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Xem thêm tại{' '}
              <Link href="/cookies" className="text-purple-600 hover:underline font-medium">
                Chính sách Cookie
              </Link>
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Quyền riêng tư của trẻ em</h2>
            <p className="text-gray-700 leading-relaxed">
              Dịch vụ của chúng tôi không dành cho trẻ em dưới 13 tuổi. Chúng tôi không cố ý thu thập 
              thông tin cá nhân từ trẻ em. Nếu bạn là phụ huynh và phát hiện con bạn đã cung cấp thông tin, 
              vui lòng liên hệ để chúng tôi xóa dữ liệu.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">9. Chuyển giao dữ liệu quốc tế</h2>
            <p className="text-gray-700 leading-relaxed">
              Dữ liệu của bạn có thể được lưu trữ và xử lý tại các máy chủ ở nước ngoài. 
              Chúng tôi đảm bảo rằng các đối tác này tuân thủ các tiêu chuẩn bảo mật quốc tế.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">10. Thay đổi chính sách</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để phản ánh thay đổi trong 
              hoạt động kinh doanh hoặc yêu cầu pháp lý.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Thay đổi quan trọng sẽ được thông báo qua email</li>
              <li>Thay đổi nhỏ sẽ được cập nhật trên trang này</li>
              <li>Ngày "Cập nhật lần cuối" sẽ được thay đổi</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Việc bạn tiếp tục sử dụng dịch vụ sau khi thay đổi có nghĩa là bạn chấp nhận chính sách mới.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Liên hệ</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nếu bạn có câu hỏi, thắc mắc hoặc khiếu nại về chính sách bảo mật này, vui lòng liên hệ:
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <p className="text-gray-700 mb-3">
                <strong className="text-gray-900">Email:</strong>{' '}
                <a href="mailto:ebookmind0@gmail.com" className="text-purple-600 hover:underline">
                  ebookmind0@gmail.com
                </a>
              </p>
              <p className="text-gray-700 mb-3">
                <strong className="text-gray-900">Website:</strong>{' '}
                <a href="https://ebookmind.com" className="text-purple-600 hover:underline">
                  https://ebookmind.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong className="text-gray-900">Thời gian phản hồi:</strong> Trong vòng 48 giờ làm việc
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
              <p className="text-sm text-blue-800">
                <strong>Cam kết của chúng tôi:</strong> Ebook Mind cam kết bảo vệ quyền riêng tư của bạn 
                và chỉ sử dụng thông tin cá nhân theo đúng mục đích đã nêu trong chính sách này. 
                Chúng tôi không bao giờ bán hoặc cho thuê dữ liệu của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
