import { getSupabaseAdmin } from '@/lib/db'
import { TrendingUp, Users, Eye, Clock, Home, BookOpen, ShoppingCart, Layers, FileText, ExternalLink, BarChart3, Activity, Zap } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

const GA_PROPERTY_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-8C7MLZ7LN4'

export default async function AdminAnalyticsPage() {
  const supabase = getSupabaseAdmin()
  
  // Fetch ebook views from database (we'll track this)
  const { data: topEbooks } = await supabase
    .from('ebooks')
    .select('id, title, slug, cover_url, sales_count, price')
    .order('sales_count', { ascending: false })
    .limit(10)

  // Page performance data (placeholder - will be populated by GA4)
  const pages = [
    { name: 'Trang chủ', path: '/', icon: Home },
    { name: 'Ebook Store', path: '/ebooks', icon: BookOpen },
    { name: 'Chi tiết Ebook', path: '/ebooks/[slug]', icon: FileText },
    { name: 'Combos', path: '/combos', icon: Layers },
    { name: 'Use Cases', path: '/use-cases', icon: ShoppingCart },
    { name: 'Về chúng tôi', path: '/about', icon: Users },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Theo dõi lượt truy cập và hiệu suất website</p>
        </div>
        <a
          href={`https://analytics.google.com/analytics/web/#/p${GA_PROPERTY_ID.replace('G-', '')}/reports/intelligenthome`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <BarChart3 className="w-4 h-4" />
          Mở Google Analytics
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* GA4 Connection Status */}
      <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <Activity className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Google Analytics 4 đã được kết nối</h3>
            <p className="text-sm text-gray-600 mb-3">
              Property ID: <code className="bg-white px-2 py-0.5 rounded text-purple-600 font-mono text-xs">{GA_PROPERTY_ID}</code>
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-green-600">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Đang thu thập dữ liệu
              </span>
              <span className="text-gray-500">
                Dữ liệu sẽ hiển thị sau 24-48 giờ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Người dùng (7 ngày)</p>
              <p className="text-xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Lượt xem trang</p>
              <p className="text-xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Thời gian TB</p>
              <p className="text-xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-orange-50 text-orange-600">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Tốc độ tải</p>
              <p className="text-xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Performance */}
        <div className="bg-white rounded-xl border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Lượt truy cập theo trang</h2>
            <p className="text-sm text-gray-500 mt-1">Dữ liệu từ Google Analytics</p>
          </div>
          <div className="divide-y">
            {pages.map((page) => (
              <div key={page.path} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                <div className="p-2 rounded-lg bg-gray-50">
                  <page.icon className="w-4 h-4 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{page.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{page.path}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">—</p>
                  <p className="text-xs text-gray-400">lượt xem</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Ebooks by Views */}
        <div className="bg-white rounded-xl border">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Top Ebook được xem nhiều</h2>
            <p className="text-sm text-gray-500 mt-1">Dựa trên lượt bán</p>
          </div>
          <div className="divide-y">
            {topEbooks?.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200" />
                <p>Chưa có dữ liệu</p>
              </div>
            ) : (
              topEbooks?.map((ebook: any, index: number) => (
                <div key={ebook.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  {ebook.cover_url ? (
                    <img 
                      src={ebook.cover_url} 
                      alt={ebook.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link 
                      href={`/ebooks/${ebook.slug}`}
                      className="font-medium text-gray-900 hover:text-purple-600 truncate block"
                    >
                      {ebook.title}
                    </Link>
                    <p className="text-xs text-gray-400">
                      {new Intl.NumberFormat('vi-VN').format(ebook.price)}đ
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{ebook.sales_count || 0}</p>
                    <p className="text-xs text-gray-400">đã bán</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-gray-50 rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3">📊 Hướng dẫn xem Analytics chi tiết</h3>
        <ol className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <span>Click nút <strong>"Mở Google Analytics"</strong> ở góc trên bên phải</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <span>Trong GA4, vào <strong>Reports → Engagement → Pages and screens</strong> để xem lượt truy cập từng trang</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <span>Vào <strong>Reports → Tech → Tech overview</strong> để xem tốc độ tải trang</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <span>Dữ liệu sẽ bắt đầu hiển thị sau <strong>24-48 giờ</strong> kể từ khi cài đặt tracking code</span>
          </li>
        </ol>
      </div>
    </div>
  )
}
