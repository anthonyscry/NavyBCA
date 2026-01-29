/**
 * Converts BCA CSV lookup tables to compact TypeScript Map modules.
 * Run: node scripts/csv-to-ts.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function convertCsvToTs(csvPath, outputPath, exportName) {
  const csv = readFileSync(join(ROOT, csvPath), 'utf-8')
  const lines = csv.trim().split(/\r?\n/)

  // Group by HeightWaistDiff
  const groups = new Map()
  for (let i = 1; i < lines.length; i++) {
    const [diffRaw, weightRaw, bfRaw] = lines[i].split(',')
    const diffKey = parseFloat(diffRaw).toFixed(1)
    const weight = parseInt(weightRaw, 10)
    const bodyFat = parseInt(bfRaw, 10)

    if (!groups.has(diffKey)) {
      groups.set(diffKey, [])
    }
    groups.get(diffKey).push([weight, bodyFat])
  }

  // Build compact TypeScript source
  let ts = `// Auto-generated from ${csvPath}\n`
  ts += `// DO NOT EDIT MANUALLY \u2014 regenerate with: node scripts/csv-to-ts.mjs\n`
  ts += `// ${lines.length - 1} data rows, ${groups.size} height-waist-diff groups\n\n`
  ts += `const D: [string, [number, number][]][] = [\n`

  for (const [diffKey, entries] of groups) {
    const pairs = entries.map(([w, bf]) => `[${w},${bf}]`).join(',')
    ts += `["${diffKey}",[${pairs}]],\n`
  }

  ts += `]\n\n`
  ts += `export const ${exportName}: Map<string, Map<number, number>> = new Map(\n`
  ts += `  D.map(([k, v]) => [k, new Map(v)])\n`
  ts += `)\n`

  const outPath = join(ROOT, outputPath)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, ts, 'utf-8')

  console.log(`\u2713 ${outputPath} (${groups.size} groups, ${lines.length - 1} entries)`)
}

convertCsvToTs(
  'male_bca_table_FULL_NORMALIZED.csv',
  'src/data/bca-tables-male.ts',
  'bcaTableMale'
)

convertCsvToTs(
  'female_bca_table_FULL_NORMALIZED.csv',
  'src/data/bca-tables-female.ts',
  'bcaTableFemale'
)

console.log('\nDone! Both tables converted.')
