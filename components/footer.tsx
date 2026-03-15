import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { LogoIcon } from './logo-icon'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LogoIcon />
              <span className="text-xl font-bold gradient-text-purple">Ebook Mind</span>
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
              <Link href="/ebooks?category=tu-duy-solo-business" className="block text-sm text-gray-500 hover:text-purple-600">Solo Business</Link>
              <Link href="/ebooks?category=kinh-doanh-ngach" className="block text-sm text-gray-500 hover:text-purple-600">Kinh Doanh Ngách</Link>
              <Link href="/ebooks?category=phat-trien-ban-than" className="block text-sm text-gray-500 hover:text-purple-600">Phát Triển Mindset</Link>
              <Link href="/ebooks?category=cong-nghe" className="block text-sm text-gray-500 hover:text-purple-600">Công Nghệ</Link>
              <Link href="/ebooks?category=suc-khoe" className="block text-sm text-gray-500 hover:text-purple-600">Sức Khỏe</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hỗ Trợ</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-500 hover:text-purple-600">Về Chúng Tôi</Link>
              <Link href="/terms" className="block text-sm text-gray-500 hover:text-purple-600">Điều Khoản Sử Dụng</Link>
              <Link href="/refund-policy" className="block text-sm text-gray-500 hover:text-purple-600">Chính Sách Hoàn Tiền</Link>
              <Link href="/privacy" className="block text-sm text-gray-500 hover:text-purple-600">Chính Sách Bảo Mật</Link>
              <Link href="/cookies" className="block text-sm text-gray-500 hover:text-purple-600">Chính Sách Cookie</Link>
              <a href="mailto:ebookmind0@gmail.com" className="block text-sm text-gray-500 hover:text-purple-600">Liên Hệ</a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-2 border-t flex items-center justify-between">
          <div className="text-sm text-gray-400">
            © Ebook Mind. All rights reserved. Bản quyền thuộc về Ebook Mind, nghiêm cấm sao chép và khai thác thương mại dưới mọi hình thức.
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
