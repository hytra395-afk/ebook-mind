'use client'

import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AddToCartButtonProps {
  ebook: any
}

export default function AddToCartButton({ ebook }: AddToCartButtonProps) {
  const router = useRouter()

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find((item: any) => item.id === ebook.id)
    if (!exists) {
      cart.push({
        id: ebook.id,
        title: ebook.title,
        price: ebook.price,
        cover_url: ebook.cover_url,
        slug: ebook.slug,
        type: 'ebook',
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    router.push('/cart')
  }

  return (
    <button
      onClick={addToCart}
      className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition"
    >
      <ShoppingCart className="h-5 w-5" />
      Thêm vào giỏ hàng
    </button>
  )
}
