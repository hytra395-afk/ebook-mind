'use client'

import { useState } from 'react'
import { Plus, X, GripVertical, Image as ImageIcon } from 'lucide-react'

interface ImageGalleryInputProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageGalleryInput({ images, onChange, maxImages = 10 }: ImageGalleryInputProps) {
  const [newUrl, setNewUrl] = useState('')

  const addImage = () => {
    if (newUrl && images.length < maxImages) {
      onChange([...images, newUrl])
      setNewUrl('')
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return
    const newImages = [...images]
    const [removed] = newImages.splice(from, 1)
    newImages.splice(to, 0, removed)
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Add new image */}
      <div className="flex gap-2">
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Dán URL ảnh preview..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={addImage}
          disabled={!newUrl || images.length >= maxImages}
          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Thêm
        </button>
      </div>

      <p className="text-xs text-gray-500">
        {images.length}/{maxImages} ảnh • Kéo để sắp xếp • Ảnh dọc 400×600px
      </p>

      {/* Image grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden border"
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=Error'
                }}
              />
              
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => moveImage(index, index - 1)}
                  disabled={index === 0}
                  className="p-1.5 bg-white rounded-full text-gray-700 hover:bg-gray-100 disabled:opacity-30"
                  title="Di chuyển lên"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                  title="Xóa"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Index badge */}
              <span className="absolute top-2 left-2 w-6 h-6 bg-black/70 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-lg p-8 text-center text-gray-400">
          <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Chưa có ảnh preview</p>
          <p className="text-xs mt-1">Thêm ảnh để người dùng xem trước nội dung ebook</p>
        </div>
      )}
    </div>
  )
}
