import { getSupabaseAdmin } from '@/lib/db'

export const revalidate = 0

export default async function AdminPaymentsPage() {
  const supabase = getSupabaseAdmin()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Quản lý Thanh toán</h1>

      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Mã đơn</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Số tiền</th>
                <th className="px-6 py-3 font-medium">Phương thức</th>
                <th className="px-6 py-3 font-medium">Trạng thái</th>
                <th className="px-6 py-3 font-medium">Ngày tạo</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">{order.public_token?.slice(0, 16)}...</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.email || '-'}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{new Intl.NumberFormat('vi-VN').format(order.amount)}đ</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.payment_method || 'Sepay'}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      order.status === 'paid' ? 'bg-green-50 text-green-700' :
                      order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                      order.status === 'expired' ? 'bg-red-50 text-red-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {order.status === 'paid' ? 'Đã TT' : order.status === 'pending' ? 'Chờ TT' : order.status === 'expired' ? 'Hết hạn' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleString('vi-VN')}
                  </td>
                </tr>
              ))}
              {(!orders || orders.length === 0) && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400">Chưa có đơn hàng</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
