export type Language = "en" | "ar"

export const innovationServicesContent = {
  en: {
    title: "What Services Do We Offer?",
    service1Title: "Sustainable Technology Offers",
    service2Title: "Advanced robotic technologies (humanoid robots)",
    service3Title: "Electric Vehicle Solutions",
    service4Title: "Smart AI Systems",
    service5Title: "Cooperation with the Saudi Innovation Forum for Green Technology",
  },
  ar: {
    title: "ما الخدمات التي نقدمها؟",
    service1Title: "عروض التكنولوجيا المستدامة",
    service2Title: "الأنواع شبيهة بتقنيات عصرية (حجر روبوتا)",
    service3Title: "حلول السيارات الكهربائية",
    service4Title: "أنظمة الذكاء الذكية",
    service5Title: "التعاون مع المنتدى السعودي للعمل الأخضرللتكنولوجيا",
  },
}

export function getInnovationServicesContent(lang: Language, key: keyof typeof innovationServicesContent.en): string {
  const content = innovationServicesContent[lang]
  return (content[key as keyof typeof content] as string) || innovationServicesContent.en[key]
}
