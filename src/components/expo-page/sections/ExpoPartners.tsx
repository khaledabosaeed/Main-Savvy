"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { fadeInUp, viewportConfig, sectionSlideUp } from "@/lib/animations"

// Partner logos data - you can add your logo paths here
const partners = [
    { name: "Al Awaly", logo: "/home-page/partners/al-awaly.svg" },
    { name: "Sakani", logo: "/home-page/partners/sakani.svg" },
    { name: "NHC", logo: "/home-page/partners/nhc.svg" },
    { name: "Hisense", logo: "/home-page/partners/hisense.svg" },
    { name: "Mohammed Al Habib", logo: "/home-page/partners/mohammed-al-habib.svg" },
    { name: "Manzil Alarabia", logo: "/home-page/partners/manzil-alarabia.svg" },
    { name: "Samsung", logo: "/home-page/partners/samsung.svg" },
    { name: "UniTree", logo: "/home-page/partners/1.svg" },
    { name: "SGBF", logo: "/home-page/partners/2.svg" },
    { name: "SOTI One", logo: "/home-page/partners/3.svg" },
]

export default function ExpoPartners() {
    const { language } = useLanguage()
    const { t } = useTranslation()
    const lang = language as "en" | "ar"
    const isRTL = lang === "ar"

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container">
                <div className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${isRTL ? '' : ''}`}>
                    {/* Title Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={sectionSlideUp}
                        className={`flex-shrink-0 lg:w-1/3 ${isRTL ? "text-right" : "text-left"}`}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            {t("expo.partners.title")}
                        </h2>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                            {t("expo.partners.subtitle")}
                        </h2>
                    </motion.div>

                    {/* Partners Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportConfig}
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center justify-items-center"
                    >
                        {partners.map((partner, index) => (
                            <motion.div
                                key={partner.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative w-full h-20 md:h-24 flex items-center justify-center  transition-all duration-300"
                            >
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    width={180}
                                    height={80}
                                    className="object-contain max-h-full w-auto"
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
