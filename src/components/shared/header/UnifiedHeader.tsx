"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import Badge from "../Badge/Badge"
import { motion, AnimatePresence } from "framer-motion"

interface UnifiedHeaderProps {
  texts?: Record<string, string>
  showBadge?: boolean
  hasBanner?: boolean
}

export default function UnifiedHeader({ texts = {}, showBadge = true, hasBanner = true }: UnifiedHeaderProps) {
  const { language } = useLanguage()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isRTL = lang === "ar"
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // serviceSections ثابتة ومترجمة حرفيًا
  const serviceSections = lang === "ar"
    ? ["سافي وورلد", "سافي إكسبو", "سافي ميديا", "سافي انوفيشن"]
    : ["Savvy World", "Savvy Expo", "Savvy Media", "Savvy Innovation"]

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false)
      }
    }

    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isServicesOpen])

  // Scroll detection to move navbar to top
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // تنظيف timeout عند unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsServicesOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false)
    }, 200)
  }

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
        className="fixed left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-md"
      >
        <div className="w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 py-3 md:py-4 lg:py-5">
            <div className={`flex items-center justify-between gap-3 md:gap-4 lg:gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {/* Logo - Smaller on mobile */}
              <div className="flex-shrink-0">
                <Link href={`/${lang}`}>
                  <Image
                    src="/Savvy 2 1.svg"
                    alt="Savvy"
                    width={100}
                    height={70}
                    className="h-10 md:h-13 w-auto"
                  />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-900 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              {/* Navigation */}
              <nav className={`hidden md:flex items-center gap-8 flex-1 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                {Object.entries(texts)
                  .filter(([key]) => key !== "ourServices" && key !== "contactUs")
                  .map(([key, value]) => (
                    <Link
                      key={key}
                      href={`#${key}`}
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap flex items-center"
                    >
                      {value}
                      {key === "whySavvy" && showBadge && <Badge text="1512 × 69" />}
                    </Link>
                  ))}

                {/* Services Dropdown */}
                {texts["ourServices"] && (
                  <div
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium flex items-center gap-1 whitespace-nowrap"
                    >
                      {texts["ourServices"]}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full mt-2 w-48 bg-white rounded-2xl shadow-lg py-2 overflow-hidden z-50 ${isRTL ? 'right-0' : 'left-0'}`}
                        >
                          <Link
                            href={`/${lang}`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[0]}
                          </Link>
                          <Link
                            href={`/${lang}/expo`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[1]}
                          </Link>
                          <Link
                            href={`/${lang}/media`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[2]}
                          </Link>
                          <Link
                            href={`/${lang}/innovation`}
                            onClick={() => setIsServicesOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {serviceSections[3]}
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </nav>

              {/* Language Switcher & Contact Button */}
              <div className={`hidden md:flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* <LanguageSwitcher currentLang={lang} /> */}
                <Link
                  href={`/${lang}/contact`}
                  className="px-5 py-2 bg-[#0066FF] text-white rounded-full hover:bg-[#0052CC] transition-colors text-sm font-medium whitespace-nowrap"
                >
                  {texts["contactUs"] || (lang === "ar" ? "اتصل بنا" : "Contact Us")}
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
                className="md:hidden absolute top-full left-4 right-4 mt-2 bg-black/90 backdrop-blur-md rounded-2xl overflow-hidden"
              >
                <nav className="py-4">
                  {Object.entries(texts)
                    .filter(([key]) => key !== "ourServices" && key !== "contactUs")
                    .map(([key, value]) => (
                      <Link
                        key={key}
                        href={`#${key}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-6 py-3 text-white hover:bg-white/10 transition-colors text-sm font-medium"
                      >
                        {value}
                      </Link>
                    ))}

                  {/* Services في القائمة الموبايل */}
                  {texts["ourServices"] && (
                    <>
                      <div className="px-6 py-3 text-white/60 text-xs font-semibold uppercase">
                        {texts["ourServices"]}
                      </div>
                      <Link
                        href={`/${lang}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[0]}
                      </Link>
                      <Link
                        href={`/${lang}/expo`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[1]}
                      </Link>
                      <Link
                        href={`/${lang}/media`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[2]}
                      </Link>
                      <Link
                        href={`/${lang}/innovation`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-8 py-2 text-white hover:bg-white/10 transition-colors text-sm"
                      >
                        {serviceSections[3]}
                      </Link>
                    </>
                  )}

                  {/* Language & Contact */}
                  <div className="px-6 py-4 mt-2 border-t border-white/10 space-y-2">
                    {/* <LanguageSwitcher currentLang={lang} isMobile /> */}
                    <Link
                      href={`/${lang}/contact`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full px-5 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-sm font-medium text-center"
                    >
                      {texts["contactUs"] || (lang === "ar" ? "اتصل بنا" : "Contact Us")}
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
