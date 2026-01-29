import { useState, useMemo, useCallback } from 'react'
import { Search, X, Dumbbell, Filter, ChevronDown, ChevronUp } from 'lucide-react'
import type { Exercise, ExerciseDb } from '@/data/exercises-data'
import { db, warmupExercises, cooldownExercises, preCardioWarmup } from '@/data/exercises-data'
import { Container, Input, Select, Badge, Card, CardBody, Button } from '@/components/ui'

/* ── Flat exercise entry for the library ── */
interface FlatExercise extends Exercise {
  /** strength | cardio | funday | warmup | cooldown | yoga */
  type: string
  /** Equipment key (bodyweight, bands, kettlebells, etc.) */
  equipment: string
  /** upper | lower | full */
  bodyPart: string
  /** standard | lowImpact */
  mode: string
  /** Displayable equipment label */
  equipmentLabel: string
  /** true if has low-impact variant */
  hasLowImpact?: boolean
}

/* ── Body-part classifier ── */
const UPPER_KW = ['push', 'press', 'curl', 'row', 'pull', 'tricep', 'bicep', 'dip', 'plank', 'shoulder', 'arm', 'chest', 'y-t-w', 'fly', 'flye', 'shrug', 'cobra']
const LOWER_KW = ['squat', 'lunge', 'deadlift', 'bridge', 'calf', 'step-up', 'glute', 'hip thrust', 'good morning', 'rdl', 'donkey', 'fire hydrant', 'pistol']

function classifyBodyPart(name: string): 'upper' | 'lower' | 'full' {
  const n = name.toLowerCase()
  if (LOWER_KW.some(k => n.includes(k))) return 'lower'
  if (UPPER_KW.some(k => n.includes(k))) return 'upper'
  return 'full'
}

/* ── Equipment labels ── */
const EQUIP_LABELS: Record<string, string> = {
  bodyweight: 'Bodyweight', bands: 'Resistance Bands', pullup: 'Pull-up Bar',
  kettlebells: 'Kettlebells', dumbbells: 'Dumbbells', barbell: 'Barbell',
  flatBench: 'Flat Bench', adjBench: 'Adj. Bench', sled: 'Sled',
  indoor: 'Indoor', outdoor: 'Outdoor', jumprope: 'Jump Rope',
  assaultBike: 'Assault Bike', rower: 'Rower', cycle: 'Stationary Bike',
  bicycle: 'Bicycle', treadmill: 'Treadmill', swimming: 'Swimming',
  noEquipment: 'No Equipment', yoga: 'Yoga Mat', warmup: 'No Equipment',
  cooldown: 'No Equipment', preCardio: 'No Equipment',
}

