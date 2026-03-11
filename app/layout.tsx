import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    template: '%s | Ebook Mind',
  },
  description: 'Nền tảng ebook chất lượng cao với giá phải chăng. Kinh doanh, Phát triển bản thân, Công nghệ, Sức khỏe. Thanh toán nhanh, nhận link tải ngay.',
  keywords: ['ebook', 'sách điện tử', 'kinh doanh', 'phát triển bản thân', 'công nghệ', 'học online', 'PDF'],
  authors: [{ name: 'Ebook Mind' }],
  creator: 'Ebook Mind',
  icons: {
    icon: { url: '/favicon.svg?v=5', type: 'image/svg+xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Ebook Mind',
    title: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    description: 'Hàng trăm ebook chất lượng về Kinh doanh, Phát triển bản thân, Công nghệ. Giá chỉ từ 49.000đ.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    description: 'Hàng trăm ebook chất lượng. Giá chỉ từ 49.000đ.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
