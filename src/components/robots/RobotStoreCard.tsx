"use client"

import Image from "next/image"
import Link from "next/link"
import FormattedText from "@/components/shared/FormattedText"
import { richTextToPlainText } from "@/lib/rich-text"
import type { RobotCard } from "@/lib/robots-locale"

export default function RobotStoreCard({
  card,
  lang,
  isRTL,
}: {
  card: RobotCard
  lang: "en" | "ar"
  isRTL: boolean
}) {
  return (
    <Link
      href={`/${lang}${card.link}`}
      className="group relative block h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
        <Image
          src={card.image}
          alt={richTextToPlainText(card.name)}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6 flex flex-col gap-4">
        <h3
          className="text-xl font-semibold text-gray-900 leading-relaxed [unicode-bidi:isolate]"
          dir="ltr"
        >
          <FormattedText text={card.name} />
        </h3>

        <div className="pt-4 border-t border-gray-200">
          <span
            className={`inline-flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors w-fit ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <span>
              <FormattedText text={card.buttonText} />
            </span>
            <svg
              className={`h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 ${isRTL ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 md:h-5 overflow-hidden"
        aria-hidden
      >
        <Image
          src="/home-page/services/footer.svg"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
      </div>
    </Link>
  )
}
