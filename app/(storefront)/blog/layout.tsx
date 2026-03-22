import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Kinh Doanh 2026 - Kiến Thức Vốn Nhỏ, Solo Business | Ebook Mind',
  description: 'Khám phá bí quyết kinh doanh vốn nhỏ, solo business, kinh doanh ngách từ những người thành công. Hướng dẫn chi tiết, thực chiến, dễ áp dụng.',
  keywords: ['blog kinh doanh', 'kinh doanh vốn nhỏ', 'solo business', 'kinh doanh ngách', 'ít vốn kinh doanh gì', 'ebook kinh doanh'],
  openGraph: {
    title: 'Blog Kinh Doanh 2026 - Kiến Thức Vốn Nhỏ, Solo Business',
    description: 'Khám phá bí quyết kinh doanh vốn nhỏ, solo business, kinh doanh ngách từ những người thành công.',
    type: 'website',
    url: 'https://ebookmind.com/blog',
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
