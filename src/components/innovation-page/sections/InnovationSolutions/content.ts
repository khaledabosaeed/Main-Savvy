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
    solution1Description: "نوفّر لك منظومة متكاملة تجمع بين الاستهداف الذكي ومراقبة المحتوى وعرض ما يناسب المتلقي في الوقت المناسب، لضمان وصول رسالتك بأعلى تأثير ودقة ممكنة",
    
    solution2Title: "الطاقة الخضراء",
    solution2Description: "حلول الطاقة الخضراء من الألواح الشمسية والمباني المستدامة تقلل استهلاك الكهرباء، وتولد عائداً ثابتاً، وتدعم كفاءة الطاقة، وتسهم في تحقيق مستهدفات رؤية 2030 الوطنية",
    
    solution3Title: "مستر سافي",
    solution3Description: "مستر سافي روبوت مؤثر يعرّف الجمهور بالتقنيات المستدامة وتقليل الكربون، يعرض الحلول بأسلوب بسيط، ويمنح علامتك حضوراً مبتكراً يدعم توجّه الاستدامة",
    
    solution4Title: "منازل ذكية",
    solution4Description: "منصة متكاملة لإدارة المجتمعات والممتلكات، تربط السكان والزوار وفِرق المرافق، وتُبسّط المدفوعات وطلبات الخدمة وحجز المرافق، مع تكامل المنزل الذكي والمفتاح الرقمي بسهولة وأمان",
  },
}

export const getInnovationSolutionsText = (lang: Language, key: keyof typeof innovationSolutionsContent.en) => {
  return innovationSolutionsContent[lang][key]
}



