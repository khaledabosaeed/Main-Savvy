"use client"

import { motion } from "framer-motion"
import FormattedText from "@/components/shared/FormattedText"

export type TextPlacement = "left" | "center" | "right"

interface RobotHeroProps {
  videoSrc: string
  title: string
  subtitle?: string
  priceStartsFrom?: string
  buttonText?: string
  productLink?: string
  textPlacement?: TextPlacement
  /** Accepted for API compatibility; hero background is video-only when `videoSrc` is set. */
  poster?: string
  features?: string[]
  isRTL?: boolean
}

const placementClasses: Record<TextPlacement, string> = {
  left: "items-start text-left",
  center: "items-center text-center justify-center",
  right: "items-end text-right",
}

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
  textPlacement = "center",
}: RobotHeroProps) {
  const placement = placementClasses[textPlacement]
  const gradientOverlay = gradientOverlays[textPlacement] 

  return (
    <section className="relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Dark background shown while video loads */}
        <div className="absolute inset-0 bg-neutral-900" />

        {/* Direct video background */}
          <video
            key={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>

        {/* Gradient overlay for text readability */}
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
          dir="ltr"
          className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_4px_12px_rgba(0,0,0,0.6)] [unicode-bidi:isolate]"
        >
          <FormattedText text={title} as="span" />
        </h1>
        {subtitle && (
          <p
            className="text-lg md:text-xl text-white/95 max-w-2xl [text-shadow:0_1px_3px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.5)]"
          >
            <FormattedText text={subtitle} as="span" />
          </p>
        )}
        {priceStartsFrom && (
          <p
            className="text-xl md:text-2xl font-semibold text-white mt-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.6)]"
          >
            <FormattedText text={priceStartsFrom} as="span" />
          </p>
        )}

      </motion.div>
    </section>
  )
}
