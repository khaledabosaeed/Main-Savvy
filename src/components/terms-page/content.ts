export type Language = "en" | "ar"

export const termsContent = {
  en: {
    title: "Terms and Conditions",
    lastUpdated: "Last Updated: December 2024",
    acceptanceTitle: "Acceptance of Terms",
    acceptanceContent: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    permittedUseTitle: "Permitted Use",
    permittedContent: "You are granted a limited license to access and use the services for lawful purposes only:",
    permittedList: [
      "• Personal and non-commercial use",
      "• Educational purposes",
      "• Professional research"
    ],
    intellectualPropertyTitle: "Intellectual Property Rights",
    intellectualPropertyContent: "All content included on this site is the property of Savvy or its content suppliers and is protected by applicable laws:",
    intellectualPropertyList: [
      "• Trademarks and service marks",
      "• Text, graphics, logos, and images",
      "• Software and code"
    ],
    intellectualPropertyFooter: "Unauthorized use of any content may violate copyright, trademark, and other laws.",
    userTeamTitle: "User Responsibilities",
    userTeamContent: "Users agree to:",
    userTeamList: [
      "• Provide accurate information",
      "• Maintain the security of their account",
      "• Not engage in any unlawful activities"
    ],
    modificationsTitle: "Modifications to Terms",
    modificationsContent: "We reserve the right to modify these terms at any time. Your continued use of the site following any changes constitutes acceptance of those changes.",
    terminationTitle: "Termination",
    terminationContent: "We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.",
  },
  ar: {
    title: "الشروط والأحكام",
    lastUpdated: "آخر تحديث: ديسمبر 2024",
    acceptanceTitle: "قبول الشروط",
    acceptanceContent: "من خلال الوصول إلى هذا الموقع واستخدامه، فإنك توافق على الالتزام بشروط وأحكام هذه الاتفاقية.",
    permittedUseTitle: "الاستخدام المسموح",
    permittedContent: "يتم منحك ترخيصًا محدودًا للوصول إلى الخدمات واستخدامها للأغراض القانونية فقط:",
    permittedList: [
      "• الاستخدام الشخصي وغير التجاري",
      "• الأغراض التعليمية",
      "• البحث المهني"
    ],
    intellectualPropertyTitle: "حقوق الملكية الفكرية",
    intellectualPropertyContent: "جميع المحتويات المدرجة في هذا الموقع هي ملك لشركة سافي أو موردي المحتوى الخاصين بها ومحمية بموجب القوانين المعمول بها:",
    intellectualPropertyList: [
      "• العلامات التجارية وعلامات الخدمة",
      "• النصوص والرسومات والشعارات والصور",
      "• البرمجيات والأكواد"
    ],
    intellectualPropertyFooter: "قد يؤدي الاستخدام غير المصرح به لأي محتوى إلى انتهاك حقوق النشر والعلامات التجارية والقوانين الأخرى.",
    userTeamTitle: "مسؤوليات المستخدم",
    userTeamContent: "يوافق المستخدمون على:",
    userTeamList: [
      "• تقديم معلومات دقيقة",
      "• الحفاظ على أمان حساباتهم",
      "• عدم الانخراط في أي أنشطة غير قانونية"
    ],
    modificationsTitle: "التعديلات على الشروط",
    modificationsContent: "نحتفظ بالحق في تعديل هذه الشروط في أي وقت. يشكل استمرارك في استخدام الموقع بعد أي تغييرات قبولاً لتلك التغييرات.",
    terminationTitle: "الإنهاء",
    terminationContent: "يجوز لنا إنهاء أو تعليق الوصول إلى خدمتنا على الفور، دون إشعار مسبق أو مسؤولية، لأي سبب كان.",
  }
}

export function getTermsContent<K extends keyof typeof termsContent.en>(
  lang: Language,
  key: K
): typeof termsContent.en[K] {
  return termsContent[lang][key]
}
