import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EbookMind - Tri thức không giới hạn',
  description: 'Khám phá thư viện ebook phong phú với hàng ngàn cuốn sách về kinh doanh, phát triển bản thân, công nghệ và nhiều lĩnh vực khác.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
