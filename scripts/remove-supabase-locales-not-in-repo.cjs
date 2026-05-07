/**
 * Remove translation keys from Supabase that do not exist in public/locales/*.json.
 *
 * Starts from a deep clone of DB `content`, deletes only branches/keys missing from the
 * matching local file, and writes the cleaned content back to Supabase. Existing keys that
 * also exist in the repo keep their current DB values, even if those values differ locally.
 *
 * Usage:
 *   NEXT_PUBLIC_SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/remove-supabase-locales-not-in-repo.cjs
 *   ... --dry-run  # preview only, no writes
 *
 * Run from repo root (the folder that contains `package.json`, `public/`, and `scripts/`).
 * Or from repo root: `npm run prune:translations:db-extra -- --dry-run`
 *
 * After a real run, redeploy or revalidateTag("translations") so Next cached getDictionary() refreshes.
 */
const fs = require("fs")
const path = require("path")
const { createClient } = require("@supabase/supabase-js")

const root = path.join(__dirname, "..")
const dryRun = process.argv.includes("--dry-run")

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function deepClone(v) {
  return JSON.parse(JSON.stringify(v))
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

/**
 * Deep-clone `dbTree`, then delete every DB key path that is absent from `fileTree`.
 * If a key exists in both and both values are plain objects, recurse. Shared primitives,
 * arrays, and objects are not overwritten.
 */
function removeKeysMissingFromFile(dbTree, fileTree) {
  const out = deepClone(dbTree)

  function walk(d, f) {
    for (const key of Object.keys(d)) {
      if (!(key in f)) {
        delete d[key]
      } else if (isPlainObject(d[key]) && isPlainObject(f[key])) {
        walk(d[key], f[key])
      }
    }
  }

  walk(out, fileTree)
  return out
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

  if (dryRun) {
    console.log("\nDRY RUN — no database writes")
  }
  console.log(
    "Removing only Supabase translation paths that are missing from public/locales/*.json."
  )

  let totalRemovedPaths = 0

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

    if (!row) {
      console.log(`[${locale}] No row found in Supabase translations table.`)
      continue
    }

    const dbContent =
      row.content && typeof row.content === "object" && !Array.isArray(row.content)
        ? row.content
        : {}

    const dbOnlyPaths = getMissingPaths(dbContent, fileContent)
    totalRemovedPaths += dbOnlyPaths.length

    if (dbOnlyPaths.length > 0) {
      console.log(`Will remove from Supabase (${dbOnlyPaths.length}):`)
      dbOnlyPaths.forEach((p) => console.log("  -", p))
    } else {
      console.log("Nothing to remove — every DB path exists in repo at object level.")
    }

    if (dryRun || dbOnlyPaths.length === 0) {
      console.log(`Summary: ${dbOnlyPaths.length} path(s) would be removed.`)
      continue
    }

    const next = removeKeysMissingFromFile(dbContent, fileContent)

    const { error: upError } = await supabase.from("translations").upsert(
      { locale, content: next, updated_at: new Date().toISOString() },
      { onConflict: "locale" }
    )

    if (upError) {
      console.error(`[${locale}] upsert:`, upError.message)
      process.exit(1)
    }

    console.log(`[${locale}] OK — removed DB-only keys; shared DB keys were not changed.`)
  }

  if (dryRun) {
    console.log(`\nDry run complete. Total Supabase-only paths: ${totalRemovedPaths}`)
    console.log("Run without --dry-run to remove those keys from Supabase.")
  } else {
    console.log(`\nDone. Removed ${totalRemovedPaths} Supabase-only path(s).`)
    console.log(
      "Invalidate Next cache for translations (redeploy or revalidateTag(\"translations\")) so visitors see updates."
    )
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
