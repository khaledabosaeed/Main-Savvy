"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useRef } from "react"
import type { Language } from "./content"
import { getContactContent } from "./content"
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
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Refs for scroll animations
  const formRef = useRef(null)
  const infoRef = useRef(null)
  
  const isFormInView = useInView(formRef, { once: true, amount: 0.2 })
  const isInfoInView = useInView(infoRef, { once: true, amount: 0.2 })

  const t = (key: keyof typeof import("./content").contactContent.en) =>
    getContactContent(lang, key)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
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
        setFormData({ name: "", email: "", phone: "", message: "" })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setStatus("idle")
  }

  return (
    <>
      {/* Contact Hero */}
      <ContactHero lang={lang} />

      {/* Contact Form Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[#3960F9]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container relative z-10">

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? 50 : -50 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <motion.form
              onSubmit={handleSubmit}
              variants={staggerContainer}
              initial="hidden"
              animate={isFormInView ? "visible" : "hidden"}
              className="space-y-6 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
            >
              {/* Name Input */}
              <motion.div variants={fadeInUp}>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t("namePlaceholder")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("namePlaceholder")}
                  className={`w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  required
                />
              </motion.div>

              {/* Email Input */}
              <motion.div variants={fadeInUp}>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t("emailPlaceholder")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("emailPlaceholder")}
                  className={`w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  required
                />
              </motion.div>

              {/* Phone Input */}
              <motion.div variants={fadeInUp}>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t("phonePlaceholder")}
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t("phonePlaceholder")}
                  className={`w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div variants={fadeInUp}>
                <label className={`block text-sm font-semibold text-gray-700 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t("messagePlaceholder")}
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("messagePlaceholder")}
                  rows={6}
                  className={`w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={fadeInUp}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-8 py-5 bg-[#3960F9] text-white rounded-xl font-bold text-lg hover:bg-[#2848C7] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Send className="w-5 h-5" />
                      </motion.div>
                      <span>{t("submitting")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("submitButton")}</span>
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
                  className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className={`text-green-700 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("successMessage")}
                    </p>
                  </div>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl"
                >
                  <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <p className={`text-red-700 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
                      {t("errorMessage")}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isRTL ? -50 : 50 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 order-1 lg:order-2"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
              className={`bg-gradient-to-br from-[#3960F9] to-[#2848C7] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>

              <motion.h2 
                variants={fadeInUp}
                className="text-3xl font-bold mb-10 relative z-10"
              >
                {t("contactInfo")}
              </motion.h2>

              <div className="space-y-8 relative z-10">
                {/* Email */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={cardLift}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Mail className="w-7 h-7" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{t("emailLabel")}</h3>
                    <a
                      href={`mailto:${t("emailValue")}`}
                      className="text-white/90 hover:text-white transition-colors underline decoration-white/30 hover:decoration-white"
                    >
                      {t("emailValue")}
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={cardLift}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Phone className="w-7 h-7" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{t("phoneLabel")}</h3>
                    <a
                      href={`tel:${t("phoneValue")}`}
                      className="text-white/90 hover:text-white transition-colors"
                    >
                      {t("phoneValue")}
                    </a>
                  </div>
                </motion.div>

                {/* Address */}
                <motion.div
                  variants={fadeInUp}
                  whileHover={cardLift}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <MapPin className="w-7 h-7" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{t("addressLabel")}</h3>
                    <p className="text-white/90 leading-relaxed">{t("addressValue")}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Decorative Card */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={isInfoInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02, y: -4 }}
              className="h-72 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl relative"
            >
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-[#3960F9]/10"
                />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.4 }}
                >
                  <MapPin className="w-24 h-24 text-[#3960F9] relative z-10" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </section>
    </>
  )
}
