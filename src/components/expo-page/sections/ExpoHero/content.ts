export type Language = "en" | "ar"

export const expoHeroContent = {
  en: {
    title: "Next-Level Robot Industry",
    subtitle: "We offer exhibitions, events, and innovative technologies to serve visitors with interactive experiences.",
  },
  ar: {
    title: "إدارة الفعاليات بمفهوم جديد",
    subtitle: "نوفر حلول تقنية مبتكرة ومختلفة تمنح طابع الحداثة والتقنية في فعاليتك وتعزز تواجد علامتك التجارية",
  },
}

export function getExpoHeroContent(lang: Language, key: keyof typeof expoHeroContent.en): string {
  const content = expoHeroContent[lang]
  return (content[key as keyof typeof content] as string) || expoHeroContent.en[key]
}
