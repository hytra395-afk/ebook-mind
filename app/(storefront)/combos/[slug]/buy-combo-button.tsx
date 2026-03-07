'use client'

import { ShoppingCart } from 'lucide-react'
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
        cover_url: null,
        slug: combo.slug,
        type: 'combo',
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    router.push('/cart')
  }

  return (
    <button
      onClick={addToCart}
      className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition"
    >
      <ShoppingCart className="h-5 w-5" />
      Thêm combo vào giỏ hàng
    </button>
  )
}
