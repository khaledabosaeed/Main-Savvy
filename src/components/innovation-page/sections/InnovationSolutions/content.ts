export type Language = "en" | "ar"

export const innovationSolutionsContent = {
  en: {
    title: "Savvy Innovation Solutions",
    subtitle: "Smart solutions that serve you today.. and develop with you tomorrow",
    
    solution1Title: "Smart Targeting",
    solution1Description: "We provide a comprehensive analysis that combines demographic data of visitors with smart goal-setting and needs analysis. We showcase data in a suitable time display that matches your project.",
    
    solution2Title: "Green Energy",
    solution2Description: "Solutions for capturing green energy from the sun and wind with modern heat-resistant monitors. Showcasing smart and sustainable screens that fit the audience and achieve Saudi Vision 2030 goals organically.",
    
    solution3Title: "Advisor Savvy",
    solution3Description: "Savvy advisor that knows the audience with AI technology and analyzes psychological influences. Present solutions and options suitable for visitor needs with smart service scheduling and approvals.",
    
    solution4Title: "Smart Homes",
    solution4Description: "An integrated platform for managing communities, properties, apartments. Linking residents with real-time management. Presenting facilities, managing payments and requests. A single interactive platform for modern property management and security.",
  },
  ar: {
    title: "حلول سافي إبتكار",
    subtitle: "حلول ذكية تُستخدم اليوم.. وتتطوّرك لبكرة",
    
    solution1Title: "استهداف ذكي",
    solution1Description: "نوفر لك بنية متكاملة تجمع بين الاستهداف الذكي ومعرفة المحتوى بمحرك الذكاء الذي يفهم إيصال الإستحواذات من الأرواح والأفواج مما بناسب المشاريع التجارية",
    
    solution2Title: "الطاقة الخضراء",
    solution2Description: "حلول لاقتناص الطاقة الخضراء من الشمس والأفواج بتقنيات المراني المستدامة تقلل اسلوب الكهواء، وتوفر عالية الترتيب، في اتجاه الإشغال، وتشكل مدة الظرفية الطمسهم والمستمر بالإستقاعات لزيارة شعائط الحملة الدوريّة لمستدامات رؤية 2030 الوطنية",
    
    solution3Title: "مستشار سافي",
    solution3Description: "مستشار سافي وروبوت يعرف الجمهور بالتقنيات المستدامة وتقليل الكهرون. يعرض الحلول بأسلوب بسيط، ويمنح علامة خدمات ممكنة لزوار مع توقعة الاستدامة",
    
    solution4Title: "منازل ذكية",
    solution4Description: "منصة متكاملة لإدارة المجتمعات والممتلكات، ربط السكان والإدارة ونقط المرافق، ونضط المدفوعات وطلبات الخدمة وجميع المرافق من منصة تفاعلية واحدة بسهولة وأمان",
  },
}

export const getInnovationSolutionsText = (lang: Language, key: keyof typeof innovationSolutionsContent.en) => {
  return innovationSolutionsContent[lang][key]
}

