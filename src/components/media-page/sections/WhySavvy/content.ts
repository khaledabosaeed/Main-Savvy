export type Language = "en" | "ar"

export const whySavvyContent = {
en: {
    title: "Why Savvy Media?",
    subtitle: "Because your message deserves to be showcased beautifully and effectively",
    
    feature1Title: "Comprehensive Display Solutions",
    feature1Description: "A network of indoor and outdoor screens built to commercial standards, operating around the clock",
    
    feature2Title: "Immersive Content Elevating Brand Presence",
    feature2Description: "Hyper Realistic, AR, and 3D technologies provide a powerful and engaging visual experience for your audience",
    
    feature3Title: "Data-Driven Targeting and Measurement",
    feature3Description: "Accurate analytics of visitor movements and interactions to optimize campaign performance and boost results",
},

  ar: {
    title: "لماذا سافي ميديا؟",
    subtitle: "لأن رسالتك نستحق أن تُعرض بشكل جميل وفعّال",
    
    feature1Title: "حلول عرض متكاملة",
    feature1Description: "شبكة شاشات داخلية وخارجية بمعايير تجارية تعمل على مدار الساعة",
    
    feature2Title: "محتوى غامر يرفع حضور العلامة",
    feature2Description: "تقنيات Hyper Realistic وAR و3D تمنحك تجربة بصرية قوية وجاذبة للجمهور",
    
    feature3Title: "استهداف وقياس يعتمد على البيانات",
    feature3Description: "تحليلات دقيقة لحركة الزوار وتفاعلهم لتحسين أداء الحملات ورفع النتائج",
  },
}

export const getWhySavvyText = (lang: Language, key: keyof typeof whySavvyContent.en) => {
  return whySavvyContent[lang][key]
}

