"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { Language } from "./content"
import { getMediaPartnersContent } from "./content"

interface MediaPartnersProps {
  lang: Language
}

export default function MediaPartners({ lang }: MediaPartnersProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaPartnersContent.en) => getMediaPartnersContent(lang, key)

  const partners = [
    { id: 1, image: "/media/team/member-1.jpg", name: "Team Member 1", rotation: -5 },
    { id: 2, image: "/media/team/member-2.jpg", name: "Team Member 2", rotation: 4 },
    { id: 3, image: "/media/team/member-3.jpg", name: "Team Member 3", rotation: -4 },
    { id: 4, image: "/media/team/member-4.jpg", name: "Team Member 4", rotation: 5 },
    { id: 5, image: "/media/team/member-5.jpg", name: "Team Member 5", rotation: -6 },
    { id: 6, image: "/media/team/member-6.jpg", name: "Team Member 6", rotation: 3 },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        {/* Enhanced Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className={`text-center mb-20 ${isRTL ? 'rtl' : 'ltr'}`}
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
              {isRTL ? "فريقنا" : "Our Team"}
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
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: "80px", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-[#3960F9] rounded-full mt-6 mx-auto shadow-lg"
          />
        </motion.div>

        {/* Enhanced Partners Cards */}
        <div className="relative mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: partner.rotation + 3,
                  zIndex: 10
                }}
                className="relative group"
                style={{
                  transform: `rotate(${partner.rotation}deg)`,
                }}
              >
                <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl bg-white group-hover:shadow-purple-500/30 transition-all duration-500">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3960F9]/80 via-[#3960F9]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Name on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <p className="font-bold text-lg">{partner.name}</p>
                  </motion.div>

                  {/* Decorative Border */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-3xl pointer-events-none group-hover:border-[#3960F9]/50 transition-colors duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-3 px-10 py-5 bg-[#3960F9] text-white rounded-full font-bold text-lg hover:bg-[#2848C7] transition-all shadow-2xl hover:shadow-[#3960F9]/50 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <span>{t("button")}</span>
            <motion.svg
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
