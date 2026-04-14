"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Package, Truck, DollarSign, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { useTranslation } from "react-i18next"
import { getRobotProductContent } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"
import SpecsTable from "./SpecsTable"
import ProductImageGallery from "./ProductImageGallery"

const bulletIcons = [Package, Truck, DollarSign, MessageCircle]

const R1_CATALOG_P2 = "/robot/R1/catlouge/p2.webp"
const R1_CATALOG_P1 = "/robot/R1/catlouge/p1.webp"

interface RobotProductDetailsProps {
  slug: RobotSlug
  showSpecs?: boolean
}

export default function RobotProductDetails({ slug, showSpecs = true }: RobotProductDetailsProps) {
  const { language } = useLanguage()
  const dict = useLocaleDictionary()
  const { t } = useTranslation()
  const currentLang = language as Language
  const content = getRobotProductContent(slug, dict)
  const isRTL = currentLang === "ar"
  const lang = currentLang

  const [selectedVersion] = useState(0)



  
  const selected =
    content.versions[selectedVersion] ?? content.versions[0]
  const displayPrice = selected?.price ?? content.price

  const resolvedManufacturer =
    selected?.manufacturerName ?? content.manufacturerName
  const resolvedSku = selected?.sku ?? content.sku
  const resolvedMpn =
    selected?.manufacturerPartNumber ?? content.manufacturerPartNumber

  const showCatalogBlock = [resolvedManufacturer, resolvedSku, resolvedMpn].some(
    (v) => typeof v === "string" && v.trim() !== ""
  )

  const galleryImages = useMemo(() => {
    if (slug === "r1" && selected?.id) {
      // Same two catalogue assets as before; order puts the matching color first
      if (selected.id.includes("white")) {
        return [R1_CATALOG_P1, R1_CATALOG_P2]
      }
      return [R1_CATALOG_P2, R1_CATALOG_P1]
    }
    if (selected?.images && selected.images.length > 0) {
      return selected.images
    }
    if (content.images.length > 0) {
      return content.images
    }
    return ["/robot/go2/go2.webp"]
  }, [slug, selected, content.images])

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
              key={`${slug}-${selected?.id ?? "default"}`}
              images={galleryImages}
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
          <div className={ isRTL ? "lg:order-1 py-5 md:py-25" : "py-5 md:py-25"}>
            <h1
              className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {content.name}
            </h1>

            {showCatalogBlock && (
              <div
                className={`mb-4 space-y-1 text-sm text-gray-600 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {resolvedManufacturer && resolvedManufacturer.trim() !== "" && (
                  <p>
                    <span className="font-medium text-gray-700">
                      {t("robots.catalogManufacturer")}:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedManufacturer}
                    </span>
                  </p>
                )}
                {resolvedSku && resolvedSku.trim() !== "" && (
                  <p>
                    <span className="font-medium text-gray-700">
                      {t("robots.catalogSku")}:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedSku}
                    </span>
                  </p>
                )}
                {resolvedMpn && resolvedMpn.trim() !== "" && (
                  <p>
                    <span className="font-medium text-gray-700">
                      {t("robots.catalogManufacturerPart")}:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedMpn}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Version selector — price below reflects selected variant */}
            {content.versions.length > 0 && (
              <div className="mb-4">
                {/* <p
                  className={`font-semibold text-gray-900 mb-3 ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                >
                  {slug === "r1"
                    ? t("robots.r1VariantLabel")
                    : t("robots.version")}
                </p> */}
                {/* <div className="flex flex-wrap gap-2">
                  {content.versions.map((v, i) => (
                    <button
                      key={v.id}
                      type="button"
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
                </div> */}
              </div>
            )}

            {displayPrice.trim() !== "" && (
              <p
                className={`text-2xl font-semibold text-gray-900 mb-8 [unicode-bidi:isolate] ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {displayPrice}
              </p>
            )}

            {/* Bullet points */}
            {/* <ul className="space-y-3 mb-8">
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
            </ul> */}

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
          {showSpecs && (
            <div className="mt-16 md:mt-24">
              <h2
                className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {t("common.specifications")}
              </h2>
              <SpecsTable slug={slug} lang={lang} />
            </div>
          )}
      </div>
    </section>
  )
}
