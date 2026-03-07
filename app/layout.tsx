import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ebook Mind - Kiến thức giá bằng một cốc trà sữa',
  description: 'Nền tảng ebook chất lượng cao với giá phải chăng. Được yêu thích và đánh giá cao nhất từ cộng đồng.',
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
