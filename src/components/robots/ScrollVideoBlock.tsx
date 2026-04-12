"use client"

import type { ReactNode } from "react"

import {
  hasScrollHighlights,
  parseScrollHighlights,
} from "@/components/robots/scroll-rich-text"

export interface ScrollVideoItem {
  scrollVideoSrc: string
  scrollTitle: string
  scrollSubtitle: string
}

const mutedBodyClass =
  "w-full text-lg leading-relaxed text-[#86868b] md:text-xl whitespace-pre-line"

export function ScrollVideoBlock({
  item,
  isRTL,
}: {
  item: ScrollVideoItem
  isRTL: boolean
}) {
  const title = item.scrollTitle.trim()
  const subtitle = item.scrollSubtitle.trim()

  const subRich = subtitle ? hasScrollHighlights(subtitle) : false
  const titleRich = title ? hasScrollHighlights(title) : false

  let textBlock: ReactNode = null

  if (subtitle && title) {
    textBlock = (
      <>
        <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mx-auto mb-6 h-px w-12 bg-white/20 md:w-16" />
        {subRich ? (
          <p className={mutedBodyClass}>{parseScrollHighlights(subtitle)}</p>
        ) : (
          <p className={mutedBodyClass}>{subtitle}</p>
        )}
      </>
    )
  } else if (subtitle && !title) {
    textBlock = subRich ? (
      <p className={mutedBodyClass}>{parseScrollHighlights(subtitle)}</p>
    ) : (
      <p className={mutedBodyClass}>{subtitle}</p>
    )
  } else if (title && !subtitle) {
    textBlock = titleRich ? (
      <p className={mutedBodyClass}>{parseScrollHighlights(title)}</p>
    ) : (
      <p className={mutedBodyClass}>{title}</p>
    )
  }

  return (
    <div className="flex w-full flex-col gap-8 md:gap-10">
      <div
        className="w-full text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {textBlock}
      </div>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src={item.scrollVideoSrc}
        />
        <div className="pointer-events-none absolute inset-0 bg-black/20" />
      </div>
    </div>
  )
}
