import { getSupabaseAdmin } from '@/lib/db'
import { BookOpen, Layers, CreditCard, TrendingUp, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import ActivityStream from '@/components/admin/activity-stream'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin()
  
  const [ebooksRes, combosRes, ordersCompletedRes, ordersPendingRes, revenueRes] = await Promise.all([
    supabase.from('ebooks').select('id', { count: 'exact', head: true }),
    supabase.from('combos').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('amount').eq('status', 'completed'),
  ])

  const totalEbooks = ebooksRes.count || 0
  const totalCombos = combosRes.count || 0
  const totalOrdersCompleted = ordersCompletedRes.count || 0
  const totalOrdersPending = ordersPendingRes.count || 0
  const totalRevenue = revenueRes.data?.reduce((sum: number, o: any) => sum + Number(o.amount), 0) || 0

  const stats = [
    { label: 'Tổng Ebooks', value: totalEbooks, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { label: 'Tổng Combos', value: totalCombos, icon: Layers, color: 'text-green-600 bg-green-50' },
    { label: 'Đơn hoàn thành', value: totalOrdersCompleted, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Đơn chờ TT', value: totalOrdersPending, icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    { label: 'Doanh thu', value: `${new Intl.NumberFormat('vi-VN').format(totalRevenue)}đ`, icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
  ]

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành'
      case 'pending':
        return 'Chờ TT'
      case 'cancelled':
        return 'Đã hủy'
      default:
        return status
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-5">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-xl border">
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
            <Link 
              href="/admin/orders" 
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
                  <th className="px-6 py-3 font-medium">Mã đơn</th>
                  <th className="px-6 py-3 font-medium">Số tiền</th>
                  <th className="px-6 py-3 font-medium">Trạng thái</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.map((order: any) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <Link 
                        href={`/admin/orders?search=${order.payment_code}`}
                        className="font-mono text-sm font-medium text-purple-600 hover:text-purple-700"
                      >
                        {order.payment_code}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {new Intl.NumberFormat('vi-VN').format(order.amount)}đ
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.email || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString('vi-VN')}
                    </td>
                  </tr>
                ))}
                {(!recentOrders || recentOrders.length === 0) && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                      Chưa có đơn hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Stream - 1/3 width */}
        <div className="lg:col-span-1">
          <ActivityStream />
        </div>
      </div>
    </div>
  )
}
