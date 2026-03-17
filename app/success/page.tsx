'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { convertDriveUrl } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default function SuccessPage() {
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [showLinkIndex, setShowLinkIndex] = useState<number | null>(null)

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

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/status?token=${token}`)
        const data = await response.json()

        if (response.ok && data.success) {
          setOrder(data.order)
          if (data.order.status !== 'completed') {
            setError('Đơn hàng chưa được thanh toán')
          }
        } else {
          setError(data.error || 'Không thể tải thông tin đơn hàng')
        }
      } catch (err) {
        console.error('Error fetching order:', err)
        setError('Lỗi kết nối')
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [token, mounted])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message)
    setToastType(type)
    setTimeout(() => setToastMessage(''), 5000)
  }

  const handleSendEmail = async () => {
    if (!order?.email || !token) return
    
    setSendingEmail(true)
    setEmailError('')
    
    try {
      const response = await fetch('/api/orders/resend-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.maxReached) {
          setEmailError(data.error)
          showToast(data.error, 'error')
        } else {
          setEmailError(data.error || 'Không thể gửi email')
          showToast(data.error || 'Không thể gửi email. Vui lòng thử lại.', 'error')
        }
        return
      }

      setEmailSent(true)
      showToast(`Email đã được gửi đến ${order.email}`, 'success')
      
      // Reset success state after 10 seconds
      setTimeout(() => setEmailSent(false), 10000)
    } catch (err) {
      console.error('Email error:', err)
      setEmailError('Lỗi kết nối. Vui lòng thử lại.')
      showToast('Lỗi kết nối. Vui lòng thử lại.', 'error')
    } finally {
      setSendingEmail(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm max-w-md w-full mx-4 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">Có lỗi xảy ra</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="inline-block gradient-purple text-white px-6 py-2 rounded-lg hover:opacity-90">
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`rounded-lg shadow-lg p-4 max-w-md ${
            toastType === 'success' ? 'bg-green-50 border border-green-200' :
            toastType === 'error' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 ${
                toastType === 'success' ? 'text-green-600' :
                toastType === 'error' ? 'text-red-600' :
                'text-blue-600'
              }`}>
                {toastType === 'success' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                ) : toastType === 'error' ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
              <p className={`text-sm font-medium ${
                toastType === 'success' ? 'text-green-800' :
                toastType === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {toastMessage}
              </p>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-600">Ebook Mind</Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h1>
            <p className="text-gray-600 mb-4">Cảm ơn bạn đã mua hàng. Bạn có thể tải về ebook ngay bây giờ.</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-green-800"><span className="font-medium">Mã đơn hàng:</span> {order?.public_token}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Tải về ebook</h2>
                {order?.download_tokens && order.download_tokens.length > 0 ? (
                  <div className="space-y-4">
                    {order.download_tokens.map((item: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          {item.ebook_cover && (
                            <div className="relative w-16 h-20 flex-shrink-0">
                              <Image 
                                src={convertDriveUrl(item.ebook_cover)} 
                                alt={item.ebook_title} 
                                fill
                                className="object-cover rounded" 
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-medium">{item.ebook_title}</h3>
                          </div>
                          <button
                            onClick={() => setShowLinkIndex(showLinkIndex === index ? null : index)}
                            className="gradient-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all"
                          >
                            {showLinkIndex === index ? '✕ Đóng' : '📖 Link Ebook'}
                          </button>
                        </div>
                        
                        {showLinkIndex === index && (
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-sm text-gray-600 mb-2">Link Google Drive của ebook:</p>
                            <a 
                              href={item.download_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block p-3 bg-purple-50 border border-purple-200 rounded-lg text-purple-700 hover:bg-purple-100 transition-colors break-all text-sm"
                            >
                              {item.download_url}
                            </a>
                            <p className="text-xs text-gray-500 mt-2">
                              💡 Click vào link để xem nội dung ebook trên Google Drive
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">Đang tạo link tải về. Vui lòng đợi trong giây lát...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Email Block */}
              {order?.email && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">Gửi link qua email</h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      ✓ Đã gửi tự động
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Gửi link tải về đến:
                  </p>
                  <p className="text-sm font-medium text-gray-900 mb-4">{order.email}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    Chúng tôi đã gửi email tự động. Kiểm tra hộp thư (kể cả spam). Nếu chưa nhận được, bạn có thể gửi lại:
                  </p>
                  <button 
                    onClick={handleSendEmail} 
                    disabled={sendingEmail || emailSent || !!emailError}
                    className={`w-full rounded-lg py-2.5 text-sm font-medium transition-all ${
                      emailSent 
                        ? 'bg-green-50 text-green-700 border border-green-200 cursor-not-allowed'
                        : emailError
                        ? 'bg-red-50 text-red-700 border border-red-200 cursor-not-allowed'
                        : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {sendingEmail ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Đang gửi...
                      </span>
                    ) : emailSent ? (
                      'Đã gửi ✓'
                    ) : emailError ? (
                      'Không thể gửi'
                    ) : (
                      'Gửi lại email'
                    )}
                  </button>
                  {emailError && (
                    <p className="text-xs text-red-600 mt-2">{emailError}</p>
                  )}
                </div>
              )}

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-3">Thông tin đơn hàng</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-medium">{order?.amount?.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="text-green-600 font-medium">Đã thanh toán</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span>{order?.updated_at ? new Date(order.updated_at).toLocaleString('vi-VN') : '-'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="font-semibold text-purple-900 mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm text-purple-700 mb-3">Nếu bạn gặp vấn đề với việc tải về, vui lòng liên hệ:</p>
                <p className="text-sm text-purple-800 font-medium">ebookmind0@gmail.com</p>
              </div>

              <Link href="/" className="block w-full text-center border border-gray-300 rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
