'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Search, ShoppingCart, Menu, X, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { LogoIcon } from './logo-icon'

export default function Navbar() {
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/ebooks?search=${encodeURIComponent(search.trim())}`)
    }
  }

  return (
    <header className={`sticky top-0 z-50 glass transition-all duration-300 ${scrolled ? 'border-b border-gradient-aurora shadow-sm' : 'border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12' : 'h-14'}`}>
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
              <LogoIcon />
              <span className="text-xl font-bold gradient-text-purple">Ebook Mind</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/ebooks" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                Ebook Store
              </Link>
              <Link href="/combos" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                Combo
              </Link>
              <Link href="/use-cases" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                Use Cases
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors">
                Về Chúng Tôi
              </Link>
            </nav>
          </div>

          {/* Right: Search + Cart */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm ebook..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-4 py-1.5 w-52 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white transition"
              />
            </form>
            <Link href="/cart" className="p-2 text-gray-500 hover:text-purple-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-gray-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearch} className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm ebook..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </form>
          <Link href="/ebooks" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1">Ebook Store</Link>
          <Link href="/combos" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1">Combo</Link>
          <Link href="/use-cases" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1">Use Cases</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1">Về Chúng Tôi</Link>
          <Link href="/cart" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-gray-700 py-1">Giỏ hàng</Link>
        </div>
      )}
    </header>
  )
}
