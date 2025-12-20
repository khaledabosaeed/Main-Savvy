export type Language = "en" | "ar"

export const innovationServicesContent = {
en: {
    title: "What Services Do We Offer?",
    service1Title: "Sustainable Technology Solutions",
    service1Description: "Innovative, eco-friendly tech solutions that enhance sustainability and environmental responsibility.",
    
    service2Title: "Humanoid-Like Robotics (Hajer Robota)",
    service2Description: "Advanced humanoid robots designed to enhance automation and human-robot interaction.",
    
    service3Title: "Electric Vehicle Solutions",
    service3Description: "Comprehensive EV technologies and charging infrastructure for sustainable transportation.",
    
    service4Title: "Smart AI Systems",
    service4Description: "Advanced AI systems that optimize operations and enhance decision-making capabilities.",
    
    service5Title: "Collaboration with the Saudi Green Technology Forum",
    service5Description: "Strategic partnerships that drive innovation in green technology and sustainable development initiatives.",
},

  ar: {
    title: "ما الخدمات التي نقدمها؟",
    service1Title: "عروض التكنولوجيا المستدامة",
    service1Description: "حلول تقنية مبتكرة وصديقة للبيئة تعزز الاستدامة والمسؤولية البيئية.",
    service2Title: "الأنواع شبيهة بتقنيات عصرية (حجر روبوتا)",
    service2Description: "روبوتات شبيهة بالبشر متطورة مصممة لتعزيز الأتمتة والتفاعل بين الإنسان والروبوت.",
    service3Title: "حلول السيارات الكهربائية",
    service3Description: "تقنيات شاملة للمركبات الكهربائية وبنية تحتية للشحن من أجل النقل المستدام.",
    service4Title: "أنظمة الذكاء الذكية",
    service4Description: "أنظمة ذكاء اصطناعي متطورة تعمل على تحسين العمليات وتعزيز قدرات اتخاذ القرار.",
    service5Title: "التعاون مع المنتدى السعودي للعمل الأخضرللتكنولوجيا",
    service5Description: "شراكات استراتيجية تعزز الابتكار في التكنولوجيا الخضراء ومبادرات التنمية المستدامة.",
  },
}

export function getInnovationServicesContent(lang: Language, key: keyof typeof innovationServicesContent.en): string {
  const content = innovationServicesContent[lang]
  return (content[key as keyof typeof content] as string) || innovationServicesContent.en[key]
}
