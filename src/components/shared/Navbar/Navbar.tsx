'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo'
import SmartNavLink from './SmartNavLink'
import LanguageLoadingScreen from '../LanguageLoadingScreen'

export type Language = 'en' | 'ar'

interface NavItem {
  label: string
  href: string
}

interface ServicesDropdownItem {
  label: string
  href: string
}

interface NavbarProps {
  lang: Language
  sections?: NavItem[]
}

export default function Navbar({ lang, sections = [] }: NavbarProps) {
  const isRTL = lang === 'ar'
  const pathname = usePathname()
  const scrollToSectionSmooth = useSmoothScrollTo()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [isChangingLanguage, setIsChangingLanguage] = useState(false)

  // Services dropdown items
  const services: ServicesDropdownItem[] = [
    { label: isRTL ? 'المعارض' : 'Expo', href: `/${lang}/expo` },
    { label: isRTL ? 'الابتكار' : 'Innovation', href: `/${lang}/innovation` },
    { label: isRTL ? 'الإعلام' : 'Media', href: `/${lang}/media` },
  ]

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Language switch with loading screen
  const switchLanguage = () => {
    setIsChangingLanguage(true)
    const newLang = lang === 'ar' ? 'en' : 'ar'
    const pathWithoutLang = pathname.replace(/^\/(ar|en)/, '')

    // تأخير لعرض الأنميشن
    setTimeout(() => {
      window.location.href = `/${newLang}${pathWithoutLang}`
    }, 1500) // زيادة الوقت من 500ms إلى 1500ms
  }

  // Smooth scroll to section with Lenis
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.replace('#', '')
      scrollToSectionSmooth(sectionId, { offset: -80, duration: 1.5 })
      setMobileOpen(false)
    }
  }

  return (
    <>
      <LanguageLoadingScreen isVisible={isChangingLanguage} />

      <header
        className={`animate-slideDownFadeIn fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50'
          : 'bg-white/80 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href={`/${lang}`} className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/header/Savvy 2 1.svg"
                  alt="Savvy Logo"
                  width={80}
                  height={80}
                  priority
                  className="w-16 h-16 transition-all"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              {/* Page Sections */}
              {sections.map((section) => (
                <SmartNavLink
                  key={section.href}
                  href={section.href}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 cursor-pointer ${scrolled ? 'text-gray-900' : 'text-gray-800'
                    }`}
                >
                  {section.label}
                </SmartNavLink>
              ))}

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 ${scrolled ? 'text-gray-900' : 'text-gray-800'
                    }`}
                >
                  {isRTL ? 'خدماتنا' : 'Our Services'}
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden`}
                    >
                      {services.map((service, index) => (
                        <SmartNavLink
                          key={service.href}
                          href={service.href}
                          onClick={() => setServicesOpen(false)}
                          className={`block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all ${isRTL ? 'text-right' : 'text-left'
                            }`}
                        >
                          <motion.div
                            initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {service.label}
                          </motion.div>
                        </SmartNavLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact Button */}
              <Link href={`/${lang}/contact`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all shadow-md"
                >
                  {isRTL ? 'تواصل معنا' : 'Contact Us'}
                </motion.button>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={switchLanguage}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all font-medium text-sm"
              >
                {lang === 'ar' ? 'EN' : 'ع'}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu - محسّن */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="lg:hidden overflow-hidden border-t border-gray-200 bg-white/95 backdrop-blur-xl"
              >
                <nav className={`py-6 px-4 space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Page Sections */}
                  {sections.map((section, index) => (
                    <motion.div
                      key={section.href}
                      initial={{ opacity: 0, x: isRTL ? 30 : -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <SmartNavLink
                        href={section.href}
                        onClick={() => setMobileOpen(false)}
                        className="block w-full px-5 py-4 text-gray-800 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-600 rounded-xl transition-all duration-300 hover:shadow-sm"
                      >
                        {section.label}
                      </SmartNavLink>
                    </motion.div>
                  ))}

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: sections.length * 0.08, duration: 0.4 }}
                    className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4"
                  />

                  {/* Services */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (sections.length + 0.5) * 0.08 }}
                    className="px-2 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    {isRTL ? 'خدماتنا' : 'Our Services'}
                  </motion.div>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.href}
                      initial={{ opacity: 0, x: isRTL ? 30 : -30, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{
                        delay: (sections.length + index + 1) * 0.08,
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <SmartNavLink
                        href={service.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-5 py-4 text-gray-800 font-medium hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-600 rounded-xl transition-all duration-300 hover:shadow-sm"
                      >
                        {service.label}
                      </SmartNavLink>
                    </motion.div>
                  ))}

                  {/* Contact Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: (sections.length + services.length + 1) * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="pt-4"
                  >
                    <Link
                      href={`/${lang}/contact`}
                      onClick={() => setMobileOpen(false)}
                      className="block px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      {isRTL ? 'تواصل معنا' : 'Contact Us'}
                    </Link>
                  </motion.div>

                  {/* Language Toggle */}
                  <motion.button
                    onClick={switchLanguage}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: (sections.length + services.length + 2) * 0.08,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="block w-full mt-3 px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all duration-300 font-semibold text-sm text-center shadow-sm hover:shadow-md"
                  >
                    {lang === 'ar' ? '🌐 English' : '🌐 العربية'}
                  </motion.button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}
