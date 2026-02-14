export type Language = "en" | "ar"

export const promoContent = {
en: {
  title: "Savvy World.. Your gateway to the new world",
  description: "An integrated industrial advisory ecosystem combining Governed Robotics, Responsible AI, and sustainable technologies, contributing to resilient and future-ready infrastructure. We bridge advanced global technologies with the local environment through structured localization strategies, ensuring full alignment with Saudi market requirements and regulatory frameworks.",
  buttonText: "Contact Us",
  buttonLink: "/contact",
  image: "/promo/robot-hand.png"
}
,
    ar: {
        title: "ساڤي وورلد.. بوابتك للعالم الجديد ",
        description: "منظومة استشارية صناعية متكاملة تجمع بين الروبوتات المُحوكَمة والذكاء الاصطناعي المسؤول والتقنيات المستدامة تسعى للمساهمة في بنية تحتية مرنة وجاهزة للمستقبلنربط تقنيات المستقبل بالبيئة المحلية من خلال تصميم استراتيجيات توطين للتأكيد على ملاءمتها لمتطلبات السوق المحلي.",
        buttonText: "تواصل معنا",
        buttonLink: "/contact",
        image: "/promo/robot-hand.png"
    }
}

export function getPromoContent(lang: Language) {
    return promoContent[lang] || promoContent.en
}
    