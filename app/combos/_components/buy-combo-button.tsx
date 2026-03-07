'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function BuyComboButton({ comboId }: { comboId: string }) {
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ combo_id: comboId }] }),
      })

      const data = await res.json()
      if (!res.ok) {
        alert(data?.error || 'Có lỗi xảy ra khi tạo đơn hàng')
        setLoading(false)
        return
      }

      window.location.href = data.redirect_url
    } catch (e) {
      console.error('Buy combo error', e)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleBuy} disabled={loading} className="gradient-aurora text-white border-0">
      {loading ? 'Đang xử lý…' : 'Mua combo ngay'}
    </Button>
  )
}
