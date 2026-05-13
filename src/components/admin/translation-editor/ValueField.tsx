import RichTextArea from "@/components/admin/RichTextArea"
import { formatPathDisplay, isPlainObject } from "./json-helpers"
import type { JsonValue } from "./types"

export function ValueField({
  path,
  value,
  onChange,
  depth,
}: {
  path: string
  value: JsonValue
  onChange: (next: JsonValue) => void
  depth: number
}) {
  const pad = Math.min(depth, 6) * 10

  if (value === null) {
    return (
      <span className="text-xs text-zinc-500" style={{ marginLeft: pad }}>
        null
      </span>
    )
  }

  if (typeof value === "string") {
    return (
      <RichTextArea
        key={path}
        id={path}
        label={formatPathDisplay(path)}
        value={value}
        onChange={(next) => onChange(next)}
        padLeft={pad}
      />
    )
  }

  if (typeof value === "number") {
    return (
      <div className="min-w-0" style={{ marginLeft: pad }}>
        <label
          htmlFor={path}
          className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500"
        >
          {formatPathDisplay(path)}
        </label>
        <input
          id={path}
          type="number"
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => {
            const n = parseFloat(e.target.value)
            onChange(Number.isNaN(n) ? 0 : n)
          }}
          className="w-full max-w-xs rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 font-mono text-sm text-zinc-100 outline-none focus:border-primary"
        />
      </div>
    )
  }

  if (typeof value === "boolean") {
    return (
      <div style={{ marginLeft: pad }}>
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-zinc-200">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-600"
          />
          {String(value)}
        </label>
      </div>
    )
  }

  if (Array.isArray(value)) {
    return (
      <div className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4" style={{ marginLeft: pad }}>
        <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
          {formatPathDisplay(path)}
        </span>
        {value.map((item, i) => (
          <div
            key={`${path}[${i}]`}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3"
          >
            <div className="mb-2 text-xs font-medium text-zinc-500">Item [{i}]</div>
            <ValueField
              path={`${path}[${i}]`}
              value={item}
              depth={0}
              onChange={(next) => {
                const copy = [...value]
                copy[i] = next
                onChange(copy)
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  if (isPlainObject(value)) {
    const entries = Object.entries(value)
    return (
      <div className="flex flex-col gap-4 border-l-2 border-zinc-800 pl-4" style={{ marginLeft: pad }}>
        {depth > 0 && (
          <span className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
            {formatPathDisplay(path)}
          </span>
        )}
        {entries.map(([key, child]) => (
          <div key={key} className="min-w-0">
            <ValueField
              path={`${path}.${key}`}
              value={child}
              depth={depth + 1}
              onChange={(next) => {
                onChange({ ...value, [key]: next })
              }}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <span className="text-xs text-zinc-400" style={{ marginLeft: pad }}>
      {String(value)}
    </span>
  )
}
