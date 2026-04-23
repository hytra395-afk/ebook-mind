'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { CalendarDays, RefreshCw, Trash2 } from 'lucide-react'

type OrderItem = {
  id: string
  ebook_id: string | null
  combo_id: string | null
  quantity: number | null
  unit_price: number | null
  ebooks?: { title: string } | null
  combos?: { title: string } | null
}

type Txn = {
  id: string
  payment_code: string
  status: string
  amount: number
  email: string | null
  provider: string
  provider_txn_id: string | null
  created_at: string
  is_hidden: boolean
  order_items: OrderItem[]
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function endOfDay(d: Date) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setHours(23, 59, 59, 999)
  return x
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ'
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('vi-VN')
}

function getItemTitle(it: OrderItem) {
  const title = it.ebooks?.title || it.combos?.title
  if (!title) return '—'
  const q = it.quantity || 1
  return q > 1 ? `${title} x${q}` : title
}

export default function PaymentsTransactions() {
  const [loading, setLoading] = useState(false)
  const [txns, setTxns] = useState<Txn[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})

  const [includeHidden, setIncludeHidden] = useState(false)

  const [mode, setMode] = useState<'day' | 'week' | 'month' | 'year' | 'custom'>('month')
  const [from, setFrom] = useState(() => startOfDay(new Date()))
  const [to, setTo] = useState(() => endOfDay(new Date()))

  useEffect(() => {
    const now = new Date()
    if (mode === 'day') {
      setFrom(startOfDay(now))
      setTo(endOfDay(now))
    }
    if (mode === 'week') {
      const x = new Date(now)
      const day = x.getDay() // 0..6
      const start = new Date(x)
      start.setDate(x.getDate() - day)
      setFrom(startOfDay(start))
      setTo(endOfDay(now))
    }
    if (mode === 'month') {
      setFrom(new Date(now.getFullYear(), now.getMonth(), 1))
      setTo(endOfDay(now))
    }
    if (mode === 'year') {
      setFrom(new Date(now.getFullYear(), 0, 1))
      setTo(endOfDay(now))
    }
  }, [mode])

  const selectedIds = useMemo(() => Object.keys(selected).filter((id) => selected[id]), [selected])

  const breakdownByProvider = useMemo(() => {
    const map: Record<string, number> = {}
    for (const t of txns) {
      map[t.provider] = (map[t.provider] || 0) + Number(t.amount || 0)
    }
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [txns])

  const totalInRange = useMemo(() => txns.reduce((s, t) => s + Number(t.amount || 0), 0), [txns])

  const fetchTxns = async () => {
    setLoading(true)
    try {
      const { data: sessionRes } = await supabase.auth.getSession()
      const token = sessionRes.session?.access_token
      if (!token) {
        setTxns([])
        setSelected({})
        setLoading(false)
        return
      }

      const url = new URL('/api/admin/payments/transactions', window.location.origin)
      url.searchParams.set('from', from.toISOString())
      url.searchParams.set('to', to.toISOString())
      if (includeHidden) url.searchParams.set('include_hidden', '1')

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Failed to load transactions')

      setTxns(json.data || [])
      setSelected({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTxns()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from.getTime(), to.getTime(), includeHidden])

  const bulkHide = async (hidden: boolean) => {
    if (selectedIds.length === 0) return

    const ok = window.confirm(
      hidden
        ? `Ẩn ${selectedIds.length} giao dịch khỏi danh sách?`
        : `Hiện lại ${selectedIds.length} giao dịch đã ẩn?`
    )
    if (!ok) return

    const { data: sessionRes } = await supabase.auth.getSession()
    const token = sessionRes.session?.access_token
    if (!token) return

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

    await fetchTxns()
  }

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return

    const ok = window.confirm(`XÓA VĨNH VIỄN ${selectedIds.length} giao dịch? Thao tác này không thể hoàn tác.`)
    if (!ok) return

    const text = window.prompt('Gõ XOA để xác nhận xóa vĩnh viễn')
    if (text !== 'XOA') return

    const { data: sessionRes } = await supabase.auth.getSession()
    const token = sessionRes.session?.access_token
    if (!token) return

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

    await fetchTxns()
  }

  return (
    <div className="bg-white rounded-xl border">
      <div className="p-5 border-b">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Giao dịch theo khoảng thời gian</h2>
            <p className="text-sm text-gray-500 mt-1">
              Tổng: <span className="font-semibold text-gray-900">{formatCurrency(totalInRange)}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchTxns}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              title="Tải lại"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gray-400" />
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Năm nay</option>
              <option value="custom">Tùy chọn</option>
            </select>
          </div>

          {mode === 'custom' && (
            <>
              <input
                type="date"
                value={from.toISOString().slice(0, 10)}
                onChange={(e) => setFrom(startOfDay(new Date(e.target.value)))}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
              <span className="text-sm text-gray-400">→</span>
              <input
                type="date"
                value={to.toISOString().slice(0, 10)}
                onChange={(e) => setTo(endOfDay(new Date(e.target.value)))}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
            <input
              type="checkbox"
              checked={includeHidden}
              onChange={(e) => setIncludeHidden(e.target.checked)}
              className="rounded border-gray-300"
            />
            Hiển thị đã ẩn
          </label>
        </div>

        {breakdownByProvider.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {breakdownByProvider.map(([provider, amount]) => (
              <div key={provider} className="bg-gray-50 border rounded-xl p-4">
                <p className="text-xs text-gray-500">Nguồn</p>
                <p className="font-semibold text-gray-900 mt-1">{provider}</p>
                <p className="text-sm text-purple-600 font-bold mt-1">{formatCurrency(amount)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIds.length > 0 && (
        <div className="px-5 py-3 border-b bg-purple-50 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-purple-700 font-medium">Đã chọn {selectedIds.length} giao dịch</p>
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

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b bg-gray-50">
              <th className="px-5 py-3 font-medium w-10">
                <input
                  type="checkbox"
                  checked={txns.length > 0 && selectedIds.length === txns.length}
                  onChange={(e) => {
                    const checked = e.target.checked
                    const next: Record<string, boolean> = {}
                    if (checked) txns.forEach((t) => (next[t.id] = true))
                    setSelected(next)
                  }}
                />
              </th>
              <th className="px-5 py-3 font-medium">Mã</th>
              <th className="px-5 py-3 font-medium">Sản phẩm</th>
              <th className="px-5 py-3 font-medium">Số tiền</th>
              <th className="px-5 py-3 font-medium">Nguồn</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                  Đang tải...
                </td>
              </tr>
            ) : txns.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-gray-400">
                  Không có giao dịch trong khoảng thời gian này
                </td>
              </tr>
            ) : (
              txns.map((t) => (
                <tr key={t.id} className={`border-b last:border-0 hover:bg-gray-50 transition ${t.is_hidden ? 'opacity-60' : ''}`}>
                  <td className="px-5 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(selected[t.id])}
                      onChange={(e) => setSelected((s) => ({ ...s, [t.id]: e.target.checked }))}
                    />
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-mono text-sm font-medium text-purple-600">{t.payment_code}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-700">
                    <div className="max-w-[420px] truncate">
                      {t.order_items?.length ? t.order_items.map(getItemTitle).join(', ') : '—'}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="font-semibold text-gray-900">{formatCurrency(Number(t.amount || 0))}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-600">{t.provider}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{t.email || '—'}</td>
                  <td className="px-5 py-3 text-sm text-gray-600">{formatDateTime(t.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
