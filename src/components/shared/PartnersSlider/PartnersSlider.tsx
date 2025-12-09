"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/LanguageContext"
import { partnersContent } from "./content"


export default function PartnersSlider() {
    const { language } = useLanguage()
    const isRTL = language === "ar"
    const content = partnersContent[language as keyof typeof partnersContent] || partnersContent.en

    const partners = [
        { name: "Al Awaly", logo: "/home-page/partners/al-awaly.svg" },
        { name: "Sakani", logo: "/home-page/partners/sakani.svg" },
        { name: "NHC", logo: "/home-page/partners/nhc.svg" },
        { name: "Hisense", logo: "/home-page/partners/hisense.svg" },
        { name: "Mohammed Al Habib", logo: "/home-page/partners/mohammed-al-habib.svg" },
        { name: "Manzil Alarabia", logo: "/home-page/partners/manzil-alarabia.svg" },
        { name: "Samsung", logo: "/home-page/partners/samsung.svg" },
        { name: "Al Awaly", logo: "/home-page/partners/M.webp" },
    ]

    // Duplicate partners for seamless loop
    const duplicatedPartners = [...partners, ...partners]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Heading */}
                <h2 className={`text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12 ${isRTL ? 'rtl' : 'ltr'}`}>
                    {content.heading}
                </h2>

                {/* Infinite Scroll Container */}
                <div className="relative overflow-hidden">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                    {/* Scrolling Partners */}
                    <div className={`flex gap-12 items-center `}>
                        {duplicatedPartners.map((partner, index) => {
                            // Smaller size for Samsung and Hisense
                            const isSmaller = partner.name === "Samsung" || partner.name === "Hisense"
                            const logoHeight = isSmaller ? "h-7" : "h-10"
                            const logoWidth = isSmaller ? 70 : 100
                            const logoHeightPx = isSmaller ? 28 : 40

                            return (
                                <div
                                    key={`${partner.name}-${index}`}
                                    className="flex-shrink-0  transition-all duration-300 opacity-60 hover:opacity-100"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={logoWidth}
                                        height={logoHeightPx}
                                        className={`${logoHeight} w-auto object-contain`}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
