// ─── BCA Calculation Engine ───
// Pure functions — no DOM, no React, no side effects.
// Ported from index.old.html (lines 1957–2227).

import { bcaTableMale } from '@/data/bca-tables-male'
import { bcaTableFemale } from '@/data/bca-tables-female'

// ─── Types ───

export type Gender = 'male' | 'female'

export interface BCAInput {
  gender: Gender
  heightFeet: number
  heightInches: number // 0, 0.5, 1, 1.5 … 11.5
  weight: number       // pounds
  waist: number        // inches
}

export interface BCAResult {
  // Rounded measurements
  roundedHeight: number    // inches, rounded UP to nearest 0.5"
  roundedWeight: number    // pounds, rounded to nearest integer
  roundedWaist: number     // inches, rounded DOWN to nearest 0.5"
  heightWaistDiff: number  // height − waist, rounded to nearest 0.5"

  // Step 1: WHtR
  whtr: number             // waist / height, truncated to 4 decimals
  maxWaist: number         // maximum waist for step 1 pass
  step1Pass: boolean       // whtr ≤ 0.5499

  // Step 2: Body Fat
  bodyFatPercent: number   // from lookup table or fallback formula
  maxBodyFat: number       // 26 (male) or 36 (female)
  bodyFatDiff: number      // maxBodyFat − bodyFatPercent
  step2Pass: boolean       // bodyFatPercent ≤ maxBodyFat

  // Overall
  overallPass: boolean     // step1Pass OR step2Pass
  gender: Gender
}

export interface GoalPath {
  title: string
  targetWaist: number
  targetWeight: number
  waistChange: number
  weightChange: number
  totalChange: number
  timeline: number   // weeks
  note: string
  easiest: boolean
}

// ─── Rounding helpers ───

/** Height rounds UP to nearest 0.5" per Navy regs. */
export function roundHeight(rawInches: number): number {
  return Math.ceil(rawInches * 2) / 2
}

/** Waist rounds DOWN to nearest 0.5" per Navy regs. */
export function roundWaist(rawInches: number): number {
  return Math.floor(rawInches * 2) / 2
}

/** Weight rounds to nearest pound. */
export function roundWeight(raw: number): number {
  return Math.round(raw)
}

/** Max waist that passes Step 1 for a given height. */
export function getMaxWaist(height: number): number {
  return Math.floor(height * 0.5499 * 2) / 2
}

// ─── Table lookup ───

function normalizeDiffKey(heightWaistDiff: number): string {
  return heightWaistDiff.toFixed(1)
}

function getBcaTableValue(
  gender: Gender,
  heightWaistDiff: number,
  weight: number,
): number | null {
  const diffKey = normalizeDiffKey(heightWaistDiff)
  const weightKey = Math.round(weight)
  const table = gender === 'male' ? bcaTableMale : bcaTableFemale
  const weightMap = table.get(diffKey)
  if (!weightMap) return null
  return weightMap.get(weightKey) ?? null
}

// ─── Body‑fat estimation ───

function getMaleBF(heightWaistDiff: number, weight: number): number {
  const tableValue = getBcaTableValue('male', heightWaistDiff, weight)
  if (tableValue !== null) return tableValue
  // Fallback linear estimate
  const clampedWeight = Math.min(400, Math.max(100, Math.round(weight)))
  const baseBF = 39.0 - 0.76 * heightWaistDiff + 0.04 * clampedWeight
  return Math.max(0, Math.floor(baseBF + 1e-6))
}

function getFemaleBF(heightWaistDiff: number, weight: number): number {
  const tableValue = getBcaTableValue('female', heightWaistDiff, weight)
  if (tableValue !== null) return tableValue
  // Fallback linear estimate
  const clampedWeight = Math.min(400, Math.max(61, Math.round(weight)))
  const baseBF = 39.0 - 0.62 * heightWaistDiff + 0.08 * clampedWeight
  return Math.max(0, Math.floor(baseBF + 1e-6))
}

// ─── Main calculation ───

