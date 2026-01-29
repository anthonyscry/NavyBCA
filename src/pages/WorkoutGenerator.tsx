import { useState, useCallback, useRef } from 'react'
import { Dumbbell, RefreshCw, Printer, ChevronDown, ChevronUp } from 'lucide-react'
import type { WorkoutFocus, WorkoutScheme, WorkoutSession } from '@/lib/workout-engine'
import { generateWorkout, EQUIPMENT_OPTIONS, CARDIO_EQUIPMENT } from '@/lib/workout-engine'
import {
  Container,
  Button,
  Select,
  Checkbox,
  FormSection,
  Card,
  CardBody,
  Badge,
} from '@/components/ui'

export default function WorkoutGenerator() {
  const [focus, setFocus] = useState<WorkoutFocus>('strength')
  const [scheme, setScheme] = useState<WorkoutScheme>('circuit')
  const [location, setLocation] = useState<'indoor' | 'outdoor'>('indoor')
  const [equipment, setEquipment] = useState<string[]>(['bodyweight'])
  const [session, setSession] = useState<WorkoutSession | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  const toggleEquipment = useCallback((key: string) => {
    setEquipment((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }, [])

  const handleGenerate = useCallback(() => {
    const result = generateWorkout({ focus, scheme, equipment, location })
    setSession(result)
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [focus, scheme, equipment, location])

  return (
    <Container size="md">
      <div className="py-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">
            PT Session Generator
          </h1>
          <p className="text-text-secondary text-lg">
            Structured 60-minute Command PT sessions
          </p>
        </div>

        {/* Config Form */}
        <Card>
          <CardBody className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select
                label="Focus"
                value={focus}
                onChange={(e) => setFocus(e.target.value as WorkoutFocus)}
              >
                <option value="strength">Strength</option>
                <option value="cardio">Cardio</option>
                <option value="mixed">Mixed</option>
              </Select>

              <Select
                label="Scheme"
                value={scheme}
                onChange={(e) => setScheme(e.target.value as WorkoutScheme)}
              >
                <option value="circuit">Circuit (3x12-15)</option>
                <option value="hiit">HIIT (40s/20s)</option>
                <option value="military">Military (4-Count)</option>
                <option value="pyramid">Pyramid (2-4-6-8-10)</option>
              </Select>

              <Select
                label="Location"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value as 'indoor' | 'outdoor')
                }
              >
                <option value="indoor">Indoor</option>
                <option value="outdoor">Outdoor</option>
              </Select>
            </div>

            <FormSection title="Equipment Available">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(EQUIPMENT_OPTIONS).map(([key, label]) => (
                  <Checkbox
                    key={key}
                    label={label}
                    checked={equipment.includes(key)}
                    onChange={() => toggleEquipment(key)}
                  />
                ))}
                {(focus === 'cardio' || focus === 'mixed') &&
                  Object.entries(CARDIO_EQUIPMENT).map(([key, label]) => (
                    <Checkbox
                      key={key}
                      label={label}
                      checked={equipment.includes(key)}
                      onChange={() => toggleEquipment(key)}
                    />
                  ))}
              </div>
            </FormSection>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleGenerate}
            >
              <Dumbbell className="h-5 w-5 mr-2" />
              Generate Session
            </Button>
          </CardBody>
        </Card>

        {/* Generated Session */}
        {session && (
          <div ref={resultRef} className="mt-8 space-y-6">
            {/* Session Header */}
            <Card className="border-2 border-gold">
              <CardBody className="text-center">
                <h2 className="text-2xl font-bold text-gold mb-1">
                  Command PT Session
                </h2>
                <p className="text-text-secondary">
                  {session.schemeDescription} &mdash; {session.schemeNote}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="info">
                    {session.focus.charAt(0).toUpperCase() +
                      session.focus.slice(1)}
                  </Badge>
                  <Badge variant="default">
                    {session.scheme.charAt(0).toUpperCase() +
                      session.scheme.slice(1)}
                  </Badge>
                </div>
              </CardBody>
            </Card>

            {/* Warmup */}
            <PhaseBlock
              title="Warmup"
              duration="~10 min"
              badge="warmup"
              exercises={session.warmup}
            />

            {/* Workout */}
            <PhaseBlock
              title="Workout"
              duration="~40 min"
              badge="workout"
              exercises={session.workout}
            />

            {/* Cooldown */}
            <PhaseBlock
              title="Cooldown"
              duration="~10 min"
              badge="cooldown"
              exercises={session.cooldown}
            />

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
              <Button
                type="button"
                variant="primary"
                onClick={handleGenerate}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

// ─── Phase Block Sub-component ───

function PhaseBlock({
  title,
  duration,
  badge,
  exercises,
}: {
  title: string
  duration: string
  badge: string
  exercises: { name: string; rep: string; tip?: string; muscleGroups?: string[]; equipment?: string; isCore?: boolean }[]
}) {
  const [expanded, setExpanded] = useState(true)

  const badgeVariant =
    badge === 'warmup'
      ? 'info'
      : badge === 'workout'
        ? 'success'
        : 'default'

  return (
    <Card>
      <CardBody>
        <button
          type="button"
          className="flex items-center justify-between w-full text-left"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-3">
            <Badge variant={badgeVariant as 'info' | 'success' | 'default'}>
              {title}
            </Badge>
            <span className="text-sm text-text-tertiary">{duration}</span>
            <span className="text-sm text-text-tertiary">
              ({exercises.length} exercises)
            </span>
          </div>
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-text-tertiary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-text-tertiary" />
          )}
        </button>

        {expanded && (
          <ol className="mt-4 space-y-3">
            {exercises.map((ex, i) => (
              <li
                key={`${ex.name}-${i}`}
                className="flex items-start gap-3 bg-navy-surface/50 rounded-lg p-3"
              >
                <span className="text-gold font-bold text-sm min-w-[1.5rem] text-right">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-text-primary">
                      {ex.name}
                    </span>
                    <span className="text-sm text-gold">{ex.rep}</span>
                    {ex.isCore && (
                      <span className="text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded">
                        Core
                      </span>
                    )}
                  </div>
                  {ex.tip && (
                    <p className="text-sm text-text-tertiary mt-1">
                      {ex.tip}
                    </p>
                  )}
                  {ex.muscleGroups && ex.muscleGroups.length > 0 && (
                    <div className="flex gap-1 mt-1 flex-wrap">
                      {ex.muscleGroups.map((mg) => (
                        <span
                          key={mg}
                          className="text-xs bg-navy-alt text-text-hint px-1.5 py-0.5 rounded"
                        >
                          {mg}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </CardBody>
    </Card>
  )
}
