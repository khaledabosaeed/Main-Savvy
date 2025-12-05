"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { getSavvySectionsContent } from "./content"
import SavvySectionCard from "./SavvySectionCard"

export default function SavvySections() {
    const { language } = useLanguage()
    const isRTL = language === "ar"
    const content = getSavvySectionsContent(language)

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Title - Aligned to right for RTL, left for LTR */}
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-16 ${isRTL ? 'text-right rtl' : 'text-left ltr'}`}>
                    {content.sectionTitle}
                </h2>

                {/* Cards Grid */}
                <div className="space-y-8">
                    {content.cards.map((card, index) => (
                        <SavvySectionCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            features={card.features}
                            icon={card.icon}
                            image={card.image}
                            link={card.link}
                            buttonText={card.buttonText}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
