export type Language = "en" | "ar"

export const expoServicesContent = {
  en: {
    title: "What Services Do We Offer?",

    service1Title: "Specialized Screens",
    service1Description: "Custom interactive displays designed to engage visitors and showcase your innovations effectively.",

    service2Title: "Savvy Robot Assistant",
    service2Description: "Savvy Innovation provides sustainable energy services and smart car charging solutions for electric vehicles and advanced companies.",

    service3Title: "Interactive Corners",
    service3Description: "We add innovative activities and interactive corners within events and exhibitions, creating a beautiful atmosphere that attracts and delights visitors.",
  },
  ar: {
    title: "خدمات سافي إكسبو",

    service1Title: "شراكات استراتيجية",
    service1Description: "تحالفات مدروسة مع الجهات المنظمة والعلامات الكبرى، لتعزيز تأثير جناحك وفتح فرص أوسع للظهور، النمو، وتحقيق نتائج ملموسة",

    service2Title: "روبوت مستر سافي",
    service2Description: "سفير التقنيات الحسّنة داخل جناحك، يقدّم محتوى توعويّاً وتفاعلياً، يجذب الزوار بحضوره ويُظهر علامتك التجارية بروح مبتكرة.",

    service3Title: "نشاطات ترفيهية وهادفة",
    service3Description: "محطات غامرة تعتمد على الحركة والضوء والتقنيات الذكية، تمنح الزائر تجربة مختلفة تجذبه للاكتشاف وترفع من قيمة حضور جناحك",
  },
}

export function getExpoServicesContent(lang: Language, key: keyof typeof expoServicesContent.en): string {
  const content = expoServicesContent[lang]
  return (content[key as keyof typeof content] as string) || expoServicesContent.en[key]
}
