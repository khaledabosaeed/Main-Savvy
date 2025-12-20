export type Language = "en" | "ar"

export const unrealHeroContent = {
en: {
    badge: "Boost Your Visibility",
    title: "Turn Your Facade into an Attraction… A Screen That Speaks for You.",
    description: "Transform your company into a powerful visual message with immersive content and interactive screens operating 24/7, highlighting your business at every moment.",
    statsLabel1: "Active Screens",
    statsLabel2: "Uptime",
    primaryButton: "Learn More",
    primaryButtonLink: "/contact",
    secondaryButton: "Contact Us",
    secondaryButtonLink: "/contact",
    imageAlt: "NHC Building - Innovation Center",
},

  ar: {
    badge: "عزز ظهورك",
    title: "حول واجهتك الى منصة جذب.. وشاشة تتكلم بدل عنك.",
    description: "حول شركتك إلى رسالة بصرية قوية، بمحتوى غامر وشاشات تفاعلية تعرض 24/7 تبرز عملك في كل لحظة.",
    statsLabel1: "عدد الشاشات الفعالة ",
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
