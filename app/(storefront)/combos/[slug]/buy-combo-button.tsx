'use client'

import { ShoppingCart, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function BuyComboButton({ combo }: { combo: any }) {
  const router = useRouter()

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find((item: any) => item.id === combo.id && item.type === 'combo')
    if (!exists) {
      cart.push({
        id: combo.id,
        title: combo.title,
        price: combo.price,
        cover_url: combo.cover_url || null,
        slug: combo.slug,
        type: 'combo',
        quantity: 1,
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    router.push('/cart')
  }

  const buyNow = () => {
    router.push(`/checkout?combo=${combo.id}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={buyNow}
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-8 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
      >
        <Zap className="h-5 w-5" />
        Mua ngay
      </button>
      <button
        onClick={addToCart}
        className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-purple-600 text-purple-600 py-3 px-8 rounded-lg font-semibold hover:bg-purple-50 transition"
      >
        <ShoppingCart className="h-5 w-5" />
        Thêm vào giỏ hàng
      </button>
    </div>
  )
}
