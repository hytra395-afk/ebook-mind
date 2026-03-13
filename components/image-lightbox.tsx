'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export default function ImageLightbox({
  images,
  initialIndex,
  open,
  onOpenChange,
  title
}: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  // Sync currentIndex with initialIndex when lightbox opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
    }
  }, [open, initialIndex])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, currentIndex, images.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  if (!open) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Backdrop Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 animate-in fade-in duration-200" />
        
        {/* Content */}
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none">
          <div className="relative w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
            
            {/* Header: Close Button + Image Counter */}
            <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
              {/* Image Counter */}
              <div className="bg-black/60 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-md">
                {currentIndex + 1} / {images.length}
              </div>
              
              {/* Close Button */}
              <Dialog.Close className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors">
                <X className="w-5 h-5" />
                <span className="sr-only">Đóng</span>
              </Dialog.Close>
            </div>

            {/* Main Image Container */}
            <div className="flex items-center justify-center w-full h-full px-4 md:px-20">
              <div className="relative max-w-[90vw] max-h-[80vh] md:max-h-[75vh]">
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Ảnh ${currentIndex + 1}`}
                  width={1200}
                  height={1600}
                  className="object-contain max-h-[70vh] md:max-h-[75vh] rounded-xl shadow-2xl"
                  priority
                  quality={95}
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                {/* Previous */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Next */}
                <button
                  onClick={goToNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </>
            )}

            {/* Thumbnails Carousel */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90vw] hidden md:block">
                <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-purple-500 ring-2 ring-purple-300 opacity-100 scale-105'
                          : 'border-white/30 opacity-60 hover:opacity-100 hover:border-white/50 hover:scale-105'
                      }`}
                      aria-label={`Xem ảnh ${index + 1}`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile: Swipe Indicator (Optional) */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden">
                <div className="flex gap-1.5">
                  {images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-white w-6'
                          : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
