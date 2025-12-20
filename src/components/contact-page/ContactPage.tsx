"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useRef } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import type { Language } from "./content"
import { getFaqContent } from "./faq-content"
import { 
  staggerContainer, 
  fadeInUp, 
} from "@/lib/animations"

interface ContactPageProps {
  lang: Language
}

export default function ContactPage({ lang }: ContactPageProps) {
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    jobTitle: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Refs for scroll animations
  const formRef = useRef(null)
  const faqRef = useRef(null)
  
  const isFormInView = useInView(formRef, { once: true, amount: isMobile ? 0.1 : 0.2 })
  
  const tf = (key: keyof typeof import("./faq-content").faqContent.en) =>
    getFaqContent(lang, key)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, lang }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ 
          fullName: "", 
          email: "", 
          phone: "", 
          companyName: "",
          jobTitle: "",
          message: "" 
        })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setStatus("idle")
  }

  const faqs = [
    { question: tf("question1"), answer: tf("answer1") },
    { question: tf("question2"), answer: tf("answer2") },
    { question: tf("question3"), answer: tf("answer3") },
    { question: tf("question4"), answer: tf("answer4") },
    { question: tf("question5"), answer: tf("answer5") },
    { question: tf("question6"), answer: tf("answer6") },
  ]

  return (
    <>
      {/* Contact Hero */}
      {/* <ContactHero lang={lang} /> */}

      {/* Contact Form Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="container relative z-10 px-6">

        {/* Content Grid */}
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center`}>
              {isRTL ? "ارسل رسالة" : "Send a Message"}
            </h2>

            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              className="space-y-5 bg-white"
            >
              {/* Full Name */}
              <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "اسمك الكامل" : "Full Name"}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={isRTL ? "اسم المستخدم" : "John Doe"}
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                </motion.div>
              </div>

              {/* Email */}
              <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "الإيميل" : "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@email.com"
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                </motion.div>
              </div>

              {/* Phone */}
              <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "رقم هاتفك" : "Phone Number"}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0581234567"
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>
              </div>

              {/* Company Name & Job Title */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 ${isRTL ? 'rtl' : 'ltr'}`}>
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "اسم الشركة" : "Company Name"}
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={isRTL ? "ساڤي" : "Savvy"}
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "الدور الوظيفي" : "Job Title"}
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder={isRTL ? "مدير الشركة" : "Company Manager"}
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>
              </div>

              {/* Message Textarea */}
              <motion.div variants={fadeInUp} className={`${isRTL ? 'rtl' : 'ltr'}`}>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? "الرسالة" : "Message"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isRTL ? "اكتب رسالتك" : "Write your message"}
                  rows={5}
                  className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 bg-[#4361EE] text-white rounded-md font-bold text-base hover:bg-[#3651DE] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <span>{isRTL ? "جاري الإرسال..." : "Sending..."}</span>
                  ) : (
                    <span>{isRTL ? "ارسل" : "Send"}</span>
                  )}
                </button>
              </motion.div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-md"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                    <p className={`text-green-700 font-medium text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? "تم إرسال رسالتك بنجاح!" : "Your message has been sent successfully!"}
                    </p>
                  </div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-md"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <p className={`text-red-700 font-medium text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "An error occurred. Please try again."}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.form>
          </motion.div>
        </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-24 bg-white">
        <div className="container px-6">
          {/* العنوان */}
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-12`}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {isRTL ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>
          </motion.div>
          {/* FAQs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${isRTL ? 'text-right' : 'text-left'}`}
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
