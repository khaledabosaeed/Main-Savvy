"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram } from "lucide-react"
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6"
import type { Language } from "./content"
import Image from "next/image"
import { useIsMobile } from "@/hooks/useIsMobile"

interface UnifiedFooterProps {
  lang: Language
}

export default function UnifiedFooter({ lang }: UnifiedFooterProps) {
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: isMobile ? 0.1 : 0.2 })

  const footerSections = [
    {
      title: isRTL ? "عالم ساڤي" : "Savvy World",
      titleHref: `/${lang}`,
      links: [
        { label: isRTL ? "أقسامنا" : "Our Sections", href: `/${lang}#about` },
        { label: isRTL ? "معرض الصور" : "Gallery", href: `/${lang}#services` },
        // { label: isRTL ? "شركاء النجاح" : "Partners", href: `/${lang}/expo#partners` },
        // { label: isRTL ? "الأخبار" : "News", href: `/${lang}/news` },

      ]
    },
    {
      title: isRTL ? "ساڤي ميديا" : "Savvy Media",
      titleHref: `/${lang}/media`,
      links: [
        { label: isRTL ? "المحتوى" : "Content", href: `/${lang}/media#content` },
        { label: isRTL ? "معرض الميديا" : "Gallery", href: `/${lang}/media#gallery` },
        { label: isRTL ? "لماذا ساڤي" : "Why Savvy", href: `/${lang}/media#why-savvy` },
        
      ]
    },
    {
      title: isRTL ? "ساڤي اكسبو" : "Savvy Expo",
      titleHref: `/${lang}/expo`,
      links: [
        { label: isRTL ? "الخدمات" : "Services", href: `/${lang}/expo#services` },
        { label: isRTL ? "المشاريع" : "Projects", href: `/${lang}/expo#projects` },
      ]
    },
    {
      title: isRTL ? "ساڤي ابتكار" : "Savvy Innovation",
      titleHref: `/${lang}/innovation`,
      links: [
        { label: isRTL ? "الحلول" : "Solutions", href: `/${lang}/innovation#solutions` },
      ]
    },
    {
      title: isRTL ? "صفحات اخرى" : "Other Pages",
      titleHref: null,
      links: [
        // { label: isRTL ? "الأخبار" : "News", href: `/${lang}/news` },
        { label: isRTL ? "تواصل معنا" : "Contact Us", href: `/${lang}/contact` },
        // { label: isRTL ? "سياسة الخصوصية" : "Privacy", href: `/${lang}/privacy` },
        // { label: isRTL ? "شروط الاستخدام" : "Terms", href: `/${lang}/terms` },
      ]
    },
  ]

  return (
    <footer ref={footerRef} className="relative bg-white text-gray-700 pt-12 md:pt-16 pb-6 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">
        {/* Main Footer Content - Better mobile spacing */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 mb-8 md:mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Logo Column - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 15 : 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: isMobile ? 0.4 : 0.5 }}
            className="col-span-2 md:col-span-1 flex flex-col items-start"
          >
            {/* Logo */}
            <div className="mb-4">
              <Image
                src="/footer.svg"
                alt="Savvy Logo"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <p className={`text-sm text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL
                ? "بوابتك للعالم الجديد من الإكسبو والميديا والابتكار"
                : "Your gateway to the new world of Expo, Media and Innovation"
              }
            </p>
          </motion.div>

          {/* Footer Sections - 5 columns */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1"
            >
              {section.titleHref ? (
                <a 
                  href={section.titleHref}
                  className="text-base font-bold mb-4 text-gray-900 hover:text-blue-600 transition-colors duration-200 inline-block"
                >
                  {section.title}
                </a>
              ) : (
                <h3 className="text-base font-bold mb-4 text-gray-900">
                  {section.title}
                </h3>
              )}
              <ul className="space-y-2.5">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-8" />

        {/* Bottom Section */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          {/* Social Icons */}
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
              href="https://www.linkedin.com/in/mr-savvy-green"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright and Links */}
          <div className={`flex flex-col md:flex-row items-center gap-4 text-sm text-gray-500 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <span>
              {isRTL
                ? "حقوق النشر © 2025 ساڤي. جميع الحقوق محفوظة"
                : "Copyright © 2025 Savvy. All rights reserved"
              }
            </span>
            <div className="flex items-center gap-4">
              <a href={`/${lang}/privacy`} className="hover:text-gray-900 transition-colors">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href={`/${lang}/terms`} className="hover:text-gray-900 transition-colors">
                {isRTL ? "شروط الاستخدام" : "Terms of Use"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
