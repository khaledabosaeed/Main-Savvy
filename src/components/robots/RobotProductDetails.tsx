"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Truck, DollarSign, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useTranslation } from "react-i18next"
import { getRobotProductContent } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"
import SpecsTable from "./SpecsTable"
import ProductImageGallery from "./ProductImageGallery"

const bulletIcons = [Package, Truck, DollarSign, MessageCircle]

interface RobotProductDetailsProps {
  slug: RobotSlug
}

export default function RobotProductDetails({ slug }: RobotProductDetailsProps) {
  const { language } = useLanguage()
  const { t } = useTranslation()
  const currentLang = language as Language
  const content = getRobotProductContent(slug, currentLang)
  const isRTL = currentLang === "ar"
  const lang = currentLang

  const [selectedVersion, setSelectedVersion] = useState(0)

  const images = content.images.length > 0 ? content.images : ["/robot/go2/go2.webp"]

  return (
    <section className="py-25 md:py-25 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Left - Images */}
          <div className={isRTL ? "" : ""}>
            <ProductImageGallery
              images={images}
              alt={content.name}
              isRTL={isRTL}
              ariaLabels={{
                close: t("common.close"),
                previousImage: t("common.previousImage"),
                nextImage: t("common.nextImage"),
                viewFullscreen: t("common.viewFullscreen"),
              }}
            />
          </div>

          {/* Right - Product details */}
          <div className={ isRTL ? "lg:order-1 py-35 md:py-25" : "py-35 md:py-25"}>
            <h1
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {content.name}
            </h1>
            {/* <p
              className={`text-2xl font-semibold text-gray-900 mb-8 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {content.price}
            </p> */}

            {/* Bullet points */}
            <ul className="space-y-3 mb-8">
              {content.bulletPoints.map((point, i) => {
                const Icon = bulletIcons[i % bulletIcons.length]
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-3 text-gray-600 ${
                      isRTL ? "" : ""
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0 text-gray-500 mt-0.5" />
                    <span>{point}</span>
                  </li>
                )
              })}
            </ul>

            {/* Version selector */}
            {content.versions.length > 0 && (
              <div className="mb-8">
                <p
                  className={`font-semibold text-gray-900 mb-3 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {t("robots.version")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {content.versions.map((v, i) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVersion(i)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                        selectedVersion === i
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA — contact page (replaces add-to-cart); dir=ltr keeps button position same as EN in both languages */}
            <div className="flex flex-col gap-4" >
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${lang}/contact`}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center shadow-sm"
                >
                  {t("common.contactUs")}
                </Link>
              </div>
              <Link
                href={`/${lang}/robots/responsible-use`}
                className="text-sm text-gray-500 hover:text-primary transition-colors underline underline-offset-2 w-fit"
              >
                {t("robots.responsibleUseLabel")}
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications table - G1, H2, R1 */}
        {(slug === "g1" || slug === "h2" || slug === "r1") && (
          <div className="mt-16 md:mt-24">
            <h2
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("common.specifications")}
            </h2>
            <SpecsTable slug="g1" lang={lang} />

          </div>
        )}
      </div>
    </section>
  )
}
