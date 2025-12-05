export type Language = "en" | "ar"

export const expoServicesContent = {
  en: {
    title: "What Services Do We Offer?",

    service1Title: "Specialized Screens",
    service1Description: "Custom interactive displays designed to engage visitors and showcase your innovations effectively.",

    service2Title: "Savvy Robot Assistant",
    service2Description: "Savvy Innovation provides sustainable energy services and smart car charging solutions for electric vehicles and advanced companies.",
    service2Button: "Learn More",
  },
  ar: {
    title: "خدمات Savvy Expo",

    service1Title: "شاشات إعلانية : نوفر شاشات إعلانية مبتكرة وحديثة وبأحجام تصل الى 600 م2 لتعزيز علامتكم التجارية  وبناء ثقافة مميزة في فعاليات",
    service1Description: "شاشات تفاعلية مخصصة مصممة لجذب الزوار وعرض ابتكاراتك بفعالية.",

    service2Title: "نوفر روبوتات تفاعلية ذكية وحديثة للمشاركة في الفعاليات مما يعزز تواجدكم ويصنع اجواء تقنية جميلة",
    service2Description: "توفر Savvy Innovation خدمات الطاقة المستدامة وحلول شحن السيارات الكهربائية وحلول الذكاء الاصطناعي المتقدمة للشركات.",
    service2Button: "تعلم المزيد",

    service3Title: "أضافة زوايا تفاعلية: نثوم بإضافاة الأنشطة والزواية التفاعلية المبتكرة داخل الفعاليات والمعارض مما يصنع اجواء جميلة تجذب الزوار وتنال اعجابهم",
    service3Description: "توفر Savvy Innovation خدمات الطاقة المستدامة وحلول شحن السيارات الكهربائية وحلول الذكاء الاصطناعي المتقدمة للشركات.",
    service3Button: "تعلم المزيد",
  },
}

export function getExpoServicesContent(lang: Language, key: keyof typeof expoServicesContent.en): string {
  const content = expoServicesContent[lang]
  return (content[key as keyof typeof content] as string) || expoServicesContent.en[key]
}
