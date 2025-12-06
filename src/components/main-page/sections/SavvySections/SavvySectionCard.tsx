"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

interface SavvySectionCardProps {
    title: string
    description: string
    features: string[]
    icon: string
    image: string
    link: string
    buttonText: string
    index: number
}

export default function SavvySectionCard({
    title,
    description,
    features,
    icon,
    image,
    link,
    buttonText,
    index
}: SavvySectionCardProps) {
    const { language } = useLanguage()
    const isRTL = language === "ar"

    return (
        <Link href={`/${language}${link}`} className="relative rounded-2xl overflow-hidden p-8 md:p-12 block" style={{ backgroundColor: '#F6F6F6' }}>

            {/* Top Section: Icon + Title + Description */}
            <div className={`flex items-start gap-6 mb-8 `}>
                {/* Icon */}
                <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center p-3 md:p-4 flex-shrink-0"
                    style={{ backgroundColor: '#1649F0' }}
                >
                    <Image
                        src={icon}
                        alt={`${title} icon`}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain brightness-0 invert"
                    />
                </div>

                {/* Title and Description */}
                <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        {title}
                    </h3>
                    <div className="w-full h-px bg-gray-300 mb-3" />
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {description}
                    </p>
                </div>
            </div>

            {/* Bottom Section: Image + Features List */}
            <div className={`grid md:grid-cols-2 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
                {/* Features List */}
                <div className={`flex flex-col justify-between ${isRTL ? 'md:order-2' : ''}`}>
                    <ul className="space-y-3 mb-8">
                        {features.map((feature, idx) => (
                            <li key={idx} className={`flex items-start gap-3 border-b border-[rgba(0,0,0,0.2)] ${isRTL ? '' : ''}`}>
                                <span className="text-gray-900 font-bold min-w-[2.5rem] text-sm pb-2">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Learn More Button */}
                    <Link
                        href={`/${language}${link}`}
                        className={`inline-flex items-center gap-2 text-gray-900 font-medium hover:text-blue-600 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                        <span>{buttonText}</span>
                        <svg
                            className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Image */}
                <div className={`relative h-[300px] md:h-[350px] ${isRTL ? 'md:order-1' : ''}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>

            {/* Decorative Pattern at Bottom */}
            {/* <div
                className="absolute bottom-0 left-0 right-0 h-3 w-full"
                style={{
                    backgroundImage: 'repeating-linear-gradient(90deg, #3B82F6 0px, #3B82F6 10px, transparent 10px, transparent 20px)',
                    backgroundSize: '20px 100%'
                }}
            /> */}
        </Link>
    )
}
