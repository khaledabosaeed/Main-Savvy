export type Language = "en" | "ar"

export const mediaContentData = {
  en: {
    // Top Section
    topTitle: "Different content creation! Beautiful .. Simple ..",
    topDescription: "We design, record, and edit professional content like Hyper Realistic films. With diverse and high-quality filmmaking, covering all production needs: documentaries, educational, advertising, etc., and in all languages suitable for audio-visual production.",
    
    // Bottom Section
    bottomTitle: "Indoor and outdoor digital screens for commercial use 24/7",
    bottomDescription: "An interactive network of indoor and outdoor smart displays operating 24/7 with high-resolution panels, weather-resistant. Managed by artificial intelligence that targets content, audience satisfaction, and attendance, along with targeted demographics. Visitor traffic, and impressions to enhance the effectiveness of ongoing promotional campaigns with a reach of up to 250.",
    
    // Stats
    activeEngagements: "Active Engagements",
    uptime: "Uptime",
    hours: "Hours",
    
    // Features
    feature1: "Duration analysis",
    feature2: "Total visitors and attendance",
    feature3: "Sentiment and impression analysis",
    feature4: "Age and gender analysis",
    
    // Button
    button: "First of its kind in Saudi Arabia",
  },
  ar: {
    // Top Section
    topTitle: "صناعة محتوى مختلف! أجمل .. أبسط ..",
    topDescription: "يقدّم المحتوى الرقمي الغامر تقنيات مثل الـ Hyper Realistic والأنامورفيك والـ AR التي تخلق مشاهد حيّة وتفاعلية بجودة بصرية عالية، مع محتوى ذكاء اصطناعي، تفاعلي، ثلاثي الأبعاد، غني بالمعلومات يناسب جميع الاحتياجات التسويقية",
    
    // Bottom Section
    bottomTitle: "شاشات رقمية داخلية وخارجية للاستخدام التجاري على مدار 24/7",
    bottomDescription: "شبكة شاشات داخلية وخارجية تعمل 24/7 بلوحات عالية السطوع، مقاومة للطقس، مع إدارة المحتوى عن بُعد وخاصية الاستهداف الذكي التي تقيس إجمالي عدد الزوار والحضور، وتحلّل مدة التواجد، والفئة العمرية، والمشاعر والانطباعات لزيادة فعالية الحملة الترويجية بنسبة تصل إلى 50٪",
    
    // Stats
    activeEngagements: "عدد التفاعلات الفعالة",
    uptime: "نسبة التشغيل",
    hours: "ساعات",
    
    // Features
    feature1: "تحليل مدة التواجد",
    feature2: "إجمالي عدد الزوار والحضور",
    feature3: "تحليل المشاعر والانطباعات",
    feature4: "تحليل الفئة العمرية والجنس",
    
    // Button
    button: "الأولى من نوعها في السعودية",
  },
}

export const getMediaContentText = (lang: Language, key: keyof typeof mediaContentData.en) => {
  return mediaContentData[lang][key]
}

