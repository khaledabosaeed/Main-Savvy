import { isAppLanguage } from "@/i18n/settings"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: Promise<{ lang: string }>
}

export default async function G1ProductPage({ params }: ProductPageProps) {
  const { lang } = await params
  if (!isAppLanguage(lang)) {
    notFound()
  }
  notFound()
}