export function calculateBCA(input: BCAInput): BCAResult {
  const rawHeight = input.heightFeet * 12 + input.heightInches
  const roundedHeight = roundHeight(rawHeight)
  const roundedWeight = roundWeight(input.weight)
  const roundedWaist = roundWaist(input.waist)

  // Step 1: Waist‑to‑Height Ratio
  const whtrRaw = roundedWaist / roundedHeight
  const whtr = Math.floor(whtrRaw * 10000) / 10000 // truncate, NOT round
  const step1Pass = whtr <= 0.5499
  const maxWaist = getMaxWaist(roundedHeight)

  // Step 2: Body Fat %
  const heightWaistDiff = Math.round((roundedHeight - roundedWaist) * 2) / 2
  const bodyFatPercent =
    input.gender === 'male'
      ? getMaleBF(heightWaistDiff, roundedWeight)
      : getFemaleBF(heightWaistDiff, roundedWeight)

  const maxBodyFat = input.gender === 'male' ? 26 : 36
  const step2Pass = bodyFatPercent <= maxBodyFat
  const overallPass = step1Pass || step2Pass

  return {
    roundedHeight,
    roundedWeight,
    roundedWaist,
    heightWaistDiff,
    whtr,
    maxWaist,
    step1Pass,
    bodyFatPercent,
    maxBodyFat,
    bodyFatDiff: maxBodyFat - bodyFatPercent,
    step2Pass,
    overallPass,
    gender: input.gender,
  }
}

// ─── Path‑to‑Standards ───

export function calculateGoalPaths(
  height: number,
  weight: number,
  waist: number,
  gender: Gender,
  maxBF: number,
  maxWaist: number,
): GoalPath[] {
  const paths: GoalPath[] = []
  const getBodyFat =
    gender === 'male' ? getMaleBF : getFemaleBF

  // Path 1: Reduce waist only (keep current weight)
  if (waist > maxWaist) {
    const waistChange = Math.abs(waist - maxWaist)
    const timelineWeeks = Math.ceil(waistChange / 0.5) // ~0.5″/week
    paths.push({
      title: 'Reduce Waist Only',
      targetWaist: maxWaist,
      targetWeight: weight,
      waistChange,
      weightChange: 0,
      totalChange: waistChange,
      timeline: timelineWeeks,
      note: 'Focus on core work and nutrition. Typical waist reduction: 0.5\u2033/week with consistent effort.',
      easiest: false,
    })
  }

  // Path 2: Reduce weight only (keep current waist)
  let targetWeight = weight
  let foundWeightPath = false
  const heightWaistDiffFixed = Math.round((height - waist) * 2) / 2
  for (
    let testWeight = weight - 1;
    testWeight >= Math.max(100, weight - 100);
    testWeight--
  ) {
    const testBF = getBodyFat(heightWaistDiffFixed, testWeight)
    if (testBF <= maxBF) {
      targetWeight = testWeight
      foundWeightPath = true
      break
    }
  }

  if (foundWeightPath && targetWeight < weight) {
    const weightChange = weight - targetWeight
    const timelineWeeks = Math.ceil(weightChange / 2) // ~2 lbs/week
    paths.push({
      title: 'Reduce Weight Only',
      targetWaist: waist,
      targetWeight,
      waistChange: 0,
      weightChange,
      totalChange: weightChange / 2, // scale to inches‑equivalent
      timeline: timelineWeeks,
      note: `Healthy weight loss: 1\u20132 lbs/week through calorie deficit and exercise. (~${Math.round((weightChange * 3500) / timelineWeeks / 7)} cal/day deficit)`,
      easiest: false,
    })
  }

  // Path 3: Balanced approach — reduce both proportionally
  const waistToTarget = waist > maxWaist ? (waist - maxWaist) / 2 : 0
  const balancedWaist = waist - waistToTarget

  let balancedWeight = weight
  for (
    let testWeight = weight - 1;
    testWeight >= Math.max(100, weight - 50);
    testWeight--
  ) {
    const diff = Math.round((height - balancedWaist) * 2) / 2
    const testBF = getBodyFat(diff, testWeight)
    const testWhtr = Math.floor((balancedWaist / height) * 10000) / 10000
    if (testBF <= maxBF && testWhtr <= 0.5499) {
      balancedWeight = testWeight
      break
    }
  }

  if (balancedWeight < weight || waistToTarget > 0) {
    const weightChange = weight - balancedWeight
    const waistChange = waist - balancedWaist
    const timelineWeeks = Math.max(
      Math.ceil(weightChange / 2),
      Math.ceil(waistChange / 0.5),
    )
    paths.push({
      title: 'Balanced Approach',
      targetWaist: balancedWaist,
      targetWeight: balancedWeight,
      waistChange,
      weightChange,
      totalChange: waistChange + weightChange / 2,
      timeline: timelineWeeks,
      note: 'Combined cardio, strength training, and nutrition. Most sustainable long-term approach.',
      easiest: false,
    })
  }

  // Mark easiest (lowest totalChange)
  if (paths.length > 0) {
    paths.sort((a, b) => a.totalChange - b.totalChange)
    const first = paths[0]
    if (first) first.easiest = true
  }

  return paths
}
