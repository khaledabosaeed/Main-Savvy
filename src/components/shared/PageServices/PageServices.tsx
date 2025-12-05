"use client"

import { motion, useInView } from "framer-motion"
import { type LucideIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRef } from "react"

export type Language = "en" | "ar"

export interface ServiceData {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

interface PageServicesProps {
  title: string
  subtitle?: string
  services: ServiceData[]
}

export default function PageServices({
  title,
  subtitle,
  services,
}: PageServicesProps) {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Services Grid - 2 Rows Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex gap-6 items-start ${isRTL ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}
              >
                {/* Icon with Blue Background */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0"
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </motion.div>

                {/* Text Content */}
                <div className="flex-1 pt-2">
                  {/* Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
