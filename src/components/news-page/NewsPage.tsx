"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { Language } from "./content"

interface NewsPageProps {
  lang: Language
}

export default function NewsPage({ lang }: NewsPageProps) {
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const isArabic = lang === "ar"
  const baseText = isArabic
    ? "ترقبوا الإطلاق الرسمي في "
    : "Stay tuned for the official launch on "
  const dateText = isArabic ? "٢١ - ٣" : "March 21"

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="pointer-events-none absolute inset-x-[-10%] -top-40 h-72 " />
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 24 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`text-center max-w-3xl mx-auto ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <div className="relative inline-block">
              <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-full bg-[radial-gradient(circle,_rgba(57,96,249,0.16),_transparent_65%)] blur-2xl opacity-80" />
              <h1 className="relative text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                {baseText}
                <span className="mt-5 md:mt-20 relative inline-flex items-center px-4 py-1 rounded-full
bg-gradient-to-r from-[#3960F9] to-[#2746C7]
text-white shadow-[0_10px_30px_rgba(57,96,249,0.25)]
ring-1 ring-[#3960F9]/20
animate-[pulse_5s_ease-in-out_infinite]">
  <span className="relative z-10 ">{dateText}</span>
  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10" />
</span>
              </h1>
            </div>
          </motion.div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <svg
            viewBox="0 0 1440 120"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-16 md:h-20"
          >
            <path
              fill="#3960F9"
              fillOpacity="0.03"
              d="M0,80 C240,120 480,40 720,70 C960,100 1200,60 1440,90 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* Launch Links Section */}
      <section className="py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: isMobile ? 0.1 : 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`max-w-3xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <p className="text-lg md:text-xl  text-gray-700 mb-4">
            </p>
              <p className="text-sm md:text-base text-gray-600 mb-8 whitespace-pre-line">
            {isArabic && (
                "تابعونا على قنواتنا الإعلامية ..\nلتعرفوا أكثر عن خطة الإطلاق الرسمي\nفي ٢١ - مارس - ٢٠٢٦"
              ) || (
                "To learn more about Savvy World\n official launch plan Follow us on our media channels on\n March 21, 2026."
              )
              }
              </p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="https://linktr.ee/mr.savvy.saudi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#3960F9] text-white font-semibold shadow-md hover:bg-[#2746c7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3960F9] focus-visible:ring-offset-white transform transition-all duration-200 hover:-translate-y-[3px] hover:shadow-lg active:translate-y-0 w-full sm:w-auto"
              >
                Mr. Savvy Saudi
              </Link>
              <Link
                href="https://linktr.ee/7oksha_saudi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#3960F9] text-[#3960F9] font-semibold hover:bg-[#3960F9]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3960F9] focus-visible:ring-offset-white transform transition-all duration-200 hover:-translate-y-[3px] hover:shadow-md active:translate-y-0 w-full sm:w-auto"
              >
                7oksha Saudi
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>


    </div>
  )
}

