import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, FileText, ShoppingCart, Copyright, Download, RefreshCw, Shield, AlertTriangle, Edit, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | Ebook Mind',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ của Ebook Mind - vui lòng đọc kỹ trước khi sử dụng.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Quay lại trang chủ</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Điều Khoản Sử Dụng</h1>
          <p className="text-lg text-gray-600">
            Vui lòng đọc kỹ các điều khoản và điều kiện trước khi sử dụng dịch vụ của Ebook Mind.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Chấp nhận điều khoản */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Chấp Nhận Điều Khoản</h2>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Bằng việc truy cập và sử dụng website <strong>ebookmind.com</strong> (sau đây gọi là "Website"), 
              bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sử dụng dưới đây.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Nếu bạn không đồng ý với bất kỳ phần nào của các điều khoản này, 
              vui lòng không sử dụng dịch vụ của chúng tôi.
            </p>
            <div className="bg-purple-50 rounded-lg p-4 text-sm">
              <p className="text-gray-800">
                <strong>Lưu ý quan trọng:</strong> Chúng tôi có quyền thay đổi, sửa đổi hoặc cập nhật các điều khoản này 
                bất kỳ lúc nào mà không cần thông báo trước. Việc bạn tiếp tục sử dụng dịch vụ sau khi có thay đổi 
                đồng nghĩa với việc bạn chấp nhận các điều khoản mới.
              </p>
            </div>
          </div>
        </section>

        {/* Sản phẩm và dịch vụ */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Sản Phẩm và Dịch Vụ</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.1. Sản phẩm</h3>
              <p className="text-sm leading-relaxed">
                Ebook Mind cung cấp các sản phẩm ebook số (định dạng PDF, EPUB, MOBI, v.v.) 
                thuộc nhiều lĩnh vực: Kinh Doanh, Phát Triển Bản Thân, Công Nghệ, Sức Khỏe, và các chủ đề khác.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.2. Mô tả sản phẩm</h3>
              <p className="text-sm leading-relaxed">
                Chúng tôi cố gắng mô tả sản phẩm một cách chính xác nhất có thể. Tuy nhiên, 
                chúng tôi không đảm bảo rằng mô tả, hình ảnh, hoặc nội dung khác trên Website là hoàn toàn chính xác, 
                đầy đủ, đáng tin cậy, cập nhật hoặc không có lỗi.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.3. Giá cả</h3>
              <p className="text-sm leading-relaxed">
                Giá của các sản phẩm có thể thay đổi bất kỳ lúc nào mà không cần thông báo trước. 
                Giá hiển thị tại thời điểm bạn hoàn tất thanh toán là giá cuối cùng được áp dụng.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">2.4. Tính sẵn có</h3>
              <p className="text-sm leading-relaxed">
                Tất cả sản phẩm ebook số đều có sẵn ngay lập tức sau khi thanh toán thành công. 
                Trong trường hợp hiếm hoi có lỗi kỹ thuật, chúng tôi sẽ liên hệ và hỗ trợ bạn trong thời gian sớm nhất.
              </p>
            </div>
          </div>
        </section>

        {/* Thanh toán */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">3. Thanh Toán</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.1. Phương thức thanh toán</h3>
              <p className="text-sm leading-relaxed mb-2">
                Chúng tôi chấp nhận thanh toán qua chuyển khoản ngân hàng nội địa Việt Nam thông qua cổng thanh toán Sepay.
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Chuyển khoản ngân hàng (VietQR, Internet Banking, Mobile Banking)</li>
                <li>Thanh toán tự động được xác nhận trong vòng 1-5 phút</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.2. Xác nhận thanh toán</h3>
              <p className="text-sm leading-relaxed">
                Sau khi thanh toán thành công, bạn sẽ nhận được email xác nhận kèm link tải ebook. 
                Nếu không nhận được email trong vòng 10 phút, vui lòng kiểm tra thư mục Spam hoặc liên hệ hỗ trợ.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">3.3. Bảo mật thanh toán</h3>
              <p className="text-sm leading-relaxed">
                Chúng tôi sử dụng cổng thanh toán Sepay - đối tác thanh toán uy tín tại Việt Nam. 
                Ebook Mind không lưu trữ thông tin thẻ ngân hàng hoặc tài khoản của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Quyền sở hữu trí tuệ */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <Copyright className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Quyền Sở Hữu Trí Tuệ</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.1. Bản quyền nội dung</h3>
              <p className="text-sm leading-relaxed">
                Tất cả nội dung ebook, hình ảnh, logo, thiết kế, văn bản, và tài liệu trên Website 
                đều thuộc quyền sở hữu của Ebook Mind hoặc các đối tác cấp phép hợp pháp.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">4.2. Giấy phép sử dụng</h3>
              <p className="text-sm leading-relaxed mb-2">
                Khi mua ebook, bạn được cấp giấy phép sử dụng cá nhân, không độc quyền, không thể chuyển nhượng với các điều kiện sau:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li><strong>Được phép:</strong> Đọc, lưu trữ, in ấn cho mục đích cá nhân</li>
                <li><strong>Không được phép:</strong> Sao chép, phân phối, chia sẻ, bán lại, hoặc sử dụng cho mục đích thương mại</li>
                <li><strong>Giới hạn:</strong> Chỉ được tải xuống trên tối đa 3 thiết bị cá nhân</li>
              </ul>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-800">
                <strong>Cảnh báo:</strong> Vi phạm bản quyền là hành vi bất hợp pháp và có thể bị xử lý theo pháp luật Việt Nam. 
                Chúng tôi sẽ khóa tài khoản vĩnh viễn và có thể khởi kiện đối với các trường hợp vi phạm nghiêm trọng.
              </p>
            </div>
          </div>
        </section>

        {/* Giới hạn tải xuống */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">5. Giới Hạn Tải Xuống</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.1. Số lần tải xuống</h3>
              <p className="text-sm leading-relaxed">
                Mỗi đơn hàng được phép tải xuống <strong>không giới hạn số lần</strong> trong vòng <strong>30 ngày</strong> kể từ ngày mua. 
                Sau 30 ngày, link tải sẽ hết hạn nhưng bạn vẫn có thể liên hệ hỗ trợ để được cấp lại.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.2. Thiết bị</h3>
              <p className="text-sm leading-relaxed">
                Bạn có thể tải ebook về tối đa <strong>3 thiết bị cá nhân</strong> (máy tính, điện thoại, máy đọc sách). 
                Nếu cần thêm thiết bị, vui lòng liên hệ hỗ trợ.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">5.3. Link tải hết hạn</h3>
              <p className="text-sm leading-relaxed">
                Nếu link tải của bạn đã hết hạn, vui lòng gửi email đến <a href="mailto:ebookmind0@gmail.com" className="text-purple-600 hover:underline font-medium">ebookmind0@gmail.com</a> kèm mã đơn hàng để được cấp lại miễn phí.
              </p>
            </div>
          </div>
        </section>

        {/* Chính sách hoàn tiền */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">6. Chính Sách Hoàn Tiền</h2>
            </div>
          </div>

          <div className="text-gray-700">
            <p className="text-sm leading-relaxed mb-4">
              Chúng tôi cam kết bảo vệ quyền lợi khách hàng với chính sách hoàn tiền minh bạch. 
              Vui lòng xem chi tiết tại trang <Link href="/refund-policy" className="text-purple-600 hover:underline font-semibold">Chính Sách Hoàn Tiền</Link>.
            </p>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Tóm tắt:</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Hoàn tiền 100% nếu file lỗi hoặc nội dung sai lệch nghiêm trọng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Thời gian xử lý: 3-5 ngày làm việc</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">✗</span>
                  <span>Không hoàn tiền nếu đã đọc nội dung hoặc vi phạm bản quyền</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quyền riêng tư */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">7. Quyền Riêng Tư</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">7.1. Thu thập thông tin</h3>
              <p className="text-sm leading-relaxed mb-2">
                Chúng tôi thu thập các thông tin sau khi bạn sử dụng dịch vụ:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Thông tin cá nhân: Họ tên, email, số điện thoại (nếu cung cấp)</li>
                <li>Thông tin giao dịch: Lịch sử mua hàng, phương thức thanh toán</li>
                <li>Thông tin kỹ thuật: IP address, trình duyệt, thiết bị truy cập</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">7.2. Sử dụng thông tin</h3>
              <p className="text-sm leading-relaxed mb-2">
                Thông tin của bạn được sử dụng cho các mục đích sau:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Xử lý đơn hàng và gửi ebook</li>
                <li>Gửi email xác nhận, hóa đơn, và thông báo quan trọng</li>
                <li>Cải thiện dịch vụ và trải nghiệm người dùng</li>
                <li>Gửi email marketing (chỉ khi bạn đồng ý - có thể hủy bất kỳ lúc nào)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">7.3. Bảo mật thông tin</h3>
              <p className="text-sm leading-relaxed">
                Chúng tôi cam kết bảo mật thông tin cá nhân của bạn và không chia sẻ với bên thứ ba 
                (trừ các đối tác cần thiết như cổng thanh toán, dịch vụ email) mà không có sự đồng ý của bạn.
              </p>
            </div>
          </div>
        </section>

        {/* Giới hạn trách nhiệm */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">8. Giới Hạn Trách Nhiệm</h2>
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">8.1. Tuyên bố từ chối trách nhiệm</h3>
              <p className="text-sm leading-relaxed">
                Ebook Mind cung cấp sản phẩm và dịch vụ "nguyên trạng" (as-is). 
                Chúng tôi không đảm bảo rằng Website sẽ hoạt động liên tục, không có lỗi, 
                hoặc các sản phẩm sẽ đáp ứng hoàn toàn kỳ vọng của bạn.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">8.2. Giới hạn trách nhiệm pháp lý</h3>
              <p className="text-sm leading-relaxed">
                Trong mọi trường hợp, Ebook Mind sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, 
                gián tiếp, ngẫu nhiên, đặc biệt hoặc hậu quả phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">8.3. Nội dung ebook</h3>
              <p className="text-sm leading-relaxed">
                Nội dung trong các ebook chỉ mang tính chất tham khảo. 
                Chúng tôi không chịu trách nhiệm cho bất kỳ quyết định hoặc hành động nào bạn thực hiện dựa trên thông tin từ ebook.
              </p>
            </div>
          </div>
        </section>

        {/* Thay đổi điều khoản */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">9. Thay Đổi Điều Khoản</h2>
            </div>
          </div>

          <div className="text-gray-700">
            <p className="text-sm leading-relaxed mb-4">
              Chúng tôi có quyền sửa đổi, bổ sung hoặc thay thế bất kỳ phần nào của Điều Khoản Sử Dụng này 
              bất kỳ lúc nào bằng cách đăng các cập nhật trên Website.
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Việc bạn tiếp tục sử dụng Website sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các điều khoản mới. 
              Chúng tôi khuyến khích bạn thường xuyên xem lại trang này để cập nhật các thay đổi.
            </p>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-800">
                <strong>Ngày cập nhật gần nhất:</strong> Tháng 3, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Liên hệ */}
        <section className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-lg text-white">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">10. Liên Hệ</h2>
            </div>
          </div>

          <p className="mb-6 text-white/90">
            Nếu bạn có bất kỳ câu hỏi nào về Điều Khoản Sử Dụng này, vui lòng liên hệ với chúng tôi:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Email hỗ trợ</p>
                <a href="mailto:ebookmind0@gmail.com" className="text-white/90 hover:text-white underline">
                  ebookmind0@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-semibold">Website</p>
                <a href="https://ebookmind.com" className="text-white/90 hover:text-white underline">
                  ebookmind.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/80">
              Bằng việc sử dụng dịch vụ của Ebook Mind, bạn xác nhận rằng đã đọc, hiểu và đồng ý với tất cả các điều khoản và điều kiện nêu trên.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/ebooks" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Bắt đầu khám phá ebook
          </Link>
        </div>
      </div>
    </div>
  )
}
