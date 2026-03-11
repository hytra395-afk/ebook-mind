'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, BookOpen, Layers, ShoppingCart, CreditCard, BarChart3, LogOut, Home } from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/admin/ebooks', label: 'Ebooks', icon: BookOpen },
  { href: '/admin/combos', label: 'Combos', icon: Layers },
  { href: '/admin/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { href: '/admin/payments', label: 'Thanh toán', icon: CreditCard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    localStorage.removeItem('admin_login_time')
    router.push('/admin/login')
  }

  return (
    <aside className="w-64 bg-white border-r flex flex-col min-h-screen">
      <div className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold gradient-text-aurora">Ebook Mind</span>
            <p className="text-xs text-gray-400">Admin Console</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                isActive
                  ? 'bg-purple-50 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
        >
          <Home className="h-5 w-5 text-gray-400" />
          Về trang chủ
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="h-5 w-5 text-red-400" />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
