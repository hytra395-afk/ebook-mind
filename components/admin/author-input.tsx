'use client'

import { User } from 'lucide-react'
import { convertDriveUrl } from '@/lib/utils'

interface AuthorInputProps {
  authorName: string
  authorTitle: string
  authorBio: string
  authorAvatar: string
  onAuthorNameChange: (value: string) => void
  onAuthorTitleChange: (value: string) => void
  onAuthorBioChange: (value: string) => void
  onAuthorAvatarChange: (value: string) => void
}

export default function AuthorInput({
  authorName,
  authorTitle,
  authorBio,
  authorAvatar,
  onAuthorNameChange,
  onAuthorTitleChange,
  onAuthorBioChange,
  onAuthorAvatarChange
}: AuthorInputProps) {
  return (
    <div className="space-y-5">
      <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Thông tin tác giả
        </h3>

        <div className="flex gap-6">
          {/* Avatar Preview */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
              {authorAvatar ? (
                <img
                  src={convertDriveUrl(authorAvatar)}
                  alt={authorName || 'Author'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              ) : (
                <User className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Avatar</p>
          </div>

          {/* Author Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên tác giả *
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => onAuthorNameChange(e.target.value)}
                  placeholder="VD: Nguyễn Văn A"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chức danh / Ngành nghề
                </label>
                <input
                  type="text"
                  value={authorTitle}
                  onChange={(e) => onAuthorTitleChange(e.target.value)}
                  placeholder="VD: Chuyên gia Marketing"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="url"
                value={authorAvatar}
                onChange={(e) => onAuthorAvatarChange(e.target.value)}
                placeholder="https://..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Giới thiệu ngắn về tác giả
              </label>
              <textarea
                rows={3}
                value={authorBio}
                onChange={(e) => onAuthorBioChange(e.target.value)}
                placeholder="Với hơn 10 năm kinh nghiệm trong lĩnh vực..."
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {authorName && (
        <div className="bg-white border rounded-xl p-5">
          <p className="text-xs text-gray-400 mb-3">Preview trên trang ebook:</p>
          <div className="flex gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl overflow-hidden flex-shrink-0">
              {authorAvatar ? (
                <img src={convertDriveUrl(authorAvatar)} alt={authorName} className="w-full h-full object-cover" />
              ) : (
                authorName[0]?.toUpperCase()
              )}
            </div>
            <div>
              <p className="font-bold text-gray-900">{authorName}</p>
              {authorTitle && (
                <p className="text-sm text-purple-600">{authorTitle}</p>
              )}
              {authorBio && (
                <p className="text-sm text-gray-600 mt-1">{authorBio}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
