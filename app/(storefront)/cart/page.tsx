'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-react'

interface CartItem {
  id: string
  title: string
  price: number
  cover_url: string | null
  slug: string
  type: 'ebook' | 'combo'
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

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  if (!mounted) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Đang tải...</div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
        <ShoppingCart className="h-8 w-8 text-purple-600" />
        Giỏ hàng ({cart.length})
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">Giỏ hàng trống</p>
          <Link href="/ebooks" className="text-purple-600 font-semibold hover:underline">
            Khám phá Ebook Store →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white border rounded-xl p-4">
                <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  {item.cover_url ? (
                    <Image src={item.cover_url} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Combo</div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <span className="text-sm text-gray-400 capitalize">{item.type}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">{new Intl.NumberFormat('vi-VN').format(item.price)}đ</p>
                  <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 mt-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">Tổng cộng</span>
              <span className="text-2xl font-bold text-purple-600">{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
            </div>
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Thanh toán <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
