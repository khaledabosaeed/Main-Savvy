export type Language = "en" | "ar"

export const mediaContentData = {
en: {
    // Top Section
    topTitle: "Creating Unique Content! More Beautiful… Simpler…",
    topDescription: "Immersive digital content features technologies like Hyper Realistic, Anamorphic, and AR to create vivid, interactive scenes with high visual quality, enriched with AI-driven, interactive, 3D content suitable for all marketing needs.",
    
    // Bottom Section
    bottomTitle: "Indoor and Outdoor Digital Screens for Commercial Use 24/7",
    bottomDescription: "A network of indoor and outdoor screens operating 24/7 with high-brightness panels, weather-resistant, featuring remote content management and smart targeting that measures total visitors and attendance, analyzes dwell time, demographics, emotions, and impressions to increase campaign effectiveness by up to 50%.",
    
    // Stats
    activeEngagements: "Active Engagements",
    uptime: "Uptime",
    hours: "Hours",
    
    // Features
    feature1: "Dwell Time Analysis",
    feature2: "Total Visitors and Attendance",
    feature3: "Emotion and Impression Analysis",
    feature4: "Age and Gender Analysis",
    
    // Button
    button: "First of Its Kind in Saudi Arabia",
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

