"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export type TextPlacement = "left" | "center" | "right"

interface RobotHeroProps {
  videoSrc: string
  title: string
  subtitle?: string
  priceStartsFrom?: string
  buttonText?: string
  productLink?: string
  textPlacement?: TextPlacement
  /** Optional poster image shown while video loads. Falls back to dark placeholder if not provided. */
  poster?: string
  /** Optional numbered feature points rendered below the title */
  features?: string[]
  /** Optional RTL direction for features list */
  isRTL?: boolean
}

const placementClasses: Record<TextPlacement, string> = {
  left: "items-start text-left",
  center: "items-center text-center justify-center",
  right: "items-end text-right",
}

/** Gradient overlay: stronger near text, fades across video. Direction matches text placement. */
const gradientOverlays: Record<TextPlacement, string> = {
  left: "bg-gradient-to-r from-black/70 via-black/40 to-black/20",
  center: "bg-gradient-to-r from-black/30 via-black/60 to-black/30",
  right: "bg-gradient-to-r from-black/20 via-black/40 to-black/70",
}

export default function RobotHero({
  videoSrc,
  title,
  subtitle,
  priceStartsFrom,
  buttonText,
  productLink,
  textPlacement = "center",
  poster,
  features,
  isRTL = false,
}: RobotHeroProps) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const placement = placementClasses[textPlacement]
  const gradientOverlay = gradientOverlays[textPlacement]

  const handleVideoCanPlay = useCallback(() => {
    setIsVideoReady(true)
  }, [])

  return (
    <section className="relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background layer - placeholder first, then video fades in */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder: poster image or dark gradient while video loads */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isVideoReady ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-hidden
        >
          {poster ? (
            <Image
              src={poster}  
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-900" />
          )}
        </div>

        {/* Video - loads in background, fades in when ready */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          src={videoSrc}
          onCanPlay={handleVideoCanPlay}
          onLoadedData={handleVideoCanPlay}
        />

        {/* Dark gradient overlay for text readability */}
        <div
          className={`absolute inset-0 pointer-events-none ${gradientOverlay}`}
          aria-hidden
        />
      </div>

      {/* Text Content Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col ${placement}`}
      >
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.6)]"
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-lg md:text-xl text-white/95 max-w-2xl [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.5)]"
          >
            {subtitle}
          </p>
        )}
        {priceStartsFrom && (
          <p
            className="text-xl md:text-2xl font-semibold text-white mt-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.6)]"
          >
            {priceStartsFrom}
          </p>
        )}

      </motion.div>
    </section>
  )
}
