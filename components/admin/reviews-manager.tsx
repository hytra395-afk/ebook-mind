'use client'

import { useState } from 'react'
import { Plus, Trash2, Star, User } from 'lucide-react'

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
      onChange([...reviews, { ...newReview, id: `temp-${Date.now()}` }])
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

  const removeReview = (index: number) => {
    onChange(reviews.filter((_, i) => i !== index))
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
      {/* Stats */}
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Thống kê đánh giá</h3>
          <button
            type="button"
            onClick={() => {
              const avg = reviews.length > 0 
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
                : 0
              onStatsChange({ 
                ratingAvg: Math.round(avg * 10) / 10, 
                ratingCount: reviews.length,
                salesCount 
              })
            }}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
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

      {/* Add Review Form */}
      {showForm ? (
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 space-y-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Thêm đánh giá mới
          </h3>

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

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={addReview}
              disabled={!newReview.reviewer_name || !newReview.content}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4" /> Thêm đánh giá
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-purple-200 rounded-xl text-purple-600 hover:bg-purple-50 transition"
        >
          <Plus className="w-4 h-4" /> Thêm đánh giá mới
        </button>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Danh sách đánh giá ({reviews.length})</h3>
          {reviews.map((review, index) => (
            <div key={review.id || index} className="bg-white border rounded-xl p-4 flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                {review.reviewer_avatar ? (
                  <img src={review.reviewer_avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} />
                  {review.title && <span className="font-medium text-gray-900">{review.title}</span>}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span className="font-medium">{review.reviewer_name}</span>
                  {review.review_date && (
                    <>
                      <span>•</span>
                      <span>{new Date(review.review_date).toLocaleDateString('vi-VN')}</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">{review.content}</p>
              </div>
              <button
                type="button"
                onClick={() => removeReview(index)}
                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
