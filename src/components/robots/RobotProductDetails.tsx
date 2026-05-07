"use client"

import { useMemo, useState, useEffect, useCallback, Suspense } from "react"
import Link from "next/link"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useLocaleDictionary } from "@/contexts/LocaleDictionaryContext"
import { useTranslation } from "react-i18next"
import { getRobotProductContent, isCoreRobotSlug } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"
import SpecsTable from "./SpecsTable"
import ProductImageGallery from "./ProductImageGallery"
import FormattedText from "@/components/shared/FormattedText"
import VariantSelector from "./VariantSelector"
import { richTextToPlainText } from "@/lib/rich-text"


const R1_CATALOG_P2 = "/robot/R1/catlouge/p2.webp"
const R1_CATALOG_P1 = "/robot/R1/catlouge/p1.webp"

function r1LegacyGalleryOrder(selectedId: string | undefined): string[] | null {
  if (!selectedId) return null
  if (selectedId.includes("white")) {
    return [R1_CATALOG_P1, R1_CATALOG_P2]
  }
  if (selectedId.includes("red")) {
    return [R1_CATALOG_P2, R1_CATALOG_P1]
  }
  return null
}

interface RobotProductDetailsProps {
  slug: RobotSlug
  showSpecs?: boolean
}

function RobotProductDetailsInner({ slug, showSpecs = true }: RobotProductDetailsProps) {
  const { language } = useLanguage()
  const dict = useLocaleDictionary()
  const { t } = useTranslation()
  const currentLang = language as Language
  const content = getRobotProductContent(slug, dict)
  const isRTL = currentLang === "ar"
  const lang = currentLang
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [selectedVersion, setSelectedVersion] = useState(0)

  const variantFromUrl = searchParams.get("variant")

  useEffect(() => {
    if (!variantFromUrl || content.versions.length === 0) return
    const idx = content.versions.findIndex((v) => v.id === variantFromUrl)
    if (idx >= 0) setSelectedVersion(idx)
  }, [variantFromUrl, content.versions])

  const setVersion = useCallback(
    (i: number) => {
      setSelectedVersion(i)
      const id = content.versions[i]?.id
      if (id && isCoreRobotSlug(slug)) {
        router.replace(`${pathname}?variant=${encodeURIComponent(id)}`, { scroll: false })
      }
    },
    [content.versions, pathname, router, slug]
  )

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
    const legacy = r1LegacyGalleryOrder(selected?.id)
    if (legacy) return legacy
    if (selected?.images && selected.images.length > 0) {
      return selected.images
    }
    if (content.images.length > 0) {
      return content.images
    }
    return ["/robot/go2/go2.webp"]
  }, [selected, content.images])

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
              alt={richTextToPlainText(content.name)}
              isRTL={isRTL}
              ariaLabels={{
                close: richTextToPlainText(t("common.close")),
                previousImage: richTextToPlainText(t("common.previousImage")),
                nextImage: richTextToPlainText(t("common.nextImage")),
                viewFullscreen: richTextToPlainText(t("common.viewFullscreen")),
              }}
            />
          </div>

          {/* Right - Product details */}
          <div className={ isRTL ? "lg:order-1 py-5 md:py-25" : "py-5 md:py-25"}>
            <h1
              dir="ltr"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-left [unicode-bidi:isolate]"
            >
              <FormattedText text={content.name} as="span" />
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
                      <FormattedText text={t("robots.catalogManufacturer")} as="span" />:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedManufacturer}
                    </span>
                  </p>
                )}
                {resolvedSku && resolvedSku.trim() !== "" && (
                  <p>
                    <span className="font-medium text-gray-700">
                      <FormattedText text={t("robots.catalogSku")} as="span" />:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedSku}
                    </span>
                  </p>
                )}
                {resolvedMpn && resolvedMpn.trim() !== "" && (
                  <p>
                    <span className="font-medium text-gray-700">
                      <FormattedText text={t("robots.catalogManufacturerPart")} as="span" />:
                    </span>{" "}
                    <span dir="ltr" className="inline-block [unicode-bidi:isolate]">
                      {resolvedMpn}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Version selector — price below reflects selected variant */}
            {content.versions.length > 1 && (
              <VariantSelector
                versions={content.versions}
                selectedIndex={selectedVersion}
                onSelect={setVersion}
                isRTL={isRTL}
                label={t("robots.version")}
              />
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
                  <FormattedText text={t("common.contactUs")} as="span" />
                </Link>
              </div>
              <Link
                href={`/${lang}/robots/responsible-use`}
                className="text-sm text-gray-500 hover:text-primary transition-colors underline underline-offset-2 w-fit"
              >
                <FormattedText text={t("robots.responsibleUseLabel")} as="span" />
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
                <FormattedText text={t("common.specifications")} as="span" />
              </h2>
              <SpecsTable slug={slug} lang={lang} />
            </div>
          )}
      </div>
    </section>
  )
}

export default function RobotProductDetails(props: RobotProductDetailsProps) {
  return (
    <Suspense fallback={<section className="py-16 md:py-24 bg-white" aria-hidden />}>
      <RobotProductDetailsInner {...props} />
    </Suspense>
  )
}
