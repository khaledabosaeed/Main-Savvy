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
    
    question1: "ما هو سافي ميديا؟",
    answer1: "سافي ميديا هو مزود رائد لحلول الإعلام والمعارض المبتكرة. نتخصص في إنشاء تجارب جذابة من خلال التكنولوجيا المتطورة والمحتوى الإبداعي.",
    
    question2: "من هو سافي لهم؟",
    answer2: "سافي للشركات والمعارض والفعاليات والمنظمات التي تسعى لتعزيز حضورها من خلال حلول رقمية مبتكرة وتجارب تفاعلية.",
    
    question3: "ما هو سافي ابتكار؟",
    answer3: "سافي ابتكار يركز على الحلول المدعومة بالذكاء الاصطناعي والتقنيات الذكية والابتكارات المستدامة. نجمع بين التقنية المتقدمة والتطبيقات العملية للأعمال الحديثة.",
    
    question4: "هل تقدمون حلول الطاقة الخضراء؟",
    answer4: "نعم، نوفر حلول شاملة للطاقة الخضراء بما في ذلك الشاشات التي تعمل بالطاقة الشمسية والتقنيات المستدامة والابتكارات الصديقة للبيئة بما يتماشى مع رؤية السعودية 2030.",
    
    question5: "ما هو سافي ميديا؟",
    answer5: "سافي ميديا يقدم إنتاج إعلامي شامل، إنشاء محتوى رقمي، وحلول عرض تفاعلية للشركات التي تسعى لتعزيز حضور علامتها التجارية.",
    
    question6: "ما هي خدمات سافي؟",
    answer6: "تشمل خدمات سافي تصميم المعارض، الإنتاج الإعلامي، الشاشات الذكية، التقنيات التفاعلية، حلول الذكاء الاصطناعي، أنظمة الطاقة الخضراء، وخدمات التحول الرقمي الشاملة.",
  },
}

export const getFaqContent = (lang: Language, key: keyof typeof faqContent.en) => {
  return faqContent[lang][key]
}








