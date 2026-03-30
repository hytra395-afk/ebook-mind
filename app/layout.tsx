import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || 'G-8C7MLZ7LN4'

export const metadata: Metadata = {
  title: {
    default: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    template: '%s | Ebook Mind',
  },
  description: 'Nền tảng ebook chất lượng cao với giá phải chăng. Kinh doanh, Phát triển bản thân, Công nghệ, Sức khỏe. Thanh toán nhanh, nhận link tải ngay.',
  keywords: ['ebook', 'sách điện tử', 'kinh doanh', 'phát triển bản thân', 'công nghệ', 'học online', 'PDF'],
  authors: [{ name: 'Ebook Mind' }],
  creator: 'Ebook Mind',
  verification: {
    google: 'google820a48875af9910d',
  },
  icons: {
    icon: { url: '/favicon.svg?v=5', type: 'image/svg+xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://ebookmind.com',
    siteName: 'Ebook Mind',
    title: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    description: 'Hàng trăm ebook chất lượng về Kinh doanh, Phát triển bản thân, Công nghệ. Giá chỉ từ 49.000đ.',
    images: [
      {
        url: 'https://ebookmind.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ebook Mind - Kiến thức ngách thay đổi mindset',
    description: 'Hàng trăm ebook chất lượng. Giá chỉ từ 49.000đ.',
    images: ['https://ebookmind.com/og-image.png'],
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
      <head>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2410745536113222');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=2410745536113222&ev=PageView&noscript=1"
          />
        </noscript>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
