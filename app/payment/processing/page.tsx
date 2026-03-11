'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, AlertCircle, Copy, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function PaymentProcessingPage() {
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [error, setError] = useState('')
  const [qrCode, setQrCode] = useState<string>('')
  const [copied, setCopied] = useState<string>('')

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setToken(params.get('token'))
    }
  }, [])

  useEffect(() => {
    if (!mounted || !token) {
      if (mounted && !token) {
        setError('Token không hợp lệ')
        setLoading(false)
      }
      return
    }

    const checkOrderStatus = async () => {
      try {
        const response = await fetch(`/api/orders/status?token=${token}`)
        const data = await response.json()

        if (response.ok && data.success) {
          setOrder(data.order)
          
          // Generate QR code using Sepay
          if (data.order && data.order.payment_code && !qrCode) {
            const accountNumber = 'VQRQAGAHK6020'
            const amount = data.order.amount
            const qrUrl = `https://qr.sepay.vn/img?acc=${accountNumber}&amount=${amount}&des=${encodeURIComponent(data.order.payment_code)}&bank=MB`
            setQrCode(qrUrl)
          }
          
          if (data.order.status === 'completed') {
            // Redirect to success page
            window.location.href = `/success?token=${token}`
            return
          }
        } else {
          setError(data.error || 'Không thể tải thông tin đơn hàng')
        }
      } catch (err) {
        console.error('Error checking order status:', err)
        setError('Lỗi kết nối')
      } finally {
        setLoading(false)
      }
    }

    // Check immediately
    checkOrderStatus()

    // Then check every 5 seconds
    const interval = setInterval(checkOrderStatus, 5000)

    return () => clearInterval(interval)
  }, [token, mounted, qrCode])

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setError('Phiên thanh toán đã hết hạn')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(''), 2000)
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin thanh toán...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full mx-4 text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy đơn hàng</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-purple flex items-center justify-center shadow-md">
                <span className="text-2xl">📚</span>
              </div>
              <span className="text-2xl font-extrabold gradient-text-purple">EbookMind</span>
            </Link>
            <Link 
              href="/ebooks" 
              className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại Ebook Store
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4 mb-8 flex items-center justify-center gap-3 shadow-sm">
          <Clock className="w-5 h-5 text-yellow-700" />
          <span className="text-base font-semibold text-yellow-900">Thời gian còn lại: <span className="font-mono text-lg text-orange-600">{formatTime(timeLeft)}</span></span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8">
          <span className="gradient-text-purple">Thông tin thanh toán</span>
        </h1>

        {/* QR Code Section */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <span className="text-xl">📱</span>
            </div>
            <span>QR Code thanh toán</span>
          </h2>
          
          <div className="flex justify-center mb-4">
            {qrCode ? (
              <div className="bg-white p-6 rounded-2xl border-2 border-purple-200 shadow-xl">
                <Image
                  src={qrCode}
                  alt="QR Code thanh toán"
                  width={300}
                  height={300}
                  className="rounded-xl"
                  unoptimized
                />
              </div>
            ) : (
              <div className="bg-gray-100 w-72 h-72 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-500">Đang tạo mã QR...</p>
                </div>
              </div>
            )}
          </div>
          
          <p className="text-center text-sm text-gray-600">
            Quét mã QR bằng ứng dụng ngân hàng của bạn để thanh toán
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm font-medium">Hoặc</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Bank Transfer Info */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 p-8 mb-8 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
              <span className="text-xl">💳</span>
            </div>
            <span>Chuyển khoản thủ công</span>
          </h2>
          
          <div className="space-y-4">
            {/* Account Number */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">SỐ TÀI KHOẢN</p>
              <div className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-mono font-extrabold text-gray-900 text-xl">VQRQAGAHK6020</p>
                <button
                  onClick={() => copyToClipboard('VQRQAGAHK6020', 'account')}
                  className="text-purple-600 hover:text-purple-700 p-1"
                >
                  {copied === 'account' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">SỐ TIỀN</p>
              <div className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-extrabold text-2xl gradient-text-purple">{order.amount.toLocaleString('vi-VN')}đ</p>
                <button
                  onClick={() => copyToClipboard(order.amount.toString(), 'amount')}
                  className="text-purple-600 hover:text-purple-700 p-1"
                >
                  {copied === 'amount' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Payment Code */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">NỘI DUNG CHUYỂN KHOẢN</p>
              <div className="flex items-center justify-between bg-white rounded-xl p-4 border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                <p className="font-mono font-extrabold text-gray-900 text-lg">{order.payment_code}</p>
                <button
                  onClick={() => copyToClipboard(order.payment_code, 'code')}
                  className="text-purple-600 hover:text-purple-700 p-1"
                >
                  {copied === 'code' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-2">⚠️ LƯU Ý QUAN TRỌNG - VUI LÒNG ĐỌC KỸ</h3>
              <ul className="text-sm text-yellow-800 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Chuyển khoản <strong>CHÍNH XÁC</strong> số tiền: <strong className="text-purple-600">{order.amount.toLocaleString('vi-VN')}đ</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Nhập <strong>ĐÚNG</strong> nội dung chuyển khoản: <strong className="font-mono bg-white px-2 py-0.5 rounded">{order.payment_code}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">⚠</span>
                  <span>Nếu sai số tiền, giao dịch sẽ <strong>KHÔNG</strong> được xác nhận tự động</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>Hệ thống sẽ tự động xác nhận thanh toán trong vòng 1-2 phút sau khi nhận được chuyển khoản thành công</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Auto refresh notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            💡 Trang này sẽ tự động cập nhật khi thanh toán thành công
          </p>
        </div>
      </div>
    </div>
  )
}
