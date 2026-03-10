'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, AlertCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function PaymentProcessingPage() {
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [error, setError] = useState('')
  const [qrCode, setQrCode] = useState<string>('')

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
          
          // Generate QR code
          if (data.order && !qrCode) {
            const qrContent = `EBOOK ${data.order.public_token}`
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrContent)}`
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-purple flex items-center justify-center text-white font-bold">
              📚
            </div>
            <span className="text-xl font-bold gradient-text-purple">EbookMind</span>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Status Card */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 border border-gray-100">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Đang chờ thanh toán
              </h1>
              <p className="text-gray-600 mb-6">
                Vui lòng thực hiện thanh toán theo thông tin bên dưới
              </p>
              
              {/* Countdown */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 inline-block">
                <p className="text-orange-800 font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Thời gian còn lại: <span className="font-mono text-lg text-orange-900">{formatTime(timeLeft)}</span>
                </p>
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-wide mb-2">Mã đơn hàng</p>
                  <p className="font-mono font-semibold text-gray-900">{order.public_token}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs uppercase tracking-wide mb-2">Số tiền</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {order.amount.toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Thông tin thanh toán</h2>
            
            {/* QR Code */}
            <div className="text-center mb-8">
              <div className="inline-flex flex-col items-center">
                {qrCode ? (
                  <div className="bg-white p-4 rounded-xl border-2 border-gray-200 shadow-sm mb-4">
                    <Image
                      src={qrCode}
                      alt="QR Code thanh toán"
                      width={300}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-100 w-56 h-56 rounded-xl flex items-center justify-center mb-4 border-2 border-gray-200">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">Đang tạo mã QR...</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                Quét mã QR bằng ứng dụng ngân hàng của bạn để thanh toán
              </p>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-sm">Hoặc</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Bank Transfer Info */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                Chuyển khoản thủ công
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Số tài khoản</p>
                  <p className="font-mono font-semibold text-gray-900 text-lg">VQRQAGAHK6020</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Số tiền</p>
                  <p className="font-semibold text-purple-600 text-lg">{order.amount.toLocaleString('vi-VN')}đ</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Nội dung chuyển khoản</p>
                  <p className="font-mono font-semibold text-gray-900">EBOOK {order.public_token}</p>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Lưu ý quan trọng</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>✓ Vui lòng chuyển đúng số tiền và nội dung</li>
                    <li>✓ Hệ thống sẽ tự động xác nhận sau khi nhận được tiền</li>
                    <li>✓ Nếu có vấn đề, vui lòng liên hệ hỗ trợ</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Auto refresh notice */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                💡 Trang này sẽ tự động cập nhật khi thanh toán thành công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
