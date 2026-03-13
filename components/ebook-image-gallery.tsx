'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ImageLightbox from './image-lightbox'

interface EbookImageGalleryProps {
  coverUrl: string
  previewImages: string[]
  title: string
  featured?: boolean
}

export default function EbookImageGallery({ 
  coverUrl, 
  previewImages, 
  title, 
  featured 
}: EbookImageGalleryProps) {
  const allImages = [coverUrl, ...previewImages].filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setActiveIndex(index)
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="space-y-3">
      {/* Main Image Viewer */}
      <div 
        className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-gray-100 group cursor-zoom-in"
        onClick={() => openLightbox(activeIndex)}
      >
        <Image
          src={allImages[activeIndex]}
          alt={`${title} - Ảnh ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority={activeIndex === 0}
          sizes="(max-width: 768px) 100vw, 400px"
        />
        
        {/* Featured Badge */}
        {featured && activeIndex === 0 && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
            Bestseller
          </span>
        )}

        {/* Navigation Arrows - Only show if multiple images */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {activeIndex + 1}/{allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails - Only show if multiple images */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              onDoubleClick={() => openLightbox(index)}
              className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? 'border-purple-600 ring-2 ring-purple-200'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
              {index === activeIndex && (
                <div className="absolute inset-0 bg-purple-600/20" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Lightbox */}
      <ImageLightbox
        images={allImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        title={title}
      />
    </div>
  )
}
