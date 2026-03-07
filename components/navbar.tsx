'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
              <span className="text-lg font-bold text-purple-600">Ebook Mind</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/ebooks" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition">
                Ebook Store
              </Link>
              <Link href="/combos" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition">
                Combo
              </Link>
              <Link href="/use-cases" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition">
                Use Cases
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition">
                Về Chúng Tôi
              </Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ebook..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-purple-600 transition">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white px-4 py-4 space-y-3">
          <Link href="/ebooks" className="block text-sm font-medium text-gray-700">Ebook Store</Link>
          <Link href="/combos" className="block text-sm font-medium text-gray-700">Combo</Link>
          <Link href="/use-cases" className="block text-sm font-medium text-gray-700">Use Cases</Link>
          <Link href="/about" className="block text-sm font-medium text-gray-700">Về Chúng Tôi</Link>
          <Link href="/cart" className="block text-sm font-medium text-gray-700">Giỏ hàng</Link>
        </div>
      )}
    </header>
  )
}
