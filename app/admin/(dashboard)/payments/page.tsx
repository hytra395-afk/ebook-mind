import { getSupabaseAdmin } from '@/lib/db'
import { ShoppingCart, CheckCircle, Clock, XCircle, TrendingUp, Calendar, CalendarDays, CalendarRange, Trophy, BookOpen } from 'lucide-react'

export const revalidate = 0

export default async function AdminPaymentsPage() {
  const supabase = getSupabaseAdmin()
  
  // Get current date info
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString()

  // Fetch all stats in parallel
  const [
    totalOrdersRes,
    completedOrdersRes,
    pendingOrdersRes,
    totalRevenueRes,
    todayRevenueRes,
    weekRevenueRes,
    monthRevenueRes,
    yearRevenueRes,
    topEbooksRes
  ] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('amount').eq('status', 'completed'),
    supabase.from('orders').select('amount').eq('status', 'completed').gte('created_at', startOfDay),
    supabase.from('orders').select('amount').eq('status', 'completed').gte('created_at', startOfWeek),
    supabase.from('orders').select('amount').eq('status', 'completed').gte('created_at', startOfMonth),
    supabase.from('orders').select('amount').eq('status', 'completed').gte('created_at', startOfYear),
    supabase.from('order_items')
      .select(`
        ebook_id,
        quantity,
        unit_price,
        orders!inner(status),
        ebooks(id, title, cover_url, price)
      `)
      .eq('orders.status', 'completed')
      .not('ebook_id', 'is', null)
  ])

  const totalOrders = totalOrdersRes.count || 0
  const completedOrders = completedOrdersRes.count || 0
  const pendingOrders = pendingOrdersRes.count || 0
  
  const sumAmount = (data: any[] | null) => data?.reduce((sum, o) => sum + Number(o.amount), 0) || 0
  const totalRevenue = sumAmount(totalRevenueRes.data)
  const todayRevenue = sumAmount(todayRevenueRes.data)
  const weekRevenue = sumAmount(weekRevenueRes.data)
  const monthRevenue = sumAmount(monthRevenueRes.data)
  const yearRevenue = sumAmount(yearRevenueRes.data)

  // Process top ebooks
  const ebookSales: Record<string, { ebook: any, quantity: number, revenue: number }> = {}
  topEbooksRes.data?.forEach((item: any) => {
    if (item.ebook_id && item.ebooks) {
      if (!ebookSales[item.ebook_id]) {
        ebookSales[item.ebook_id] = { ebook: item.ebooks, quantity: 0, revenue: 0 }
      }
      ebookSales[item.ebook_id].quantity += item.quantity || 1
      ebookSales[item.ebook_id].revenue += (item.unit_price || item.ebooks.price) * (item.quantity || 1)
    }
  })
  const topEbooks = Object.values(ebookSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10)
  const maxSales = topEbooks[0]?.quantity || 1

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ'

  const orderStats = [
    { label: 'Tổng đơn hàng', value: totalOrders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Đơn hoàn thành', value: completedOrders, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Đơn chờ TT', value: pendingOrders, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
  ]

  const revenueStats = [
    { label: 'Tổng doanh thu', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-purple-600 bg-purple-50', highlight: true },
    { label: 'Hôm nay', value: formatCurrency(todayRevenue), icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Tuần này', value: formatCurrency(weekRevenue), icon: CalendarDays, color: 'text-teal-600 bg-teal-50' },
    { label: 'Tháng này', value: formatCurrency(monthRevenue), icon: CalendarRange, color: 'text-orange-600 bg-orange-50' },
    { label: 'Năm nay', value: formatCurrency(yearRevenue), icon: Trophy, color: 'text-pink-600 bg-pink-50' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Thống kê Thanh toán</h1>

      {/* Order Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orderStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border p-5">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalOrders > 0 && (
          <div className="mt-4 bg-white rounded-xl border p-5">
            <p className="text-sm text-gray-500 mb-2">Tỷ lệ hoàn thành</p>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all"
                  style={{ width: `${(completedOrders / totalOrders) * 100}%` }}
                />
              </div>
              <span className="text-lg font-bold text-green-600">
                {((completedOrders / totalOrders) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Revenue Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {revenueStats.map((stat) => (
            <div key={stat.label} className={`bg-white rounded-xl border p-5 ${stat.highlight ? 'ring-2 ring-purple-200' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className={`font-bold ${stat.highlight ? 'text-xl text-purple-600' : 'text-lg text-gray-900'}`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Ebooks */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Ebook bán chạy</h2>
        <div className="bg-white rounded-xl border overflow-hidden">
          {topEbooks.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-200" />
              <p>Chưa có dữ liệu bán hàng</p>
            </div>
          ) : (
            <div className="divide-y">
              {topEbooks.map((item, index) => (
                <div key={item.ebook.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                    index === 1 ? 'bg-gray-100 text-gray-600' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-50 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  {item.ebook.cover_url ? (
                    <img 
                      src={item.ebook.cover_url} 
                      alt={item.ebook.title}
                      className="w-12 h-16 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.ebook.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} bản • {formatCurrency(item.revenue)}
                    </p>
                  </div>
                  <div className="w-32">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full"
                        style={{ width: `${(item.quantity / maxSales) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
