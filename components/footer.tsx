import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
              <span className="text-lg font-bold text-purple-600">Ebook Mind</span>
            </div>
            <p className="text-sm text-gray-500">Kiến thức giá bằng một cốc trà sữa</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Sản phẩm</h3>
            <div className="space-y-2">
              <Link href="/ebooks" className="block text-sm text-gray-500 hover:text-purple-600">Ebook Store</Link>
              <Link href="/combos" className="block text-sm text-gray-500 hover:text-purple-600">Combo Ưu Đãi</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Về chúng tôi</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-sm text-gray-500 hover:text-purple-600">Giới thiệu</Link>
              <Link href="/contact" className="block text-sm text-gray-500 hover:text-purple-600">Liên hệ</Link>
              <Link href="/use-cases" className="block text-sm text-gray-500 hover:text-purple-600">Use Cases</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Hỗ trợ</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email: support@ebookmind.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Ebook Mind. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
