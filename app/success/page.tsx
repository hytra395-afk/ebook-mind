'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function SuccessPage() {
  const [token, setToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

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

  const handleSendEmail = async () => {
    if (!order?.email) return
    setSendingEmail(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setEmailSent(true)
    } catch (err) {
      alert('Không thể gửi email. Vui lòng thử lại.')
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
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        {item.ebook_cover && (
                          <img src={item.ebook_cover} alt={item.ebook_title} className="w-16 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium">{item.ebook_title}</h3>
                        </div>
                        <a href={item.download_url} target="_blank" rel="noopener noreferrer"
                          className="gradient-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90">
                          Tải về
                        </a>
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
