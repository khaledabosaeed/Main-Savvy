"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Truck, DollarSign, MessageCircle, Minus, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getRobotProductContent, getRobotLabel } from "@/lib/robots-locale"
import type { RobotSlug, Language } from "@/lib/robots-locale"
import SpecsTable from "./SpecsTable"
import en from "@/../public/locales/en.json"
import ar from "@/../public/locales/ar.json"

const bulletIcons = [Package, Truck, DollarSign, MessageCircle]

interface RobotProductDetailsProps {
  slug: RobotSlug
  lang: Language
}

export default function RobotProductDetails({ slug, lang }: RobotProductDetailsProps) {
  const { language } = useLanguage()
  const currentLang = (language || lang) as Language
  const content = getRobotProductContent(slug, currentLang)
  const isRTL = currentLang === "ar"

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedVersion, setSelectedVersion] = useState(0)
  const [quantity, setQuantity] = useState(1)

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
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              <Image
                src={images[selectedImage] || images[0]}
                alt={content.name}
                fill
                className={"object-contain p-8 "}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto justify-center">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i
                        ? "border-gray-900"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-contain p-4"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
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
            <p
              className={`text-2xl font-semibold text-gray-900 mb-8 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {content.price}
            </p>

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
                  {getRobotLabel(currentLang, "version")}
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

            {/* Quantity */}
            <div className="mb-8">
              <p
                className={`font-semibold text-gray-900 mb-3 ${
                  isRTL ? "text-right" : "text-left"
                }`}
              >
                {getRobotLabel(currentLang, "quantity")}
              </p>
              <div
                className={`flex items-center gap-2 w-fit ${
                  isRTL ? "flex-row-reverse ml-auto" : ""
                }`}
              >
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg font-medium"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:border-gray-400"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors text-center"
              >
                {content.addToCartText}
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="px-8 py-4 bg-amber-400 text-gray-900 rounded-lg font-semibold hover:bg-amber-500 transition-colors text-center"
              >
                {content.contactSalesText}
              </Link>
            </div>
          </div>
        </div>

        {/* Specifications table - G1 and H1 */}
        {(slug === "g1" || slug === "h1") && (
          <div className="mt-16 md:mt-24">
            <h2
              className={`text-2xl md:text-3xl font-bold text-gray-900 mb-6 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {(currentLang === "ar" ? ar : en).common?.specifications ?? "Specifications"}
            </h2>
            <SpecsTable
              slug={slug}
              lang={currentLang}
              singleColumn={true}
              valueColumnIndex={slug === "g1" ? 1 : 0}
            />
          </div>
        )}
      </div>
    </section>
  )
}
