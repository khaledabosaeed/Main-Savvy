export type Language = "en" | "ar"

export const innovationHeroContent = {
  en: {
    title: "AI-powered Innovations and Sustainable Solutions — Smart Robots for the Future",
    subtitle: "Where advanced AI meets sustainable innovation to transform your business with smart solutions.",
  },
  ar: {
    title: "عالم جديد من الابداع، من خلال دمج التقنية والاستدامة بالواقع",
    subtitle: "حلول عملية تربط الذكاء التقني بالاستخدام اليومي بموثوقية عالية.",
  },
}

export function getInnovationHeroContent(lang: Language, key: keyof typeof innovationHeroContent.en): string {
  const content = innovationHeroContent[lang]
  return (content[key as keyof typeof content] as string) || innovationHeroContent.en[key]
}
