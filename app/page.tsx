import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              📚 EbookMind
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/ebooks" className="text-gray-600 hover:text-gray-900">
                Ebooks
              </Link>
              <Link href="/combos" className="text-gray-600 hover:text-gray-900">
                Combos
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                Về chúng tôi
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Liên hệ
              </Link>
            </nav>
            <Button asChild>
              <Link href="/ebooks">Khám phá ngay</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Tri thức
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Không giới hạn
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Khám phá thư viện ebook phong phú với hàng ngàn cuốn sách về kinh doanh, 
            phát triển bản thân, công nghệ và nhiều lĩnh vực khác.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/ebooks">Xem tất cả ebooks</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/combos">Combo ưu đãi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Tại sao chọn EbookMind?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📖</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Thư viện phong phú</h3>
              <p className="text-gray-600">Hàng ngàn ebook chất lượng cao từ các tác giả uy tín</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Tải về ngay lập tức</h3>
              <p className="text-gray-600">Thanh toán và tải về ebook chỉ trong vài giây</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giá cả hợp lý</h3>
              <p className="text-gray-600">Combo ưu đãi và giá tốt nhất thị trường</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">📚 EbookMind</h3>
              <p className="text-gray-400">
                Nền tảng ebook hàng đầu Việt Nam
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Danh mục</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ebooks?category=kinh-doanh">Kinh doanh</Link></li>
                <li><Link href="/ebooks?category=phat-trien-ban-than">Phát triển bản thân</Link></li>
                <li><Link href="/ebooks?category=cong-nghe">Công nghệ</Link></li>
                <li><Link href="/ebooks?category=suc-khoe">Sức khỏe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact">Liên hệ</Link></li>
                <li><Link href="/terms">Điều khoản</Link></li>
                <li><Link href="/refund">Chính sách hoàn tiền</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
              <p className="text-gray-400">
                Email: support@ebookmind.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 EbookMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
