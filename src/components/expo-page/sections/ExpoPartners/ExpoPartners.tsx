"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import type { Language } from "./content"
import { getExpoPartnersContent } from "./content"
import { fadeInUp, viewportConfig, sectionSlideUp } from "@/lib/animations"

// Partner logos data - you can add your logo paths here
const partners = [
    { id: 1, name: "سكني", logo: "/expo/partners/skani.svg" },
    { id: 2, name: "NHC", logo: "/expo/partners/nhc.svg" },
    { id: 3, name: "Hisense", logo: "/expo/partners/hisense.svg" },
    { id: 4, name: "PropTech", logo: "/expo/partners/proptech.svg" },
    { id: 5, name: "الأولى", logo: "/expo/partners/mohammed-al-habib.svg" },
    { id: 6, name: "شؤون البلديات", logo: "/expo/partners/manzil-alarabia.svg" },
    { id: 7, name: "Samsung", logo: "/expo/partners/samsung.svg" },
    { id: 8, name: "المنتدى السعودي للمباني الخضراء", logo: "/expo/partners/mnadf.svg" },
]

export default function ExpoPartners() {
    const { language } = useLanguage()
    const lang = language as Language
    const isRTL = lang === "ar"
    const t = (key: keyof typeof import("./content").expoPartnersContent.en) =>
        getExpoPartnersContent(lang, key)

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
                            {t("title")}
                        </h2>
                        <p className="text-gray-600 text-base md:text-lg">
                            {t("subtitle")}
                        </p>
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
                                key={partner.id}
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
