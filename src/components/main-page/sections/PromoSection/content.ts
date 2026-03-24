export type Language = "en" | "ar"

export const promoContent = {
en: {
  title: "Savvy World.. Your gateway to the new world",
  description: "An integrated industrial consultancy system that combines governed robotics, responsible artificial intelligence, and sustainable technologies. We strive to contribute to building a resilient, future-ready infrastructure. We connect emerging technologies with the local environment by designing comprehensive localization strategies to ensure alignment with local market needs.",
  buttonText: "Contact Us",
  buttonLink: "/contact",
  image: "/promo/robot-hand.png"
},
ar:{
     title: "ساڤي وورلد.. بوابتك للعالم الجديد ",
     description: "منظومة استشارية صناعية متكاملة تجمع بين الروبوتات المُحوكمة والذكاء الاصطناعي المسؤول والتقنيات المستدامة .. نسعى للمساهمة في بناء بنية تحتية مرنة وجاهزة للمستقبل .. نربط تقنيات المستقبل بالبيئة المحلية .. وذلك من خلال تصميم استراتيجيات توطين شاملة .. للتأكد من ملاءمتها لمتطلبات السوق المحلي.",
     buttonText: "تواصل معنا",
     buttonLink: "/contact",
     image: "/promo/robot-hand.png"
    }
}

export function getPromoContent(lang: Language) {
    return promoContent[lang] || promoContent.en
}
    