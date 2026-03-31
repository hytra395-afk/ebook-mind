import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'
import Link from 'next/link'
import { TrendingUp, Sparkles, BadgeCheck, ArrowRight, Zap } from 'lucide-react'

export const revalidate = 3600 // ISR: revalidate every hour for better caching

// Enable static generation for better performance
export const dynamic = 'force-static'

export default async function HomePage() {
  const supabase = getSupabase()
  // Optimize queries - only select needed fields
  const { data: featuredEbooks } = await supabase
    .from('ebooks')
    .select('id, slug, title, description, price, cover_url, rating_avg, rating_count, sales_count, featured, bestseller, categories(name)')
    .eq('active', true)
    .eq('featured', true)
    .order('sales_count', { ascending: false })
    .limit(8)

  const { data: allEbooks } = await supabase
    .from('ebooks')
    .select('id, slug, title, description, price, cover_url, rating_avg, rating_count, sales_count, featured, bestseller, categories(name)')
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(8)

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="hero-gradient pt-20 pb-24 text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

          {/* Main Heading - Gradient Aurora: Indigo→Violet→Fuchsia */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight tracking-tight mb-5">
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Ebook Mind
            </span>
          </h1>

          {/* Subtitle - Không bold, màu xám đậm */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 font-normal leading-relaxed">
            Đầu tư cho kiến thức mỗi ngày với hàng trăm ebook chất lượng về Kinh doanh, Kiếm thêm thu nhập,
            Phát triển bản thân, Công nghệ,...v.v.
          </p>

          {/* Badge pill - Glassmorphism với viền gradient nhẹ */}
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-violet-200 text-violet-700 text-sm font-medium px-5 py-2 rounded-full mb-8 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Kiến thức chất lượng, Chi phí phù hợp
          </div>

          {/* CTAs - Gradient Aurora cho button chính */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/ebooks"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base"
            >
              <TrendingUp className="w-4 h-4" />
              Khám phá Ebook ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/combos"
              className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-300 text-gray-900 px-7 py-3 rounded-xl font-semibold hover:bg-white transition shadow-sm text-base"
            >
              Xem Combo tiết kiệm
            </Link>
          </div>
        </div>
      {/* Animated coins overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 via-amber-200 to-orange-200 flex items-center justify-center text-amber-700 shadow-lg" style={{ left: '6%', top: '18%', animation: 'float 4s ease-in-out infinite' }}>₫</div>
        <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-pink-100 via-rose-200 to-orange-200 flex items-center justify-center text-rose-600 shadow-md" style={{ right: '10%', top: '24%', animation: 'float 5s ease-in-out infinite', animationDelay: '0.5s' }}>💰</div>
        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 via-violet-200 to-pink-200 flex items-center justify-center text-purple-600 shadow-lg" style={{ left: '20%', bottom: '12%', animation: 'float 4.5s ease-in-out infinite', animationDelay: '1s' }}>₫</div>
        <div className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-cyan-100 via-blue-200 to-indigo-200 flex items-center justify-center text-blue-600 shadow-md" style={{ right: '24%', bottom: '10%', animation: 'float 5.5s ease-in-out infinite', animationDelay: '1.5s' }}>💰</div>
      </div>
      </section>
 
      {/* ─── Quote Section ─── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Tập trung vào <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">điều quan trọng</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bất cứ ai cũng có thể kiếm được những đồng tiền đầu tiên. Chỉ cần bắt đầu với những gì bạn biết, xem cái nào hiệu quả, và kiếm tiền.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
              </div>
              <div className="font-bold text-gray-900">Chi phí phù hợp</div>
              <div className="text-gray-600 text-sm">Kiến thức bạn sở hữu là những trải nghiệm thật, với giá chỉ từ một&nbsp;cốc&nbsp;trà&nbsp;sữa</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20l9-16H3l9 16z"/></svg>
              </div>
              <div className="font-bold text-gray-900">Nội dung chất lượng</div>
              <div className="text-gray-600 text-sm">Nội dung được thu thập từ kinh&nbsp;nghiệm thật của hàng&nbsp;trăm&nbsp;người</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>
              </div>
              <div className="font-bold text-gray-900">Thanh toán nhanh</div>
              <div className="text-gray-600 text-sm">Thanh toán xong, nhận link tải ngay&nbsp;lập&nbsp;tức</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Don't Take Risks Section (Gumroad-inspired) ─── */}
      <section className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Đừng mạo hiểm.<br/>Điều đó đáng sợ!
              </h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-white/90 mb-2">Thay vì chi 5 triệu cho khóa học online...</p>
                  <p className="text-xl font-bold text-white">...hãy bắt đầu với ebook từ&nbsp;69.000đ!</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-white/90 mb-2">Thay vì mua 5 cuốn sách giấy 2 triệu...</p>
                  <p className="text-xl font-bold text-white">...mua combo ebook chỉ từ&nbsp;297.000đ!</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Đặt cược nhỏ. Điều đó thú vị!
              </h3>
              <p className="text-white/90 leading-relaxed">
                Với kiến thức ngách thay đổi mindset, bạn có thể thử nghiệm ý tưởng mới, 
                học kỹ năng mới, có được mindset bền vững mà không lo rủi ro. Đó là cách thông minh để đầu tư vào bản&nbsp;thân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Gumroad-inspired Features ─── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Sell anything */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-10 border border-purple-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kinh doanh ngách</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Ebook về các ngách kinh doanh sẽ giúp bạn xây dựng mô hình bền vững. Từ solo business (làm một mình) cho tới mở rộng quy mô, thuê nhân viên.<br/><br/>
                Nội dung được thu thập từ kinh nghiệm thật của hàng trăm người kinh doanh. Từ những thất bại, tới thành công và giờ đây họ đang có cuộc sống theo ý muốn. Tất cả là những chia sẻ được đóng gói thành ebook để dễ tiếp cận tới tất cả mọi người.
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white">
                    �
                  </div>
                  <div className="font-semibold text-gray-900">Nội dung thực tế</div>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white">
                    �️
                  </div>
                  <div className="font-semibold text-gray-900">Chia sẻ A -&gt; Z</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white">
                    🚀
                  </div>
                  <div className="font-semibold text-gray-900">Hành động được ngay</div>
                </div>
              </div>
            </div>

            {/* Card 2: Make your own road */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-10 border border-blue-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tạo con đường riêng</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Dù bạn đang cần ý tưởng, thứ gì đó hay ho, phát triển mindset, hay một công việc khác. Chúng tôi mong muốn giúp bạn thuận lợi hơn trên con đường phía trước.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1 break-words">10,000+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Người dùng</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1 break-words">100+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Ebook</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1 break-words">100+</div>
                  <div className="text-xs sm:text-sm text-gray-600">Tác giả</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="text-xl sm:text-2xl font-black text-gray-900 mb-1 break-words">4.9/5</div>
                  <div className="text-xs sm:text-sm text-gray-600">Đánh giá</div>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Link href="/ebooks?category=kinh-doanh-ngach" className="btn-aurora text-white px-5 py-3 rounded-xl font-semibold shadow-lg inline-flex items-center">
                  Đọc ebook kinh doanh ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 Steps to Start ─── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Bắt đầu trong <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">3 bước</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Từ lúc bạn quyết định cho đến khi có ebook trong tay chỉ mất vài phút
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Chọn ebook</h3>
                <p className="text-gray-600">Duyệt qua hàng trăm ebook chất lượng, đọc review, so sánh giá. Tìm cuốn phù hợp với bạn.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-gray-300">→</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Thanh toán</h3>
                <p className="text-gray-600">Thanh toán an toàn qua chuyển khoản ngân hàng. Chỉ mất 1-2 phút, không cần tài khoản phức tạp.</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-gray-300">→</div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nhận & đọc</h3>
              <p className="text-gray-600">Nhận email với link tải ngay lập tức. Tải về máy, đọc offline bất cứ lúc nào.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What You'll Get ─── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Bạn nhận được từ <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Ebook Mind</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Mỗi lần mua ebook, bạn không chỉ nhận được một cuốn sách mà còn nhiều giá&nbsp;trị bền&nbsp;vững&nbsp;khác
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mua một lần, dùng mãi&nbsp;mãi</h3>
              <p className="text-gray-700">
                Quy trình gọn gàng để bạn nhận sách ngay, kiến thức vĩnh viễn là của bạn. Không cần đăng ký hàng tháng, không cần lo hết&nbsp;hạn.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chi phí phù&nbsp;hợp</h3>
              <p className="text-gray-700">
                Giá chỉ bằng một chiếc áo. Mua theo combo tiết kiệm tới 30%.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nhận ngay lập&nbsp;tức</h3>
              <p className="text-gray-700">
                Thanh toán đơn giản, nhận link ebook ngay. Không phải chờ đợi, không phải xác nhận. Bắt đầu đọc trong vòng 1&nbsp;phút.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ─── Testimonials (Gumroad-inspired) ─── */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">
              Người dùng <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">nói gì</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tôi bắt đầu làm thêm online bằng kiến thức trong ebook kinh doanh ngách. Làm nhỏ mỗi ngày, đo lường rồi tối ưu. Sau khoảng hai tháng, mình có thêm nguồn thu nhập đều đặn bên cạnh công việc chính và hiểu rõ cách vận hành một mô hình gọn nhẹ.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  TM
                </div>
                <div>
                  <p className="font-bold text-gray-900">Trần Minh</p>
                  <p className="text-sm text-gray-500">Nhân viên kế toán, Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Em từng rơi vào giai đoạn bất ổn tâm lý. Những bài học về mindset và kinh doanh nhỏ trong ebook giúp em bình tĩnh lại, đặt mục tiêu rõ ràng và hành động theo lộ trình. Vài tháng sau, em mở được một quầy nhỏ và tự tin hơn rất nhiều.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                  NH
                </div>
                <div>
                  <p className="font-bold text-gray-900">Ngọc Hương</p>
                  <p className="text-sm text-gray-500">Chủ shop quần áo, TP.HCM</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Mình tự học tiếp thị liên kết qua ebook. Không màu mè, mọi thứ là quy trình thực tế: chọn ngách, tạo nội dung trung thực, theo dõi dữ liệu. Sau bốn tháng, mình có nguồn thu nhập thụ động nho nhỏ và biết cách mở rộng theo cách bền vững.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold">
                  DT
                </div>
                <div>
                  <p className="font-bold text-gray-900">Dương Tú</p>
                  <p className="text-sm text-gray-500">Sinh viên, Đà Nẵng</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tôi học được cách kể câu chuyện của chính mình, viết nội dung có ích và kết nối chân thành với khách hàng. Tài khoản mạng xã hội tăng trưởng tự nhiên, đơn hàng và lời mời hợp tác đến đều hơn. Điều quý nhất là tôi có hướng đi rõ ràng cho thương hiệu cá nhân.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  KL
                </div>
                <div>
                  <p className="font-bold text-gray-900">Khánh Linh</p>
                  <p className="text-sm text-gray-500">Content Creator, Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Từ sở thích làm đồ thủ công, mình học được trong ebook cách định giá, chụp ảnh, chăm sóc khách hàng và vận hành đơn giản. Hiện mình duy trì doanh số ổn định mỗi tháng và vẫn giữ được niềm vui với công việc yêu thích.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                  PT
                </div>
                <div>
                  <p className="font-bold text-gray-900">Phương Thảo</p>
                  <p className="text-sm text-gray-500">Chủ shop handmade, TP.HCM</p>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Em mới ra trường và khá bối rối. Nhờ ebook, em biết cách lập kế hoạch sự nghiệp, quản lý tài chính cá nhân và tìm dự án phù hợp. Em bắt đầu nhận quảng cáo freelance và có nguồn thu ổn định để tiếp tục đầu tư học tập.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  HQ
                </div>
                <div>
                  <p className="font-bold text-gray-900">Hùng Quân</p>
                  <p className="text-sm text-gray-500">Freelance Marketer, Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Testimonial 7 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Tôi từng stress kéo dài. Các bài tập thực hành trong ebook giúp tôi hít thở đúng, ghi chép cảm xúc và đặt ranh giới công việc. Ngủ ngon hơn, giao tiếp tốt hơn và quan trọng nhất là có một mindset bền vững để tiếp tục phát triển.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                  MA
                </div>
                <div>
                  <p className="font-bold text-gray-900">Minh Anh</p>
                  <p className="text-sm text-gray-500">Quản lý dự án, Đà Nẵng</p>
                </div>
              </div>
            </div>

            {/* Testimonial 8 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                Mình học bán hàng online qua ebook: viết nội dung rõ ràng, trả lời khách nhanh, đóng gói chỉn chu. Đơn đều mỗi ngày, tỉ lệ quay lại tăng. Hiện mình đang tuyển thêm một bạn phụ việc để mở rộng quy trình cho hiệu quả hơn.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold">
                  TL
                </div>
                <div>
                  <p className="font-bold text-gray-900">Thu Lê</p>
                  <p className="text-sm text-gray-500">Chủ shop mỹ phẩm, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section (Gumroad-inspired) ─── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-gray-600 text-sm">Ebook Chất Lượng</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">10,000+</div>
              <div className="text-gray-600 text-sm">Người Dùng Hài Lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">4.9⭐</div>
              <div className="text-gray-600 text-sm">Đánh Giá Trung Bình</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Hỗ Trợ Khách Hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Ebooks ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ebook <span className="gradient-text-purple">Nổi Bật</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Được yêu thích và đánh giá cao nhất từ cộng đồng</p>
          </div>
          <div className="flex justify-end mt-4">
            <Link href="/ebooks" className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredEbooks?.map((ebook: any, idx: number) => (
            <EbookCard
              key={ebook.id}
              id={ebook.id}
              slug={ebook.slug}
              title={ebook.title}
              description={ebook.description}
              price={ebook.price}
              cover_url={ebook.cover_url}
              rating_avg={ebook.rating_avg}
              rating_count={ebook.rating_count}
              sales_count={ebook.sales_count}
              featured={ebook.featured}
              bestseller={ebook.bestseller}
              category={ebook.categories?.name}
              priority={idx < 4}
            />
          ))}
        </div>
        {(!featuredEbooks || featuredEbooks.length === 0) && (
          <div className="text-center py-16 text-gray-400">
            <p>Chưa có ebook nổi bật. Thêm ebook trong Admin Dashboard.</p>
          </div>
        )}
      </section>

      {/* ─── Popular Tags (Gumroad-inspired) ─── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Chủ Đề <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Phổ Biến</span>
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Khám phá các chủ đề ebook được tìm kiếm nhiều nhất
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Marketing', 'Khởi Nghiệp', 'Đầu Tư', 'Tư Duy', 'Lãnh Đạo',
              'Kỹ Năng Mềm', 'Tài Chính', 'Bán Hàng', 'Năng Suất', 'Thiền',
              'Sức Khỏe Tinh Thần', 'Lập Trình', 'AI', 'Design', 'Crypto',
              'Passive Income', 'Side Hustle', 'Personal Branding', 'SEO', 'Content Writing'
            ].map((tag) => (
              <Link
                key={tag}
                href={`/ebooks?tag=${encodeURIComponent(tag.toLowerCase())}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-purple-400 hover:text-purple-600 hover:shadow-md transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Category Banner ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Khám Phá Theo <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Lĩnh Vực</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Kinh Doanh', emoji: '💼', href: '/ebooks?category=kinh-doanh', gradient: 'btn-aurora' },
            { label: 'Phát Triển Mindset', emoji: '🌱', href: '/ebooks?category=phat-trien-mindset', gradient: 'btn-miami' },
            { label: 'Công Nghệ', emoji: '💻', href: '/ebooks?category=cong-nghe', gradient: 'btn-aurora' },
            { label: 'Sức Khỏe', emoji: '❤️', href: '/ebooks?category=suc-khoe', gradient: 'btn-sunset' },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className={`${cat.gradient} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="text-4xl mb-3">{cat.emoji}</div>
              <p className="font-semibold text-sm">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            Mua Ebook <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Dễ Dàng</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Chỉ 3 bước đơn giản để sở hữu ebook yêu thích
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chọn Ebook</h3>
              <p className="text-gray-600">Duyệt qua hàng trăm ebook chất lượng cao, chọn cuốn phù hợp với bạn</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thanh Toán</h3>
              <p className="text-gray-600">Thanh toán nhanh chóng qua chuyển khoản ngân hàng, an toàn 100%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nhận Link Tải</h3>
              <p className="text-gray-600">Nhận email với link tải ngay lập tức, đọc mọi lúc mọi nơi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Câu hỏi <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">thường gặp</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Ebook được gửi như thế nào?",
                a: "Sau khi thanh toán, bạn sẽ nhận link tải ebook. Bạn có thể tải về máy tính, điện thoại hoặc máy tính bảng."
              },
              {
                q: "Tôi có thể đọc ebook trên thiết bị nào?",
                a: "Ebook được cung cấp dưới dạng PDF, có thể đọc trên bất kỳ thiết bị nào: điện thoại, máy tính bảng, laptop, máy tính để bàn."
              },
              {
                q: "Ebook có bản quyền không?",
                a: "Tất cả ebook trên đều được chúng tôi hợp tác trực tiếp với tác giả và được phép phân phối. Bản quyền thuộc về Ebook Mind, nghiêm cấm sao chép dưới mọi hình thức. Các cá nhân hay tổ chức cố tình lấy thông tin mà không được sự cho phép của chúng tôi để khai thác thương mại sẽ phải chịu trách nhiệm trước pháp luật."
              },
              {
                q: "Tôi có thể chia sẻ ebook cho bạn bè không?",
                a: "Ebook là sản phẩm kỹ thuật số cá nhân. Vui lòng không chia sẻ link tải với người khác để tôn trọng bản quyền."
              },
              {
                q: "Hỗ trợ kỹ thuật như thế nào?",
                a: "Gặp vấn đề? Email chúng tôi tại support@ebookmind.com hoặc chat trực tiếp. Chúng tôi phản hồi trong vòng 2 giờ."
              },
              {
                q: "Tôi có thể yêu cầu hoàn tiền không?",
                a: "Có. Chúng tôi hoàn tiền 100% nếu file lỗi hoặc nội dung sai lệch nghiêm trọng. Thời gian xử lý 3-5 ngày làm việc. Không hoàn tiền nếu đã đọc nội dung hoặc vi phạm bản quyền."
              },
              {
                q: "Link tải có hết hạn không?",
                a: "Link tải có hiệu lực trong 30 ngày kể từ ngày mua. Sau 30 ngày, link sẽ hết hạn nhưng bạn có thể liên hệ hỗ trợ để được cấp lại miễn phí."
              },
              {
                q: "Tại sao nên chọn Ebook Mind?",
                a: "Chúng tôi cung cấp kiến thức thực tế từ những người đã trải nghiệm, giá cả phù hợp, dễ tiếp cận. Tất cả ebook đều được hợp tác trực tiếp với tác giả và có bản quyền rõ ràng."
              },
              {
                q: "Thanh toán có an toàn không?",
                a: "Hoàn toàn an toàn. Chúng tôi sử dụng cổng thanh toán Sepay uy tín tại Việt Nam. Ebook Mind không lưu trữ thông tin thẻ ngân hàng của bạn."
              }
            ].map((item, idx) => (
              <details key={idx} className="bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-sm transition-shadow">
                <summary className="font-bold text-gray-900 flex items-center justify-between">
                  {item.q}
                  <span className="text-gray-400 ml-4">+</span>
                </summary>
                <p className="text-gray-700 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex p-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500">
            <div className="rounded-2xl bg-white px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Sẵn sàng bắt đầu?</h3>
              <p className="text-gray-600 mb-5">Khám phá hàng trăm ebook chất lượng và bắt đầu ngay hôm nay.</p>
              <div className="flex items-center justify-center gap-3">
                <Link href="/ebooks" className="btn-aurora text-white px-6 py-3 rounded-xl font-semibold shadow-lg">Khám phá ebook ngay</Link>
                <Link href="/combos" className="bg-white border border-gray-300 text-gray-900 px-6 py-3 rounded-xl font-semibold">Xem combo tiết kiệm</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
