"use client"

import type { ReactNode } from "react"
import ImageUploadField from "@/components/admin/ImageUploadField"
import type {
  RobotPageSectionData,
  CatalogCardSectionData,
  StoreRobotCategory,
  ScrollVideoSectionData,
  SpecsSectionData,
} from "@/lib/robots-custom-page"

const CATEGORIES: StoreRobotCategory[] = [
  "industrial",
  "educational",
  "entertainment",
]

export default function RobotSectionEditor({
  section,
  onChange,
  slugHint,
}: {
  section: RobotPageSectionData
  onChange: (next: RobotPageSectionData) => void
  slugHint: string
}) {
  switch (section.type) {
    case "hero":
      return (
        <HeroFields section={section} onChange={onChange} />
      )
    case "product":
      return (
        <ProductFields section={section} onChange={onChange} />
      )
    case "specs":
      return (
        <SpecsEditor
          sections={section.sections}
          onChange={(sections) => onChange({ ...section, sections })}
        />
      )
    case "scrollVideo":
      return (
        <ScrollVideoEditor
          items={section.items}
          onChange={(items) => onChange({ ...section, items })}
        />
      )
    case "image":
      return (
        <ImageSectionFields section={section} onChange={onChange} />
      )
    case "carousel":
      return (
        <CarouselFields section={section} onChange={onChange} />
      )
    case "catalogCard":
      return (
        <CatalogCardEditor
          section={section}
          onChange={onChange}
          slugHint={slugHint}
        />
      )
    default: {
      const _exhaustive: never = section
      return _exhaustive
    }
  }
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      {children}
    </div>
  )
}

