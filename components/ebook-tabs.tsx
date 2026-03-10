'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

export default function EbookTabs() {
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
          Đánh giá (2)
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'description' && (
          <div className="animate-fadeIn">
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              Hướng dẫn chi tiết từ ý tưởng đến thực hiện kinh doanh thành công. Bao gồm các bước chuẩn bị, tìm kiếm vốn, xây dựng đội ngũ và phát triển sản phẩm.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Ebook này sẽ giúp bạn hiểu rõ quy trình khởi nghiệp từ A-Z, với hơn 50 case study thực tế từ các doanh nhân thành công tại Việt Nam.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">Q</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Ok ok ok</p>
                  <p className="text-xs text-gray-500">Que trình · 23/2/2025</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-gray-700">Ề nha nội dung đúng cái mình cần. Mình đang muốn kinh doanh gì đó mà chưa biết chọn cái nào</p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">M</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">Rất dễ hiểu, dễ áp dụng luôn</p>
                  <p className="text-xs text-gray-500">Minh Khoa · 3/1/2025</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm text-gray-700">Ebook rất hay nhé, dễ hiểu, dễ áp dụng. Mình làm theo được ngay</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
