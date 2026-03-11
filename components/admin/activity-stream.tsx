'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { ShoppingCart, CheckCircle, BookOpen, Package, Mail, CreditCard, AlertTriangle, Clock } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Activity {
  id: string
  type: string
  title: string
  description: string
  metadata: any
  created_at: string
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'order_new':
      return { icon: ShoppingCart, color: 'text-blue-500 bg-blue-50' }
    case 'order_completed':
      return { icon: CheckCircle, color: 'text-green-500 bg-green-50' }
    case 'ebook_added':
      return { icon: BookOpen, color: 'text-purple-500 bg-purple-50' }
    case 'combo_added':
      return { icon: Package, color: 'text-orange-500 bg-orange-50' }
    case 'email_sent':
      return { icon: Mail, color: 'text-teal-500 bg-teal-50' }
    case 'webhook_received':
      return { icon: CreditCard, color: 'text-indigo-500 bg-indigo-50' }
    case 'traffic_spike':
      return { icon: AlertTriangle, color: 'text-red-500 bg-red-50' }
    default:
      return { icon: Clock, color: 'text-gray-500 bg-gray-50' }
  }
}

const formatTimeAgo = (date: string) => {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Vừa xong'
  if (diffMins < 60) return `${diffMins} phút trước`
  if (diffHours < 24) return `${diffHours} giờ trước`
  if (diffDays < 7) return `${diffDays} ngày trước`
  return then.toLocaleDateString('vi-VN')
}

export default function ActivityStream() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  const fetchActivities = async () => {
    // Fetch recent orders as activities
    const { data: orders } = await supabase
      .from('orders')
      .select('id, payment_code, status, amount, email, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(15)

    if (orders) {
      const orderActivities: Activity[] = orders.map(order => ({
        id: order.id,
        type: order.status === 'completed' ? 'order_completed' : 'order_new',
        title: order.status === 'completed' 
          ? `Đơn hàng ${order.payment_code} hoàn thành`
          : `Đơn hàng mới ${order.payment_code}`,
        description: `${new Intl.NumberFormat('vi-VN').format(order.amount)}đ${order.email ? ` - ${order.email}` : ''}`,
        metadata: order,
        created_at: order.status === 'completed' ? order.updated_at : order.created_at
      }))

      setActivities(orderActivities)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchActivities()

    // Subscribe to realtime changes
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload) => {
          console.log('Order change:', payload)
          fetchActivities()
        }
      )
      .subscribe()

    // Refresh every 30 seconds
    const interval = setInterval(fetchActivities, 30000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-gray-200" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">Chưa có hoạt động nào</p>
        ) : (
          activities.map((activity) => {
            const { icon: Icon, color } = getActivityIcon(activity.type)
            return (
              <div key={activity.id} className="flex items-start gap-3 group">
                <div className={`p-2 rounded-lg ${color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatTimeAgo(activity.created_at)}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
