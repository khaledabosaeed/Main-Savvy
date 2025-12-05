export type Language = "en" | "ar"

export const mediaContentData = {
  en: {
    // Top Section
    topTitle: "Different content creation! Beautiful .. Simple ..",
    topDescription: "We design, record, and edit professional content like Hyper Realistic films. With diverse and high-quality filmmaking, covering all production needs: documentaries, educational, advertising, etc., and in all languages suitable for audio-visual production.",
    
    // Bottom Section
    bottomTitle: "Indoor and outdoor digital screens for commercial use 24/7",
    bottomDescription: "Interactive smart display network operating 24/7 with high-resolution, scalable displays. To provide an unprecedented interactive display experience, reaching thousands of visitors, customers, and occupants. Ideal display solution for commercial complexes, waiting areas, entertainment venues, and media communication reaches up to 250 users.",
    
    // Stats
    projectsDelivered: "Projects Delivered",
    occupancyRate: "Occupancy Rate",
    hours: "Hours",
    
    // Features
    feature1: "Customer data analysis",
    feature2: "Content analysis and trends",
    feature3: "Data and statistics analysis",
    feature4: "Arabic and English display",
    
    // Button
    button: "Contact us to showcase your content",
  },
  ar: {
    // Top Section
    topTitle: "صناعة محتوى مختلف! أجمل .. أبسط ..",
    topDescription: "نقوم بالتصميم، التصوير، والمونتاج للقطع مثل الـ Hyper Realistic بأفكارك يطلع لك PR إلى يخلي ممكن، نصنع محتوى زاوية وفاعلية زاوية موسعة، مع محتوى زاوية أفكار متنوعة. تفاعلي، إعلاني، الأفكار.. عن المعلومات يناسب جميع الاحتياجات السمعيّة البصريّة",
    
    // Bottom Section
    bottomTitle: "شاشات رقمية داخلية وخارجية للاستخدام التجاري على مدار 24/7",
    bottomDescription: "شبكة شاشات ذكية بتقنية وعالية الدقة 24/7 بلوحات عالية السطوع، مقاومة للظروف، من قبل التضمين عن طريق الذكاء الاصطناعي الذي يُمهد إيصال الإعلانات. تصل عدد الزوار والجالسين، وتصل مدة الذاعة السرعية المستهدفة والامتاع والاطلاعات لزبارة شرائع الحملة الدورية يونية بنسبة تصل إلى 250",
    
    // Stats
    projectsDelivered: "عدد المشاريع المسلمة",
    occupancyRate: "نسبة الإشغال",
    hours: "ساعات",
    
    // Features
    feature1: "تحليل بيانات الزوار",
    feature2: "إحصاء الزوار والحضور",
    feature3: "تحليل البيانات والإحصائيات",
    feature4: "عرض اللغة العربية والإنجليزية",
    
    // Button
    button: "إطلع من نوافذنا الى العمومية",
  },
}

export const getMediaContentText = (lang: Language, key: keyof typeof mediaContentData.en) => {
  return mediaContentData[lang][key]
}

