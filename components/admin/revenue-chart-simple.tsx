'use client'

import { useMemo } from 'react'

interface RevenueChartProps {
  data: Array<{ date: string; revenue: number }>
  currency?: string
}

export default function RevenueChartSimple({ data, currency = 'đ' }: RevenueChartProps) {
  const chartData = useMemo(() => {
    return data.map(d => ({
      ...d,
      displayDate: new Date(d.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })
    }))
  }, [data])

  const maxRevenue = Math.max(...data.map(d => d.revenue), 1)

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl border p-8 text-center text-gray-400">
        <p>Không có dữ liệu để hiển thị biểu đồ</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng doanh thu</h3>
      <div className="space-y-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-xs text-gray-500 w-12">{item.displayDate}</span>
            <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full transition-all"
                style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium text-purple-700">
                {new Intl.NumberFormat('vi-VN').format(item.revenue)}{currency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
