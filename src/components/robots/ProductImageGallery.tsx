"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageOff } from "lucide-react"
import { useProductGallery } from "@/hooks/useProductGallery"
import { useIsMobile } from "@/hooks/useIsMobile"

const DEFAULT_FALLBACK_IMAGE = "/robot/go2/go2.webp"

export interface ProductImageGalleryProps {
  images: string[]
  alt: string
  /** When true (Arabic), zoom window opens to the left of the image */
  isRTL?: boolean
  /** Optional labels for accessibility (e.g. from i18n) */
  ariaLabels?: {
    close?: string
    previousImage?: string
    nextImage?: string
    viewFullscreen?: string
  }
}

export default function ProductImageGallery({
  images,
  alt,
  isRTL = false,
  ariaLabels = {},
}: ProductImageGalleryProps) {
  const isMobile = useIsMobile()
  const gallery = useProductGallery({ images })
  const mainRef = useRef<HTMLDivElement>(null)
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number } | null>(null)
  const [isHovering, setIsHovering] = useState(false)

  const safeImages =
    Array.isArray(images) && images.length > 0 ? images : [DEFAULT_FALLBACK_IMAGE]
  const currentSrc = safeImages[gallery.selectedIndex] ?? safeImages[0] ?? DEFAULT_FALLBACK_IMAGE

  const [mainImageError, setMainImageError] = useState(false)
  useEffect(() => setMainImageError(false), [currentSrc])

  const handleMainMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return
      const rect = mainRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setZoomPosition({ x, y })
    },
    [isMobile]
  )

  const handleMainMouseLeave = useCallback(() => {
    setZoomPosition(null)
    setIsHovering(false)
  }, [])

  const handleMainMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovering(true)
  }, [isMobile])

  const handleDragEnd = useCallback(
    (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!gallery.hasMultipleImages) return
      const threshold = 50
      const velocity = info.velocity.x
      if (Math.abs(velocity) > 300 || Math.abs(info.offset.x) > threshold) {
        if (velocity > 0 || info.offset.x > 0) {
          gallery.goToPrev()
        } else {
          gallery.goToNext()
        }
      }
    },
    [gallery]
  )

  const closeLabel = ariaLabels.close ?? "Close"
  const prevLabel = ariaLabels.previousImage ?? "Previous image"
  const nextLabel = ariaLabels.nextImage ?? "Next image"
  const fullscreenLabel = ariaLabels.viewFullscreen ?? "View fullscreen"

  return (
    <div
      className="w-full"
      dir="ltr"
      data-product-gallery
    >
      {/* Main image + outer zoom window (desktop) */}
      <div className="relative mb-4">
        <motion.div
          ref={mainRef}
          className="relative aspect-square rounded-xl overflow-visible mb-0"
          onMouseMove={handleMainMouseMove}
          onMouseLeave={handleMainMouseLeave}
          onMouseEnter={handleMainMouseEnter}
        >
          <div className="aspect-square rounded-xl overflow-hidden">
            <motion.div
              drag={isMobile && gallery.hasMultipleImages ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="relative w-full h-full touch-pan-y"
            >
              {mainImageError ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-100 text-gray-500 p-8">
                  <ImageOff className="w-12 h-12" aria-hidden />
                  <span className="text-sm font-medium">Image unavailable</span>
                </div>
              ) : (
                <Image
                  src={currentSrc}
                  alt={alt}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  onError={() => setMainImageError(true)}
                />
              )}

              {/* Lens on main image - follows cursor (desktop only) */}
              {!mainImageError && !isMobile && isHovering && zoomPosition && (
                <div
                  className="absolute pointer-events-none border-2 border-white/80 bg-white/20 shadow-lg rounded"
                  style={{
                    width: "25%",
                    height: "25%",
                    left: `${zoomPosition.x}%`,
                    top: `${zoomPosition.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  aria-hidden
                />
              )}

              {/* Mobile fullscreen trigger */}
              {isMobile && (
                <button
                  type="button"
                  onClick={gallery.openFullscreen}
                  className="absolute bottom-3 right-3 z-10 w-10 h-10 rounded-lg bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-colors"
                  aria-label={fullscreenLabel}
                >
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
              )}

              {/* Desktop fullscreen trigger (click main image) */}
              {!isMobile && (
                <button
                  type="button"
                  onClick={gallery.openFullscreen}
                  className="absolute inset-0 z-10 w-full h-full cursor-zoom-in"
                  aria-label={fullscreenLabel}
                />
              )}
            </motion.div>
          </div>

        {/* Outer zoom window - right in LTR, left in RTL (desktop) */}
        {!mainImageError && !isMobile && isHovering && zoomPosition && (
          <div
            className={`absolute top-0 w-[min(400px,40vw)] aspect-square rounded-lg overflow-hidden border border-gray-200 bg-white shadow-xl z-40 hidden lg:block ${
              isRTL ? "right-full mr-4" : "left-full ml-4"
            }`}
            aria-hidden
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${currentSrc})`,
                backgroundSize: "250% 250%",
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        )}
        </motion.div>
      </div>

      {/* Horizontal thumbnails - same as original design */}
      {gallery.hasMultipleImages && (
        <div className="flex gap-2 overflow-x-auto justify-center scrollbar-hide">
          {safeImages.map((img, i) => (
            <button
              key={`${img}-${i}`}
              type="button"
              onClick={() => gallery.setSelectedIndex(i)}
              className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                gallery.selectedIndex === i
                  ? "border-gray-900"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-pressed={gallery.selectedIndex === i}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-contain p-4"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal - mobile & desktop */}
      <AnimatePresence>
        {gallery.isFullscreenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
            onClick={gallery.closeFullscreen}
          >
            <button
              onClick={gallery.closeFullscreen}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-11 h-11 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300"
              aria-label={closeLabel}
            >
              <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </button>

            {gallery.hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    gallery.goToPrev()
                  }}
                  className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                  aria-label={prevLabel}
                >
                  <ChevronLeft className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    gallery.goToNext()
                  }}
                  className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/20 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                  aria-label={nextLabel}
                >
                  <ChevronRight className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </button>
              </>
            )}

            {gallery.hasMultipleImages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full"
              >
                <span className="text-white text-sm md:text-base font-medium">
                  {gallery.selectedIndex + 1} / {safeImages.length}
                </span>
              </motion.div>
            )}

            <motion.div
              key={gallery.selectedIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentSrc}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 95vw, 85vw"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = DEFAULT_FALLBACK_IMAGE
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
