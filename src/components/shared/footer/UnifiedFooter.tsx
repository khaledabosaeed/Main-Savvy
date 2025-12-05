"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp } from "lucide-react"
import type { Language } from "./content"
import { getFooterContent } from "./content"

interface UnifiedFooterProps {
  lang: Language
}

export default function UnifiedFooter({ lang }: UnifiedFooterProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").footerContent.en) => getFooterContent(lang, key)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.2 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 }, 
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons = [
    { icon: Linkedin, href: "https://linkedin.com", label: t("linkedin") },
    { icon: Twitter, href: "https://twitter.com", label: t("twitter") },
    { icon: Facebook, href: "https://facebook.com", label: t("facebook") },
    { icon: Instagram, href: "https://instagram.com", label: t("instagram") },
  ]

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 mt-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-[#3960F9]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-[#3960F9]/15 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Scroll to Top Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group px-6 py-3 bg-[#3960F9] rounded-full font-semibold hover:bg-[#2848C7] transition-all shadow-lg hover:shadow-[#3960F9]/50 inline-flex items-center gap-2"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            <span>{isRTL ? "العودة للأعلى" : "Back to Top"}</span>
          </motion.button>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {/* Logo and Copyright Column */}
          <motion.div  className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="mb-6">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-4xl font-bold mb-4 inline-block cursor-pointer"
                style={{ fontFamily: 'cursive' }}
              >
                <span className="text-white">Sav</span>
                <span className="text-[#3960F9]">vy</span>
              </motion.div>
            </div>
            <p className="text-gray-300 text-sm mb-6 max-w-xs leading-relaxed">
              {isRTL 
                ? "نقدم حلول تقنية مبتكرة لتحويل أفكارك إلى واقع رقمي متميز"
                : "Providing innovative tech solutions to transform your ideas into exceptional digital reality"
              }
            </p>
            <p className="text-gray-400 text-xs">
              {t("copyright")}
            </p>
          </motion.div>

          {/* Savvy World Column */}
          <motion.div >
            <h3 className="text-lg font-bold mb-4 text-white border-b-2 border-[#3960F9] pb-2 inline-block">
              {t("savvyWorld")}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "#about", label: t("aboutSavvy") },
                { href: "#tools", label: t("tools") },
                { href: "#ai-center", label: t("aiCenter") },
                { href: "#integration", label: t("integrationCenter") },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={item.href} className="text-gray-300 hover:text-[#3960F9] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#3960F9] rounded-full"></span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Smart Gallery Column */}
          <motion.div >
            <h3 className="text-lg font-bold mb-4 text-white border-b-2 border-[#3960F9] pb-2 inline-block">
              {t("smartAI")}
            </h3>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((num) => (
                <motion.li
                  key={num}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`#section-${num}`} className="text-gray-300 hover:text-[#3960F9] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#3960F9] rounded-full"></span>
                    {/* {t(`section${num}`)} */}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Smart Media Column */}
          <motion.div >
            <h3 className="text-lg font-bold mb-4 text-white border-b-2 border-[#3960F9] pb-2 inline-block">
              {t("intelligentAdvertising")}
            </h3>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((num) => (
                <motion.li
                  key={num}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`#section-${num}`} className="text-gray-300 hover:text-[#3960F9] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#3960F9] rounded-full"></span>
                    {/* {t(`section${num}`)} */}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Smart Innovation Column */}
          <motion.div >
            <h3 className="text-lg font-bold mb-4 text-white border-b-2 border-[#3960F9] pb-2 inline-block">
              {t("exhibition")}
            </h3>
            <ul className="space-y-3">
              {[1, 2, 3, 4].map((num) => (
                <motion.li
                  key={num}
                  whileHover={{ x: isRTL ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={`#section-${num}`} className="text-gray-300 hover:text-[#3960F9] transition-colors text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#3960F9] rounded-full"></span>
                    {/* {t(`section${num}`)} */}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
        />

        {/* Bottom Section - Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm font-semibold">{t("socialMedia")}:</span>
            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-white/10 hover:bg-[#3960F9] rounded-full flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          {/* <div className="text-gray-400 text-sm text-center md:text-right">
            {isRTL ? "صُنع بـ ❤️ في السعودية" : "Made with ❤️ in Saudi Arabia"}
          </div> */}
        </motion.div>
      </div>
    </footer>
  )
}
