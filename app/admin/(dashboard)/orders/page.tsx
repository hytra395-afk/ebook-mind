'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Search, Filter, Download, Eye, Edit2, X, Check, ChevronLeft, ChevronRight, RefreshCw, Trash2 } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Order {
  id: string
  public_token: string
  payment_code: string
  status: string
  amount: number
  email: string | null
  provider: string
  provider_txn_id: string | null
  created_at: string
  updated_at: string
  metadata: any
  is_hidden?: boolean
  order_items?: Array<{
    id: string
    ebook_id: string | null
    combo_id: string | null
    quantity: number | null
    unit_price: number | null
    ebooks?: { title: string } | null
    combos?: { title: string } | null
  }>
}

const ITEMS_PER_PAGE = 20

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [includeHidden, setIncludeHidden] = useState(false)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [expandedProduct, setExpandedProduct] = useState<Record<string, boolean>>({})
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [editEmail, setEditEmail] = useState('')
  const [editStatus, setEditStatus] = useState('')
  const [saving, setSaving] = useState(false)

  const selectedIds = Object.keys(selected).filter((id) => selected[id])

  const bulkHide = async (hidden: boolean) => {
    if (selectedIds.length === 0) return

    const ok = window.confirm(
      hidden
        ? `Ẩn ${selectedIds.length} đơn hàng khỏi danh sách?`
        : `Hiện lại ${selectedIds.length} đơn hàng đã ẩn?`
    )
    if (!ok) return

    const { data: sessionRes } = await supabase.auth.getSession()
    const token = sessionRes.session?.access_token
    if (!token) {
      alert('Bạn cần đăng nhập admin để thực hiện thao tác này')
      return
    }

    const res = await fetch('/api/admin/orders/bulk-hide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: selectedIds, hidden }),
    })

    const json = await res.json()
    if (!res.ok) {
      alert(json?.error || 'Không thể cập nhật')
      return
    }

    fetchOrders()
  }

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return

    const ok = window.confirm(`XÓA VĨNH VIỄN ${selectedIds.length} đơn hàng? Thao tác này không thể hoàn tác.`)
    if (!ok) return

    const text = window.prompt('Gõ XOA để xác nhận xóa vĩnh viễn')
    if (text !== 'XOA') return

    const { data: sessionRes } = await supabase.auth.getSession()
    const token = sessionRes.session?.access_token
    if (!token) {
      alert('Bạn cần đăng nhập admin để thực hiện thao tác này')
      return
    }

    const res = await fetch('/api/admin/orders/bulk-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ids: selectedIds }),
    })

    const json = await res.json()
    if (!res.ok) {
      alert(json?.error || 'Không thể xóa')
      return
    }

    fetchOrders()
  }

  const getProductSummary = (order: Order) => {
    const items = order.order_items || []
    if (items.length === 0) return '—'
    const parts = items
      .map((it) => {
        const title = it.ebooks?.title || it.combos?.title
        if (!title) return null
        const q = it.quantity || 1
        return q > 1 ? `${title} x${q}` : title
      })
      .filter(Boolean) as string[]

    return parts.length ? parts.join(', ') : '—'
  }

  const fetchOrders = async () => {
    setLoading(true)
    let query = supabase
      .from('orders')
      .select(
        `
        *,
        order_items(
          id,
          ebook_id,
          combo_id,
          quantity,
          unit_price,
          ebooks(title),
          combos(title)
        )
      `,
        { count: 'exact' }
      )
      .order('created_at', { ascending: false })
      .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1)

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    if (search) {
      query = query.or(`payment_code.ilike.%${search}%,email.ilike.%${search}%`)
    }

    if (!includeHidden) {
      query = query.eq('is_hidden', false)
    }

    const { data, count, error } = await query

    if (!error && data) {
      setOrders(data)
      setTotalCount(count || 0)
      setSelected({})
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [page, statusFilter, search, includeHidden])

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  const handleEdit = (order: Order) => {
    setEditingOrder(order)
    setEditEmail(order.email || '')
    setEditStatus(order.status)
  }

  const handleSave = async () => {
    if (!editingOrder) return
    setSaving(true)

    const { error } = await supabase
      .from('orders')
      .update({
        email: editEmail || null,
        status: editStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', editingOrder.id)

    if (!error) {
      setEditingOrder(null)
      fetchOrders()
    }
    setSaving(false)
  }

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

  const exportCSV = () => {
    const headers = ['Payment Code', 'Amount', 'Status', 'Email', 'Created At']
    const rows = orders.map(o => [
      o.payment_code,
      o.amount,
      o.status,
      o.email || '',
      new Date(o.created_at).toLocaleString('vi-VN')
    ])
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
          <p className="text-sm text-gray-500 mt-1">Tổng cộng {totalCount} đơn hàng</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn hoặc email..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1) }}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ thanh toán</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={includeHidden}
              onChange={(e) => { setIncludeHidden(e.target.checked); setPage(1) }}
              className="rounded border-gray-300"
            />
            Hiển thị đã ẩn
          </label>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className="mb-4 bg-purple-50 border border-purple-100 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-purple-700 font-medium">Đã chọn {selectedIds.length} đơn hàng</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => bulkHide(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-purple-200 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition"
            >
              <Trash2 className="w-4 h-4" />
              Ẩn khỏi danh sách
            </button>
            <button
              onClick={bulkDelete}
              className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition"
              title="Xóa vĩnh viễn khỏi database"
            >
              Xóa vĩnh viễn
            </button>
            {includeHidden && (
              <button
                onClick={() => bulkHide(false)}
                className="px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
              >
                Hiện lại
              </button>
            )}
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
                <th className="px-6 py-4 font-medium w-10">
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && selectedIds.length === orders.length}
                    onChange={(e) => {
                      const checked = e.target.checked
                      const next: Record<string, boolean> = {}
                      if (checked) orders.forEach((o) => (next[o.id] = true))
                      setSelected(next)
                    }}
                  />
                </th>
                <th className="px-6 py-4 font-medium">Mã đơn hàng</th>
                <th className="px-6 py-4 font-medium">Ebook</th>
                <th className="px-6 py-4 font-medium">Số tiền</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-400">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Đang tải...
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-20 text-center text-gray-400">
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={Boolean(selected[order.id])}
                        onChange={(e) => setSelected((s) => ({ ...s, [order.id]: e.target.checked }))}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-purple-600">
                        {order.payment_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <div 
                        className="max-w-[360px] truncate cursor-pointer hover:text-purple-600 transition"
                        title={getProductSummary(order)}
                        onClick={() => setExpandedProduct((prev) => ({ ...prev, [order.id]: !prev[order.id] }))}
      >
        {expandedProduct[order.id] ? getProductSummary(order) : getProductSummary(order).length > 40 ? getProductSummary(order).slice(0, 40) + '...' : getProductSummary(order)}
      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {new Intl.NumberFormat('vi-VN').format(order.amount)}đ
                      </span>
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="Xem chi tiết"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(order)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
            <p className="text-sm text-gray-500">
              Hiển thị {(page - 1) * ITEMS_PER_PAGE + 1} - {Math.min(page * ITEMS_PER_PAGE, totalCount)} / {totalCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="px-3 py-1 text-sm font-medium text-gray-700">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Chi tiết đơn hàng</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mã đơn hàng</p>
                  <p className="font-mono font-medium text-purple-600">{selectedOrder.payment_code}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ebook</p>
                  <p className="text-gray-700">{getProductSummary(selectedOrder)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Public Token</p>
                  <p className="font-mono text-sm text-gray-700">{selectedOrder.public_token}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số tiền</p>
                  <p className="font-semibold text-gray-900">{new Intl.NumberFormat('vi-VN').format(selectedOrder.amount)}đ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trạng thái</p>
                  <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full border ${getStatusBadge(selectedOrder.status)}`}>
                    {getStatusLabel(selectedOrder.status)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-700">{selectedOrder.email || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="text-gray-700">{selectedOrder.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Provider TXN ID</p>
                  <p className="font-mono text-sm text-gray-700">{selectedOrder.provider_txn_id || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ngày tạo</p>
                  <p className="text-gray-700">{new Date(selectedOrder.created_at).toLocaleString('vi-VN')}</p>
                </div>
              </div>
              {selectedOrder.metadata && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Metadata</p>
                  <pre className="bg-gray-50 rounded-lg p-4 text-xs overflow-auto max-h-40">
                    {JSON.stringify(selectedOrder.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-bold text-gray-900">Chỉnh sửa đơn hàng</h2>
              <button
                onClick={() => setEditingOrder(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Mã đơn hàng</p>
                <p className="font-mono font-medium text-purple-600">{editingOrder.payment_code}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Nhập email..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="pending">Chờ thanh toán</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
