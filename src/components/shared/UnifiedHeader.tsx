"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "@/hooks/useIsMobile"
import LanguageSwitcher from "./LanguageSwitcher"
import { motion, AnimatePresence } from "framer-motion"

interface UnifiedHeaderProps {
  texts?: Record<string, string>
  showBadge?: boolean
  hasBanner?: boolean
  logoHref?: string
  logoAlt?: string
  logoSrc?: string
  transparentHeader?: boolean
}

export default function UnifiedHeader({ texts = {}, hasBanner = true, logoHref, logoAlt = "Savvy", logoSrc = "/Savvy 2 1.svg", transparentHeader = false }: UnifiedHeaderProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRobotsOpen, setIsRobotsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isRTL = lang === "ar"
  const robotsDropdownRef = useRef<HTMLDivElement>(null)
  const robotsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const robots = [
    { href: `/${lang}/robots/g1`, label: "Unitree Humanoid G1" },
    { href: `/${lang}/robots/go2`, label: "Unitree Robo-Dog Go2" },
    { href: `/${lang}/robots/r1`, label: "Unitree Humanoid R1" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (robotsDropdownRef.current && !robotsDropdownRef.current.contains(event.target as Node)) {
        setIsRobotsOpen(false)
      }
    }
    if (isRobotsOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isRobotsOpen])

  useEffect(() => {
    return () => {
      if (robotsTimeoutRef.current) clearTimeout(robotsTimeoutRef.current)
    }
  }, [])

  const handleRobotsEnter = () => {
    if (robotsTimeoutRef.current) clearTimeout(robotsTimeoutRef.current)
    setIsRobotsOpen(true)
  }

  const handleRobotsLeave = () => {
    robotsTimeoutRef.current = setTimeout(() => setIsRobotsOpen(false), 200)
  }

  // Scroll detection - set initial state and listen for scroll
  useEffect(() => {
    setIsScrolled(window.scrollY > 100)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isTransparent = transparentHeader && !isScrolled
  const navTextClass = isTransparent ? "text-white hover:text-white/80" : "text-gray-700 hover:text-gray-900"

  return (
    <>
      <motion.header
        animate={{
          top: isScrolled ? "0px" : (hasBanner ? (isMobile ? "35px" : "40px") : "0px")
        }}
        transition={{
          duration: isMobile ? 0.2 : 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
        className={`fixed left-0 right-0 ${isMobileMenuOpen ? "z-[1000]" : "z-40"} mb-10 md:mb-0 transition-colors duration-300 ${
          transparentHeader && !isScrolled
            ? "bg-transparent shadow-none"
            : "bg-white/95 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
            <div className={`flex items-center justify-between gap-3 md:gap-4 lg:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Logo - Smaller on mobile, white when transparent */}
              <div className="shrink-0">
                <Link href={logoHref || `/${lang}`}>
                  <Image
                    src={logoSrc}
                    alt={logoAlt}
                    width={100}
                    height={70}
                    className={`h-10 md:h-13 w-auto transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`}
                  />
                </Link>
              </div>

              {/* Desktop Robots Dropdown */}
              <div
                ref={robotsDropdownRef}
                className="relative hidden md:block"
                onMouseEnter={handleRobotsEnter}
                onMouseLeave={handleRobotsLeave}
              >
                <button
                  onClick={() => setIsRobotsOpen(!isRobotsOpen)}
                  className={`${navTextClass} transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap`}
                >
                  { (lang === "ar" ? "متجر ساڤي" : "Savvy E-Store")}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isRobotsOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isRobotsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute top-full mt-2 w-52 bg-white rounded-2xl shadow-lg py-2 overflow-hidden z-50 ${isRTL ? "right-0" : "left-0"}`}
                    >
                      <Link
                        href={`/${lang}`}
                        onClick={() => setIsRobotsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium border-b border-gray-100 mb-1"
                      >
                        {t("common.robotsViewAll") || (lang === "ar" ? "عرض الكل" : "View All")}
                      </Link>
                      {robots.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          onClick={() => setIsRobotsOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 transition-colors ${isTransparent ? "text-white" : "text-gray-900"}`}
                aria-label={t("common.toggleMenu")}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Language Switcher & Contact Button */}
              <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <LanguageSwitcher currentLang={lang} />
                <Link
                  href={`/${lang}/contact`}
                  className="px-5 py-2 bg-[#0066FF] text-white rounded-full hover:bg-[#0052CC] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {texts["contactUs"] || t("common.contactUs")}
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-y-auto overflow-x-hidden overscroll-y-contain max-h-[calc(100dvh-120px)] absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-md rounded-2xl"
              >
                <nav className="py-4">
                  {/* Robots list */}
                  <div className="px-6 pb-2">
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                      { (lang === "ar" ? "روبوتاتنا" : "Our Robots")}
                    </p>
                    <Link
                      href={`/${lang}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 text-white text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {t("common.robotsViewAll") || (lang === "ar" ? "عرض الكل" : "View All")}
                    </Link>
                    {robots.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 text-white/80 text-sm hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                      >
                        {r.label}
                      </Link>
                    ))}
                  </div>

                  {/* Language & Contact */}
                  <div className="px-6 py-4 mt-2 border-t border-white/10 space-y-2">
                    <LanguageSwitcher currentLang={lang} isMobile />
                    <Link
                      href={`/${lang}/contact`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-5 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                    >
                      {texts["contactUs"] || t("common.contactUs")}
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  )
}
