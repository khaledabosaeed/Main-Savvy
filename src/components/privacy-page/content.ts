export type Language = "en" | "ar"

export const privacyContent = {
en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: November 11, 2025",
    
    // Sections
    introTitle: "Acceptance of Terms",
    introContent: "We respect your privacy and are committed to protecting your personal data while you use Savvy World and its services. This policy explains the types of data we collect, how we use it, and your options for managing it.",
    introList: [],
    introFooter: "",
    
    dataCollectionTitle: "Data We Collect",
    dataCollectionContent: "When using any form on the site (Contact Us, Interest Registration, Newsletter Subscription):",
    dataCollectionList: [
      "1. Name",
      "2. Email",
      "3. Phone Number",
      "4. ID or Company (Optional)",
      "5. Message or Request",
      "6. Any additional information provided by the user",
    ],
    
    dataSharingTitle: "Sharing Data Within Savvy World",
    dataSharingContent: "We may share your data across our different departments to provide better services.",
    
    noSellingTitle: "No Selling of Data",
    noSellingContent: "We do not sell or rent your data to any third party under any circumstances.",
    
    dataRetentionTitle: "Data Retention",
    dataRetentionContent: "We retain your data only for as long as necessary to provide services or as required by law. Unnecessary data may be deleted periodically.",
    
    policyChangesTitle: "Changes to the Privacy Policy",
    policyChangesContent: "We may update this policy from time to time. Continued use of the site constitutes acceptance of the updated version.",
    
    yourRightsTitle: "Your Rights",
    yourRightsContent: "Users have the right to:",
    yourRightsList: [
      "Request a copy of their data",
      "Request data modification or updates",
      "Request data deletion",
      "Withdraw consent for data usage (where applicable)",
      "To exercise any of these rights:",
      "You can contact us via the Contact Us page.",
    ],
    
    contactTitle: "Contact Us",
    contactContent: "If you have any questions about the privacy policy or how your data is handled, please reach out to us:",
    contactEmail: "privacy@savvy.com",
    contactPhone: "+966 50 123 4567",
},

  ar: {
    title: "صفحة الخصوصية",
    lastUpdated: "آخر تحديث في: 11 نوفمبر 2025",
    
    // Sections
    introTitle: "قبول الشروط",
    introContent: "نحترم خصوصيتك، ونلتزم بحماية بياناتك الشخصية أثناء استخدامك لموقع ساڤي وورلد وخدماته. توضّح هذه السياسة أنواع البيانات التي نجمعها، وكيف نستخدمها، وما هي خياراتك للتحكم بها.",
    introList: [],
    introFooter: "",
    
    dataCollectionTitle: "البيانات التي نقوم بجمعها",
    dataCollectionContent: "عند استخدام أي نموذج في الموقع (تواصل معنا، تسجيل اهتمام، اشتراك بالأخبار):",
    dataCollectionList: [
      "1. الاسم",
      "2. البريد الإلكتروني",
      "3. رقم الهاتف",
      "4. الهوية أو الشركة (اختياري)",
      "5. الرسالة أو الطلب",
      "6. أي معلومات إضافية يكون استخدام بنفسه",
    ],
    
    dataSharingTitle: "مشاركة البيانات مع الجهات التابعة لساڤي وورلد",
    dataSharingContent: "قد نشارك بياناتك داخل أقسامنا المختلفة لتقديم خدمة أفضل.",
    
    noSellingTitle: "عدم بيع البيانات",
    noSellingContent: "لا نقوم ببيع أو تأجير بياناتك لأي طرف ثالث مهما كان.",
    
    dataRetentionTitle: "الاحتفاظ بالبيانات",
    dataRetentionContent: "نحتفظ ببياناتك فقط للمدة اللازمة لتقديم الخدمات أو بحسب ما تفرضه الأنظمة.قد نحذف البيانات غير الضرورية بشكل دوري.",


    
    policyChangesTitle: "التغييرات على سياسة الخصوصية",
    policyChangesContent: "قد نقوم بتحديث السياسة من وقت لآخر.يعتبر استمرارك في استخدام الموقع موافقة على النسخة المحدّثة.",

    
    yourRightsTitle: "حقوقك",
    
    yourRightsContent: "المستخدم الحق في:",

    yourRightsList: [
      "طلب نسخة من بياناته",
      "طلب تعديل أو تحديث البيانات",
      "طلب حذف البيانات",
      "سحب الموافقة على استخدام البيانات (عند الإمكان)",
      "لطلب أي من هذه الحقوق:",
      "يمكنك التواصل عبر صفحة تواصل معنا.",
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



