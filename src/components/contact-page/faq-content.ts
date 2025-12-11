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
    
    question1: "سافي وورلد هو منصة سعودية مبتكرة تجمع بين:",
    answer1: "التقنيات الحديثة + الاستدامة + التحول الرقمي + الروبوتاتوتقدّمها للناس والشركات بطريقة بسيطة، بهدف الوصول بعالم الذكاء الاصطناعي والروبوتات إلى عالم أفضل، عالم سافي.",

    
    question2: "ماذا تقدم ساڤي ميديا؟",
    answer2: "توفر شاشات عرض رقمية داخلية وخارجية تعمل 24/7، إضافة إلى محتوى غامر متطور بتقنيات 3D وAR، مع خصائص استهداف ذكي وقياس دقيق للتفاعل.",
    
    question3: "من هو مستر ساڤي؟",
    answer3: "مستر سافي هو روبوت إنساني يتم تقديمه داخل السعودية كـسفير للتقنيات الجيدة والاستدامةفكرته الأساسية: تبسيط عالم الروبوتات والذكاء الاصطناعي للناس .. بطريقة ممتعة، بسيطة، وباللغة العربية والإنجليزية",


    
    question4: "ما دور ساڤي إكسبو؟",
    answer4: "سافي إكسبو هو الذراع المختص بالفعّاليات والمعارض داخل عالم سافي دوره الأساسي: تحويل أي فعالية إلى تجربة ذكية، جذّابة، وتثقيفية باستخدام الروبوتات، الذكاء الاصطناعي، والمحتوى التفاعلي",

    
    question5: "هل تقدمون حلولاً للطاقة الخضراء؟",
    answer5: "نعم — وبشكل متكامل وواضح، بالتعاون مع المنتدى السعودي للأبنية الخضراء، نسعى لتأمين حلول متكاملة حاصلة على شهادة سعف. و نقدّمها كـ “رحلة تحول أخضر” كاملة للمطورين، الشركات، والبنوك بنماذج عمل ربحية.",    


   
    question6: "ما هو ساڤي ابتكار؟",
    answer6: "ساڤي ابتكار يربط بين الذكاء الاصطناعي، التفاعل الرقمي، والحلول الخضراء لتطوير مساحات حضرية أكثر استدامة، ويوفر حلولاً موجهة لمستقبل المدن والتجارب.",
  },
}

export const getFaqContent = (lang: Language, key: keyof typeof faqContent.en) => {
  return faqContent[lang][key]
}








