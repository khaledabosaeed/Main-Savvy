export type Language = "en" | "ar"

export const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: December 11, 2025",
    
    // Sections
    introTitle: "Introduction",
    introContent: "We respect your privacy and are committed to protecting the personal information we collect from you. This privacy policy explains how we collect, use, and protect your data in accordance with applicable laws.",
    
    dataCollectionTitle: "Data We Collect",
    dataCollectionContent: "We may collect the following types of information: personal contact information (name, email, phone number), device and usage information, cookies and similar technologies.",
    dataCollectionList: [
      "Name",
      "Email",
      "Phone number",
      "Company information",
      "Any other information you provide voluntarily"
    ],
    
    dataSharingTitle: "Sharing Data with Third Parties for Savvy World",
    dataSharingContent: "We may share your data with carefully selected partners to provide you with the best services.",
    
    noSellingTitle: "We Do Not Sell Your Data",
    noSellingContent: "We do not sell your data to any third parties. We only use it to improve our services.",
    
    dataRetentionTitle: "Data Retention",
    dataRetentionContent: "We retain your data for as long as necessary to provide you with our services and comply with applicable legal obligations. Data may be retained indefinitely.",
    
    policyChangesTitle: "Changes to Privacy Policy",
    policyChangesContent: "We may update this policy from time to time. Any updates will be posted on this page, and we will notify you of material changes via email or through our platform.",
    
    yourRightsTitle: "Your Rights",
    yourRightsContent: "You have the following rights:",
    yourRightsList: [
      "Right to access your data",
      "Right to correct your data",
      "Right to delete your data",
      "Right to object to processing",
      "Right to withdraw consent (if applicable)",
      "Right to file a complaint with the supervisory authority"
    ],
    
    contactTitle: "Contact Us",
    contactContent: "If you have any questions about this privacy policy or how we handle your data, please contact us:",
    contactEmail: "privacy@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
  ar: {
    title: "صفحة الخصوصية",
    lastUpdated: "آخر تحديث: 11 ديسمبر 2025",
    
    // Sections
    introTitle: "المقدمة",
    introContent: "نحن نحترم خصوصيتك ونلتزم بحماية المعلومات الشخصية التي نحصل عليها منك. توضح هذه السياسة كيفية جمعنا لبياناتك واستخدامها وحمايتها بما يتوافق مع القوانين السارية لحاية الخصوصية. من خلالك الموافقة، نوضحك بهذه متوقع استخدام ومن فيها في حقناتك التحكم بها.",
    
    dataCollectionTitle: "البيانات التي نقوم بجمعها",
    dataCollectionContent: "قد نستخدامل أو تجمع أو تخزن أن بيانات تتعلقق بتفاعلاتك المتنوعة: معلومات المسجل الاتصال بالإضافة:",
    dataCollectionList: [
      "الاسم",
      "البريد الإلكتروني",
      "رقم الهاتف",
      "معلومات الشركة (اختياري)",
      "أي معلومات أخرى تقدمها استخدام بشكل",
    ],
    
    dataSharingTitle: "مشاركة البيانات مع الجهات الثالثة لسافي ورلد",
    dataSharingContent: "قد نشارك بياناتك مع شركات محتاطة انتقنت بعناية لتوفير لكم خدمة الأفضل",
    
    noSellingTitle: "عدم بيع البيانات",
    noSellingContent: "لا نبيع أيا من الأطراف ملفاتك أو البيانات حيث بها طرف.",
    
    dataRetentionTitle: "الاحتفاظ بالبيانات",
    dataRetentionContent: "نحتفظ بياناتك طالما اللازمة لتقديم الخدمات لك بموجب بط التزامات قانونية التطبيق التالية. قد نحتفظ البيانات أو التعريفية بنشكل مؤمن.",
    
    policyChangesTitle: "التغييرات على سياسة الخصوصية",
    policyChangesContent: "قد نقوم بتعديل السياسة من وقت لآخر. سي نشر موانعات على هذه الصفحة، و سنقمو بإشعاركم أي استخدام البريد غيرنا استخدامج الأساسية عبر البيانية أو المنصة.",
    
    yourRightsTitle: "حقوقك",
    yourRightsContent: "لديك الحقوق التالية:",
    yourRightsList: [
      "استخدام الحق في الوصول إلى بياناتك",
      "طلب تصحيح أي بيانات",
      "طلب حذف أو تعديل البيانات",
      "الاعتراض على المعالجة (في استخدام البريد الإلكتروني)",
      "إلغاء أي موافقة المخطونة",
      "تحديق أو تقنيد شكوى أو بالاستخدام المحلي"
    ],
    
    contactTitle: "تواصل معنا",
    contactContent: "إذا كنت تريد معلومات عن سياسة أو الوقتات الخصوصية أو إلى يمكنكم استخدام بياناتك:",
    contactEmail: "privacy@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
}

export const getPrivacyContent = (lang: Language, key: keyof typeof privacyContent.en) => {
  return privacyContent[lang][key]
}

