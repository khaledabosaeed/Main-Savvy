export type Language = "en" | "ar"

export const innovationSolutionsContent = {
en: {
    title: "Savvy Innovation Solutions",
    subtitle: "Localizing innovation, powering Saudi growth",
    
    solution1Title: "Industrial Robots",
    solution1Description: "Advanced robotic solutions for firefighting, industrial inspection, and security guarding, engineered with controlled, governed, and secure operational frameworks to ensure safety, regulatory compliance, data integrity, and reliable performance in mission-critical environments.",
    
    solution2Title: "Green Energy",
    solution2Description: "Integrated green energy solutions, from solar systems and sustainable buildings to nature-friendly cement technologies, reduce power consumption, improve operational efficiency, generate long-term returns, and accelerate zero-emission and carbon-reduction pathways aligned with Vision 2030.",
    
    solution3Title: "Mr.savvy",
    solution3Description: "SAVVY develops governed, purpose-driven robotics for industrial impact and sustainability. Mr. Savvy, our humanoid ambassador, represents responsible Artificial Intelligence, governed & ethical automation, and green technologies.",
    
    solution4Title: "Smart Homes",
    solution4Description: "Powered by advanced energy-saving algorithms, this integrated smart community platform optimizes efficiency, connects residents, visitors, and facility teams, streamlines payments and services, and enables secure smart home automation with seamless digital key management.",
},

  ar: {
    title: "حلول ساڤي إبتكار",
    subtitle: "توطين الابتكار، وتمكين نمو المملكة",
    
    solution1Title: "الروبوتات الصناعية",
    solution1Description: "حلول روبوتية متقدمة للإطفاء، والفحص الصناعي، والحراسة الأمنية، مُصممة ضمن أطر تشغيل مُتحكَّم بها ومُحوكَمة وآمنة لضمان السلامة، والامتثال التنظيمي، وسلامة البيانات، وأداء موثوق في البيئات ذات المهام الحرجة.",
    
    solution2Title: "الطاقة الخضراء",
    solution2Description: "لول الطاقة الخضراء المتكاملة، من أنظمة الطاقة الشمسية والمباني المستدامة إلى تقنيات الإسمنت الصديق للبيئة، تسهم في خفض استهلاك الطاقة، وتحسين الكفاءة التشغيلية، وتحقيق عوائد طويلة الأمد، وتسريع مسارات الحياد الصفري وخفض الانبعاثات بما يتماشى مع رؤية 2030.",
    
    solution3Title: "مستر ساڤي",
    solution3Description: "تطوّر ساڤي روبوتات مُحوكَمة وموجّهة بالأهداف لتحقيق أثر صناعي مستدام. ويُمثّل مستر ساڤي، السفير الروبوتي البشري للمنصة، نموذجًا للذكاء الاصطناعي المسؤول، والأتمتة المُحوكَمة والأخلاقية، والتقنيات الخضراء.",
    
    solution4Title: "المنازل الذكية",
    solution4Description: "مدعومة بخوارزميات متقدمة لتوفير الطاقة، تعمل هذه المنصة المتكاملة على تحسين الكفاءة التشغيلية للمجتمعات، وربط السكان والزوار وفرق إدارة المرافق، وتبسيط عمليات الدفع والخدمات، وتمكين أتمتة المنازل الذكية مع إدارة مفاتيح رقمية آمنة وسلسة.",
  },
}

export const getInnovationSolutionsText = (lang: Language, key: keyof typeof innovationSolutionsContent.en) => {
  return innovationSolutionsContent[lang][key]
}