/* ── Build the flat list once ── */
function buildFlatList(database: ExerciseDb): FlatExercise[] {
  const list: FlatExercise[] = []
  const seen = new Set<string>()
  const key = (name: string, equip: string, type: string) => `${name}|${equip}|${type}`

  // Warmup
  warmupExercises.forEach(ex => {
    const k = key(ex.name, 'warmup', 'warmup')
    if (!seen.has(k)) {
      seen.add(k)
      list.push({ ...ex, type: 'warmup', equipment: 'warmup', bodyPart: classifyBodyPart(ex.name), mode: 'standard', equipmentLabel: 'No Equipment' })
    }
  })

  // Pre-cardio warmup
  preCardioWarmup.forEach(ex => {
    const k = key(ex.name, 'preCardio', 'warmup')
    if (!seen.has(k)) {
      seen.add(k)
      list.push({ ...ex, type: 'warmup', equipment: 'preCardio', bodyPart: classifyBodyPart(ex.name), mode: 'standard', equipmentLabel: 'No Equipment' })
    }
  })

  // Standard Strength
  Object.entries(database.strength).forEach(([equip, exercises]) => {
    exercises.forEach(ex => {
      const k = key(ex.name, equip, 'strength')
      if (!seen.has(k)) {
        seen.add(k)
        list.push({ ...ex, type: 'strength', equipment: equip, bodyPart: classifyBodyPart(ex.name), mode: 'standard', equipmentLabel: EQUIP_LABELS[equip] ?? equip })
      }
    })
  })

  // Standard Cardio
  Object.entries(database.cardio).forEach(([equip, exercises]) => {
    exercises.forEach(ex => {
      const k = key(ex.name, equip, 'cardio')
      if (!seen.has(k)) {
        seen.add(k)
        list.push({ ...ex, type: 'cardio', equipment: equip, bodyPart: 'full', mode: 'standard', equipmentLabel: EQUIP_LABELS[equip] ?? equip })
      }
    })
  })

  // Low Impact Strength — mark existing entries as having a low-impact variant
  Object.entries(database.lowImpact.strength).forEach(([equip, exercises]) => {
    exercises.forEach(ex => {
      const k = key(ex.name, equip, 'strength')
      const existing = list.find(e => key(e.name, e.equipment, e.type) === k)
      if (existing) {
        existing.hasLowImpact = true
      } else {
        list.push({ ...ex, type: 'strength', equipment: equip, bodyPart: classifyBodyPart(ex.name), mode: 'lowImpact', hasLowImpact: true, equipmentLabel: EQUIP_LABELS[equip] ?? equip })
      }
    })
  })

  // Low Impact Cardio
  Object.entries(database.lowImpact.cardio).forEach(([equip, exercises]) => {
    exercises.forEach(ex => {
      const k = key(ex.name, equip, 'cardio')
      const existing = list.find(e => key(e.name, e.equipment, e.type) === k)
      if (existing) {
        existing.hasLowImpact = true
      } else {
        list.push({ ...ex, type: 'cardio', equipment: equip, bodyPart: 'full', mode: 'lowImpact', hasLowImpact: true, equipmentLabel: EQUIP_LABELS[equip] ?? equip })
      }
    })
  })

  // Yoga
  database.yoga.forEach(ex => {
    const k = key(ex.name, 'yoga', 'yoga')
    if (!seen.has(k)) {
      seen.add(k)
      list.push({ ...ex, type: 'yoga', equipment: 'yoga', bodyPart: classifyBodyPart(ex.name), mode: 'standard', equipmentLabel: 'Yoga Mat' })
    }
  })

  // Cooldown
  cooldownExercises.forEach(ex => {
    const k = key(ex.name, 'cooldown', 'cooldown')
    if (!seen.has(k)) {
      seen.add(k)
      list.push({ ...ex, type: 'cooldown', equipment: 'cooldown', bodyPart: classifyBodyPart(ex.name), mode: 'standard', equipmentLabel: 'No Equipment' })
    }
  })

  // Funday
  const fundayAll = [
    ...(database.funday.outdoor ?? []).map(g => ({ ...g, equipment: 'outdoor' })),
    ...(database.funday.indoor ?? []).map(g => ({ ...g, equipment: 'indoor' })),
  ]
  fundayAll.forEach(game => {
    const k = key(game.name, game.equipment, 'funday')
    if (!seen.has(k)) {
      seen.add(k)
      list.push({
        ...game,
        type: 'funday',
        equipment: game.equipment,
        bodyPart: 'full',
        mode: 'standard',
        equipmentLabel: game.equipment === 'outdoor' ? 'Outdoor' : 'Indoor',
      })
    }
  })

  return list
}

/* ── Constants ── */
const TYPE_OPTIONS = [
  { value: 'all', label: 'All Types' },
  { value: 'strength', label: 'Strength' },
  { value: 'cardio', label: 'Cardio' },
  { value: 'warmup', label: 'Warmup' },
  { value: 'cooldown', label: 'Cooldown' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'funday', label: 'Fun Day Games' },
]

const BODY_OPTIONS = [
  { value: 'all', label: 'All Body Parts' },
  { value: 'upper', label: 'Upper Body' },
  { value: 'lower', label: 'Lower Body' },
  { value: 'full', label: 'Full Body / Core' },
]

const DIFFICULTY_OPTIONS = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const PAGE_SIZE = 50

/* ── Type color map ── */
function typeBadgeVariant(type: string) {
  switch (type) {
    case 'strength': return 'info' as const
    case 'cardio': return 'warning' as const
    case 'warmup': return 'success' as const
    case 'cooldown': return 'success' as const
    case 'yoga': return 'success' as const
    case 'funday': return 'error' as const
    default: return 'default' as const
  }
}

function bodyPartColor(bp: string): string {
  switch (bp) {
    case 'upper': return 'border-l-red-500'
    case 'lower': return 'border-l-green-500'
    default: return 'border-l-purple-500'
  }
}

