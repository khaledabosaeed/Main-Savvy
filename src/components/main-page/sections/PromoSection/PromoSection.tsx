"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { getPromoContent } from "./content"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PromoSection() {
    const { language } = useLanguage()
    const lang = language as "en" | "ar"
    const content = getPromoContent(lang)

    return (
        <section className="w-full py-16 md:py-20 bg-white" >
            <div className="max-w-7xl mx-auto px-6 md:px-10" >
                <div className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-16 bg-[#F4F4F4] rounded-3xl p-8 md:p-16 shadow-xl overflow-visible ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image - Left side (or right in RTL) - Overflowing */}
                    <motion.div
                        className="flex-shrink-0 w-full  md:w-96 md:-my-24 md:-ml-8 "
                        initial={{ opacity: 0, x: lang === 'ar' ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={content.image}
                            alt="Savvy World"
                            width={450}
                            height={600}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Text Content - Right side (or left in RTL) */}
                    <motion.div
                        className={`flex-1 flex flex-col   gap-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                        initial={{ opacity: 0, x: lang === 'ar' ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                            {content.title}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            {content.description}
                        </p>
                        <Link
                            href={content.buttonLink}
                            className={`inline-block px-10 py-4 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/30 ${lang === 'ar' ? 'self-end' : 'self-start'} md:${lang === 'ar' ? 'self-end' : 'self-start'} self-center`}
                        >
                            {content.buttonText}
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
