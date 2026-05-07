"use client"

import FormattedText from "@/components/shared/FormattedText"
import type { ProductVersion } from "@/lib/robots-locale"

export interface VariantSelectorProps {
  versions: ProductVersion[]
  selectedIndex: number
  onSelect: (index: number) => void
  isRTL: boolean
  label: string
}

export default function VariantSelector({
  versions,
  selectedIndex,
  onSelect,
  isRTL,
  label,
}: VariantSelectorProps) {
  if (versions.length <= 1) return null

  return (
    <div className="mb-4">
      <p
        className={`font-semibold text-gray-900 mb-3 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        <FormattedText text={label} as="span" />
      </p>
      <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
        {versions.map((v, i) => (
          <button
            key={v.id}
            type="button"
            dir="ltr"
            onClick={() => onSelect(i)}
            className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
              selectedIndex === i
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            <FormattedText text={v.name} as="span" />
          </button>
        ))}
      </div>
    </div>
  )
}
