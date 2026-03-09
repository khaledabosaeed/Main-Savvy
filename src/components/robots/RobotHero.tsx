"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export type TextPlacement = "left" | "center" | "right"

interface RobotHeroProps {
  videoSrc: string
  title: string
  subtitle?: string
  priceStartsFrom?: string
  buttonText?: string
  productLink?: string
  textPlacement?: TextPlacement
}

const placementClasses: Record<TextPlacement, string> = {
  left: "items-start text-left",
  center: "items-center text-center justify-center",
  right: "items-end text-right",
}

export default function RobotHero({
  videoSrc,
  title,
  subtitle,
  priceStartsFrom,
  buttonText,
  productLink,
  textPlacement = "center",
}: RobotHeroProps) {
  const placement = placementClasses[textPlacement]

  return (
    <section className="relative h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background - full viewport height */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text Content Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col ${placement}`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white drop-shadow-lg mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-md">
            {subtitle}
          </p>
        )}
        {priceStartsFrom && (
          <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg mt-4">
            {priceStartsFrom}
          </p>
        )}
        {buttonText && productLink && (
          <Link
            href={productLink}
            className="mt-8 inline-block px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            {buttonText}
          </Link>
        )}
      </motion.div>
    </section>
  )
}
