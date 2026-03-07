import { getSupabaseAdmin } from '@/lib/db'
import { BookOpen, Layers, CreditCard, TrendingUp } from 'lucide-react'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin()
  const [ebooksRes, combosRes, ordersRes, revenueRes] = await Promise.all([
    supabase.from('ebooks').select('id', { count: 'exact', head: true }),
    supabase.from('combos').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'paid'),
    supabase.from('orders').select('amount').eq('status', 'paid'),
  ])

  const totalEbooks = ebooksRes.count || 0
  const totalCombos = combosRes.count || 0
  const totalOrders = ordersRes.count || 0
  const totalRevenue = revenueRes.data?.reduce((sum: number, o: any) => sum + Number(o.amount), 0) || 0

  const stats = [
    { label: 'Tổng Ebooks', value: totalEbooks, icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
    { label: 'Tổng Combos', value: totalCombos, icon: Layers, color: 'text-green-600 bg-green-50' },
    { label: 'Đơn hàng (đã TT)', value: totalOrders, icon: CreditCard, color: 'text-purple-600 bg-purple-50' },
    { label: 'Doanh thu', value: `${new Intl.NumberFormat('vi-VN').format(totalRevenue)}đ`, icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
  ]

  const { data: recentOrders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tổng quan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border p-6">
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

      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Đơn hàng gần đây</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-6 py-3 font-medium">Mã đơn</th>
                <th className="px-6 py-3 font-medium">Số tiền</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders?.map((order: any) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{order.public_token?.slice(0, 12)}...</td>
                  <td className="px-6 py-4 text-sm font-semibold">{new Intl.NumberFormat('vi-VN').format(order.amount)}đ</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'paid' ? 'bg-green-50 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {order.status === 'paid' ? 'Đã thanh toán' : order.status === 'pending' ? 'Chờ TT' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.email || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </td>
                </tr>
              ))}
              {(!recentOrders || recentOrders.length === 0) && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Chưa có đơn hàng</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
