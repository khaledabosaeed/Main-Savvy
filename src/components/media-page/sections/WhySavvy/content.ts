export type Language = "en" | "ar"

export const whySavvyContent = {
  en: {
    title: "Why Savvy Media?",
    subtitle: "Because our message is to show you what you offer in a beautiful and effective way",
    
    feature1Title: "Integrated display solutions",
    feature1Description: "Advanced analytics to understand visitor behavior and improve service delivery to products",
    
    feature2Title: "Rich content that enhances brand presence",
    feature2Description: "3D, AR, Hyper Realistic experiences showcase visual and engaging content for audiences",
    
    feature3Title: "Affordable metrics-based pricing",
    feature3Description: "Innovative experience through flexible pricing and diverse models with results",
  },
  ar: {
    title: "لماذا سافي ميديا؟",
    subtitle: "لأن رسالتك نستحق أن تُعرض بشكل جميل وفعّال",
    
    feature1Title: "حلول عرض متكاملة",
    feature1Description: "شبكة شاشات داخلية وخارجية بتجارب تفاعلية متميزة على مدار الساعة",
    
    feature2Title: "محتوى غامر يرفع حضور العلامة",
    feature2Description: "تقنيات 3D، AR، Hyper Realistic تمنحك تجربة بصرية قوية وجذابة للجمهور",
    
    feature3Title: "استهداف وقياس يعتمد على البيانات",
    feature3Description: "تحليلات دقيقة لفهم الزوار وتقاييم لتحسين اداة الحملات وتتبع النتائج",
  },
}

export const getWhySavvyText = (lang: Language, key: keyof typeof whySavvyContent.en) => {
  return whySavvyContent[lang][key]
}