/* ── Component ── */
export default function ExerciseLibrary() {
  const allExercises = useMemo(() => buildFlatList(db), [])

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [bodyFilter, setBodyFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [showCount, setShowCount] = useState(PAGE_SIZE)
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = useCallback((name: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const filtered = useMemo(() => {
    return allExercises.filter(ex => {
      // text search
      if (search) {
        const q = search.toLowerCase()
        const nameMatch = ex.name.toLowerCase().includes(q)
        const tipMatch = (ex.tip ?? '').toLowerCase().includes(q)
        const muscleMatch = (ex.muscleGroups ?? []).some(m => m.toLowerCase().includes(q))
        if (!nameMatch && !tipMatch && !muscleMatch) return false
      }
      // type
      if (typeFilter !== 'all' && ex.type !== typeFilter) return false
      // body part (skip for funday)
      if (bodyFilter !== 'all' && ex.type !== 'funday' && ex.bodyPart !== bodyFilter) return false
      // difficulty
      if (difficultyFilter !== 'all' && ex.difficulty && ex.difficulty !== difficultyFilter) return false
      return true
    })
  }, [allExercises, search, typeFilter, bodyFilter, difficultyFilter])

  const visible = filtered.slice(0, showCount)
  const hasMore = showCount < filtered.length

  const clearFilters = () => {
    setSearch('')
    setTypeFilter('all')
    setBodyFilter('all')
    setDifficultyFilter('all')
    setShowCount(PAGE_SIZE)
  }

  const hasActiveFilters = search || typeFilter !== 'all' || bodyFilter !== 'all' || difficultyFilter !== 'all'

  return (
    <Container size="lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-[var(--color-background)]" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
            Exercise Library
          </h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">
          Browse & Search {allExercises.length}+ PT Exercises
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardBody>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <Input
                type="text"
                placeholder="Search by name, tip, or muscle group..."
                value={search}
                onChange={e => { setSearch(e.target.value); setShowCount(PAGE_SIZE) }}
                className="pl-10"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                <Filter className="w-3 h-3 inline mr-1" />
                Type
              </label>
              <Select
                value={typeFilter}
                onChange={e => { setTypeFilter(e.target.value); setShowCount(PAGE_SIZE) }}
              >
                {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Body Part
              </label>
              <Select
                value={bodyFilter}
                onChange={e => { setBodyFilter(e.target.value); setShowCount(PAGE_SIZE) }}
                disabled={typeFilter === 'funday'}
              >
                {BODY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">
                Difficulty
              </label>
              <Select
                value={difficultyFilter}
                onChange={e => { setDifficultyFilter(e.target.value); setShowCount(PAGE_SIZE) }}
              >
                {DIFFICULTY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </Select>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Results Stats */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing <strong className="text-[var(--color-primary)]">{Math.min(showCount, filtered.length)}</strong> of{' '}
          <strong className="text-[var(--color-primary)]">{filtered.length}</strong> exercises
        </p>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-3 h-3 mr-1" /> Clear Filters
          </Button>
        )}
      </div>

      {/* Exercise Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--color-text-muted)]">
          <Dumbbell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <h3 className="text-lg font-semibold text-[var(--color-text-secondary)] mb-1">No exercises found</h3>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {visible.map((ex, i) => {
            const expanded = expandedCards.has(`${ex.name}-${i}`)
            return (
              <button
                key={`${ex.name}-${ex.type}-${ex.equipment}-${i}`}
                onClick={() => toggleCard(`${ex.name}-${i}`)}
                className={`text-left w-full rounded-xl p-4 border-l-4 ${bodyPartColor(ex.bodyPart)} bg-white/[0.03] hover:bg-white/[0.06] transition-all border border-[var(--color-border)] border-l-4`}
                aria-expanded={expanded}
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-white text-sm leading-tight flex-1">{ex.name}</h3>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {expanded ? <ChevronUp className="w-4 h-4 text-[var(--color-text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--color-text-muted)]" />}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant={typeBadgeVariant(ex.type)}>{ex.type}</Badge>
                  <Badge variant="default">{ex.equipmentLabel}</Badge>
                  {ex.difficulty && <Badge variant="default">{ex.difficulty}</Badge>}
                  {ex.isCore && <Badge variant="success">Core</Badge>}
                  {ex.hasLowImpact && <Badge variant="success">Low Impact</Badge>}
                  {ex.isFinisher && <Badge variant="warning">Finisher</Badge>}
                </div>

                {/* Muscle groups */}
                {ex.muscleGroups && ex.muscleGroups.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-2">
                    {ex.muscleGroups.map(m => (
                      <span key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-primary)]/10 text-[var(--color-primary)] uppercase tracking-wider font-semibold">
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tip (always visible) */}
                {ex.tip && (
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{ex.tip}</p>
                )}

                {/* Expanded details */}
                {expanded && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] space-y-1.5">
                    {ex.rep && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Reps:</span> {ex.rep}</p>}
                    {ex.reps && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Reps:</span> {ex.reps}</p>}
                    {ex.duration && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Duration:</span> {ex.duration}</p>}
                    {ex.desc && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Description:</span> {ex.desc}</p>}
                    {ex.howToPlay && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">How to Play:</span> {ex.howToPlay}</p>}
                    {ex.teamSize && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Team Size:</span> {ex.teamSize}</p>}
                    {ex.space && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Space:</span> {ex.space}</p>}
                    {ex.safety && <p className="text-xs text-[var(--color-text-secondary)]"><span className="font-semibold text-[var(--color-primary)]">Safety:</span> {ex.safety}</p>}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="text-center mt-6">
          <Button
            variant="secondary"
            onClick={() => setShowCount(prev => prev + PAGE_SIZE)}
          >
            Load More ({filtered.length - showCount} remaining)
          </Button>
        </div>
      )}
    </Container>
  )
}
