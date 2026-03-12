'use client'

import { ShoppingCart, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AddToCartButtonProps {
  ebook: any
}

export default function AddToCartButton({ ebook }: AddToCartButtonProps) {
  const router = useRouter()
  const [added, setAdded] = useState(false)

  const addToCart = (buyNow = false) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingIndex = cart.findIndex((item: any) => item.id === ebook.id)
    
    if (existingIndex >= 0) {
      // Item already exists - increase quantity
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1
    } else {
      // New item - add with quantity = 1
      cart.push({
        id: ebook.id,
        title: ebook.title,
        price: ebook.price,
        cover_url: ebook.cover_url,
        slug: ebook.slug,
        type: 'ebook',
        quantity: 1,
      })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    
    if (buyNow) {
      router.push('/checkout')
    } else {
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
      router.push('/cart')
    }
  }

  return (
    <div className="space-y-2.5">
      {/* Primary: Buy now */}
      <button
        onClick={() => addToCart(true)}
        className="w-full flex items-center justify-center gap-2 gradient-purple text-white py-3.5 px-6 rounded-xl font-semibold shadow-md hover:opacity-90 transition-opacity text-sm"
      >
        <Zap className="h-4 w-4" />
        Mua ngay
      </button>

      {/* Secondary: Add to cart */}
      <button
        onClick={() => addToCart(false)}
        className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
      >
        <ShoppingCart className="h-4 w-4" />
        {added ? '✓ Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
      </button>
    </div>
  )
}
