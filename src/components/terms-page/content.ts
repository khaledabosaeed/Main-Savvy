export type Language = "en" | "ar"

export const termsContent = {
  en: {
    title: "Terms of Use",
    lastUpdated: "Last updated: December 11, 2025",
    
    // Sections
    acceptanceTitle: "Acceptance of Terms",
    acceptanceContent: "By accessing or using Savvy World and its related services, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, you may not use our services.",
    
    permittedUseTitle: "Permitted Use",
    permittedContent: "You may use our services for lawful purposes only. You agree not to:",
    permittedList: [
      "Violate any applicable laws or regulations",
      "Infringe on intellectual property rights",
      "Upload malicious content or software",
      "Attempt to gain unauthorized access",
      "Use the service for illegal activities"
    ],
    
    intellectualPropertyTitle: "Intellectual Property",
    intellectualPropertyContent: "All content on Savvy World, including text, graphics, logos, images, and software, is the property of Savvy or its licensors and is protected by intellectual property laws.",
    
    userTeamTitle: "User Team",
    userTeamContent: "We offer team services that include information sharing and collaboration. Team features may include the ability to:",
    userTeamList: [
      "Create teams",
      "Share files",
      "Collaborate",
      "Manage projects",
      "Invite members"
    ],
    
    paymentTitle: "Payment Terms",
    paymentContent: "Some services may require payment. By purchasing:",
    paymentList: [
      "You agree to provide accurate payment information",
      "You authorize us to charge your payment method",
      "All fees are non-refundable unless otherwise stated",
      "Subscriptions renew automatically",
      "We reserve the right to modify pricing with notice"
    ],
    
    modificationsTitle: "Modifications to Terms",
    modificationsContent: "We reserve the right to modify these terms at any time. We will notify users of material changes through our platform or via email. Your continued use constitutes acceptance of the modified terms.",
    
    terminationTitle: "Termination",
    terminationContent: "We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including breach of these Terms.",
    
    contactTitle: "Contact Us",
    contactContent: "If you have any questions about these Terms of Use, please contact us:",
    contactEmail: "support@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
  ar: {
    title: "شروط الاستخدام",
    lastUpdated: "آخر تحديث: 11 ديسمبر 2025",
    
    // Sections
    acceptanceTitle: "قبول الشروط",
    acceptanceContent: "بالدخول أو استعمال خدماتنا وموقع أو أي من منصة خدمات سافي ورلد، انت توافق على التزامات باللتزام بالإتفاقية. إذا كانت توافق على أي جزء من هذه شروط، غير من وصل بعدم استخدام الموقع.",
    
    permittedUseTitle: "الاستخدام المسموح",
    permittedContent: "سيمكن أن تستخدام الموقع الجنجاري لمنزلة القاهارية فقط: المرفقة الملف:",
    permittedList: [
      "المنتجات",
      "الشمس",
      "البيانات",
      "الشارات",
      "المعلومات"
    ],
    
    intellectualPropertyTitle: "الملكية الفكرية",
    intellectualPropertyContent: "كل المحتوى الوراثي الموسائحة سيرتائج محاي شحري، الشعار، الفقيمات، وما الكثير رواك بمالكيية سافي وركنز الموسورة المحتوى من سندن على بالقوبانين المعاكية العنبركية والإكتنار.",
    
    userTeamTitle: "فريق المستخدم",
    userTeamContent: "نوفر أن خدمات الزفريزق العمل المانحة لمعلومات المشاركة ويتضن التالي (رؤوس عروض ، منافس ، مريح، زيارة، بمح المحتوى الدوري - أحجانا، مواصل، بحميا، حرا الأنشء أو الزادمين):",
    userTeamList: [
      "إنشاء الزفارق",
      "مشاركة معلومات",
      "مشاركة الفترق الشريعية",
      "إدارة سفر المشارك المساعمة",
      "أي مساهمة استرجلاه استخدام بشكل"
    ],
    
    paymentTitle: "فريق المعلومات",
    paymentContent: "قمن نسعى لتقديم معلومات: إبة يحتوج دقيقة الان.",
    paymentList: [
      "أنت نتعليق أن نقدام معلومات: أي يحتاج بدقيف",
      "لا نحتفن أي تخويف منكعموات دخل الخدمات ودقن امجوال",
      "لا نسمح بم انواع أو الأربلام أو الإختلافات",
      "استخدام أو مفاورة أي معستانيية المحتسببة",
      "استخدام محاور المنظامة ضد المستدامة"
    ],
    
    modificationsTitle: "التغييرات على الشروط",
    modificationsContent: "نحتفظ بالحق في تعديل شروط الاستخدام في اي وقت وأي نشعر المستخدمين أي استخدام تغييرات محيرة عبد البريد أو المنصة. استمرارك في استخدام يتكني الموافقة المعليه.",
    
    terminationTitle: "الإنهاء",
    terminationContent: "قد نقوم مقابطة في إلأونهاء أو تعليمة بالوصول للخدمه فوراً، دون إشعار أي مسؤولية مسبوب، لأي سبب، يضمن نوخاتانق هذه الشروط.",
    
    contactTitle: "تواصل معنا",
    contactContent: "إذا كان لديك أي أسئلة مفاعل شروط الاستخدام، يرجى التواصل معنا:",
    contactEmail: "support@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
}

export const getTermsContent = (lang: Language, key: keyof typeof termsContent.en) => {
  return termsContent[lang][key]
}

