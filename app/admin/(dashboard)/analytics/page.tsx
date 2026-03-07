import { getSupabaseAdmin } from '@/lib/db'
import { TrendingUp, ShoppingCart, BookOpen, DollarSign } from 'lucide-react'

export const revalidate = 0

export default async function AdminAnalyticsPage() {
  const supabase = getSupabaseAdmin()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

  const [totalRes, monthRes, topEbooksRes] = await Promise.all([
    supabase.from('orders').select('amount').eq('status', 'paid'),
    supabase.from('orders').select('amount').eq('status', 'paid').gte('created_at', startOfMonth),
    supabase.from('ebooks').select('id, title, sales_count, price').order('sales_count', { ascending: false }).limit(10),
  ])

  const totalRevenue = totalRes.data?.reduce((s: number, o: any) => s + Number(o.amount), 0) || 0
  const monthRevenue = monthRes.data?.reduce((s: number, o: any) => s + Number(o.amount), 0) || 0
  const totalOrders = totalRes.data?.length || 0
  const monthOrders = monthRes.data?.length || 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-500">Tổng doanh thu</span>
          </div>
          <p className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN').format(totalRevenue)}đ</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-500">Doanh thu tháng này</span>
          </div>
          <p className="text-2xl font-bold">{new Intl.NumberFormat('vi-VN').format(monthRevenue)}đ</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-3">
            <ShoppingCart className="h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-500">Tổng đơn hàng</span>
          </div>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-5 w-5 text-orange-600" />
            <span className="text-sm text-gray-500">Đơn tháng này</span>
          </div>
          <p className="text-2xl font-bold">{monthOrders}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Top Ebooks bán chạy</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Ebook</th>
                <th className="px-6 py-3 font-medium">Giá</th>
                <th className="px-6 py-3 font-medium">Đã bán</th>
                <th className="px-6 py-3 font-medium">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {topEbooksRes.data?.map((ebook: any, i: number) => (
                <tr key={ebook.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-400">{i + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{ebook.title}</td>
                  <td className="px-6 py-4 text-sm">{new Intl.NumberFormat('vi-VN').format(ebook.price)}đ</td>
                  <td className="px-6 py-4 text-sm">{ebook.sales_count}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{new Intl.NumberFormat('vi-VN').format(ebook.price * ebook.sales_count)}đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
