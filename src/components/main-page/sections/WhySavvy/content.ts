export type Language = "en" | "ar"

export const whySavvyContent = {
  en: {
    title: "Why Savvy?",
    subtitle: "A unified innovation ecosystem that provides smarter solutions, faster results, and higher value.",

    // Feature 1
    feature1Title: "Saudi + Regional Focus",
    feature1Description: "Designed for GCC markets with a first-of-its-kind Arabic user experience, cultural fluency, and local compliance - based on real on-site experience.",

    // Feature 2
    feature2Title: "Zero Capital Expenditure Financing (BOOT)",
    feature2Description: "Build - Own - Operate - Transfer: We finance, design, install, and operate the system. Customers pay from savings, then ownership is transferred over a specified period.",

    // Feature 3
    feature3Title: "Solutions Aligned with Vision 2030",
    feature3Description: "Solutions that enhance national priorities: sustainability, digital transformation, and the path to 2060.",

    // Feature 4
    feature4Title: "Measurable Impact",
    feature4Description: "Documented results through exhibitions - high turnout, increased sales, and wide reach - tracked using clear key performance indicators to prove return on investment.",

    // Feature 5
    feature5Title: "Comprehensive Execution",
    feature5Description: "A single team for strategy, content, media interfaces, exhibitions, and operations - seamless delivery from idea to live activation.",

    // Feature 6
    feature6Title: "Technology-Driven Experiences",
    feature6Description: "AI and automation that power smart home demonstrations, EV charging, interactive media, and performance analytics.",
  },
  ar: {
    title: "لماذا سافي؟",
    subtitle: "نظام بيئي موحد للابتكار يقدم حلولا أكثر ذكاء ونتائج أسرع وقيمة أعلى.",

    // Feature 1
    feature1Title: "التركيز السعودي + الإقليمي",
    feature1Description: "تم تصميمه لأسواق دول مجلس التعاون الخليجي مع تجربة المستخدم العربية الأولى ، والطلاقة الثقافية ، والامتثال المحلي - ترتكز على تجربة حقيقية في الموقع.",

    // Feature 2
    feature2Title: "تمويل النفقات الرأسمالية الصفرية (BOOT)",
    feature2Description: "البناء - التملك - التشغيل - النقل: نقوم بتمويل النظام وتصميمه وتثبيته وتشغيله. يدفع العملاء من المدخرات ، ثم يتم نقل الملكية على المدى المحدد.",

    // Feature 3
    feature3Title: "حلول توافق مع رؤية 2030",
    feature3Description: "الحلول التي تعزز الأولويات الوطنية: الاستدامة والتحول الرقمي والطريق إلى 2060.",

    // Feature 4
    feature4Title: "تأثير قابل للقياس",
    feature4Description: "النتائج الموثقة عبر المعارض - الإقبال المرتفع وزيادة المبيعات والوصول على نطاق واسع - التي يتم تتبعها باستخدام مؤشرات أداء رئيسية واضحة لإثبات عائد الاستثمار.",

    // Feature 5
    feature5Title: "التنفيذ الشامل",
    feature5Description: "فريق واحد للاستراتيجية والمحتوى وواجهات الوسائط والمعارض والعمليات - تسليم سلس من الفكرة إلى التنشيط المباشر.",

    // Feature 6
    feature6Title: "تجارب مدفوعة بالتكنولوجيا",
    feature6Description: "الذكاء الاصطناعي والأتمتة التي تعمل على تشغيل العروض التوضيحية للمنزل الذكي وشحن المركبات الكهربائية والوسائط التفاعلية وتحليلات الأداء",
  },
}

export function getWhySavvyContent(lang: Language, key: keyof typeof whySavvyContent.en): string {
  const content = whySavvyContent[lang]
  return (content[key as keyof typeof content] as string) || whySavvyContent.en[key]
}
