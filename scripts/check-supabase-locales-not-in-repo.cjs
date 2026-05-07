/**
 * Check translation keys that exist in Supabase but are missing from public/locales/*.json.
 *
 * This script is read-only. It never writes to Supabase or local JSON files.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/check-supabase-locales-not-in-repo.cjs
 *   ... --verbose  # also list paths where DB and repo both exist but values differ
 *
 * Run from repo root (the folder that contains `package.json`, `public/`, and `scripts/`).
 * Or from repo root: `npm run check:translations:db-extra`
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..")
const verbose = process.argv.includes("--verbose")

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function topLevelKeysOnlyInBase(base, override) {
  return Object.keys(base).filter((k) => override[k] === undefined)
}

/** Paths present in `base` but absent from `override`. Recurses into plain objects only. */
function getMissingPaths(base, override, prefix = "") {
  let paths = []
  for (const key of Object.keys(base)) {
    const currentPath = prefix ? `${prefix}.${key}` : key
    if (!(key in override)) {
      paths.push(currentPath)
    } else if (isPlainObject(base[key]) && isPlainObject(override[key])) {
      paths = paths.concat(getMissingPaths(base[key], override[key], currentPath))
    }
  }
  return paths
}

function getChangedPaths(base, override, prefix = "") {
  let paths = []
  for (const key of Object.keys(base)) {
    if (!(key in override)) continue
    const currentPath = prefix ? `${prefix}.${key}` : key
    const bb = base[key]
    const ob = override[key]
    if (isPlainObject(bb) && isPlainObject(ob)) {
      paths = paths.concat(getChangedPaths(bb, ob, currentPath))
    } else if (JSON.stringify(bb) !== JSON.stringify(ob)) {
      paths.push(currentPath)
    }
  }
  return paths
}

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
    process.exit(1)
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  console.log("\nRead-only check — no database or repo writes")
  console.log(
    "Listing: paths in Supabase translations.content that are not in public/locales/*.json."
  )
  if (verbose) {
    console.log("--verbose: also show keys that exist in both but differ.")
  }

  let totalDbOnlyPaths = 0

  for (const locale of ["en", "ar"]) {
    console.log(`\n================ ${locale.toUpperCase()} ================`)

    const filePath = path.join(root, "public", "locales", `${locale}.json`)
    const fileContent = JSON.parse(fs.readFileSync(filePath, "utf8"))

    const { data: row, error: fetchError } = await supabase
      .from("translations")
      .select("content")
      .eq("locale", locale)
      .maybeSingle()

    if (fetchError) {
      console.error(`[${locale}] fetch:`, fetchError.message)
      process.exit(1)
    }

    const dbContent =
      row?.content && typeof row.content === "object" && !Array.isArray(row.content)
        ? row.content
        : {}

    if (!row) {
      console.log(`[${locale}] No row found in Supabase translations table.`)
      continue
    }

    const onlyInDb = topLevelKeysOnlyInBase(dbContent, fileContent)
    if (onlyInDb.length > 0) {
      console.log(`Top-level keys present only in Supabase: ${onlyInDb.join(", ")}`)
    }

    const dbOnlyPaths = getMissingPaths(dbContent, fileContent)
    const changedPaths = getChangedPaths(dbContent, fileContent)
    totalDbOnlyPaths += dbOnlyPaths.length

    if (dbOnlyPaths.length > 0) {
      console.log(`In database, not in locale file (${dbOnlyPaths.length}):`)
      dbOnlyPaths.forEach((p) => console.log("  ", p))
    } else {
      console.log("In database, not in locale file: (none — every DB path exists in repo at object level)")
    }

    if (verbose && changedPaths.length > 0) {
      console.log(`\nAlso in both but different value (${changedPaths.length}):`)
      changedPaths.slice(0, 50).forEach((p) => console.log("  ~", p))
      if (changedPaths.length > 50) console.log(`  ... and ${changedPaths.length - 50} more`)
    }

    console.log(`\nSummary: ${dbOnlyPaths.length} path(s) exist only in Supabase.`)
  }

  console.log(`\nCheck complete. Total Supabase-only paths: ${totalDbOnlyPaths}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
