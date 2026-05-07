"use client"

import { useMemo, useState, useCallback, Suspense, useEffect } from "react"
import Link from "next/link"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import FormattedText from "@/components/shared/FormattedText"
import ProductImageGallery from "./ProductImageGallery"
import VariantSelector from "./VariantSelector"
import { richTextToPlainText } from "@/lib/rich-text"
import type { ProductVersion, Language, RobotSlug } from "@/lib/robots-locale"
import type { ProductSectionData } from "@/lib/robots-custom-page"
import { SHOW_ROBOT_PRICING } from "@/lib/robots-locale"
import { isCoreRobotSlug } from "@/lib/robots-locale"

export interface DynamicRobotProductSectionProps {
  section: ProductSectionData
  /** Used for variant URL sync on core robots only */
  routeSlug: string
  lang: Language
}

function Inner({ section, routeSlug, lang }: DynamicRobotProductSectionProps) {
  const { t } = useTranslation()
  const isRTL = lang === "ar"
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const content = useMemo(() => {
    const base = { ...section }
    if (!SHOW_ROBOT_PRICING) {
      return {
        ...base,
        price: "",
        versions: base.versions.map(({ price: _p, ...v }) => {
          void _p
          return v
        }),
      }
    }
    return base
  }, [section])

  const [selectedVersion, setSelectedVersion] = useState(0)
  const variantFromUrl = searchParams.get("variant")

  const slugAsRobot = routeSlug as RobotSlug

  useEffect(() => {
    if (!variantFromUrl || content.versions.length === 0) return
    const idx = content.versions.findIndex((v) => v.id === variantFromUrl)
    if (idx >= 0) setSelectedVersion(idx)
  }, [variantFromUrl, content.versions])

  const setVersion = useCallback(
    (i: number) => {
      setSelectedVersion(i)
      const id = content.versions[i]?.id
      if (id && isCoreRobotSlug(slugAsRobot)) {
        router.replace(`${pathname}?variant=${encodeURIComponent(id)}`, {
          scroll: false,
        })
      }
    },
    [content.versions, pathname, router, slugAsRobot]
  )

  const selectedPv = (content.versions[selectedVersion] ??
    content.versions[0]) as ProductVersion | undefined
  const displayPrice =
    SHOW_ROBOT_PRICING
      ? (selectedPv?.price?.trim() || content.price || "").trim()
      : ""

  const resolvedManufacturer =
    selectedPv?.manufacturerName ?? content.manufacturerName
  const resolvedSku = selectedPv?.sku ?? content.sku
  const resolvedMpn =
    selectedPv?.manufacturerPartNumber ?? content.manufacturerPartNumber

  const showCatalogBlock = [resolvedManufacturer, resolvedSku, resolvedMpn].some(
    (v) => typeof v === "string" && v.trim() !== ""
  )

  const galleryImages = useMemo(() => {
    if (selectedPv?.images && selectedPv.images.length > 0) return selectedPv.images
    if (content.images.length > 0) return content.images
    return ["/robot/go2/go2.webp"]
  }, [selectedPv, content.images])

  return (
    <section className="py-25 md:py-25 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 ${
            isRTL ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className={isRTL ? "" : ""}>
            <ProductImageGallery
              key={`${routeSlug}-${selectedPv?.id ?? "default"}`}
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

          <div className={isRTL ? "lg:order-1 py-5 md:py-25" : "py-5 md:py-25"}>
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

            {content.versions.length > 1 && (
              <VariantSelector
                versions={content.versions as ProductVersion[]}
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

            <div className="flex flex-col gap-4">
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
      </div>
    </section>
  )
}

export default function DynamicRobotProductSection(props: DynamicRobotProductSectionProps) {
  return (
    <Suspense fallback={<section className="py-16 md:py-24 bg-white" aria-hidden />}>
      <Inner {...props} />
    </Suspense>
  )
}
