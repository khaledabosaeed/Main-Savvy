"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ChevronDown } from "lucide-react"
import { useRef } from "react"
import type { Language } from "./content"
import { getContactContent } from "./content"
import { getFaqContent } from "./faq-content"
import ContactHero from "./ContactHero"
import { 
  staggerContainer, 
  fadeInUp, 
  scaleIn,
  cardLift
} from "@/lib/animations"

interface ContactPageProps {
  lang: Language
}

export default function ContactPage({ lang }: ContactPageProps) {
  const isRTL = lang === "ar"
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyType: "",
    companyName: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  // Refs for scroll animations
  const formRef = useRef(null)
  const faqRef = useRef(null)
  
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 })
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 })

  const t = (key: keyof typeof import("./content").contactContent.en) =>
    getContactContent(lang, key)
  
  const tf = (key: keyof typeof import("./faq-content").faqContent.en) =>
    getFaqContent(lang, key)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.email || !formData.message) {
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
          firstName: "", 
          lastName: "",
          email: "", 
          phone: "", 
          companyType: "",
          companyName: "",
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
      <ContactHero lang={lang} />

      {/* Contact Form Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="container relative z-10">
          {/* العنوان والوصف */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-12 ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {isRTL ? "أرسلنا بجهة رسالتك.. ونتواصل معك" : "Send us your message.. and we'll get back to you"}
            </p>
          </motion.div>

        {/* Content Grid */}
        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h3
              className={`text-2xl font-bold text-gray-900 mb-8 ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {isRTL ? "إرسل رسالة" : "Send a Message"}
            </motion.h3>

            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              className="space-y-6 bg-white"
            >
              {/* First Name & Last Name */}
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "الاسم الكامل" : "Full Name"}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder={isRTL ? "محمد" : "John"}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "محمد البريد" : "Last Name"}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder={isRTL ? "محمد البريد" : "Doe"}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "الإيميل" : "Email"}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@email.com"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "رقم هاتفك" : "Phone Number"}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0501234567"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>
              </div>

              {/* Company Type & Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "نوع الشركة" : "Company Type"}
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.01 }}
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    <option value="">{isRTL ? "سكني" : "Select"}</option>
                    <option value="skani">{isRTL ? "سكني" : "Skani"}</option>
                    <option value="corporate">{isRTL ? "شركة" : "Corporate"}</option>
                    <option value="startup">{isRTL ? "شركة ناشئة" : "Startup"}</option>
                    <option value="other">{isRTL ? "أخرى" : "Other"}</option>
                  </motion.select>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "اسم الموظفى" : "Company Name"}
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={isRTL ? "مدير الشركة" : "Company Inc."}
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </motion.div>
              </div>

              {/* Message Textarea */}
              <motion.div variants={fadeInUp}>
                <label className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {isRTL ? "الرسالة" : "Message"}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isRTL ? "اكتب رسالتك..." : "Write your message..."}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-8 py-4 bg-[#3960F9] text-white rounded-lg font-bold text-base hover:bg-[#2848C7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-md hover:shadow-lg ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>{isRTL ? "جاري الإرسال..." : "Sending..."}</span>
                    </>
                  ) : (
                    <>
                      <span>{isRTL ? "إرسل" : "Send"}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
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
                  className="p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
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
      <section className="relative py-20 bg-gray-50">
        <div className="container px-6">
          {/* العنوان */}
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-16 ${isRTL ? 'rtl' : 'ltr'}`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {tf("title")}
            </h2>
          </motion.div>

          {/* FAQs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className={`w-full flex items-center justify-between gap-4 text-left ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                >
                  <h3 className="text-lg font-bold text-gray-900 flex-1">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-6 h-6 text-[#3960F9]" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaqIndex === index ? "auto" : 0,
                    opacity: openFaqIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className={`text-gray-600 leading-relaxed mt-4 pt-4 border-t border-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {faq.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
