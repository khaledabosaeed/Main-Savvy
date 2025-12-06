export type Language = "en" | "ar"

export const privacyContent = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: November 11, 2025",
    
    // Sections
    introTitle: "Introduction",
    introContent: "We respect your privacy and are committed to protecting the personal data we collect from you. This policy explains the types of data we collect, how we use it, and how we protect it.",
    introList: [],
    introFooter: "",
    
    dataCollectionTitle: "Data We Collect",
    dataCollectionContent: "When you use the website or services (e.g., registration, subscription, newsletter signup):",
    dataCollectionList: [
      "1. Name",
      "2. Email",
      "3. Phone number",
      "4. Identity or company (optional)",
      "5. Message or request",
      "6. Any additional information you provide voluntarily",
    ],
    
    dataSharingTitle: "Sharing Data with Third Parties for Savvy World",
    dataSharingContent: "We may share your data within our established framework to provide better service.",
    
    noSellingTitle: "We Do Not Sell Data",
    noSellingContent: "We do not sell or trade your data under any circumstances.",
    
    dataRetentionTitle: "Data Retention",
    dataRetentionContent: "We retain your data as long as necessary to provide services or as required by regulations. Non-essential data may be deleted periodically.",
    
    policyChangesTitle: "Changes to Privacy Policy",
    policyChangesContent: "We may update this policy from time to time. Your continued use of the site constitutes acceptance of the updated version.",
    
    yourRightsTitle: "Your Rights",
    yourRightsContent: "You have the right to:",
    yourRightsList: [
      "Request a copy of your data",
      "Request correction or update of data",
      "Request deletion of data",
      "Withdraw consent for data usage (when applicable)",
      "File a complaint",
      "Contact us through our contact platform",
    ],
    
    contactTitle: "Contact Us",
    contactContent: "If you have any questions about this privacy policy or how we handle your data, please contact us:",
    contactEmail: "privacy@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
  ar: {
    title: "صفحة الخصوصية",
    lastUpdated: "آخر تحديث في: 11 نوفمبر 2025",
    
    // Sections
    introTitle: "المقدمة",
    introContent: "نحترم خصوصيتك، ونلتزم بحماية بياناتك الشخصية التي نجمعها منك. توضح هذه السياسة أنواع البيانات التي نجمعها، وكيف نستخدمها، وكيف نحميها للتحكم بها.",
    introList: [],
    introFooter: "",
    
    dataCollectionTitle: "البيانات التي نقوم بجمعها",
    dataCollectionContent: "عند استخدامك لل موقع أو الخدمات (مثال: تسجيل، اضمام، اشتراك بالأخبار):",
    dataCollectionList: [
      "1. الاسم",
      "2. البريد الإلكتروني",
      "3. رقم الهاتف",
      "4. الهوية أو الشركة (اختياري)",
      "5. الرسالة أو الطلب",
      "6. أي معلومات إضافية يكون استخدام بنفسه",
    ],
    
    dataSharingTitle: "مشاركة البيانات مع الجهات التابعة لسافي وورلد",
    dataSharingContent: "قد نشارك بياناتك داخل اساسها المحدثة لتقديم خدمة الفضل.",
    
    noSellingTitle: "عدم بيع البيانات",
    noSellingContent: "لا نقوم ببيع أو اتو البيانات، في ظرف الفلت وما كان.",
    
    dataRetentionTitle: "الاحتفاظ بالبيانات",
    dataRetentionContent: "نحتفظ ببياناتك فقط للمدة اللازمة لتقديم الخدمات أو بحسب ما تفرضه الأنظمة.قد نحذف البيانات غير الضرورية بشكل دوري.",

    
    policyChangesTitle: "التغييرات على سياسة الخصوصية",
    policyChangesContent: "قد نقوم بتحديث السياسة من وقت لآخر. يعتبر استمرارك في استخدام الموقع موافقة على النسخة المحدثة.",
    
    yourRightsTitle: "حقوقك",
    
    yourRightsContent: "المستخدم الحق في:",

    yourRightsList: [
      "طلب نسخة من بياناته",
      "طلب تعديل أو تحديث البيانات",
      "طلب حذف البيانات",
      "سحب الموافقة على استخدام البيانات (عند الحاجة)",
      "الشكوى أو أو الخطورة",
      "يمكنك التواصل عبر منصة الواصل معنا",
    ],
    
    contactTitle: "تواصل معنا",
    contactContent: "إذا كان لديك أي استفسارات حول سياسة الخصوصية أو كيفية التعامل مع بياناتك، يرجى التواصل معنا:",
    contactEmail: "privacy@savvy.com",
    contactPhone: "+966 50 123 4567",
  },
}

export const getPrivacyContent = (lang: Language, key: keyof typeof privacyContent.en) => {
  return privacyContent[lang][key]
}



