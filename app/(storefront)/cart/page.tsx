'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingCart, ArrowRight, Plus, ShoppingBag } from 'lucide-react'

interface CartItem {
  id: string
  title: string
  price: number
  cover_url: string | null
  slug: string
  type: 'ebook' | 'combo'
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(stored)
  }, [])

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id)
      return
    }
    const updated = cart.map((item) => 
      item.id === id ? { ...item, quantity } : item
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)
  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = getSubtotal()

  if (!mounted) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Đang tải...</div>

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingCart className="h-8 w-8 text-purple-600" />
            Giỏ hàng ({getTotalItems()})
          </h1>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Hãy khám phá và thêm ebook yêu thích vào giỏ hàng!</p>
            <Link
              href="/ebooks"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition"
            >
              <ShoppingBag className="w-5 h-5" />
              Khám phá Ebook Store
            </Link>
          </div>
        ) : (
          /* 2 Column Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition">
                  <div className="flex gap-5">
                    {/* Product Image */}
                    <div className="relative w-24 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 shadow-sm">
                      {item.cover_url ? (
                        <Image src={item.cover_url} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-medium">
                          {item.type === 'combo' ? 'COMBO' : 'EBOOK'}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">{item.title}</h3>
                          <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full capitalize">
                            {item.type}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <label className="text-sm text-gray-600 font-medium">Số lượng:</label>
                          <select
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">
                            {new Intl.NumberFormat('vi-VN').format(item.price)}đ × {item.quantity}
                          </p>
                          <p className="text-xl font-bold text-purple-600">
                            {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)}đ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping Button */}
              <Link
                href="/ebooks"
                className="flex items-center justify-center gap-2 w-full bg-white border-2 border-dashed border-purple-300 text-purple-600 py-4 rounded-xl font-semibold hover:bg-purple-50 transition"
              >
                <Plus className="w-5 h-5" />
                Thêm ebook khác
              </Link>
            </div>

            {/* Right: Order Summary (Sticky) */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tổng đơn hàng</h2>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tổng sản phẩm</span>
                    <span className="font-semibold text-gray-900">{getTotalItems()} sản phẩm</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tổng cộng</span>
                    <span className="font-semibold text-gray-900">
                      {new Intl.NumberFormat('vi-VN').format(total)}đ
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Tổng</span>
                  <span className="text-2xl font-extrabold text-purple-600">
                    {new Intl.NumberFormat('vi-VN').format(total)}đ
                  </span>
                </div>

                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition shadow-lg hover:shadow-xl"
                >
                  Thanh toán
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/ebooks"
                  className="block text-center text-purple-600 font-semibold mt-4 hover:text-purple-700 transition"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
