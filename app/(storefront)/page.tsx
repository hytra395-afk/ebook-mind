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
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-tight tracking-tight mb-5">
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
            Kiến thức chất lượng, giá cả phải chăng
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
      </section>

      {/* ─── Big Social Proof Number (Gumroad-inspired) ─── */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-6xl sm:text-7xl md:text-8xl font-black text-gray-900 mb-4">
            15,000+
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Người Việt đã tin tưởng và đầu tư vào kiến thức với Ebook Mind tuần qua
          </p>
        </div>
      </section>

      {/* ─── Features Grid (Gumroad-inspired) ─── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1: Mua dễ dàng */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Mua dễ dàng cho mọi người</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Giá từ 49.000đ - rẻ hơn một cốc trà sữa, ai cũng có thể học</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Thanh toán bằng VNĐ qua chuyển khoản ngân hàng - quen thuộc với người Việt</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Combo tiết kiệm - mua nhiều giảm sâu, phù hợp mọi túi tiền</p>
                </li>
              </ul>
            </div>

            {/* Feature 2: Đọc mọi nơi */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Đọc mọi lúc, mọi nơi</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Nhận link tải ngay sau khi thanh toán - không phải chờ đợi</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Đọc trên điện thoại, máy tính bảng, laptop - thiết bị nào cũng được</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <p className="text-gray-700">Sở hữu vĩnh viễn - tải về máy, đọc offline bất cứ lúc nào</p>
                </li>
              </ul>
            </div>

            {/* Feature 3: Nội dung đa dạng */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Nội dung cho mọi mục tiêu</h3>
              <p className="text-gray-700 leading-relaxed">
                Từ kinh doanh, khởi nghiệp, đầu tư đến phát triển bản thân, kỹ năng mềm, công nghệ. 
                Ebook Mind tuyển chọn và biên tập kỹ lưỡng từng cuốn sách để phù hợp với người Việt. 
                Dù bạn là sinh viên, nhân viên văn phòng hay chủ doanh nghiệp - chúng tôi đều có nội dung cho bạn.
              </p>
            </div>

            {/* Feature 4: Hỗ trợ tận tâm */}
            <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Hỗ trợ tận tâm 24/7</h3>
              <p className="text-gray-700 leading-relaxed">
                Gặp vấn đề khi tải ebook? Cần tư vấn chọn sách phù hợp? Đội ngũ hỗ trợ của chúng tôi 
                luôn sẵn sàng giúp bạn qua email, chat hoặc hotline. Chúng tôi cam kết phản hồi trong vòng 2 giờ 
                và giải quyết mọi thắc mắc một cách nhanh chóng, thân thiện.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Philosophy Journey (Gumroad-inspired) ─── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-4">
            Bạn có những ý tưởng tuyệt vời?
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Hành trình phát triển bản thân của bạn bắt đầu từ đây
          </p>
          
          {/* Journey Path */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 transform -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Bắt đầu nhỏ</h3>
                <p className="text-gray-600 text-sm">Chỉ 49.000đ cho một cuốn ebook - thử nghiệm ý tưởng không tốn kém</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-rose-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Học nhanh</h3>
                <p className="text-gray-600 text-sm">Kiến thức cô đọng, thực chiến - áp dụng ngay được vào công việc</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💡</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Cùng tiến bộ</h3>
                <p className="text-gray-600 text-sm">Cộng đồng 15,000+ người cùng học hỏi và chia sẻ kinh nghiệm</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Đạt mục tiêu</h3>
                <p className="text-gray-600 text-sm">Tăng thu nhập, thăng tiến sự nghiệp, khởi nghiệp thành công</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials (Gumroad-inspired) ─── */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-5xl sm:text-6xl font-black text-gray-900 mb-4">
              2,500,000,000đ+
            </div>
            <p className="text-xl text-gray-700">
              Giá trị kiến thức mà người dùng Ebook Mind đã đầu tư trong năm qua
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

      {/* ─── Don't Take Risks Section (Gumroad-inspired) ─── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Đừng mạo hiểm. Điều đó đáng sợ!
              </h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-yellow-400">
                  <p className="text-gray-700 mb-2">Thay vì chi 5 triệu cho khóa học online...</p>
                  <p className="text-xl font-bold text-gray-900">...hãy bắt đầu với ebook 49.000đ!</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-green-400">
                  <p className="text-gray-700 mb-2">Thay vì mua 10 cuốn sách giấy 2 triệu...</p>
                  <p className="text-xl font-bold text-gray-900">...mua combo ebook chỉ 199.000đ!</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 text-center">
              <div className="text-6xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Đặt cược nhỏ. Điều đó thú vị!
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Với giá chỉ bằng một cốc trà sữa, bạn có thể thử nghiệm ý tưởng mới, 
                học kỹ năng mới mà không lo rủi ro tài chính. Đó là cách thông minh để đầu tư vào bản thân.
              </p>
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
    </div>
  )
}
