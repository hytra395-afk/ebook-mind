import { getSupabase } from '@/lib/db'
import EbookCard from '@/components/ebook-card'
import Link from 'next/link'
import { TrendingUp, Sparkles, BadgeCheck, ArrowRight, Zap } from 'lucide-react'

export const revalidate = 60

export default async function HomePage() {
  const supabase = getSupabase()
  const { data: featuredEbooks } = await supabase
    .from('ebooks')
    .select('*, categories(name)')
    .eq('active', true)
    .eq('featured', true)
    .order('sales_count', { ascending: false })
    .limit(8)

  const { data: allEbooks } = await supabase
    .from('ebooks')
    .select('*, categories(name)')
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
        <div className="absolute w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 flex items-center justify-center text-gray-900 shadow-lg animate-bounce" style={{ left: '6%', top: '18%', animationDuration: '5s' }}>₫</div>
        <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-400 flex items-center justify-center text-gray-800 shadow-md animate-bounce" style={{ right: '10%', top: '24%', animationDelay: '0.3s', animationDuration: '6s' }}>💰</div>
        <div className="absolute w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 flex items-center justify-center text-gray-900 shadow-lg animate-bounce" style={{ left: '20%', bottom: '12%', animationDelay: '0.6s', animationDuration: '7s' }}>₫</div>
        <div className="absolute w-9 h-9 rounded-full bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-400 flex items-center justify-center text-gray-800 shadow-md animate-bounce" style={{ right: '24%', bottom: '10%', animationDelay: '0.9s', animationDuration: '6.5s' }}>💰</div>
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></svg>
              </div>
              <div className="font-bold text-gray-900">Chi phí phù hợp</div>
              <div className="text-gray-600 text-sm">Kiến thức bạn sở hữu là những trải nghiệm thật, với giá chỉ từ một cốc trà sữa</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 20l9-16H3l9 16z"/></svg>
              </div>
              <div className="font-bold text-gray-900">Nội dung chất lượng</div>
              <div className="text-gray-600 text-sm">Được tuyển chọn và biên tập kỹ lưỡng</div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-400 flex items-center justify-center text-white shadow-lg mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>
              </div>
              <div className="font-bold text-gray-900">Thanh toán nhanh</div>
              <div className="text-gray-600 text-sm">Thanh toán xong, nhận link tải ngay lập tức</div>
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
                Đừng mạo hiểm. Điều đó đáng sợ!
              </h2>
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-white/90 mb-2">Thay vì chi 5 triệu cho khóa học online...</p>
                  <p className="text-xl font-bold text-white">...hãy bắt đầu với ebook 49.000đ!</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-white/90 mb-2">Thay vì mua 10 cuốn sách giấy 2 triệu...</p>
                  <p className="text-xl font-bold text-white">...mua combo ebook chỉ 199.000đ!</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 text-center border border-white/20">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Đặt cược nhỏ. Điều đó thú vị!
              </h3>
              <p className="text-white/90 leading-relaxed">
                Với giá chỉ bằng một cốc trà sữa, bạn có thể thử nghiệm ý tưởng mới, 
                học kỹ năng mới mà không lo rủi ro tài chính. Đó là cách thông minh để đầu tư vào bản thân.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Journey Path Diagram (Gumroad-inspired) ─── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Bản đồ phát triển mindset
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Từ đọc kiến thức trong ebook → áp dụng nhỏ → kiên trì mỗi ngày → đạt mục tiêu
          </p>
          
          {/* SVG Path Diagram */}
          <div className="relative w-full overflow-x-auto">
            <svg viewBox="0 0 1200 300" className="w-full h-auto min-h-[300px]" preserveAspectRatio="xMidYMid meet">
              {/* Main curved path */}
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FCD34D" />
                  <stop offset="25%" stopColor="#FBBF24" />
                  <stop offset="50%" stopColor="#FB923C" />
                  <stop offset="75%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
              
              {/* Curved path line */}
              <path
                d="M 80 150 Q 300 50, 600 150 T 1120 150"
                stroke="url(#pathGradient)"
                strokeWidth="40"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Step 1: Đọc ebook */}
              <g>
                <circle cx="150" cy="150" r="35" fill="#FCD34D" stroke="#F59E0B" strokeWidth="3"/>
                <text x="150" y="160" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F2937">📖</text>
              </g>
              <text x="150" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1F2937">Đọc ebook</text>
              <text x="150" y="245" textAnchor="middle" fontSize="13" fill="#6B7280">Nền tảng</text>
              
              {/* Step 2: Áp dụng nhỏ */}
              <g>
                <circle cx="400" cy="150" r="35" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3"/>
                <text x="400" y="160" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F2937">🛠️</text>
              </g>
              <text x="400" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1F2937">Áp dụng nhỏ</text>
              <text x="400" y="245" textAnchor="middle" fontSize="13" fill="#6B7280">Bắt đầu nhỏ</text>
              
              {/* Center: Kiên trì */}
              <g>
                <circle cx="600" cy="150" r="45" fill="white" stroke="#F97316" strokeWidth="3"/>
                <text x="600" y="165" textAnchor="middle" fontSize="40" fontWeight="bold">🔁</text>
              </g>
              <text x="600" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1F2937">Kiên trì</text>
              <text x="600" y="245" textAnchor="middle" fontSize="13" fill="#6B7280">Mỗi ngày 1%</text>
              
              {/* Step 3: Nâng cấp kỹ năng */}
              <g>
                <circle cx="800" cy="150" r="35" fill="#FB923C" stroke="#F97316" strokeWidth="3"/>
                <text x="800" y="160" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1F2937">📈</text>
              </g>
              <text x="800" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1F2937">Nâng cấp kỹ năng</text>
              <text x="800" y="245" textAnchor="middle" fontSize="13" fill="#6B7280">Tích lũy</text>
              
              {/* Step 4: Đạt mục tiêu */}
              <g>
                <circle cx="1050" cy="150" r="35" fill="#EC4899" stroke="#DB2777" strokeWidth="3"/>
                <text x="1050" y="160" textAnchor="middle" fontSize="24" fontWeight="bold" fill="white">🎯</text>
              </g>
              <text x="1050" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1F2937">Đạt mục tiêu</text>
              <text x="1050" y="245" textAnchor="middle" fontSize="13" fill="#6B7280">Thành công</text>
            </svg>
          </div>
        </div>
      </section>

      {/* ─── 3 Steps to Start ─── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Bắt đầu trong 3 bước
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
            Bạn sẽ nhận được gì
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Mỗi lần mua ebook, bạn không chỉ nhận được một cuốn sách mà còn nhiều giá trị khác
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">📖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mua một lần, dùng mãi mãi</h3>
              <p className="text-gray-700">
                Quy trình gọn gàng để bạn nhận sách ngay, kiến thức vĩnh viễn là của bạn. Không cần đăng ký hàng tháng, không cần lo hết hạn.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chi phí phù hợp</h3>
              <p className="text-gray-700">
                Kiến thức bạn sở hữu là những trải nghiệm thật, với giá chỉ từ một cốc trà sữa. Combo tiết kiệm lên đến 70%.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center mb-4 shadow-lg">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nhận ngay lập tức</h3>
              <p className="text-gray-700">
                Thanh toán xong, email link tải tới ngay. Không phải chờ, không phải xác nhận. Bắt đầu đọc trong vòng 1 phút.
              </p>
            </div>
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

      {/* FAQ moved to bottom */}


      {/* ─── Testimonials (Gumroad-inspired) ─── */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
              2,530,000,000đ+
            </div>
            <p className="text-xl text-gray-700">
              Tổng thu nhập thêm mà người dùng đã kiếm được nhờ áp dụng kiến thức trong Ebook
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Tôi bắt đầu với combo Marketing cơ bản giá 199k. Sau 3 tháng áp dụng, 
                doanh thu shop online của tôi tăng gấp 3 lần. Giờ tôi đã mua thêm 10+ ebook khác 
                và thu nhập tăng vượt mức lương văn phòng cũ."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  NT
                </div>
                <div>
                  <p className="font-bold text-gray-900">Nguyễn Thảo</p>
                  <p className="text-sm text-gray-500">Chủ shop thời trang online, TP.HCM</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Là sinh viên túi tiền hạn hẹp, tôi không thể mua sách giấy đắt tiền. 
                Ebook Mind giúp tôi tiếp cận kiến thức chất lượng với giá chỉ bằng 1/10. 
                Nhờ combo Kỹ năng mềm, tôi đã pass phỏng vấn vào công ty mơ ước."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                  MH
                </div>
                <div>
                  <p className="font-bold text-gray-900">Minh Hoàng</p>
                  <p className="text-sm text-gray-500">Sinh viên IT, Hà Nội</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Tôi đã chi hàng chục triệu cho các khóa học online nhưng ít khi áp dụng được. 
                Ebook Mind khác - giá rẻ nên tôi dám thử nhiều chủ đề, tìm được đúng nhu cầu. 
                Giờ tôi có passive income 15 triệu/tháng từ side hustle."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-rose-500 flex items-center justify-center text-white font-bold">
                  LA
                </div>
                <div>
                  <p className="font-bold text-gray-900">Linh Anh</p>
                  <p className="text-sm text-gray-500">Nhân viên văn phòng, Đà Nẵng</p>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <p className="text-gray-700 mb-6 leading-relaxed">
                "Công ty tôi cần đào tạo 20 nhân viên về Digital Marketing. 
                Thay vì chi 50 triệu cho khóa học, tôi mua combo ebook chỉ 2 triệu. 
                Hiệu quả không thua kém, tiết kiệm 96% chi phí đào tạo!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div>
                  <p className="font-bold text-gray-900">Đức Khải</p>
                  <p className="text-sm text-gray-500">Giám đốc Startup, TP.HCM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Ebooks ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ebook <span className="gradient-text-purple">Nổi Bật</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Được yêu thích và đánh giá cao nhất từ cộng đồng</p>
          </div>
          <Link href="/ebooks" className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredEbooks?.map((ebook: any) => (
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
              category={ebook.categories?.name}
            />
          ))}
        </div>
        {(!featuredEbooks || featuredEbooks.length === 0) && (
          <div className="text-center py-16 text-gray-400">
            <p>Chưa có ebook nổi bật. Thêm ebook trong Admin Dashboard.</p>
          </div>
        )}
      </section>

      {/* ─── All / Latest Ebooks ─── */}
      {allEbooks && allEbooks.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ebook Mới Nhất</h2>
                <p className="text-gray-500 mt-1 text-sm">Cập nhật liên tục mỗi tuần</p>
              </div>
              <Link href="/ebooks" className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1">
                Xem tất cả <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {allEbooks.map((ebook: any) => (
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
                  category={ebook.categories?.name}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Stats Section (Gumroad-inspired) ─── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600 text-sm">Ebook Chất Lượng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-gray-600 text-sm">Người Dùng Hài Lòng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">4.8★</div>
              <div className="text-gray-600 text-sm">Đánh Giá Trung Bình</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Hỗ Trợ Khách Hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Popular Tags (Gumroad-inspired) ─── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
            Chủ Đề <span className="text-purple-600">Phổ Biến</span>
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
          Khám Phá Theo <span className="text-purple-600">Lĩnh Vực</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Kinh Doanh', emoji: '💼', href: '/ebooks?category=kinh-doanh', gradient: 'btn-aurora' },
            { label: 'Phát Triển Bản Thân', emoji: '🌱', href: '/ebooks?category=phat-trien-ban-than', gradient: 'btn-miami' },
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
            Mua Ebook <span className="text-purple-600">Dễ Dàng</span>
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
            Câu hỏi thường gặp
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Ebook được gửi như thế nào?",
                a: "Sau khi thanh toán, bạn sẽ nhận email chứa link tải ebook. Bạn có thể tải về máy tính, điện thoại hoặc máy tính bảng."
              },
              {
                q: "Tôi có thể đọc ebook trên thiết bị nào?",
                a: "Ebook được cung cấp dưới dạng PDF, có thể đọc trên bất kỳ thiết bị nào: điện thoại, máy tính bảng, laptop, máy tính để bàn."
              },
              {
                q: "Có thể hoàn tiền không?",
                a: "Có, nếu bạn không hài lòng trong vòng 7 ngày, chúng tôi sẽ hoàn tiền 100% không cần hỏi lý do."
              },
              {
                q: "Ebook có bản quyền không?",
                a: "Tất cả ebook trên Ebook Mind đều được phép phân phối. Chúng tôi hợp tác trực tiếp với tác giả và nhà xuất bản."
              },
              {
                q: "Tôi có thể chia sẻ ebook cho bạn bè không?",
                a: "Ebook là sản phẩm kỹ thuật số cá nhân. Vui lòng không chia sẻ link tải với người khác để tôn trọng bản quyền."
              },
              {
                q: "Hỗ trợ kỹ thuật như thế nào?",
                a: "Gặp vấn đề? Email chúng tôi tại support@ebookmind.com hoặc chat trực tiếp. Chúng tôi phản hồi trong vòng 2 giờ."
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
    </div>
  )
}
