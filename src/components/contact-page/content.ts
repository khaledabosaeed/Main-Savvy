export type Language = "en" | "ar"

export const contactContent = {
  en: {
    title: "Get In Touch",
    subtitle: "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",

    namePlaceholder: "Your Name",
    emailPlaceholder: "Your Email",
    phonePlaceholder: "Phone Number (Optional)",
    messagePlaceholder: "Your Message",

    submitButton: "Send Message",
    submitting: "Sending...",

    successMessage: "Thank you! Your message has been sent successfully.",
    errorMessage: "Oops! Something went wrong. Please try again.",

    contactInfo: "Contact Information",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",

    emailValue: "info@savvyinnovation.sa",
    phoneValue: "+966 XX XXX XXXX",
    addressValue: "Riyadh, Saudi Arabia",
  },
  ar: {
    title: "تواصل معنا",
    subtitle: "يسعدنا تواصلك معنا. أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.",

    namePlaceholder: "اسمك",
    emailPlaceholder: "بريدك الإلكتروني",
    phonePlaceholder: "رقم الهاتف (اختياري)",
    messagePlaceholder: "رسالتك",

    submitButton: "إرسال الرسالة",
    submitting: "جارِ الإرسال...",

    successMessage: "شكراً لك! تم إرسال رسالتك بنجاح.",
    errorMessage: "عذراً! حدث خطأ ما. يرجى المحاولة مرة أخرى.",

    contactInfo: "معلومات التواصل",
    emailLabel: "البريد الإلكتروني",
    phoneLabel: "الهاتف",
    addressLabel: "العنوان",

    emailValue: "info@savvyinnovation.sa",
    phoneValue: "+966 XX XXX XXXX",
    addressValue: "الرياض، المملكة العربية السعودية",
  },
}

export function getContactContent(lang: Language, key: keyof typeof contactContent.en): string {
  const content = contactContent[lang]
  return (content[key as keyof typeof content] as string) || contactContent.en[key]
}
