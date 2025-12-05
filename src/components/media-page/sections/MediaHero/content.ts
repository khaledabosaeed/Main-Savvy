export type Language = "en" | "ar"

export const mediaHeroContent = {
  en: {
    title: "Stronger Brand Presence Everywhere",
    button: "Learn More",
  },
  ar: {
    title: "علامتك التجارية بشكل جديد ومبتكر",
    button: "تعلم المزيد",
  },
}

export function getMediaHeroContent(lang: Language, key: keyof typeof mediaHeroContent.en): string {
  const content = mediaHeroContent[lang]
  return (content[key as keyof typeof content] as string) || mediaHeroContent.en[key]
}
