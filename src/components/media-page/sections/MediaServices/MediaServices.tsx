"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import type { Language } from "./content"
import { getMediaServicesContent } from "./content"
import { ArrowLeft } from "lucide-react"

interface MediaServicesProps {
  lang: Language
}

export default function MediaServices({ lang }: MediaServicesProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaServicesContent.en) =>
    getMediaServicesContent(lang, key)

  const [selectedService, setSelectedService] = useState(0)

  const services = [
    { id: 1, text: t("service1"), image: "/media/MediaProjects/2.png" },
    { id: 2, text: t("service2"), image: "/media/MediaProjects/1.jpg" },
    { id: 3, text: t("service3"), image: "/media/MediaProjects/2.png" },
    { id: 4, text: t("service4"), image: "/media/MediaProjects/1.jpg" },
    { id: 5, text: t("service5"), image: "/media/MediaProjects/2.png" },
    { id: 6, text: t("service6"), image: "/media/MediaProjects/1.jpg" },
    { id: 7, text: t("service7"), image: "/media/MediaProjects/2.png" },
    { id: 8, text: t("service8"), image: "/media/MediaProjects/1.jpg" },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container">
        {/* Enhanced Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className={`mb-20 ${isRTL ? 'text-right rtl' : 'text-left ltr'}`}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-[#3960F9]/10 text-[#3960F9] text-sm font-semibold rounded-full border border-[#3960F9]/20">
              {isRTL ? "خدماتنا" : "Our Services"}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900"
          >
            {t("title")}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-4xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-[#3960F9] rounded-full mt-6 shadow-lg"
          />
        </motion.div>

        {/* Services List and Image */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Services List */}
          <div className={`space-y-4 ${isRTL ? 'text-right rtl' : 'text-left ltr'}`}>
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setSelectedService(index)}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`w-full text-left group relative ${selectedService === index
                  ? 'text-[#3960F9]'
                  : 'text-gray-600 hover:text-gray-900'
                  } transition-colors duration-200`}
              >
                <div className={`flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors ${selectedService === index ? 'bg-[#3960F9]/5' : ''
                  }`}>
                  <span className="text-sm font-medium text-gray-400 min-w-[40px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-base md:text-lg font-medium flex-1">
                    {service.text}
                  </span>
                    {selectedService === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`${isRTL ? 'mr-auto' : 'ml-auto'}`}
                      >
                        <ArrowLeft
                          className={`w-5 h-5 text-[#3960F9] ${isRTL ? 'rotate-180' : ''}`}
                        />
                      </motion.div>
                    )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Enhanced Image Section */}
          <div className="relative h-[400px] md:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl group">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedService}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={services[selectedService].image}
                  alt={services[selectedService].text}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/40 via-transparent to-transparent" />
                
                {/* Service Title Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`absolute bottom-0 left-0 right-0 p-8 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60px" }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="h-1 bg-white rounded-full mb-4 shadow-lg"
                  />
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {services[selectedService].text}
                  </h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Decorative Border */}
            <div className="absolute inset-0 border-4 border-white/10 rounded-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
