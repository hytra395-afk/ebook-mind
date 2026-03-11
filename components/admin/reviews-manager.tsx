'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, User, Edit2, RefreshCw } from 'lucide-react'

interface Review {
  id?: string
  rating: number
  title: string
  content: string
  reviewer_name: string
  reviewer_avatar?: string
  reviewer_gender?: string
  review_date?: string
}

interface ReviewsManagerProps {
  reviews: Review[]
  onChange: (reviews: Review[]) => void
  ratingAvg: number
  ratingCount: number
  salesCount: number
  onStatsChange: (stats: { ratingAvg: number; ratingCount: number; salesCount: number }) => void
}

export default function ReviewsManager({
  reviews,
  onChange,
  ratingAvg,
  ratingCount,
  salesCount,
  onStatsChange
}: ReviewsManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newReview, setNewReview] = useState<Review>({
    rating: 5,
    title: '',
    content: '',
    reviewer_name: '',
    reviewer_avatar: '',
    reviewer_gender: 'other',
    review_date: new Date().toISOString().split('T')[0]
  })

  const addReview = () => {
    if (newReview.reviewer_name && newReview.content) {
      if (editingIndex !== null) {
        // Update existing review
        const updatedReviews = [...reviews]
        updatedReviews[editingIndex] = { ...newReview, id: reviews[editingIndex].id }
        onChange(updatedReviews)
        setEditingIndex(null)
      } else {
        // Add new review
        onChange([...reviews, { ...newReview, id: `temp-${Date.now()}` }])
      }
      setNewReview({
        rating: 5,
        title: '',
        content: '',
        reviewer_name: '',
        reviewer_avatar: '',
        reviewer_gender: 'other',
        review_date: new Date().toISOString().split('T')[0]
      })
      setShowForm(false)
    }
  }

  const editReview = (index: number) => {
    setNewReview(reviews[index])
    setEditingIndex(index)
    setShowForm(true)
  }

  const removeReview = (index: number) => {
    onChange(reviews.filter((_, i) => i !== index))
  }

  const cancelEdit = () => {
    setNewReview({
      rating: 5,
      title: '',
      content: '',
      reviewer_name: '',
      reviewer_avatar: '',
      reviewer_gender: 'other',
      review_date: new Date().toISOString().split('T')[0]
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  const refreshStats = () => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      onStatsChange({ 
        ratingAvg: Math.round(avg * 10) / 10, 
        ratingCount: reviews.length,
        salesCount 
      })
    } else {
      onStatsChange({ ratingAvg: 0, ratingCount: 0, salesCount })
    }
  }

  const StarRating = ({ rating, onChange: onRatingChange }: { rating: number; onChange?: (r: number) => void }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange?.(star)}
          className={onRatingChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">⭐ Quản lý đánh giá</h3>
            <p className="text-sm text-gray-600">
              Thống kê đánh giá: Trung bình <span className="font-bold text-purple-600">{ratingAvg.toFixed(1)} ⭐</span> - {ratingCount} đánh giá
            </p>
          </div>
          <button
            type="button"
            onClick={refreshStats}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-purple-200 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Làm mới
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Số sao TB (1-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={ratingAvg}
              onChange={(e) => onStatsChange({ ratingAvg: Number(e.target.value), ratingCount, salesCount })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Lượt đánh giá</label>
            <input
              type="number"
              min="0"
              value={ratingCount}
              onChange={(e) => onStatsChange({ ratingAvg, ratingCount: Number(e.target.value), salesCount })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Lượt mua</label>
            <input
              type="number"
              min="0"
              value={salesCount}
              onChange={(e) => onStatsChange({ ratingAvg, ratingCount, salesCount: Number(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Review Form */}
      {showForm ? (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              {editingIndex !== null ? (
                <>
                  <Edit2 className="w-5 h-5 text-blue-600" /> Sửa đánh giá
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-blue-600" /> Thêm đánh giá mới
                </>
              )}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✕ Đóng
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số sao (1-5)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-16 border rounded-lg px-3 py-2 text-sm"
                />
                <StarRating rating={newReview.rating} onChange={(r) => setNewReview({ ...newReview, rating: r })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên người đánh giá</label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {newReview.reviewer_avatar ? (
                    <img src={newReview.reviewer_avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={newReview.reviewer_name}
                  onChange={(e) => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                  placeholder="VD: Minh Anh"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (tùy chọn)</label>
            <input
              type="url"
              value={newReview.reviewer_avatar}
              onChange={(e) => setNewReview({ ...newReview, reviewer_avatar: e.target.value })}
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đánh giá</label>
              <input
                type="date"
                value={newReview.review_date}
                onChange={(e) => setNewReview({ ...newReview, review_date: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
              <div className="flex items-center gap-4 mt-2">
                {['male', 'female', 'other'].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newReview.reviewer_gender === g}
                      onChange={() => setNewReview({ ...newReview, reviewer_gender: g })}
                      className="text-purple-600"
                    />
                    <span className="text-sm">{g === 'male' ? 'Nam' : g === 'female' ? 'Nữ' : 'Khác'}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề đánh giá</label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              placeholder="VD: Rất hữu ích và dễ hiểu"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung đánh giá *</label>
            <textarea
              rows={3}
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Chia sẻ trải nghiệm của bạn về ebook này..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={addReview}
              disabled={!newReview.reviewer_name || !newReview.content}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingIndex !== null ? (
                <>
                  <Edit2 className="w-4 h-4" /> Cập nhật đánh giá
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Thêm đánh giá
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 hover:bg-blue-50 transition font-medium"
        >
          <Plus className="w-5 h-5" /> Thêm đánh giá mới
        </button>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-lg">Danh sách đánh giá ({reviews.length})</h3>
          </div>
          <div className="space-y-3">
            {reviews.map((review, index) => (
              <div key={review.id || index} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-purple-200 transition">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                    {review.reviewer_avatar ? (
                      <img src={review.reviewer_avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {review.reviewer_name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{review.reviewer_name}</span>
                          {review.reviewer_gender && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                              {review.reviewer_gender === 'male' ? '👨 Nam' : review.reviewer_gender === 'female' ? '👩 Nữ' : '👤 Khác'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          {review.review_date && (
                            <span className="text-xs text-gray-400">
                              • {new Date(review.review_date).toLocaleDateString('vi-VN', { 
                                day: '2-digit', 
                                month: '2-digit', 
                                year: 'numeric' 
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => editReview(index)}
                          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                          title="Sửa đánh giá"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeReview(index)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Xóa đánh giá"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    {review.title && (
                      <p className="font-medium text-gray-900 mb-1">{review.title}</p>
                    )}

                    {/* Content */}
                    <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
