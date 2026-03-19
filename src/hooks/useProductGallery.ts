"use client"

import { useState, useCallback, useEffect } from "react"

export interface UseProductGalleryOptions {
  images: string[]
  initialIndex?: number
}

export interface UseProductGalleryReturn {
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  goToNext: () => void
  goToPrev: () => void
  isFullscreenOpen: boolean
  openFullscreen: () => void
  closeFullscreen: () => void
  hasMultipleImages: boolean
  currentImage: string | null
}

const DEFAULT_FALLBACK_IMAGE = "/robot/go2/go2.webp"

export function useProductGallery({
  images,
  initialIndex = 0,
}: UseProductGalleryOptions): UseProductGalleryReturn {
  const safeImages = Array.isArray(images) && images.length > 0 ? images : [DEFAULT_FALLBACK_IMAGE]
  const clampedInitial = Math.max(0, Math.min(initialIndex, safeImages.length - 1))

  const [selectedIndex, setSelectedIndexState] = useState(clampedInitial)
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const setSelectedIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, safeImages.length - 1))
      setSelectedIndexState(clamped)
    },
    [safeImages.length]
  )

  useEffect(() => {
    setSelectedIndexState((prev) =>
      Math.min(prev, Math.max(0, safeImages.length - 1))
    )
  }, [safeImages.length])

  const goToNext = useCallback(() => {
    setSelectedIndexState((prev) => (prev + 1) % safeImages.length)
  }, [safeImages.length])

  const goToPrev = useCallback(() => {
    setSelectedIndexState((prev) => (prev - 1 + safeImages.length) % safeImages.length)
  }, [safeImages.length])

  const openFullscreen = useCallback(() => setIsFullscreenOpen(true), [])
  const closeFullscreen = useCallback(() => setIsFullscreenOpen(false), [])

  const currentImage = safeImages[selectedIndex] ?? safeImages[0] ?? null

  return {
    selectedIndex,
    setSelectedIndex,
    goToNext,
    goToPrev,
    isFullscreenOpen,
    openFullscreen,
    closeFullscreen,
    hasMultipleImages: safeImages.length > 1,
    currentImage,
  }
}
