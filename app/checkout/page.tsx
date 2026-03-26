'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { convertDriveUrl } from '@/lib/utils'

interface CartItem {
  id: string
  type: 'ebook' | 'combo'
  title: string
  cover_url?: string
  price: number
}

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)
  const [fetchingDirectItem, setFetchingDirectItem] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check if this is a direct purchase (Buy Now)
    const params = new URLSearchParams(window.location.search)
    const isDirect = params.get('direct') === 'true'
    const ebookId = params.get('ebook_id')
    const comboId = params.get('combo_id')
    
    if (isDirect && (ebookId || comboId)) {
      // Direct purchase - fetch item from database
      setFetchingDirectItem(true)
      fetchDirectItem(ebookId, comboId)
    } else {
      // Normal cart checkout
      const stored = localStorage.getItem('cart')
      if (stored) {
        try { setCartItems(JSON.parse(stored)) } catch { setCartItems([]) }
      }
    }
  }, [])

  const fetchDirectItem = async (ebookId: string | null, comboId: string | null) => {
    try {
      if (ebookId) {
        const response = await fetch(`/api/ebooks/${ebookId}`)
        const data = await response.json()
        if (data.ebook) {
          setCartItems([{
            id: data.ebook.id,
            type: 'ebook',
            title: data.ebook.title,
            cover_url: data.ebook.cover_url,
            price: data.ebook.price,
          }])
        }
      } else if (comboId) {
        const response = await fetch(`/api/combos/${comboId}`)
        const data = await response.json()
        if (data.combo) {
          setCartItems([{
            id: data.combo.id,
            type: 'combo',
            title: data.combo.title,
            cover_url: data.combo.cover_url,
            price: data.combo.price,
          }])
        }
      }
    } catch (error) {
      console.error('Error fetching direct item:', error)
      setCartItems([])
    } finally {
      setFetchingDirectItem(false)
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  const handleCheckout = async () => {
    if (cartItems.length === 0) return
    
    // Validate email
    if (!email || !email.trim()) {
      alert('Vui lòng nhập email để nhận link tải ebook')
      return
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email')
      return
    }
    
    try {
      setLoading(true)

      const items = cartItems.map(item => ({
        ...(item.type === 'combo' ? { combo_id: item.id } : { ebook_id: item.id }),
        quantity: 1,
      }))

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, email: email.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Có lỗi xảy ra khi tạo đơn hàng')
        setLoading(false)
        return
      }

      localStorage.removeItem('cart')
      window.location.href = data.redirect_url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
      setLoading(false)
    }
  }

  if (!mounted) return null

  // Show loading while fetching direct purchase item
  if (fetchingDirectItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Giỏ hàng trống</p>
          <Link href="/ebooks" className="text-purple-600 hover:underline">Khám phá Ebooks</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-600">Ebook Mind</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Đơn hàng của bạn</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    {item.cover_url && (
                      <div className="relative w-16 h-20 flex-shrink-0">
                        <Image 
                          src={convertDriveUrl(item.cover_url)} 
                          alt={item.title} 
                          fill
                          className="object-cover rounded"
                          unoptimized={true}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-gray-600 text-sm capitalize">{item.type}</p>
                    </div>
                    <p className="font-semibold">{item.price.toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between items-center text-lg font-semibold">
                <span>Tổng cộng:</span>
                <span className="text-purple-600">{total.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                  />
                  <p className="text-xs text-gray-500 mt-1">Nhập email để nhận link tải về ebook</p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-medium text-purple-900 mb-1">Phương thức thanh toán</h3>
                  <p className="text-sm text-purple-700">Chuyển khoản ngân hàng - Quét mã QR hoặc chuyển khoản</p>
                </div>

                <button onClick={handleCheckout} disabled={loading}
                  className="w-full gradient-purple text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50">
                  {loading ? 'Đang xử lý...' : `Thanh toán ${total.toLocaleString('vi-VN')}đ`}
                </button>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Bằng cách thanh toán, bạn đồng ý với:</p>
                  <div className="flex space-x-4">
                    <Link href="/about" className="text-purple-600 hover:underline">Điều khoản sử dụng</Link>
                    <Link href="/contact" className="text-purple-600 hover:underline">Chính sách hoàn tiền</Link>
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
