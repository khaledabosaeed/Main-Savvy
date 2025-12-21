export type Language = "en" | "ar"

export const heroContent = {
en: {
  welcomeText: "We introduce smart technologies in a simple, guided way led by…",
  savvyWorld: "Mr.savvy",
  description: "An ecosystem that brings together media, exhibitions, and smart technologies to build sustainable, connected cities.",
  subDescription: "We connect artificial intelligence, digital interaction, and clean energy solutions to transform urban spaces into smart, seamless experiences.",
  ctaButton: "Contact Us",
  partners: "Partners who trusted us to create different experiences… you’re next",
},

  ar: {
    welcomeText: "نعرّفك على التقنيات الحسنة بطريقة بسيطة يقودها ..",
    savvyWorld: "  مستر ساڤي",
    description: "منظومة تجمع بين الإعلام، والمعارض، والتقنيات الذكية لبناء مدن مستدامة ومتصلة.",
    subDescription: "نربط بين الذكاء الاصطناعي، والتفاعل الرقمي، وحلول الطاقة النظيفة لتحويل المساحات الحضرية إلى تجارب ذكية ومريحة.",
    ctaButton: "تواصل معنا",
    partners: "شركاء وفقونا بصناعة تجارب مختلفة.. أنت التالي",
  },
}

export function getHeroContent(lang: Language, key: keyof typeof heroContent.en): string {
  const content = heroContent[lang]
  return (content[key as keyof typeof content] as string) || heroContent.en[key]
}
