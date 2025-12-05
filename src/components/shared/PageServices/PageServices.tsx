"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { type LucideIcon } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRef } from "react"
import { 
  staggerContainer, 
  fadeInUp, 
  imageReveal,
  blurSlideUp,
  cardLift
} from "@/lib/animations"

export type Language = "en" | "ar"

export interface ServiceData {
  id: number
  title: string
  icon: LucideIcon
}

interface PageServicesProps {
  title: string
  services: ServiceData[]
  image: string
}

export default function PageServices({
  title,
  services,
  image,
}: PageServicesProps) {
  const { language } = useLanguage()
  const lang = language as Language
  const isRTL = lang === "ar"
  
  const titleRef = useRef(null)
  const imageRef = useRef(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 })
  const isImageInView = useInView(imageRef, { once: true, amount: 0.2 })

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* Split Layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            variants={imageReveal}
            initial="hidden"
            animate={isImageInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className={`relative h-[500px] md:h-[650px] rounded-3xl overflow-hidden shadow-2xl group ${isRTL ? 'md:order-2' : ''}`}
          >
            <Image
              src={image}
              alt="Services"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Decorative Border */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute inset-0 border-4 border-white/20 rounded-3xl"
            />
          </motion.div>

          {/* Content Side */}
          <motion.div
            ref={titleRef}
            variants={staggerContainer}
            initial="hidden"
            animate={isTitleInView ? "visible" : "hidden"}
            className={`${isRTL ? 'md:order-1' : ''}`}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-[#3960F9]/10 text-[#3960F9] text-sm font-semibold rounded-full border border-[#3960F9]/20">
                {isRTL ? "خدماتنا" : "Our Services"}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={blurSlideUp}
              className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {title}
            </motion.h2>

            {/* Services List */}
            <div className="space-y-5">
              {services.map((service, index) => {
                const IconComponent = service.icon

                return (
                  <motion.div
                    key={service.id}
                    variants={fadeInUp}
                    whileHover={cardLift}
                    className={`flex items-center gap-5 p-5 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Service Icon with primary color background */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-16 h-16 bg-[#3960F9] rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Service Text */}
                    <h3 className={`flex-1 text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#3960F9] transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                      {service.title}
                    </h3>

                    {/* Arrow indicator */}
                    <motion.div
                      animate={{ x: isRTL ? [-3, 0, -3] : [3, 0, 3] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg
                        className="w-6 h-6 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={isRTL ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={isTitleInView ? { width: "100px", opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`h-1 bg-[#3960F9] rounded-full mt-8 shadow-lg ${isRTL ? 'mr-auto' : 'ml-0'}`}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
