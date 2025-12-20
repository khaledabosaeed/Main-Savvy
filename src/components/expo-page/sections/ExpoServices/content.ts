export type Language = "en" | "ar"

export const expoServicesContent = {
en: {
    title: "Savvy Expo Services",

    service1Title: "Strategic Partnerships",
    service1Description: "Well-planned alliances with organizers and major brands to enhance your booth’s impact, expand visibility opportunities, drive growth, and achieve tangible results.",

    service2Title: "mr.savvy Robot",
    service2Description: "The ambassador of smart technologies at your booth, delivering educational and interactive content, attracting visitors with its presence, and showcasing your brand innovatively.",

    service3Title: "Engaging and Purposeful Activities",
    service3Description: "Immersive stations using motion, light, and smart technologies that offer visitors a unique experience, encouraging exploration and increasing the value of your booth presence.",
},

  ar: {
    title: "خدمات ساڤي إكسبو",

    service1Title: "شراكات استراتيجية",
    service1Description: "تحالفات مدروسة مع الجهات المنظمة والعلامات الكبرى، لتعزيز تأثير جناحك وفتح فرص أوسع للظهور، النمو، وتحقيق نتائج ملموسة",

    service2Title: "روبوت مستر ساڤي",
    service2Description: "سفير التقنيات الحسّنة داخل جناحك، يقدّم محتوى توعويّاً وتفاعلياً، يجذب الزوار بحضوره ويُظهر علامتك التجارية بروح مبتكرة.",

    service3Title: "نشاطات ترفيهية وهادفة",
    service3Description: "محطات غامرة تعتمد على الحركة والضوء والتقنيات الذكية، تمنح الزائر تجربة مختلفة تجذبه للاكتشاف وترفع من قيمة حضور جناحك",
  },
}

export function getExpoServicesContent(lang: Language, key: keyof typeof expoServicesContent.en): string {
  const content = expoServicesContent[lang]
  return (content[key as keyof typeof content] as string) || expoServicesContent.en[key]
}
