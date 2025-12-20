export type Language = "en" | "ar"

export const promoContent = {
en: {
  title: "Savvy World.. Your gateway to the new world",
  description: "An integrated ecosystem that combines inspiration, exhibitions, and smart technologies to build sustainable and innovative cities. We connect artificial intelligence, digital interaction, and physical analytics to transform experiential spaces into smart and comfortable experiences.",
  buttonText: "Contact Us",
  buttonLink: "/contact",
  image: "/promo/robot-hand.png"
}
,
    ar: {
        title: "سافي وورلد.. بوابتك للعالم الجديد ",
        description: "منظومة تجمع بين الإبهار، المعارض، والتقنيات الذكية لبناء مدن مستدامة ومبتكرة. نربط بين الذكاء الاصطناعي، التفاعل الرقمي، والتحليل الجسدي لتحويل المساحات التجريبية إلى تجارب ذكية ومريحة.",
        buttonText: "تواصل معنا",
        buttonLink: "/contact",
        image: "/promo/robot-hand.png"
    }
}

export function getPromoContent(lang: Language) {
    return promoContent[lang] || promoContent.en
}
