"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Clock, Users, Heart, UserCheck } from "lucide-react"
import type { Language } from "./content"
import { getMediaContentText } from "./content"

interface MediaContentProps {
  lang: Language
}

export default function MediaContent({ lang }: MediaContentProps) {
  const isRTL = lang === "ar"
  const t = (key: keyof typeof import("./content").mediaContentData.en) =>
    getMediaContentText(lang, key)

  const features = [
    { icon: Clock, text: t("feature1"), link: "https://example.com/duration-analysis" },
    { icon: Users, text: t("feature2"), link: "https://example.com/visitor-analytics" },
    { icon: Heart, text: t("feature3"), link: "https://example.com/sentiment-analysis" },
    { icon: UserCheck, text: t("feature4"), link: "https://example.com/demographic-analysis" },
  ]

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-6">
        {/* القسم العلوي - صناعة محتوى */}
        {/* <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch mb-32`}> */}
          {/* الصورة - على اليمين */}
          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 order-2 lg:order-2"
          >
            <div className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/media/seconed/one.jpg"
                alt="Content Production"
                fill
                className="object-cover"
              />
            </div>
          </motion.div> */}

          {/* النص - على اليسار */}
          {/* <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`lg:w-1/2 order-1 lg:order-1 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t("topTitle")}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
          //     {t("topDescription")}
          //   </p>
          // </motion.div> */}
        {/* </div> */}

        {/* القسم السفلي - الشاشات الرقمية */}
        <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch`}>
          {/* الصورة - على اليسار */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 order-2 lg:order-1 relative"
          >
            <div className="relative w-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/media/seconed/tow.jpg"
                alt="Digital Display"
                fill
                className="object-cover"
              />
            </div>

            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-2 left-[-20px] bg-white rounded-2xl shadow-xl p-6 border border-gray-100 min-w-[220px]"
            >
              <div className="mb-6 text-center">
                <Image
                    src="/Savvy 2 1.svg"
                    alt="Savvy"
                    width={100}
                    height={32}
                    className="h-7 md:h-9 w-auto"
                  />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-gray-600 text-xs mb-1">{t("activeEngagements")}</p>
                  <p className="text-3xl font-bold text-gray-900">89</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600 text-xs mb-1">{t("uptime")}</p>
                  <p className="text-3xl font-bold text-gray-900">99.4%</p>
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`lg:w-1/2 order-1 lg:order-2 flex flex-col justify-center ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mb-6 px-6 py-3 bg-[#3960F9] text-white rounded-full font-bold text-sm hover:bg-[#2848C7] transition-all shadow-lg ${isRTL ? 'self-start' : 'self-start'} w-fit`}
            >
              {t("button")}
            </motion.button>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {t("bottomTitle")}
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t("bottomDescription")}
            </p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.a
                    key={index}
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(57, 96, 249, 0.15)" }}
                    className={`flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer transition-all ${isRTL ? '' : ''}`}
                  >
                    <div className="shrink-0 w-12 h-12 bg-[#3960F9] rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <p className={`text-gray-900 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      {feature.text}
                    </p>
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

