export type Language = "en" | "ar"

export const heroContent = {
  en: {
    welcomeText: "Welcome to",
    savvyWorld: "Savvy World",
    description: "A company that brings together media, exhibitions, and smart techniques for building sustainable and future-oriented.",
    subDescription: "We link artificial intelligence, digital interaction, and the appropriate solutions to transform exclusive spaces into smart and future-oriented experiences.",
    ctaButton: "Learn More",
    partners: "Our Trusted Partners",
  },
  ar: {
    welcomeText: "مرحباً بكم في",
    savvyWorld: "عالم سافي",
    description: "شركة تجمع بين الإعلام، والمعارض، والتقنيات الذكية لبناء مدن مستدامة ومتصلة",
    subDescription: "نربط بين الذكاء الاصطناعي، والتفاعل الرقمي، والحلول الطاقة النظيفة لتحويل المساحات الحضرية إلى تجارب ذكية ومربحة.",
    ctaButton: "تعلم المزيد",
    partners: "شركاؤنا الموثوقون",
  },
}

export function getHeroContent(lang: Language, key: keyof typeof heroContent.en): string {
  const content = heroContent[lang]
  return (content[key as keyof typeof content] as string) || heroContent.en[key]
}
