'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Mock cart items - replace with real cart data
const MOCK_CART_ITEMS = [
  {
    id: "1",
    ebook_id: "1",
    title: "Tư Duy Kinh Doanh Hiện Đại",
    coverUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100&h=150&fit=crop",
    price: 79000,
  },
  {
    id: "2",
    ebook_id: "2", 
    title: "Phát Triển Bản Thân Mỗi Ngày",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&h=150&fit=crop",
    price: 69000,
  },
]

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const total = MOCK_CART_ITEMS.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    try {
      setLoading(true)

      // Prepare order items
      const items = MOCK_CART_ITEMS.map(item => ({
        ebook_id: item.ebook_id,
        quantity: 1
      }))

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          email: email || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Có lỗi xảy ra khi tạo đơn hàng')
        setLoading(false)
        return
      }

      // Redirect to processing page
      window.location.href = data.redirect_url

    } catch (error) {
      console.error('Checkout error:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            📚 EbookMind
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
              
              <div className="space-y-4">
                {MOCK_CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.coverUrl}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600">Ebook</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price.toLocaleString('vi-VN')}đ</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">{total.toLocaleString('vi-VN')}đ</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (tùy chọn)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Nhập email để nhận link tải về ebook
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Phương thức thanh toán</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                    <span className="text-blue-800">Chuyển khoản ngân hàng (Sepay)</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-2">
                    Quét mã QR hoặc chuyển khoản theo thông tin được cung cấp
                  </p>
                </div>

                <Button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full gradient-aurora text-white border-0 py-3"
                >
                  {loading ? 'Đang xử lý...' : `Thanh toán ${total.toLocaleString('vi-VN')}đ`}
                </Button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Bằng cách thanh toán, bạn đồng ý với:</p>
                  <div className="flex space-x-4">
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Điều khoản sử dụng
                    </Link>
                    <Link href="/refund" className="text-blue-600 hover:underline">
                      Chính sách hoàn tiền
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
