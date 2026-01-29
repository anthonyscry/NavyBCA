// ─── Workout Session Generator ───
// Creates structured 60-minute PT sessions with smart muscle group spacing.

import type { Exercise } from '@/data/exercises-data'
import { warmupExercises, preCardioWarmup, cooldownExercises, db } from '@/data/exercises-data'

// ─── Types ───

export type WorkoutFocus = 'strength' | 'cardio' | 'mixed'
export type WorkoutScheme = 'circuit' | 'hiit' | 'military' | 'pyramid'

export interface WorkoutConfig {
  focus: WorkoutFocus
  scheme: WorkoutScheme
  equipment: string[]  // e.g. ['bodyweight', 'bands', 'kettlebells']
  location: 'indoor' | 'outdoor'
}

export interface WorkoutExercise {
  name: string
  rep: string
  tip?: string
  muscleGroups?: string[]
  equipment?: string
  isCore?: boolean
}

export interface WorkoutSession {
  warmup: WorkoutExercise[]
  workout: WorkoutExercise[]
  cooldown: WorkoutExercise[]
  scheme: WorkoutScheme
  schemeDescription: string
  schemeNote: string
  focus: WorkoutFocus
}

// ─── Scheme descriptions ───

const SCHEME_INFO: Record<WorkoutScheme, { description: string; note: string }> = {
  circuit: {
    description: '3 Rounds x 12-15 Reps',
    note: 'Perform as a circuit. Rest 60s between rounds.',
  },
  hiit: {
    description: '40s Work / 20s Rest',
    note: 'Tabata style. Complete 3-4 rounds of all exercises.',
  },
  military: {
    description: '10 Reps (4-Count)',
    note: 'CFL leads count: 1-2-3-ONE... to 1-2-3-TEN. Planks: 15+ echo count.',
  },
  pyramid: {
    description: 'Pyramid: 2-4-6-8-10',
    note: 'Build up reps each round. Rest as needed between rounds.',
  },
}

// ─── Equipment labels ───

export const EQUIPMENT_OPTIONS: Record<string, string> = {
  bodyweight: 'Bodyweight',
  bands: 'Resistance Bands',
  pullup: 'Pull-up Bar',
  kettlebells: 'Kettlebells',
  dumbbells: 'Dumbbells',
  barbell: 'Barbell',
  flatBench: 'Flat Bench',
  adjBench: 'Adj. Bench',
  sled: 'Sled',
}

export const CARDIO_EQUIPMENT: Record<string, string> = {
  jumprope: 'Jump Rope',
  assaultBike: 'Assault Bike',
  rower: 'Rower',
  cycle: 'Stationary Bike',
  bicycle: 'Bicycle',
  treadmill: 'Treadmill',
  swimming: 'Swimming',
}

// ─── Helpers ───

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a
}

function pick<T>(arr: T[], count: number): T[] {
  return shuffle(arr).slice(0, count)
}

/** Enforce minimum 2-exercise gap between same muscle group. */
function spaceMuscleGroups(exercises: WorkoutExercise[]): WorkoutExercise[] {
  const result: WorkoutExercise[] = []
  const remaining = [...exercises]
  const recentGroups: string[] = []

  while (remaining.length > 0) {
    // Find first exercise whose primary group isn't in recent 2
    const idx = remaining.findIndex((ex) => {
      const primary = ex.muscleGroups?.[0] ?? 'full body'
      return !recentGroups.includes(primary)
    })

    const chosen = idx >= 0 ? remaining.splice(idx, 1)[0]! : remaining.shift()!
    result.push(chosen)

    const group = chosen.muscleGroups?.[0] ?? 'full body'
    recentGroups.push(group)
    if (recentGroups.length > 2) recentGroups.shift()
  }

  return result
}

function exerciseToWorkout(ex: Exercise, equipment?: string): WorkoutExercise {
  return {
    name: ex.name,
    rep: ex.rep ?? ex.reps ?? ex.duration ?? ex.desc ?? '10 reps',
    tip: ex.tip,
    muscleGroups: ex.muscleGroups,
    equipment,
    isCore: ex.isCore,
  }
}

// ─── Main Generator ───

export function generateWorkout(config: WorkoutConfig): WorkoutSession {
  const { focus, scheme, equipment, location } = config
  const info = SCHEME_INFO[scheme]

  // ─── Warmup (5-7 exercises) ───
  const warmupPool = focus === 'cardio' ? preCardioWarmup : warmupExercises
  const warmup = pick(warmupPool, 6).map((ex) => exerciseToWorkout(ex))

  // ─── Main workout (8-10 exercises) ───
  const workoutPool: { ex: Exercise; equip: string }[] = []

  if (focus === 'strength' || focus === 'mixed') {
    // Gather strength exercises from selected equipment
    const strengthEquip = equipment.length > 0 ? equipment : ['bodyweight']
    for (const equip of strengthEquip) {
      const exercises = db.strength[equip]
      if (exercises) {
        for (const ex of exercises) {
          workoutPool.push({ ex, equip })
        }
      }
    }
  }

  if (focus === 'cardio' || focus === 'mixed') {
    // Gather cardio exercises
    const cardioKey = location
    const cardioExercises = db.cardio[cardioKey]
    if (cardioExercises) {
      for (const ex of cardioExercises) {
        workoutPool.push({ ex, equip: cardioKey })
      }
    }
    // Add equipment-specific cardio
    for (const equip of equipment) {
      const cardioEquip = db.cardio[equip]
      if (cardioEquip) {
        for (const ex of cardioEquip) {
          workoutPool.push({ ex, equip })
        }
      }
    }
  }

  // If pool is too small, add bodyweight as fallback
  if (workoutPool.length < 8) {
    const bw = db.strength.bodyweight ?? []
    for (const ex of bw) {
      workoutPool.push({ ex, equip: 'bodyweight' })
    }
  }

  // Pick 8-10 exercises, ensure mix of core and non-core
  const shuffled = shuffle(workoutPool)
  const targetCount = focus === 'mixed' ? 10 : 8
  const selected = shuffled.slice(0, targetCount)

  // Convert to WorkoutExercise and apply muscle group spacing
  const workoutExercises = selected.map(({ ex, equip }) =>
    exerciseToWorkout(ex, equip),
  )
  const spacedWorkout = spaceMuscleGroups(workoutExercises)

  // ─── Cooldown (5-6 exercises) ───
  const cooldown = pick(cooldownExercises, 5).map((ex) => exerciseToWorkout(ex))

  return {
    warmup,
    workout: spacedWorkout,
    cooldown,
    scheme,
    schemeDescription: info.description,
    schemeNote: info.note,
    focus,
  }
}