function HeroFields({
  section,
  onChange,
}: {
  section: Extract<RobotPageSectionData, { type: "hero" }>
  onChange: (next: RobotPageSectionData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <ImageUploadField
          label="Video URL"
          value={section.videoSrc}
          onChange={(url) => onChange({ ...section, videoSrc: url })}
          folder="/robots"
        />
        <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">
          Upload an <strong>MP4/WebM</strong> file, pick from gallery, or paste a{" "}
          <strong>YouTube / Vimeo</strong> link. Watch-page URLs are converted to
          embeds automatically.
        </p>
      </div>
      <div>
        <ImageUploadField
          label="Poster image (optional)"
          value={section.posterImage ?? ""}
          onChange={(url) => onChange({ ...section, posterImage: url })}
        />
        <p className="mt-1.5 text-[10px] leading-snug text-zinc-500">
          Optional still shown while the hero loads. If this matches{" "}
          <strong>Video URL</strong>, it is ignored so one file plays directly with no
          duplicate layer.
        </p>
      </div>
      <Field label="Title">
        <textarea
          value={section.title}
          onChange={(e) =>
            onChange({ ...section, title: e.target.value })
          }
          rows={2}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Subtitle">
        <textarea
          value={section.subtitle}
          onChange={(e) =>
            onChange({ ...section, subtitle: e.target.value })
          }
          rows={3}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Text placement">
        <select
          value={section.textPlacement}
          onChange={(e) =>
            onChange({
              ...section,
              textPlacement: e.target.value as typeof section.textPlacement,
            })
          }
          className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </Field>
      <Field label="Button text">
        <input
          value={section.buttonText}
          onChange={(e) =>
            onChange({ ...section, buttonText: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <FeatureList
        features={section.features ?? []}
        onChange={(features) => onChange({ ...section, features })}
      />
    </div>
  )
}

function FeatureList({
  features,
  onChange,
}: {
  features: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        Features (optional)
      </p>
      {features.map((f, i) => (
        <div key={i} className="flex gap-2">
          <input
            value={f}
            onChange={(e) => {
              const next = [...features]
              next[i] = e.target.value
              onChange(next)
            }}
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
          />
          <button
            type="button"
            className="rounded border border-zinc-600 px-2 text-zinc-400 hover:bg-zinc-800"
            onClick={() => onChange(features.filter((_, j) => j !== i))}
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline"
        onClick={() => onChange([...features, ""])}
      >
        + Add feature
      </button>
    </div>
  )
}

function ProductFields({
  section,
  onChange,
}: {
  section: Extract<RobotPageSectionData, { type: "product" }>
  onChange: (next: RobotPageSectionData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Product name">
        <textarea
          value={section.name}
          onChange={(e) => onChange({ ...section, name: e.target.value })}
          rows={2}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Price">
        <input
          value={section.price}
          onChange={(e) => onChange({ ...section, price: e.target.value })}
          className="w-full max-w-md rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <StringList
        label="Gallery images"
        items={section.images}
        onChange={(images) => onChange({ ...section, images })}
        multiline={false}
      />
      <StringList
        label="Bullet points"
        items={section.bulletPoints}
        onChange={(bulletPoints) => onChange({ ...section, bulletPoints })}
      />
      <Field label="SKU">
        <input
          value={section.sku ?? ""}
          onChange={(e) => onChange({ ...section, sku: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Manufacturer">
        <input
          value={section.manufacturerName ?? ""}
          onChange={(e) =>
            onChange({ ...section, manufacturerName: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Manufacturer part #">
        <input
          value={section.manufacturerPartNumber ?? ""}
          onChange={(e) =>
            onChange({
              ...section,
              manufacturerPartNumber: e.target.value,
            })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <VersionsEditor
        versions={section.versions}
        onChange={(versions) => onChange({ ...section, versions })}
      />
    </div>
  )
}

function StringList({
  label,
  items,
  onChange,
  multiline = true,
  useImageUpload = false,
}: {
  label: string
  items: string[]
  onChange: (v: string[]) => void
  multiline?: boolean
  useImageUpload?: boolean
}) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      {items.map((item, i) => (
        <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-start">
          {useImageUpload ? (
            <div className="min-w-0 flex-1">
              <ImageUploadField
                label={`Image ${i + 1}`}
                value={item}
                onChange={(url) => {
                  const next = [...items]
                  next[i] = url
                  onChange(next)
                }}
              />
            </div>
          ) : multiline ? (
            <textarea
              value={item}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              rows={2}
              className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          ) : (
            <input
              value={item}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          )}
          <button
            type="button"
            className="shrink-0 rounded border border-zinc-600 px-2 py-1 text-zinc-400 hover:bg-zinc-800"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline"
        onClick={() => onChange([...items, ""])}
      >
        + Add row
      </button>
    </div>
  )
}

function VersionsEditor({
  versions,
  onChange,
}: {
  versions: {
    id: string
    name: string
    price?: string
    images?: string[]
  }[]
  onChange: (
    v: {
      id: string
      name: string
      price?: string
      images?: string[]
    }[]
  ) => void
}) {
  return (
    <div className="space-y-4 border-t border-zinc-800 pt-4">
      <p className="text-sm font-semibold text-zinc-300">Versions</p>
      {versions.map((v, i) => (
        <div
          key={i}
          className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3"
        >
          <Field label="Variant ID">
            <input
              value={v.id}
              onChange={(e) => {
                const next = [...versions]
                next[i] = { ...next[i], id: e.target.value }
                onChange(next)
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100"
            />
          </Field>
          <Field label="Variant name">
            <input
              value={v.name}
              onChange={(e) => {
                const next = [...versions]
                next[i] = { ...next[i], name: e.target.value }
                onChange(next)
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <Field label="Variant price (optional)">
            <input
              value={v.price ?? ""}
              onChange={(e) => {
                const next = [...versions]
                next[i] = { ...next[i], price: e.target.value }
                onChange(next)
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <StringList
            label="Variant images (optional)"
            items={v.images ?? []}
            onChange={(images) => {
              const next = [...versions]
              next[i] = { ...next[i], images }
              onChange(next)
            }}
            useImageUpload
          />
          <button
            type="button"
            className="text-xs text-red-300 hover:underline"
            onClick={() => onChange(versions.filter((_, j) => j !== i))}
          >
            Remove variant
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline"
        onClick={() =>
          onChange([
            ...versions,
            { id: `v-${versions.length + 1}`, name: "New variant" },
          ])
        }
      >
        + Add variant
      </button>
    </div>
  )
}

function SpecsEditor({
  sections,
  onChange,
}: {
  sections: SpecsSectionData["sections"]
  onChange: (v: SpecsSectionData["sections"]) => void
}) {
  return (
    <div className="space-y-6">
      {sections.map((block, bi) => (
        <div
          key={bi}
          className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-400">
              Table {bi + 1}
            </span>
            <button
              type="button"
              className="text-xs text-red-300 hover:underline"
              onClick={() => onChange(sections.filter((_, j) => j !== bi))}
            >
              Remove table
            </button>
          </div>
          <Field label="Section header">
            <input
              value={block.header}
              onChange={(e) => {
                const next = [...sections]
                next[bi] = { ...next[bi], header: e.target.value }
                onChange(next)
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <div className="mt-3">
            <ImageUploadField
              label="Header image (optional)"
              value={block.headerImage ?? ""}
              onChange={(url) => {
                const next = [...sections]
                next[bi] = { ...next[bi], headerImage: url || undefined }
                onChange(next)
              }}
            />
          </div>
          <Field label="Columns (comma-separated)">
            <input
              value={block.columns.join(", ")}
              onChange={(e) => {
                const cols = e.target.value.split(",").map((c) => c.trim())
                const next = [...sections]
                next[bi] = { ...next[bi], columns: cols }
                onChange(next)
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <div className="mt-3 space-y-2">
            <p className="text-[11px] font-medium uppercase text-zinc-500">
              Rows
            </p>
            {block.rows.map((row, ri) => (
              <div key={ri} className="flex flex-wrap gap-2">
                {row.map((cell, ci) => (
                  <input
                    key={ci}
                    value={cell}
                    placeholder={`Col ${ci + 1}`}
                    onChange={(e) => {
                      const next = [...sections]
                      const rows = [...next[bi].rows]
                      const r = [...rows[ri]]
                      r[ci] = e.target.value
                      rows[ri] = r
                      next[bi] = { ...next[bi], rows }
                      onChange(next)
                    }}
                    className="min-w-[120px] flex-1 rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-xs text-zinc-100"
                  />
                ))}
                <button
                  type="button"
                  className="text-xs text-red-300"
                  onClick={() => {
                    const next = [...sections]
                    next[bi] = {
                      ...next[bi],
                      rows: next[bi].rows.filter((_, j) => j !== ri),
                    }
                    onChange(next)
                  }}
                >
                  × row
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => {
                const next = [...sections]
                const colCount = Math.max(block.columns.length, 1)
                next[bi] = {
                  ...next[bi],
                  rows: [...next[bi].rows, Array(colCount).fill("")],
                }
                onChange(next)
              }}
            >
              + Add row
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="rounded-lg border border-zinc-600 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800"
        onClick={() =>
          onChange([
            ...sections,
            {
              header: "New table",
              columns: ["Spec", "Value"],
              rows: [["", ""]],
            },
          ])
        }
      >
        + Add specs table
      </button>
    </div>
  )
}

function ScrollVideoEditor({
  items,
  onChange,
}: {
  items: ScrollVideoSectionData["items"]
  onChange: (v: ScrollVideoSectionData["items"]) => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] leading-snug text-zinc-500">
        Each block: direct MP4/WebM/R2 URL, or YouTube/Vimeo link (embedded
        automatically).
      </p>
      {items.map((item, i) => (
        <div
          key={i}
          className="space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/40 p-3"
        >
          <div className="flex justify-between gap-2">
            <span className="text-xs font-semibold text-zinc-400">
              Block {i + 1}
            </span>
            <button
              type="button"
              className="text-xs text-red-300"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              Remove
            </button>
          </div>
          <Field label="Video URL">
            <input
              value={item.videoSrc}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...next[i], videoSrc: e.target.value }
                onChange(next)
              }}
              placeholder="MP4 URL or YouTube / Vimeo…"
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <Field label="Title">
            <textarea
              value={item.title}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...next[i], title: e.target.value }
                onChange(next)
              }}
              rows={2}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
          <Field label="Subtitle">
            <textarea
              value={item.subtitle}
              onChange={(e) => {
                const next = [...items]
                next[i] = { ...next[i], subtitle: e.target.value }
                onChange(next)
              }}
              rows={3}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
            />
          </Field>
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline"
        onClick={() =>
          onChange([
            ...items,
            { videoSrc: "", title: "", subtitle: "" },
          ])
        }
      >
        + Add video block
      </button>
    </div>
  )
}

function ImageSectionFields({
  section,
  onChange,
}: {
  section: Extract<RobotPageSectionData, { type: "image" }>
  onChange: (next: RobotPageSectionData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Section title (optional)">
        <input
          value={section.title ?? ""}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <StringList
        label="Images"
        items={section.images}
        onChange={(images) => onChange({ ...section, images })}
        useImageUpload
      />
    </div>
  )
}

function CarouselFields({
  section,
  onChange,
}: {
  section: Extract<RobotPageSectionData, { type: "carousel" }>
  onChange: (next: RobotPageSectionData) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <Field label="Title">
        <input
          value={section.title ?? ""}
          onChange={(e) => onChange({ ...section, title: e.target.value })}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Subtitle">
        <textarea
          value={section.subtitle ?? ""}
          onChange={(e) =>
            onChange({ ...section, subtitle: e.target.value })
          }
          rows={2}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <StringList
        label="Carousel images"
        items={section.images}
        onChange={(images) => onChange({ ...section, images })}
        useImageUpload
      />
      <CarouselItemsEditor
        items={section.items}
        onChange={(items) => onChange({ ...section, items })}
      />
    </div>
  )
}

function CarouselItemsEditor({
  items,
  onChange,
}: {
  items: { header: string; subtext: string }[]
  onChange: (v: { header: string; subtext: string }[]) => void
}) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium uppercase text-zinc-500">
        Slide captions (same order as images)
      </p>
      {items.map((it, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded border border-zinc-800 p-2"
        >
          <input
            placeholder="Header"
            value={it.header}
            onChange={(e) => {
              const next = [...items]
              next[i] = { ...next[i], header: e.target.value }
              onChange(next)
            }}
            className="rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100"
          />
          <textarea
            placeholder="Subtext"
            value={it.subtext}
            onChange={(e) => {
              const next = [...items]
              next[i] = { ...next[i], subtext: e.target.value }
              onChange(next)
            }}
            rows={2}
            className="rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100"
          />
        </div>
      ))}
      <button
        type="button"
        className="text-xs text-primary hover:underline"
        onClick={() => onChange([...items, { header: "", subtext: "" }])}
      >
        + Add caption row
      </button>
    </div>
  )
}

function CatalogCardEditor({
  section,
  onChange,
  slugHint,
}: {
  section: CatalogCardSectionData
  onChange: (next: RobotPageSectionData) => void
  slugHint: string
}) {
  const suggestedLink =
    slugHint && slugHint.length > 0 ? `/robots/${slugHint}` : ""

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xs text-zinc-500">
        Store grid card. Link path should match this page (e.g.{" "}
        <code className="rounded bg-zinc-800 px-1">
          {suggestedLink || "/robots/your-slug"}
        </code>
        ).
      </p>
      <Field label="Name">
        <input
          value={section.name}
          onChange={(e) =>
            onChange({ ...section, name: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Description">
        <textarea
          value={section.description}
          onChange={(e) =>
            onChange({ ...section, description: e.target.value })
          }
          rows={3}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <ImageUploadField
        label="Card image"
        value={section.image}
        onChange={(url) => onChange({ ...section, image: url })}
      />
      <Field label="Button text">
        <input
          value={section.buttonText}
          onChange={(e) =>
            onChange({ ...section, buttonText: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Link path (no locale prefix)">
        <input
          value={section.link}
          onChange={(e) => onChange({ ...section, link: e.target.value })}
          placeholder={suggestedLink}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100"
        />
      </Field>
      <Field label="Product link (optional)">
        <input
          value={section.productLink ?? ""}
          onChange={(e) =>
            onChange({ ...section, productLink: e.target.value })
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        />
      </Field>
      <Field label="Category">
        <select
          value={section.category}
          onChange={(e) =>
            onChange({
              ...section,
              category: e.target.value as StoreRobotCategory,
            })
          }
          className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
    </div>
  )
}
