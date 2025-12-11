export type Language = "en" | "ar"

export const promoContent = {
    en: {
        title: "Savvy World.. Your gateway to the new world of Expo, Media and Innovation",
        description: "A comprehensive platform that combines innovation, exhibitions, and digital experiences. We transform your ideas into tangible reality through advanced technical solutions and creative content that tells your story in a unique way.",
        buttonText: "Contact Us",
        buttonLink: "/contact",
        image: "/promo/robot-hand.png"
    },
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
