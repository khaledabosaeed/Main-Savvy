export type Language = "en" | "ar"

export const heroContent = {
  en: {
    welcomeText: "We introduce you to good technologies in a simple way",
    savvyWorld: ".. led by Mr. Savvy",
    description: "A comprehensive system that combines media, exhibitions, and smart technologies. Building sustainable and connected cities.",
    subDescription: "We link artificial intelligence, digital interaction, and green energy solutions to transform urban spaces into smart and profitable experiences.",
    ctaButton: "Contact Us",
    partners: "Companies that trusted us to create different experiences.. You're next",
  },
  ar: {
    welcomeText: "نعرّفك على التقنيات الحسنة بطريقة بسيطة",
    savvyWorld: ".. يقودها مستر سافي",
    description: "منظومة تجمع بين الإعلام، والمعارض، والتقنيات الذكية لبناء مدن مستدامة ومتصلة.",
    subDescription: "نربط بين الذكاء الاصطناعي، والتفاعل الرقمي، والحلول الطاقة النظيفة لتحويل المساحات الحضرية إلى تجارب ذكية ومربحة.",
    ctaButton: "تواصل معنا",
    partners: "شركاء وفقونا بصناعة تجارب مختلفة.. أنت التالي",
  },
}

export function getHeroContent(lang: Language, key: keyof typeof heroContent.en): string {
  const content = heroContent[lang]
  return (content[key as keyof typeof content] as string) || heroContent.en[key]
}
