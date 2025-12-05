"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Instagram } from "lucide-react"
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6"
import type { Language } from "./content"
import { getFooterContent } from "./content"
import Image from "next/image"

interface UnifiedFooterProps {
  lang: Language
}

export default function UnifiedFooter({ lang }: UnifiedFooterProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").footerContent.en) => getFooterContent(lang, key)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.2 })

  const footerSections = [
    {
      title: isRTL ? "عالم سافي" : "Savvy World",
      links: [
        { label: isRTL ? "القسم عالم سافي" : "Savvy World Section", href: "#" },
        { label: isRTL ? "اخر معارضنا" : "Latest Exhibitions", href: "#" },
        { label: isRTL ? "معرض الميديا" : "Media Gallery", href: "#" },
        { label: isRTL ? "اخبار سافي" : "Savvy News", href: "#" },
      ]
    },
    {
      title: isRTL ? "سافي ميديا" : "Savvy Media",
      links: [
        { label: isRTL ? "معرض الميديا" : "Media Gallery", href: "#" },
        { label: isRTL ? "معارضنا" : "Our Exhibitions", href: "#" },
        { label: isRTL ? "خدماتنا" : "Our Services", href: "#" },
      ]
    },
    {
      title: isRTL ? "سافي اكسبو" : "Savvy Expo",
      links: [
        { label: isRTL ? "شراكاتنا السابقين" : "Previous Partnerships", href: "#" },
        { label: isRTL ? "معارضنا" : "Our Exhibitions", href: "#" },
        { label: isRTL ? "حلولنا" : "Our Solutions", href: "#" },
      ]
    },
    {
      title: isRTL ? "سافي ابتكار" : "Savvy Innovation",
      links: [
        { label: isRTL ? "شراكاتنا السابقين" : "Previous Partnerships", href: "#" },
        { label: isRTL ? "حلولنا" : "Our Solutions", href: "#" },
      ]
    },
    {
      title: isRTL ? "صفحات اخرى" : "Other Pages",
      links: [
        { label: isRTL ? "تواصل معنا" : "Contact Us", href: "/contact" },
        { label: isRTL ? "اخبار سافي" : "Savvy News", href: "#" },
        { label: isRTL ? "معرض الميديا" : "Media Gallery", href: "#" },
      ]
    },
  ]

  return (
    <footer ref={footerRef} className="relative bg-white text-gray-700 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Main Footer Content */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Logo Column - Takes 1 column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="col-span-2 md:col-span-1 flex flex-col items-start"
          >
            {/* Logo */}
            <div className="mb-4">
              <Image
                src="/Savvy 2 1.svg"
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
              <h3 className="text-base font-bold mb-4 text-gray-900">
                {section.title}
              </h3>
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
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com"
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
                ? "حقوق النشر © 2025 سافي. جميع الحقوق محفوظة"
                : "Copyright © 2025 Savvy. All rights reserved"
              }
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-gray-900 transition-colors">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                {isRTL ? "شروط الاستخدام" : "Terms of Use"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
