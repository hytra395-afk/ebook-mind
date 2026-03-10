import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-sm">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold gradient-text-aurora">Ebook Mind</span>
            </div>
            <p className="text-sm text-gray-500">Kiến thức ngách thay đổi mindset</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm</h3>
            <div className="space-y-2">
              <Link href="/ebooks" className="block text-sm text-gray-500 hover:text-purple-600">Ebook Store</Link>
              <Link href="/combos" className="block text-sm text-gray-500 hover:text-purple-600">Combo Ưu Đãi</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Danh Mục</h3>
            <div className="space-y-2">
              <Link href="/ebooks?category=Kinh Doanh" className="block text-sm text-gray-500 hover:text-purple-600">Kinh Doanh</Link>
              <Link href="/ebooks?category=Phát Triển Bản Thân" className="block text-sm text-gray-500 hover:text-purple-600">Phát Triển Bản Thân</Link>
              <Link href="/ebooks?category=Công Nghệ" className="block text-sm text-gray-500 hover:text-purple-600">Công Nghệ</Link>
              <Link href="/ebooks?category=Sức Khỏe" className="block text-sm text-gray-500 hover:text-purple-600">Sức Khỏe</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hỗ Trợ</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-500 hover:text-purple-600">Về Chúng Tôi</Link>
              <Link href="/terms" className="block text-sm text-gray-500 hover:text-purple-600">Điều Khoản Sử Dụng</Link>
              <Link href="/refund-policy" className="block text-sm text-gray-500 hover:text-purple-600">Chính Sách Hoàn Tiền</Link>
              <a href="mailto:ebookmind0@gmail.com" className="block text-sm text-gray-500 hover:text-purple-600">Liên Hệ</a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-400">
            © Ebook Mind. All rights reserved.
          </div>
          <div className="flex-shrink-0">
            <img 
              src="/images/bo-cong-thuong-badge.png" 
              alt="Badge" 
              className="h-48 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
