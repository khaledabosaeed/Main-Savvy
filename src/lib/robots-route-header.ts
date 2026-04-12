import { getDictionary } from "@/i18n/getDictionary"
import { robotsSubpageHeaderTexts } from "@/i18n/page-header-texts"
import type { AppLanguage } from "@/i18n/settings"

/** UnifiedHeader `texts` for /robots/* subroutes (not the robots index). */
export async function robotsRouteHeaderTexts(lang: AppLanguage) {
  return robotsSubpageHeaderTexts(await getDictionary(lang))
}
