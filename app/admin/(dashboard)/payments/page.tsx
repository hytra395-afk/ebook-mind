import { getSupabaseAdmin } from '@/lib/db'
import { ShoppingCart, CheckCircle, Clock, TrendingUp, Calendar, CalendarDays, CalendarRange, Trophy, BookOpen, Download, Trash2 } from 'lucide-react'
import PaymentsTransactions from '@/components/admin/payments-transactions'

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
    providerRevenueRes,
    ebookRevenueRes
  ] = await Promise.all([
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('is_hidden', false),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('is_hidden', false).eq('status', 'completed'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('is_hidden', false).eq('status', 'pending'),
    supabase.from('orders').select('amount').eq('is_hidden', false).eq('status', 'completed'),
    supabase.from('orders').select('amount').eq('is_hidden', false).eq('status', 'completed').gte('created_at', startOfDay),
    supabase.from('orders').select('amount').eq('is_hidden', false).eq('status', 'completed').gte('created_at', startOfWeek),
    supabase.from('orders').select('amount').eq('is_hidden', false).eq('status', 'completed').gte('created_at', startOfMonth),
    supabase.from('orders').select('amount, provider').eq('is_hidden', false).eq('status', 'completed'),
    supabase.from('orders').select('amount, provider').eq('is_hidden', false).eq('status', 'completed'),
    supabase.from('order_items')
      .select(`
        ebook_id,
        quantity,
        unit_price,
        orders!inner(status, is_hidden),
        ebooks(id, title, cover_url, price)
      `)
      .eq('orders.status', 'completed')
      .eq('orders.is_hidden', false)
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

  // Revenue by provider
  const providerRevenue: Record<string, number> = {}
  providerRevenueRes.data?.forEach((item: any) => {
    const provider = item.provider || 'Unknown'
    providerRevenue[provider] = (providerRevenue[provider] || 0) + Number(item.amount)
  })
  const providerBreakdown = Object.entries(providerRevenue).sort((a, b) => b[1] - a[1])

  // Revenue by ebook
  const ebookSales: Record<string, { ebook: any, quantity: number, revenue: number }> = {}
  ebookRevenueRes?.data?.forEach((item: any) => {
    if (item.ebook_id && item.ebooks) {
      if (!ebookSales[item.ebook_id]) {
        ebookSales[item.ebook_id] = { ebook: item.ebooks, quantity: 0, revenue: 0 }
      }
      ebookSales[item.ebook_id].quantity += item.quantity || 1
      ebookSales[item.ebook_id].revenue += (item.unit_price || item.ebooks.price) * (item.quantity || 1)
    }
  })
  const ebookBreakdown = Object.values(ebookSales).sort((a, b) => b.revenue - a.revenue)

  const formatCurrency = (amount: number) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ'

  const stats = [
    { label: 'Tổng đơn hàng', value: totalOrders, icon: ShoppingCart, color: 'text-blue-600 bg-blue-50' },
    { label: 'Đơn hoàn thành', value: completedOrders, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
    { label: 'Đơn chờ TT', value: pendingOrders, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Tổng doanh thu', value: formatCurrency(totalRevenue), icon: TrendingUp, color: 'text-purple-600 bg-purple-50', highlight: true },
    { label: 'Hôm nay', value: formatCurrency(todayRevenue), icon: Calendar, color: 'text-blue-600 bg-blue-50' },
    { label: 'Tuần này', value: formatCurrency(weekRevenue), icon: CalendarDays, color: 'text-teal-600 bg-teal-50' },
    { label: 'Tháng này', value: formatCurrency(monthRevenue), icon: CalendarRange, color: 'text-orange-600 bg-orange-50' },
    { label: 'Năm nay', value: formatCurrency(yearRevenue), icon: Trophy, color: 'text-pink-600 bg-pink-50' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thống kê Thanh toán</h1>
          <p className="text-sm text-gray-500 mt-1">Xem doanh thu và giao dịch theo thời gian</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
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

      {/* Revenue by Provider */}
      {providerBreakdown.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo nguồn thanh toán</h2>
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="divide-y">
              {providerBreakdown.map(([provider, amount]) => (
                <div key={provider} className="flex items-center justify-between p-4 hover:bg-gray-50 transition">
                  <span className="font-medium text-gray-900">{provider}</span>
                  <span className="font-bold text-purple-600">{formatCurrency(amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Revenue by Ebook - MOST IMPORTANT */}
      {ebookBreakdown.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo Ebook</h2>
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="divide-y">
              {ebookBreakdown.map((item) => (
                <div key={item.ebook.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                  {item.ebook.cover_url ? (
                    <img 
                      src={item.ebook.cover_url} 
                      alt={item.ebook.title}
                      className="w-10 h-14 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-14 bg-gray-100 rounded flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.ebook.title}</p>
                    <p className="text-sm text-gray-500">{item.quantity} bản đã bán</p>
                  </div>
                  <span className="font-bold text-purple-600">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Transactions by Date Range */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Giao dịch theo thời gian</h2>
        <PaymentsTransactions />
      </div>
    </div>
  )
}
