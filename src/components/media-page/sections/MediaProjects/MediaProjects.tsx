"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import type { Language } from "./content"
import { getMediaProjectsContent } from "./content"

interface MediaProjectsProps {
  lang: Language
}

export default function MediaProjects({ lang }: MediaProjectsProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaProjectsContent.en) => getMediaProjectsContent(lang, key)

  const projects = [
    {
      title: t("project1Title"),
      description: t("project1Description"),
      image: "/media/MediaProjects/2.png",
    },
    {
      title: t("project2Title"),
      description: t("project2Description"),
      image: "/media/MediaProjects/1.jpg",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#3960F9]/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative z-10">
        {/* Enhanced Title */}
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
              {isRTL ? "مشاريعنا" : "Our Projects"}
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

        {/* Enhanced Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/30 transition-all duration-500">
                <div className="relative h-[500px] md:h-[650px] w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Enhanced Overlay Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3960F9]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content Overlay */}
                  <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-end ${isRTL ? 'text-right rtl' : 'text-left ltr'}`}>
                    {/* Number Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="absolute top-8 right-8 w-16 h-16 bg-[#3960F9] rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <span className="text-2xl font-bold text-white">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>

                    {/* Decorative Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "60px" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                      className="h-1 bg-white rounded-full mb-6 shadow-lg"
                    />

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                      className="text-3xl md:text-4xl font-bold mb-4 text-white"
                    >
                      {project.title}
                    </motion.h3>
                    
                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      className="text-base md:text-lg leading-relaxed text-white/90"
                    >
                      {project.description}
                    </motion.p>

                    {/* Hover Indicator */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
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
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-4 border-white/10 rounded-3xl pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
