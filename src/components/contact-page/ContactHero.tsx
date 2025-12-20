"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Mail, MessageCircle } from "lucide-react"
import type { Language } from "./content"

interface ContactHeroProps {
  lang: Language
}

export default function ContactHero({ lang }: ContactHeroProps) {
  const isRTL = lang === "ar"
  const [key, setKey] = useState(0)
  
  // Re-trigger animations on language change
  useEffect(() => {
    setKey(prev => prev + 1)
  }, [lang])



  // Title with word-by-word animation (same as main hero)
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }


  const title = isRTL ? "تواصل معنا" : "Get In Touch"
  const subtitle = isRTL 
    ? "نحن هنا للإجابة على أسئلتك ومساعدتك في مشروعك القادم"
    : "We're here to answer your questions and help with your next project"

  return (
    <section className="relative py-24 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content - Centered */}
      <div className="container relative z-10">
        <motion.div
          key={key}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Badge */}
          <motion.div
            // variants={badgeVariants}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-4 py-2 bg-[#3960F9] rounded-full mb-6 cursor-default shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-semibold">
              {isRTL ? "تواصل معنا" : "Get In Touch"}
            </span>
          </motion.div>

          {/* Title with word animation */}
          <motion.h1
            variants={titleVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                // variants={wordVariants}
                className={`inline-block ${isRTL ? 'ml-3' : 'mr-3'}`}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-linear-to-r from-transparent via-[#3960F9] to-transparent mx-auto mb-6 rounded-full"
            style={{ width: "120px" }}
          />

          {/* Subtitle */}
          <motion.p
            // variants={subtitleVariants}
            className="text-lg md:text-xl text-gray-600 leading-relaxed"
          >
            {subtitle}
          </motion.p>

          {/* Icon decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[#3960F9]/10 rounded-2xl"
            >
              <Mail className="w-8 h-8 text-[#3960F9]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

