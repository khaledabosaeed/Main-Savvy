export type Language = "en" | "ar"

export const faqContent = {
en: {
    title: "Frequently Asked Questions",

    question1: "What is Savvy World?",
    answer1: "Savvy World is an innovative Saudi platform combining modern technologies + sustainability + digital transformation + robotics, presented to people and businesses in a simple way, aiming to bring AI and robotics into a better world — the Savvy World.",

    question2: "What does Savvy Media offer?",
    answer2: "It provides indoor and outdoor digital display screens operating 24/7, along with advanced immersive content using 3D and AR technologies, featuring smart targeting and precise interaction measurement.",

    question3: "Who is mr.savvy?",
    answer3: "mr.savvy is a humanoid robot introduced in Saudi Arabia as an ambassador for good technologies and sustainability. Its main idea is to simplify the world of robotics and AI for people in a fun, easy way, available in both Arabic and English.",

    question4: "What is the role of Savvy Expo?",
    answer4: "Savvy Expo is the events and exhibitions arm of Savvy World. Its main role is to transform any event into an intelligent, engaging, and educational experience using robotics, AI, and interactive content.",

    question5: "Do you offer green energy solutions?",
    answer5: "Yes — comprehensively and clearly. In collaboration with the Saudi Green Building Forum, we provide fully certified green solutions. We offer it as a complete 'Green Transformation Journey' for developers, companies, and banks with profitable business models.",

    question6: "What is Savvy Innovation?",
    answer6: "Savvy Innovation links AI, digital interaction, and green solutions to develop more sustainable urban spaces, providing solutions geared toward the future of cities and experiences.",
},

  ar: {
    title: "الأسئلة الشائعة",
    
    question1: "ساڤي وورلد هو منصة سعودية مبتكرة تجمع بين:",
    answer1: "التقنيات الحديثة + الاستدامة + التحول الرقمي + الروبوتاتوتقدّمها للناس والشركات بطريقة بسيطة، بهدف الوصول بعالم الذكاء الاصطناعي والروبوتات إلى عالم أفضل، عالم ساڤي.",

    
    question2: "ماذا تقدم ساڤي ميديا؟",
    answer2: "توفر شاشات عرض رقمية داخلية وخارجية تعمل 24/7، إضافة إلى محتوى غامر متطور بتقنيات 3D وAR، مع خصائص استهداف ذكي وقياس دقيق للتفاعل.",
    
    question3: "من هو مستر ساڤي؟",
    answer3: "مستر ساڤي هو روبوت إنساني يتم تقديمه داخل السعودية كـسفير للتقنيات الجيدة والاستدامةفكرته الأساسية: تبسيط عالم الروبوتات والذكاء الاصطناعي للناس .. بطريقة ممتعة، بسيطة، وباللغة العربية والإنجليزية",


    
    question4: "ما دور ساڤي إكسبو؟",
    answer4: "ساڤي إكسبو هو الذراع المختص بالفعّاليات والمعارض داخل عالم ساڤي دوره الأساسي: تحويل أي فعالية إلى تجربة ذكية، جذّابة، وتثقيفية باستخدام الروبوتات، الذكاء الاصطناعي، والمحتوى التفاعلي",

    
    question5: "هل تقدمون حلولاً للطاقة الخضراء؟",
    answer5: "نعم — وبشكل متكامل وواضح، بالتعاون مع المنتدى السعودي للأبنية الخضراء، نسعى لتأمين حلول متكاملة حاصلة على شهادة سعف. و نقدّمها كـ “رحلة تحول أخضر” كاملة للمطورين، الشركات، والبنوك بنماذج عمل ربحية.",    


   
    question6: "ما هو ساڤي ابتكار؟",
    answer6: "ساڤي ابتكار يربط بين الذكاء الاصطناعي، التفاعل الرقمي، والحلول الخضراء لتطوير مساحات حضرية أكثر استدامة، ويوفر حلولاً موجهة لمستقبل المدن والتجارب.",
  },
}

export const getFaqContent = (lang: Language, key: keyof typeof faqContent.en) => {
  return faqContent[lang][key]
}








