"use client"

import PageAbout from "@/components/shared/PageAbout/PageAbout"
import type { Language } from "./content"
import { getExpoAboutContent } from "./content"

interface ExpoAboutProps {
  lang: Language
}

export default function ExpoAbout({ lang }: ExpoAboutProps) {
  const t = (key: keyof typeof import("./content").expoAboutContent.en) =>
    getExpoAboutContent(lang, key)

  const images = [
    { src: "/expo/ExpoAbout/4.jpg", alt: "Screen Display" },
    { src: "/expo/ExpoAbout/2.jpg", alt: "Exhibition Booth" },
    { src: "/expo/ExpoAbout/3.jpg", alt: "Interactive Display" },
    { src: "/expo/ExpoAbout/1.jpg", alt: "Robot Display" },
  ]

  return (
    <PageAbout
      title={t("title")}
      description={t("description")}
      images={images}
    />
  )
}
