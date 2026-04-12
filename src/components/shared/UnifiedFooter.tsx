"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram } from "lucide-react"
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6"
import Image from "next/image"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"

export default function UnifiedFooter() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: isMobile ? 0.1 : 0.2 })

  return (
    <footer ref={footerRef} className="relative bg-white text-gray-700 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: isMobile ? 0.4 : 0.5 }}
          className={`flex flex-row items-start  justify-between ${isRTL ? "flex-row" : "flex-row"}`}
        >
              <p className={`text-[10px] w-[200px] md:w-full md:text-sm text-gray-600 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}>
            {t("common.gateway")}
          </p>
          <div className="mb-4">
            <Image src="/footer.svg" alt="Savvy Logo" width={120} height={60} className="h-10 md:h-16 w-auto" />
          </div>
      
        </motion.div>

        <div className="h-px bg-gray-200 mb-8" />

        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? "md:flex-row-reverse" : ""}`}>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/mr.savvy_saudi/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/mrsavvy_saudi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/company/savvy-world/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>

          <span className="text-sm text-gray-500">{t("common.copyrightFull")}</span>
        </div>
      </div>
    </footer>
  )
}
