'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

interface Review {
  id: string
  rating: number
  title?: string
  content?: string
  reviewer_name?: string
  reviewer_gender?: string
  review_date?: string
  created_at: string
}

interface EbookTabsProps {
  content: string | null
  reviews: Review[]
}

export default function EbookTabs({ content, reviews }: EbookTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description')

  return (
    <div className="mb-8 border-t pt-8">
      {/* Tab Headers */}
      <div className="flex gap-8 border-b mb-6">
        <button
          onClick={() => setActiveTab('description')}
          className={`pb-3 text-base font-semibold transition-colors relative ${
            activeTab === 'description'
              ? 'text-gray-900 border-b-2 border-purple-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Nội dung ebook
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 text-base font-semibold transition-colors relative ${
            activeTab === 'reviews'
              ? 'text-gray-900 border-b-2 border-purple-600'
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          Đánh giá ({reviews.length})
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'description' && (
          <div className="animate-fadeIn">
            {content ? (
              <div 
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">
                  Hướng dẫn chi tiết từ ý tưởng đến thực hiện kinh doanh thành công. Bao gồm các bước chuẩn bị, tìm kiếm vốn, xây dựng đội ngũ và phát triển sản phẩm.
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Ebook này sẽ giúp bạn hiểu rõ quy trình khởi nghiệp từ A-Z, với hơn 50 case study thực tế từ các doanh nhân thành công tại Việt Nam.
                </p>
              </>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fadeIn">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => {
                const avatarLetter = review.reviewer_name?.[0]?.toUpperCase() || 'U'
                const reviewDate = review.review_date || new Date(review.created_at).toLocaleDateString('vi-VN')
                
                return (
                  <div key={review.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-3 mb-3">
                      {review.reviewer_gender === 'female' ? (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {avatarLetter}
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {avatarLetter}
                        </div>
                      )}
                      <div className="flex-1">
                        {review.title && (
                          <p className="font-semibold text-gray-900 text-sm">{review.title}</p>
                        )}
                        <p className="text-xs text-gray-500">
                          {review.reviewer_name || 'Người dùng'} · {reviewDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i <= review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-gray-200 text-gray-200'
                          }`} 
                        />
                      ))}
                    </div>
                    {review.content && (
                      <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                    )}
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-sm">Chưa có đánh giá nào</p>
                <p className="text-xs mt-1">Hãy là người đầu tiên đánh giá ebook này!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
