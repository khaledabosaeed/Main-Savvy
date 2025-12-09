export type Language = "en" | "ar"

export const faqContent = {
  en: {
    title: "Frequently Asked Questions",
    
    question1: "What is Savvy Media?",
    answer1: "Savvy Media is a leading provider of innovative media and exhibition solutions. We specialize in creating engaging experiences through cutting-edge technology and creative content.",
    
    question2: "Who is Savvy for?",
    answer2: "Savvy is for businesses, exhibitions, events, and organizations looking to enhance their presence through innovative digital solutions and interactive experiences.",
    
    question3: "What is Savvy Innovate?",
    answer3: "Savvy Innovate focuses on AI-powered solutions, smart technologies, and sustainable innovations. We bring together advanced tech with practical applications for modern businesses.",
    
    question4: "Do you provide Green Energy solutions?",
    answer4: "Yes, we offer comprehensive green energy solutions including solar-powered displays, sustainable technologies, and eco-friendly innovations aligned with Saudi Vision 2030.",
    
    question5: "What is Savvy Media?",
    answer5: "Savvy Media provides comprehensive media production, digital content creation, and interactive display solutions for businesses looking to enhance their brand presence.",
    
    question6: "What are Savvy services?",
    answer6: "Savvy services include exhibition design, media production, smart displays, interactive technologies, AI solutions, green energy systems, and comprehensive digital transformation services.",
  },
  ar: {
    title: "الأسئلة الشائعة",
    
    question1: "ما هو ساڤي وورلد؟",
    answer1: "ساڤي وورلد منظومة تجمع الإعلام، المعارض، والابتكار لتقديم حلول رقمية وتفاعلية ومستدامة تُحوّل المساحات إلى تجارب ذكية عالية التأثير.",
    
    question2: "ماذا تقدم ساڤي ميديا؟",
    answer2: "توفر شاشات عرض رقمية داخلية وخارجية تعمل 24/7، إضافة إلى محتوى غامر متطور بتقنيات 3D وAR، مع خصائص استهداف ذكي وقياس دقيق للتفاعل.",
    
    question3: "من هو مستر ساڤي؟",
    answer3: "ساڤي إكسبو تختص بتحويل المعارض والأجنحة إلى تجارب حية وابتكارية تشمل النشاطات التفاعلية، المحتوى المرئي، التركيبات الفنية، والروبوت مستر ساڤي.",
    
    question4: "ما دور ساڤي إكسبو؟",
    answer4: "نعم، نوفر حلول شاملة للطاقة الخضراء بما في ذلك الشاشات التي تعمل بالطاقة الشمسية والتقنيات المستدامة والابتكارات الصديقة للبيئة بما يتماشى مع رؤية السعودية 2030.",
    
    question5: "هل تقدمون حلولاً للطاقة الخضراء؟",
    answer5: "نعم، نقدّم حلولاً للطاقة الشمسية والمباني المستدامة تساعد في تقليل استهلاك الطاقة، رفع الكفاءة التشغيلية، ودعم مستهدفات الاستدامة لرؤية 2030.",    
   
    question6: "ما هو ساڤي ابتكار؟",
    answer6: "ساڤي ابتكار يربط بين الذكاء الاصطناعي، التفاعل الرقمي، والحلول الخضراء لتطوير مساحات حضرية أكثر استدامة، ويوفر حلولاً موجهة لمستقبل المدن والتجارب.",
  },
}

export const getFaqContent = (lang: Language, key: keyof typeof faqContent.en) => {
  return faqContent[lang][key]
}








