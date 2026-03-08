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

          {/* Main Heading - Đúng như ảnh mẫu */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-tight tracking-tight mb-5">
            <span className="text-purple-600">Ebook Mind</span>
          </h1>

          {/* Subtitle - Không bold, màu xám đậm */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 font-normal leading-relaxed">
            Đầu tư cho kiến thức mỗi ngày với hàng trăm ebook chất lượng về Kinh doanh, Kiếm thêm thu nhập,
            Phát triển bản thân, Công nghệ,...v.v.
          </p>

          {/* Badge pill - Đúng như ảnh */}
          <div className="inline-flex items-center gap-2 bg-purple-100 border border-purple-300 text-purple-700 text-sm font-medium px-5 py-2 rounded-full mb-8">
            <Sparkles className="w-4 h-4" />
            Kiến thức chất lượng, giá cả phải chăng
          </div>

          {/* CTAs - Đúng như ảnh */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/ebooks"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-600 transition-all text-base"
            >
              <TrendingUp className="w-4 h-4" />
              Khám phá Ebook ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/combos"
              className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-900 px-7 py-3 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm text-base"
            >
              Xem Combo tiết kiệm
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Trust Badges (iOS icon style) ─── */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {/* Badge 1 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl badge-aurora flex items-center justify-center shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Giá Cả Phải Chăng</p>
                <p className="text-gray-500 text-sm mt-1">Chỉ từ 49.000đ, rẻ hơn một cốc trà sữa</p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl badge-miami flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Nội Dung Chất Lượng</p>
                <p className="text-gray-500 text-sm mt-1">Được tuyển chọn và biên tập kỹ lưỡng</p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl badge-sunset flex items-center justify-center shadow-lg">
                <BadgeCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Thanh Toán Nhanh</p>
                <p className="text-gray-500 text-sm mt-1">Thanh toán xong, nhận link tải ngay lập tức</p>
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
    </div>
  )
}
