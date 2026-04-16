/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useTranslation } from "react-i18next"
import { Leaf, Wind, Brain, Bot } from "lucide-react"
import FormattedText from "@/components/shared/FormattedText"
import { richTextToPlainText } from "@/lib/rich-text"

export default function HomeGoals2026() {
  const [animate, setAnimate] = useState(false)
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const lang = language as "en" | "ar"
  const isRTL = lang === "ar"
  const goalTexts = [0, 1, 2, 3].map((i) => t(`hero.goals.${i}`))
  const getGoalHref = (i: number): string | null => {
    const path = String(t(`hero.goalLinks.${i}`)).trim()
    if (!path) return null
    return `/${lang}${path.startsWith("/") ? path : `/${path}`}`
  }

  useEffect(() => {
    setAnimate(true)
  }, [])

  const goalsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isMobile ? 0.15 : 0.25,
        staggerChildren: isMobile ? 0.06 : 0.1,
      },
    },
  }

  const goalItemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 0.61, 0.36, 1] as any,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 0.61, 0.36, 1] as any },
    },
  }

  return (
    <section
      id="goals2026"
      className="relative w-full py-14 md:py-20 bg-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <motion.p
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center text-sm md:text-base text-primary font-medium mb-3 md:mb-4"
        >
          <FormattedText text={t("home.goals2030.intro")} />
        </motion.p>
        <motion.h2
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center text-lg md:text-xl mb-8 md:mb-10 font-semibold text-gray-900 mb-2 md:mb-3"
        >
          <FormattedText text={t("hero.goalsTitle")} />
        </motion.h2>
        {/* <motion.p
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center text-xs md:text-sm lg:text-base text-gray-600 mb-8 md:mb-10 max-w-3xl mx-auto"
        >
          {t("hero.subDescription")}
        </motion.p> */}

        <motion.div
          variants={goalsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
        >
          {[
            { goal: goalTexts[0], Icon: Bot },
            { goal: goalTexts[1], Icon: Leaf },
            { goal: goalTexts[2], Icon: Wind },
            { goal: goalTexts[3], Icon: Brain },
          ].map(({ goal, Icon }, i) => {
            const href = getGoalHref(i)
            const cardClass =
              "flex flex-col items-center p-6 rounded-2xl border border-gray-200 bg-gray-50/80 shadow-sm transition-shadow duration-200 h-full"
            const interactiveClass = href
              ? "group cursor-pointer hover:border-primary hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              : "cursor-default hover:border-gray-200"

            const inner = (
              <motion.div
                whileHover={
                  href ? { scale: 1.03, transition: { duration: 0.2 } } : undefined
                }
                className="flex flex-col items-center w-full"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-primary/10 mb-4 flex items-center justify-center shrink-0 text-primary transition-colors ${href ? "group-hover:bg-primary/15" : ""}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <p
                  className={`text-sm md:text-base font-bold text-gray-800 leading-relaxed flex-1 text-center transition-colors ${href ? "group-hover:text-gray-900" : ""}`}
                >
                  <FormattedText text={goal} />
                </p>
              </motion.div>
            )

            return (
              <motion.div key={i} variants={goalItemVariants}>
                {href ? (
                  <Link
                    href={href}
                    className={`${cardClass} ${interactiveClass}`}
                    aria-label={richTextToPlainText(goal)}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={`${cardClass} ${interactiveClass}`}>{inner}</div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
