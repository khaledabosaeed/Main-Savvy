"use client"

import { useState, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle, AlertCircle, Mail, MapPin, Phone } from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { staggerContainer, fadeInUp } from "@/lib/animations"
import FormattedText from "@/components/shared/FormattedText"
import { richTextToPlainText } from "@/lib/rich-text"

type SolutionOptionGroup = { title: string; options: string[] }

function isPlaceholderContactValue(s: string) {
  const t = s.trim()
  return t === "" || t === "—" || t === "-"
}

function telHrefFromDisplay(phone: string) {
  if (isPlaceholderContactValue(phone)) return null
  const digits = phone.replace(/[^\d+]/g, "")
  if (digits.replace(/\D/g, "").length < 8) return null
  return digits.startsWith("+") ? digits : `+${digits.replace(/^\+/, "")}`
}

function emailHref(email: string) {
  if (isPlaceholderContactValue(email) || !email.includes("@")) return null
  return `mailto:${email.trim()}`
}

export default function ContactPage() {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const isMobile = useIsMobile()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    message: "",
  })
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([])
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formRef = useRef(null)
  const solutionsScrollRef = useRef<HTMLDivElement>(null)

  const isFormInView = useInView(formRef, { once: true, amount: isMobile ? 0.1 : 0.2 })

  const solutionOptionGroups = useMemo(() => {
    const raw = t("contact.solutionOptionGroups", { returnObjects: true })
    return Array.isArray(raw) ? (raw as SolutionOptionGroup[]) : []
  }, [t])

  const solutionOtherLabel = t("contact.solutionOther")

  const sidebarPhone = t("contact.sidebarPhone")
  const sidebarEmail = t("contact.sidebarEmail")
  const telHref = telHrefFromDisplay(sidebarPhone)
  const mailHref = emailHref(sidebarEmail)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.email.includes("@")) {
      setStatus("error")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          message: [...selectedSolutions, formData.message].filter(Boolean).join("\n"),
          lang,
        }),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          companyName: "",
          message: "",
        })
        setSelectedSolutions([])
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

  const handleSolutionToggle = (option: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
    )
    setStatus("idle")
  }

  const sidebarRowClass = `flex gap-3 ${isRTL ? "flex-row-reverse text-right" : "text-left"}`

  return (
    <>
      <section className="relative  py-5 md:py-24 bg-white overflow-hidden">
        <div className="container relative z-10 px-6">
          <div className="max-w-6xl mx-auto" dir={isRTL ? "rtl" : "ltr"}>
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={isRTL ? "text-right" : "text-left"}
            >
              <h1 className="text-3xl mt-20 md:text-4xl font-bold text-gray-900 mb-12 text-center lg:text-start">
                <FormattedText text={t("contact.heroTitle")} as="span" />
              </h1>


              <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(260px,320px)] gap-10 lg:gap-12 items-start">
                <div className={`min-w-0 order-1 lg:order-none ${isRTL ? "text-right" : "text-left"}`}>
              <motion.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
                className="space-y-5 bg-white"
                dir={isRTL ? "rtl" : "ltr"}
              >
                <div className={`${isRTL ? "rtl" : "ltr"}`}>
                  <motion.div variants={fadeInUp}>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <FormattedText text={t("contact.fullName")} as="span" />
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={richTextToPlainText(t("contact.fullNamePlaceholder"))}
                      className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? "text-right" : "text-left"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                      required
                    />
                  </motion.div>
                </div>

                <div className={`${isRTL ? "rtl" : "ltr"}`}>
                  <motion.div variants={fadeInUp}>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <FormattedText text={t("contact.email")} as="span" />
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={richTextToPlainText(t("contact.emailPlaceholder"))}
                      className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? "text-right" : "text-left"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                      required
                    />
                  </motion.div>
                </div>

                <div className={`${isRTL ? "rtl" : "ltr"}`}>
                  <motion.div variants={fadeInUp}>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <FormattedText text={t("contact.phone")} as="span" />
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={richTextToPlainText(t("contact.phonePlaceholder"))}
                      className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? "text-right" : "text-left"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </motion.div>
                </div>

                <div className={`${isRTL ? "rtl" : "ltr"}`}>
                  <motion.div variants={fadeInUp}>
                    <label
                      className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                    >
                      <FormattedText text={t("contact.companyName")} as="span" />
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder={richTextToPlainText(t("contact.companyPlaceholder"))}
                      className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all ${isRTL ? "text-right" : "text-left"}`}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </motion.div>
                </div>

                <motion.div variants={fadeInUp} className={`${isRTL ? "rtl" : "ltr"}`}>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <FormattedText text={t("contact.savvySolutions")} as="span" />
                  </label>
                  <div
                    ref={solutionsScrollRef}
                    className="mb-4 p-4 rounded-md border border-gray-200 bg-gray-50 space-y-4 max-h-72 overflow-y-auto overflow-x-hidden overscroll-contain"
                    onWheel={(e) => {
                      const el = solutionsScrollRef.current
                      if (!el) return
                      const { scrollTop, scrollHeight, clientHeight } = el
                      const canScrollUp = scrollTop > 0
                      const canScrollDown = scrollTop < scrollHeight - clientHeight
                      if ((e.deltaY < 0 && canScrollUp) || (e.deltaY > 0 && canScrollDown)) {
                        e.preventDefault()
                      }
                    }}
                  >
                    {solutionOptionGroups.map((group, gi) => (
                      <div key={gi} className="space-y-2">
                        <p
                          className={`text-xs font-semibold uppercase tracking-wide text-[#4361EE] ${isRTL ? "text-right" : "text-left"}`}
                        >
                          <FormattedText text={group.title} as="span" />
                        </p>
                        <div className="space-y-1">
                          {group.options.map((option, index) => (
                            <label
                              key={`${gi}-${index}`}
                              className={`flex items-center gap-3 cursor-pointer hover:bg-gray-100/80 rounded px-2 py-1.5 -mx-2 ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <input
                                type="checkbox"
                                checked={selectedSolutions.includes(option)}
                                onChange={() => handleSolutionToggle(option)}
                                className="w-4 h-4 rounded border-gray-300 text-[#4361EE] focus:ring-[#4361EE] shrink-0"
                              />
                              <span
                                className={`text-sm text-gray-700 flex-1 ${isRTL ? "text-right" : "text-left"}`}
                                dir={isRTL ? "rtl" : "ltr"}
                              >
                                <FormattedText text={option} as="span" />
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="pt-1 border-t border-gray-200">
                      <label
                        className={`flex items-center gap-3 cursor-pointer hover:bg-gray-100/80 rounded px-2 py-1.5 -mx-2 ${isRTL ? "flex-row-reverse" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedSolutions.includes(solutionOtherLabel)}
                          onChange={() => handleSolutionToggle(solutionOtherLabel)}
                          className="w-4 h-4 rounded border-gray-300 text-[#4361EE] focus:ring-[#4361EE] shrink-0"
                        />
                        <span
                          className={`text-sm text-gray-700 flex-1 ${isRTL ? "text-right" : "text-left"}`}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <FormattedText text={solutionOtherLabel} as="span" />
                        </span>
                      </label>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className={`${isRTL ? "rtl" : "ltr"}`}>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2 ${isRTL ? "text-right" : "text-left"}`}
                  >
                    <FormattedText text={t("contact.message")} as="span" />
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={richTextToPlainText(t("contact.messagePlaceholder"))}
                    rows={5}
                    className={`w-full px-4 py-3.5 rounded-md border border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all resize-none ${isRTL ? "text-right" : "text-left"}`}
                    dir={isRTL ? "rtl" : "ltr"}
                    required
                  />
                </motion.div>

                <motion.div variants={fadeInUp} className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[#4361EE] text-white rounded-md font-bold text-base hover:bg-[#3651DE] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>
                        <FormattedText text={t("contact.sending")} as="span" />
                      </span>
                    ) : (
                      <span>
                        <FormattedText text={t("contact.send")} as="span" />
                      </span>
                    )}
                  </button>
                </motion.div>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-md"
                  >
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                      <p className={`text-green-700 font-medium text-sm ${isRTL ? "text-right" : "text-left"}`}>
                        <FormattedText text={t("contact.successMessage")} as="span" />
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
                    <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <p className={`text-red-700 font-medium text-sm ${isRTL ? "text-right" : "text-left"}`}>
                        <FormattedText text={t("contact.errorMessage")} as="span" />
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.form>
                </div>

            <aside
              className={`order-2 lg:order-none rounded-lg border border-gray-200 bg-gray-50 p-6 ${isRTL ? "text-right" : "text-left"}`}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-5">
                <FormattedText text={t("contact.sidebarTitle")} as="span" />
              </h2>
              <ul className="space-y-5 text-sm text-gray-700">
                <li className={sidebarRowClass}>
                  <Phone className="w-5 h-5 text-[#4361EE] shrink-0 mt-0.5" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      <FormattedText text={t("contact.sidebarPhoneLabel")} as="span" />
                    </p>
                    {telHref ? (
                      <a href={`tel:${telHref}`} className="text-[#4361EE] hover:underline break-all" dir="ltr">
                        {sidebarPhone}
                      </a>
                    ) : (
                      <p className="break-words">{sidebarPhone}</p>
                    )}
                  </div>
                </li>
                <li className={sidebarRowClass}>
                  <Mail className="w-5 h-5 text-[#4361EE] shrink-0 mt-0.5" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      <FormattedText text={t("contact.sidebarEmailLabel")} as="span" />
                    </p>
                    {mailHref ? (
                      <a href={mailHref} className="text-[#4361EE] hover:underline break-all">
                        {sidebarEmail}
                      </a>
                    ) : (
                      <p className="break-words">{sidebarEmail}</p>
                    )}
                  </div>
                </li>
                <li className={sidebarRowClass}>
                  <MapPin className="w-5 h-5 text-[#4361EE] shrink-0 mt-0.5" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900">
                      <FormattedText text={t("contact.sidebarAddressLabel")} as="span" />
                    </p>
                    <p className="whitespace-pre-line break-words">
                      <FormattedText text={t("contact.sidebarAddress")} as="span" />
                    </p>
                  </div>
                </li>
              </ul>
            </aside>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
