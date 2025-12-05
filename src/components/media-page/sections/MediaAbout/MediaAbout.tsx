"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sparkles, Zap, Award } from "lucide-react"
import type { Language } from "./content"
import { getMediaAboutContent } from "./content"
import { 
  staggerContainer, 
  blurSlideUp, 
  scaleIn,
  cardLift
} from "@/lib/animations"

interface MediaAboutProps {
  lang: Language
}

export default function MediaAbout({ lang }: MediaAboutProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaAboutContent.en) => getMediaAboutContent(lang, key)
  
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.3 })

  const features = [
    {
      icon: Sparkles,
      title: isRTL ? "إبداع لا حدود له" : "Unlimited Creativity",
      description: isRTL ? "نحول أفكارك إلى محتوى مبهر" : "Transform your ideas into stunning content",
    },
    {
      icon: Zap,
      title: isRTL ? "إنتاج سريع" : "Fast Production",
      description: isRTL ? "نقدم مشاريع عالية الجودة في وقت قياسي" : "High-quality projects in record time",
    },
    {
      icon: Award,
      title: isRTL ? "جودة احترافية" : "Professional Quality",
      description: isRTL ? "معايير عالمية في كل التفاصيل" : "World-class standards in every detail",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10" ref={containerRef}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={`text-center max-w-4xl mx-auto mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {/* Badge */}
          <motion.div
            variants={scaleIn}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-[#3960F9]/10 text-[#3960F9] text-sm font-semibold rounded-full border border-[#3960F9]/20">
              {isRTL ? "من نحن" : "About Us"}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={blurSlideUp}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-gray-900 leading-tight"
          >
            {t("title")}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "100px", opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-[#3960F9] rounded-full mx-auto shadow-lg"
          />
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={blurSlideUp}
                whileHover={cardLift}
                className="relative group"
              >
                <div className={`bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full ${isRTL ? 'text-right' : 'text-left'}`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-[#3960F9] rounded-2xl mb-6 shadow-lg group-hover:shadow-xl"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect Border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#3960F9] rounded-b-3xl origin-left"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
