export type Language = "en" | "ar"

export const unrealHeroContent = {
  en: {
    badge: "NHC Project",
    title: "Discover the future of innovation with us",
    description: "Visit us to explore a comprehensive platform that combines innovation, exhibitions, and digital experiences. We transform your ideas into tangible reality through advanced technical solutions and creative content that tells your story in a unique way.",
    statsLabel1: "Projects completed",
    statsLabel2: "Client satisfaction",
    primaryButton: "Explore More",
    primaryButtonLink: "/contact",
    secondaryButton: "Contact Us",
    secondaryButtonLink: "/contact",
    imageAlt: "NHC Building - Innovation Center",
  },
  ar: {
    badge: "مشروع NHC",
    title: "حول واجهتك الى منصة جذب.. وشاشة تتكلم بدل عنك.",
    description: "حول شركتك إلى رسالة بصرية قوية، بمحتوى غامر وشاشات تفاعلية تعرض 24/7 تزيز عملك في كل لحظة.",
    statsLabel1: "عدد الشاشات المعلقة",
    statsLabel2: "نسبة التشغيل",
    primaryButton: "تعلم المزيد",
    primaryButtonLink: "/contact",
    secondaryButton: "تواصل معنا",
    secondaryButtonLink: "/contact",
    imageAlt: "مبنى NHC - مركز الابتكار",
  },
}

export function getUnrealHeroContent(lang: Language) {
  return unrealHeroContent[lang] || unrealHeroContent.en
}
