/**
 * Converts exercises-data.js to TypeScript module.
 * Run: node scripts/exercises-to-ts.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// The exercises-data.js uses var/const without export, so we eval it to get the data
const jsContent = readFileSync(join(ROOT, 'exercises-data.js'), 'utf-8')

// Create a sandbox to evaluate the JS
const sandbox = {}
const fn = new Function(jsContent + '\nreturn { warmupExercises, preCardioWarmup, cooldownExercises, db };')
const data = fn()

function serializeExercise(ex) {
  const parts = []
  parts.push(`name:${JSON.stringify(ex.name)}`)
  if (ex.tip) parts.push(`tip:${JSON.stringify(ex.tip)}`)
  if (ex.rep) parts.push(`rep:${JSON.stringify(ex.rep)}`)
  if (ex.desc) parts.push(`desc:${JSON.stringify(ex.desc)}`)
  if (ex.reps) parts.push(`reps:${JSON.stringify(ex.reps)}`)
  if (ex.duration) parts.push(`duration:${JSON.stringify(ex.duration)}`)
  if (ex.difficulty) parts.push(`difficulty:${JSON.stringify(ex.difficulty)}`)
  if (ex.muscleGroups) parts.push(`muscleGroups:${JSON.stringify(ex.muscleGroups)}`)
  if (ex.isCore) parts.push(`isCore:true`)
  if (ex.isFinisher) parts.push(`isFinisher:true`)
  if (ex.isLowImpact) parts.push(`isLowImpact:true`)
  // Team/sport exercises
  if (ex.howToPlay) parts.push(`howToPlay:${JSON.stringify(ex.howToPlay)}`)
  if (ex.teamSize) parts.push(`teamSize:${JSON.stringify(ex.teamSize)}`)
  if (ex.space) parts.push(`space:${JSON.stringify(ex.space)}`)
  if (ex.safety) parts.push(`safety:${JSON.stringify(ex.safety)}`)
  if (ex.noEquipment) parts.push(`noEquipment:true`)
  if (ex.preferredFacility) parts.push(`preferredFacility:${JSON.stringify(ex.preferredFacility)}`)
  return `{${parts.join(',')}}`
}

function serializeArray(arr, indent = '  ') {
  if (!arr || arr.length === 0) return '[]'
  return `[\n${arr.map(ex => `${indent}${serializeExercise(ex)}`).join(',\n')}\n]`
}

let ts = `// Auto-generated from exercises-data.js\n`
ts += `// DO NOT EDIT MANUALLY — regenerate with: node scripts/exercises-to-ts.mjs\n\n`
ts += `export interface Exercise {\n`
ts += `  name: string\n`
ts += `  tip?: string\n`
ts += `  rep?: string\n`
ts += `  desc?: string\n`
ts += `  reps?: string\n`
ts += `  duration?: string\n`
ts += `  difficulty?: 'beginner' | 'intermediate' | 'advanced'\n`
ts += `  muscleGroups?: string[]\n`
ts += `  isCore?: boolean\n`
ts += `  isFinisher?: boolean\n`
ts += `  isLowImpact?: boolean\n`
ts += `  howToPlay?: string\n`
ts += `  teamSize?: string\n`
ts += `  space?: string\n`
ts += `  safety?: string\n`
ts += `  noEquipment?: boolean\n`
ts += `  preferredFacility?: string\n`
ts += `}\n\n`

// Warmup
ts += `export const warmupExercises: Exercise[] = ${serializeArray(data.warmupExercises)}\n\n`
ts += `export const preCardioWarmup: Exercise[] = ${serializeArray(data.preCardioWarmup)}\n\n`
ts += `export const cooldownExercises: Exercise[] = ${serializeArray(data.cooldownExercises)}\n\n`

// Main db
ts += `export interface ExerciseDb {\n`
ts += `  strength: Record<string, Exercise[]>\n`
ts += `  cardio: Record<string, Exercise[]>\n`
ts += `  lowImpact: { strength: Record<string, Exercise[]>; cardio: Record<string, Exercise[]> }\n`
ts += `  yoga: Exercise[]\n`
ts += `  funday: Record<string, Exercise[]>\n`
ts += `}\n\n`
ts += `export const db: ExerciseDb = {\n`

// Strength
ts += `  strength: {\n`
for (const [key, arr] of Object.entries(data.db.strength)) {
  ts += `    ${key}: ${serializeArray(arr, '      ')},\n`
}
ts += `  },\n`

// Cardio
ts += `  cardio: {\n`
for (const [key, arr] of Object.entries(data.db.cardio)) {
  ts += `    ${key}: ${serializeArray(arr, '      ')},\n`
}
ts += `  },\n`

// Low Impact
ts += `  lowImpact: {\n`
ts += `    strength: {\n`
for (const [key, arr] of Object.entries(data.db.lowImpact.strength)) {
  ts += `      ${key}: ${serializeArray(arr, '        ')},\n`
}
ts += `    },\n`
ts += `    cardio: {\n`
for (const [key, arr] of Object.entries(data.db.lowImpact.cardio)) {
  ts += `      ${key}: ${serializeArray(arr, '        ')},\n`
}
ts += `    },\n`
ts += `  },\n`

// Yoga
ts += `  yoga: ${serializeArray(data.db.yoga || [], '    ')},\n`

// Funday
ts += `  funday: {\n`
for (const [key, arr] of Object.entries(data.db.funday || {})) {
  ts += `    ${key}: ${serializeArray(arr, '      ')},\n`
}
ts += `  },\n`
ts += `}\n`

writeFileSync(join(ROOT, 'src/data/exercises-data.ts'), ts, 'utf-8')

// Count total exercises
let total = 0
total += data.warmupExercises.length
total += data.preCardioWarmup.length  
total += data.cooldownExercises.length
for (const arr of Object.values(data.db.strength)) total += arr.length
for (const arr of Object.values(data.db.cardio)) total += arr.length
for (const arr of Object.values(data.db.lowImpact.strength)) total += arr.length
for (const arr of Object.values(data.db.lowImpact.cardio)) total += arr.length
if (data.db.yoga) total += data.db.yoga.length
if (data.db.funday) for (const arr of Object.values(data.db.funday)) total += arr.length

console.log(`\u2713 src/data/exercises-data.ts (${total} exercises)`)
