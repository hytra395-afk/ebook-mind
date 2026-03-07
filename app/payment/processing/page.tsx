'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PaymentProcessingPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes
  const [error, setError] = useState('')

  // Poll order status
  useEffect(() => {
    if (!token) {
      setError('Token không hợp lệ')
      setLoading(false)
      return
    }

    const checkOrderStatus = async () => {
      try {
        const response = await fetch(`/api/orders/status?token=${token}`)
        const data = await response.json()

        if (response.ok && data.success) {
          setOrder(data.order)
          
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
  }, [token])

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

  if (loading) {
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
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            📚 EbookMind
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Status */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="text-center">
              <div className="text-6xl mb-4">⏳</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Đang chờ thanh toán
              </h1>
              <p className="text-gray-600 mb-4">
                Vui lòng thực hiện thanh toán theo thông tin bên dưới
              </p>
              
              {/* Countdown */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <p className="text-orange-800 font-medium">
                  Thời gian còn lại: <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </p>
              </div>

              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <p className="font-mono font-medium">{order.public_token}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Số tiền:</span>
                    <p className="font-semibold text-blue-600">
                      {order.amount.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
            
            {/* Mock QR Code */}
            <div className="text-center mb-6">
              <div className="bg-gray-100 w-48 h-48 mx-auto rounded-lg flex items-center justify-center mb-4">
                <div className="text-gray-400">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">QR Code</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Quét mã QR bằng app ngân hàng để thanh toán
              </p>
            </div>

            {/* Bank Transfer Info */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-3">
                Hoặc chuyển khoản thủ công:
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Số tài khoản:</span>
                  <span className="font-mono font-medium">VQRQAGAHK6020</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Số tiền:</span>
                  <span className="font-medium">{order.amount.toLocaleString('vi-VN')}đ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Nội dung:</span>
                  <span className="font-mono font-medium">Thanh toan don hang {order.public_token}</span>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Lưu ý quan trọng:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Vui lòng chuyển đúng số tiền và nội dung</li>
                <li>• Hệ thống sẽ tự động xác nhận sau khi nhận được tiền</li>
                <li>• Nếu có vấn đề, vui lòng liên hệ hỗ trợ</li>
              </ul>
            </div>

            {/* Auto refresh notice */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Trang này sẽ tự động cập nhật khi thanh toán thành công
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
