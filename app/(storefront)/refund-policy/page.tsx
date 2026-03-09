import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Clock, CreditCard, Mail, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chính Sách Hoàn Tiền | Ebook Mind',
  description: 'Chính sách hoàn tiền minh bạch và công bằng của Ebook Mind - cam kết bảo vệ quyền lợi khách hàng.',
}

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Quay lại trang chủ</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Chính Sách Hoàn Tiền</h1>
          <p className="text-lg text-gray-600">
            Ebook Mind cam kết bảo vệ quyền lợi khách hàng với chính sách hoàn tiền minh bạch và công bằng.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Điều kiện hoàn tiền */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Điều Kiện Hoàn Tiền</h2>
              <p className="text-gray-600">Các trường hợp được chấp nhận hoàn tiền</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">File ebook bị lỗi hoặc không mở được</h3>
                <p className="text-gray-600 text-sm">
                  Nếu file ebook bạn nhận được bị lỗi, hư hỏng hoặc không thể mở được trên thiết bị của bạn, 
                  chúng tôi sẽ hoàn tiền 100% hoặc gửi lại file mới.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Nội dung ebook không đúng với mô tả</h3>
                <p className="text-gray-600 text-sm">
                  Nếu nội dung ebook khác biệt đáng kể so với mô tả trên website (về chủ đề, độ dài, chất lượng), 
                  bạn có quyền yêu cầu hoàn tiền trong vòng 7 ngày kể từ ngày mua.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Thanh toán bị trùng lặp do lỗi hệ thống</h3>
                <p className="text-gray-600 text-sm">
                  Nếu bạn bị trừ tiền nhiều lần cho cùng một đơn hàng do lỗi kỹ thuật, 
                  chúng tôi sẽ hoàn lại số tiền bị trùng lặp ngay lập tức.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trường hợp KHÔNG được hoàn tiền */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Không Được Hoàn Tiền</h2>
              <p className="text-gray-600">Các trường hợp không áp dụng chính sách hoàn tiền</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Đã tải xuống và đọc nội dung ebook</h3>
                <p className="text-gray-600 text-sm">
                  Sau khi đã tải xuống và đọc toàn bộ hoặc phần lớn nội dung ebook, 
                  bạn không thể yêu cầu hoàn tiền trừ khi có lỗi kỹ thuật hoặc sai lệch nội dung nghiêm trọng.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Thay đổi ý định sau khi mua</h3>
                <p className="text-gray-600 text-sm">
                  Nếu bạn đơn giản là thay đổi ý định hoặc không còn quan tâm đến chủ đề, 
                  nhưng sản phẩm vẫn đúng như mô tả và hoạt động bình thường, chúng tôi không hoàn tiền.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Vi phạm điều khoản sử dụng</h3>
                <p className="text-gray-600 text-sm">
                  Nếu phát hiện bạn chia sẻ, sao chép, phân phối bất hợp pháp nội dung ebook, 
                  tài khoản của bạn sẽ bị khóa vĩnh viễn và không được hoàn tiền.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Mua nhầm sản phẩm do không đọc kỹ mô tả</h3>
                <p className="text-gray-600 text-sm">
                  Nếu bạn mua nhầm ebook do không đọc kỹ tiêu đề, mô tả, mục lục hoặc preview, 
                  chúng tôi khuyến khích bạn liên hệ để được hỗ trợ đổi sang sản phẩm khác thay vì hoàn tiền.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quy trình hoàn tiền */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quy Trình Hoàn Tiền</h2>
              <p className="text-gray-600">Các bước để yêu cầu hoàn tiền</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gửi yêu cầu hoàn tiền</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Gửi email đến <a href="mailto:ebookmind0@gmail.com" className="text-purple-600 hover:underline font-medium">ebookmind0@gmail.com</a> với tiêu đề: 
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded ml-1">[YÊU CẦU HOÀN TIỀN] - Mã đơn hàng</span>
                </p>
                <div className="bg-purple-50 rounded-lg p-4 text-sm">
                  <p className="font-semibold text-gray-900 mb-2">Thông tin cần cung cấp:</p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• <strong>Mã đơn hàng</strong> (có trong email xác nhận)</li>
                    <li>• <strong>Email đã sử dụng để mua hàng</strong></li>
                    <li>• <strong>Lý do hoàn tiền chi tiết</strong></li>
                    <li>• <strong>Hình ảnh/Screenshot chứng minh</strong> (nếu có lỗi kỹ thuật)</li>
                    <li>• <strong>Số tài khoản ngân hàng</strong></li>
                    <li>• <strong>Tên chủ tài khoản</strong></li>
                    <li>• <strong>Tên ngân hàng</strong></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Xem xét yêu cầu</h3>
                <p className="text-gray-600 text-sm">
                  Đội ngũ hỗ trợ của chúng tôi sẽ xem xét yêu cầu của bạn trong vòng <strong>24-48 giờ làm việc</strong>. 
                  Chúng tôi có thể yêu cầu thêm thông tin hoặc bằng chứng nếu cần thiết.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 text-purple-600 font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Phê duyệt và hoàn tiền</h3>
                <p className="text-gray-600 text-sm">
                  Nếu yêu cầu được chấp nhận, chúng tôi sẽ gửi email xác nhận và tiến hành hoàn tiền trong vòng <strong>3-5 ngày làm việc</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phương thức hoàn tiền */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Phương Thức Hoàn Tiền</h2>
              <p className="text-gray-600">Cách thức nhận lại tiền</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Chuyển khoản ngân hàng</h3>
              <p className="text-gray-700 text-sm mb-3">
                Chúng tôi hoàn tiền trực tiếp vào tài khoản ngân hàng mà bạn cung cấp. 
                Đây là phương thức hoàn tiền duy nhất hiện tại.
              </p>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Lưu ý:</strong> Vui lòng cung cấp chính xác thông tin tài khoản để tránh chậm trễ. 
                  Ebook Mind không chịu trách nhiệm nếu thông tin tài khoản bạn cung cấp sai.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">Thời gian nhận tiền</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Ngân hàng nội địa:</strong> 1-3 ngày làm việc sau khi được phê duyệt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span><strong>Ngày lễ/cuối tuần:</strong> Có thể chậm hơn 1-2 ngày</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hỗ trợ thay thế */}
        <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Hỗ Trợ Thay Thế</h2>
              <p className="text-gray-600">Các giải pháp khác thay vì hoàn tiền</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Đổi sang ebook khác</h3>
              <p className="text-gray-600 text-sm">
                Nếu bạn mua nhầm hoặc không hài lòng với nội dung, chúng tôi có thể hỗ trợ đổi sang một ebook khác 
                có giá trị tương đương hoặc cao hơn (bạn chỉ cần bù thêm phần chênh lệch).
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Hỗ trợ kỹ thuật</h3>
              <p className="text-gray-600 text-sm">
                Nếu bạn gặp khó khăn trong việc mở file hoặc sử dụng ebook, 
                đội ngũ kỹ thuật của chúng tôi sẽ hỗ trợ bạn miễn phí để giải quyết vấn đề.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Mã giảm giá cho lần mua sau</h3>
              <p className="text-gray-600 text-sm">
                Trong một số trường hợp đặc biệt, chúng tôi có thể cung cấp mã giảm giá 20-30% 
                cho lần mua tiếp theo thay vì hoàn tiền, giúp bạn tiết kiệm hơn khi khám phá các ebook khác.
              </p>
            </div>
          </div>
        </section>

        {/* Thông tin liên hệ */}
        <section className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 shadow-lg text-white">
          <h2 className="text-2xl font-bold mb-4">Thông Tin Liên Hệ</h2>
          <p className="mb-6 text-white/90">
            Nếu bạn có bất kỳ câu hỏi nào về chính sách hoàn tiền hoặc cần hỗ trợ, 
            đừng ngần ngại liên hệ với chúng tôi.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Email hỗ trợ</p>
                <a href="mailto:ebookmind0@gmail.com" className="text-white/90 hover:text-white underline">
                  ebookmind0@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Thời gian phản hồi</p>
                <p className="text-white/90">Trong vòng 24-48 giờ làm việc (Thứ 2 - Thứ 6, 9:00 - 18:00)</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20">
            <p className="text-sm text-white/80">
              <strong>Cam kết của chúng tôi:</strong> Ebook Mind luôn đặt sự hài lòng của khách hàng lên hàng đầu. 
              Chúng tôi xử lý mọi yêu cầu hoàn tiền một cách công bằng, minh bạch và nhanh chóng.
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/ebooks" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Khám phá ebook ngay
          </Link>
          <p className="text-gray-500 text-sm mt-4">
            Cập nhật lần cuối: Tháng 3, 2025
          </p>
        </div>
      </div>
    </div>
  )
}
