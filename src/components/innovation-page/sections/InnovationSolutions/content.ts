export type Language = "en" | "ar"

export const innovationSolutionsContent = {
en: {
    title: "Savvy Innovation Solutions",
    subtitle: "Smart solutions for today… evolving for tomorrow",
    
    solution1Title: "Smart Targeting",
    solution1Description: "We provide a comprehensive system combining smart targeting, content monitoring, and delivering the right content to the right audience at the right time, ensuring maximum impact and accuracy.",
    
    solution2Title: "Green Energy",
    solution2Description: "Green energy solutions from solar panels and sustainable buildings reduce electricity consumption, generate steady returns, support energy efficiency, and contribute to achieving the national Vision 2030 goals.",
    
    solution3Title: "Mr.savvy",
    solution3Description: "mr.savvy is an engaging robot that educates audiences about sustainable technologies and carbon reduction, presenting solutions in a simple way and giving your brand an innovative presence that supports sustainability.",
    
    solution4Title: "Smart Homes",
    solution4Description: "An integrated platform for managing communities and properties, connecting residents, visitors, and facility teams, simplifying payments, service requests, and facility bookings, with seamless and secure smart home and digital key integration.",
},

  ar: {
    title: "حلول ساڤي إبتكار",
    subtitle: "حلول ذكية تُستخدم اليوم.. وتتطوّرك لبكرة",
    
    solution1Title: "استهداف ذكي",
    solution1Description: "نوفّر لك منظومة متكاملة تجمع بين الاستهداف الذكي ومراقبة المحتوى وعرض ما يناسب المتلقي في الوقت المناسب، لضمان وصول رسالتك بأعلى تأثير ودقة ممكنة",
    
    solution2Title: "الطاقة الخضراء",
    solution2Description: "حلول الطاقة الخضراء من الألواح الشمسية والمباني المستدامة تقلل استهلاك الكهرباء، وتولد عائداً ثابتاً، وتدعم كفاءة الطاقة، وتسهم في تحقيق مستهدفات رؤية 2030 الوطنية",
    
    solution3Title: "مستر ساڤي",
    solution3Description: "مستر ساڤي روبوت مؤثر يعرّف الجمهور بالتقنيات المستدامة وتقليل الكربون، يعرض الحلول بأسلوب بسيط، ويمنح علامتك حضوراً مبتكراً يدعم توجّه الاستدامة",
    
    solution4Title: "منازل ذكية",
    solution4Description: "منصة متكاملة لإدارة المجتمعات والممتلكات، تربط السكان والزوار وفِرق المرافق، وتُبسّط المدفوعات وطلبات الخدمة وحجز المرافق، مع تكامل المنزل الذكي والمفتاح الرقمي بسهولة وأمان",
  },
}

export const getInnovationSolutionsText = (lang: Language, key: keyof typeof innovationSolutionsContent.en) => {
  return innovationSolutionsContent[lang][key]
}



