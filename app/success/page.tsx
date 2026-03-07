'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Token không hợp lệ')
      setLoading(false)
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
  }, [token])

  const handleSendEmail = async () => {
    if (!order?.email) return
    
    setSendingEmail(true)
    try {
      // TODO: Implement send email API
      await new Promise(resolve => setTimeout(resolve, 2000)) // Mock delay
      setEmailSent(true)
    } catch (err) {
      alert('Không thể gửi email. Vui lòng thử lại.')
    } finally {
      setSendingEmail(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Thanh toán thành công!
            </h1>
            <p className="text-gray-600 mb-4">
              Cảm ơn bạn đã mua hàng. Bạn có thể tải về ebook ngay bây giờ.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-green-800">
                <span className="font-medium">Mã đơn hàng:</span> {order?.public_token}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Download Links */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Tải về ebook</h2>
                
                {order?.download_tokens && order.download_tokens.length > 0 ? (
                  <div className="space-y-4">
                    {order.download_tokens.map((item: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={item.ebook_cover || "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100&h=150&fit=crop"}
                          alt={item.ebook_title}
                          className="w-16 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.ebook_title}</h3>
                          <p className="text-sm text-gray-600">
                            Còn lại: {item.download_quota - item.used_count}/{item.download_quota} lượt tải
                          </p>
                          <p className="text-xs text-gray-500">
                            Hết hạn: {new Date(item.expires_at).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <Button
                          asChild
                          className="gradient-aurora text-white border-0"
                        >
                          <a 
                            href={item.download_url}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Tải về
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-4">📚</div>
                    <p className="text-gray-600">
                      Đang tạo link tải về. Vui lòng đợi trong giây lát...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Email Download Links */}
              {order?.email && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="font-semibold mb-3">Gửi link qua email</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Gửi link tải về đến: <span className="font-medium">{order.email}</span>
                  </p>
                  <Button
                    onClick={handleSendEmail}
                    disabled={sendingEmail || emailSent}
                    variant="outline"
                    className="w-full"
                  >
                    {sendingEmail ? 'Đang gửi...' : emailSent ? 'Đã gửi ✓' : 'Gửi email'}
                  </Button>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-3">Thông tin đơn hàng</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-medium">{order?.amount.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trạng thái:</span>
                    <span className="text-green-600 font-medium">Đã thanh toán</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span>{new Date(order?.updated_at).toLocaleString('vi-VN')}</span>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Cần hỗ trợ?</h3>
                <p className="text-sm text-blue-700 mb-3">
                  Nếu bạn gặp vấn đề với việc tải về, vui lòng liên hệ:
                </p>
                <p className="text-sm text-blue-800 font-medium">
                  support@ebookmind.com
                </p>
              </div>

              {/* Continue Shopping */}
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  Tiếp tục mua sắm
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
