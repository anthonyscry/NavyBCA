import { useState } from 'react'
import { Target, ChevronDown, ChevronUp } from 'lucide-react'
import { Container, Card, CardBody, Badge } from '@/components/ui'

/* ── 8-week PRT Prep Program Data ── */
interface WorkoutDay {
  title: string
  exercises: string[]
  isRest?: boolean
}

interface Week {
  number: number
  focus: string
  days: WorkoutDay[]
}

const PROGRAM: Week[] = [
  {
    number: 1, focus: 'Foundation Building',
    days: [
      { title: 'Monday - Pushup Focus', exercises: ['3 sets of max pushups (rest 2 min between sets)', '3 sets of 30-45 sec plank hold', 'Light 10-15 min jog'] },
      { title: 'Tuesday - Run Day', exercises: ['2-mile easy pace run (conversational pace)', 'Focus on breathing and form'] },
      { title: 'Wednesday - Active Recovery', exercises: ['20 min walk or light stretching', 'Foam rolling if available'], isRest: true },
      { title: 'Thursday - Plank & Core', exercises: ['4 sets of 45-60 sec plank hold (rest 90 sec)', '3 sets of 15 pushups', '3 sets of 20 Burpees (No Push-up)'] },
      { title: 'Friday - Interval Run', exercises: ['10 min warm-up jog', '6 x 400m at goal 1.5mi pace (2 min rest between)', '10 min cool-down jog'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest or light activity', 'Hydrate and recover'], isRest: true },
      { title: 'Sunday - Long Run', exercises: ['3-mile easy pace run', 'Stay consistent, no walking'] },
    ],
  },
  {
    number: 2, focus: 'Volume Increase',
    days: [
      { title: 'Monday - Pushup Ladder', exercises: ['Pushup ladder: 1-2-3-4-5-4-3-2-1 (rest 60 sec between sets)', '4 sets of 45 sec plank hold', 'Light 10-15 min jog'] },
      { title: 'Tuesday - Tempo Run', exercises: ['10 min warm-up', '1 mile at comfortably hard pace (80% effort)', '10 min cool-down'] },
      { title: 'Wednesday - Active Recovery', exercises: ['20-30 min walk or swim', 'Stretch major muscle groups'], isRest: true },
      { title: 'Thursday - Core Strength', exercises: ['5 sets of 60 sec plank hold', '4 sets of 20 pushups', '3 sets of 30 Burpees (No Push-up)', '3 sets of 15 dive bomber pushups'] },
      { title: 'Friday - Speed Work', exercises: ['10 min warm-up', '8 x 400m at goal pace (90 sec rest)', '10 min cool-down'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest', 'Nutrition and hydration focus'], isRest: true },
      { title: 'Sunday - Long Run', exercises: ['3.5-mile easy pace run', 'Negative split (2nd half faster)'] },
    ],
  },
  {
    number: 3, focus: 'Intensity Build',
    days: [
      { title: 'Monday - Pushup Pyramid', exercises: ['Pyramid: 5-10-15-10-5 pushups (2 min rest)', '5 sets of 60 sec plank hold', '15 min easy jog'] },
      { title: 'Tuesday - Hill Repeats', exercises: ['10 min warm-up', '6 x 2 min hill sprints (walk down recovery)', '10 min cool-down'] },
      { title: 'Wednesday - Active Recovery', exercises: ['30 min bike or swim', 'Mobility work'], isRest: true },
      { title: 'Thursday - Max Effort', exercises: ['6 sets of max plank hold (2 min rest)', '5 sets of max pushups (2 min rest)', '4 sets of 20 hand-release pushups'] },
      { title: 'Friday - Intervals', exercises: ['10 min warm-up', '5 x 800m at 1.5mi goal pace (2 min rest)', '10 min cool-down'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest day', 'Mental preparation'], isRest: true },
      { title: 'Sunday - Long Run', exercises: ['4-mile steady pace', 'Practice pacing control'] },
    ],
  },
  {
    number: 4, focus: 'Active Recovery (Deload)',
    days: [
      { title: 'Monday - Light Pushups', exercises: ['3 sets of 50% max pushups', '3 sets of 30 sec plank hold', '10 min easy jog'] },
      { title: 'Tuesday - Easy Run', exercises: ['2-mile easy conversational pace', 'Focus on form recovery'] },
      { title: 'Wednesday - Rest', exercises: ['Complete rest', 'Stretch and foam roll'], isRest: true },
      { title: 'Thursday - Light Core', exercises: ['3 sets of 45 sec plank hold', '2 sets of 15 pushups', 'Yoga or stretching'] },
      { title: 'Friday - Easy Intervals', exercises: ['10 min warm-up', '4 x 400m at comfortable pace (2 min rest)', '10 min cool-down'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest', 'Recovery focus'], isRest: true },
      { title: 'Sunday - Short Run', exercises: ['2.5-mile easy pace', 'Prep for next training block'] },
    ],
  },
  {
    number: 5, focus: 'Strength Peak',
    days: [
      { title: 'Monday - High Volume Pushups', exercises: ['6 sets of max pushups (90 sec rest)', '6 sets of 60 sec plank hold', '15 min easy jog'] },
      { title: 'Tuesday - Threshold Run', exercises: ['10 min warm-up', '1.5 miles at goal PRT pace', '10 min cool-down'] },
      { title: 'Wednesday - Active Recovery', exercises: ['30 min bike or swim', 'Light stretching'], isRest: true },
      { title: 'Thursday - Core Endurance', exercises: ['8 sets of 60-90 sec plank hold', '6 sets of 25 pushups', '4 sets of 30 diamond pushups'] },
      { title: 'Friday - Speed Endurance', exercises: ['10 min warm-up', '4 x 1000m at goal pace (2 min rest)', '10 min cool-down'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest', 'Hydration and nutrition'], isRest: true },
      { title: 'Sunday - Long Run', exercises: ['4.5-mile steady pace', 'Confidence builder'] },
    ],
  },
  {
    number: 6, focus: 'Peak Performance',
    days: [
      { title: 'Monday - Max Pushups', exercises: ['8 sets of max pushups (2 min rest)', '8 sets of 90 sec plank hold', 'Light 10 min jog'] },
      { title: 'Tuesday - Race Pace', exercises: ['10 min warm-up', '1.5 miles at goal pace minus 15 sec', '10 min cool-down'] },
      { title: 'Wednesday - Active Recovery', exercises: ['20-30 min walk', 'Full body stretch'], isRest: true },
      { title: 'Thursday - Peak Core', exercises: ['10 sets of max plank hold (90 sec rest)', '8 sets of 30 pushups', '5 sets of 15 decline pushups'] },
      { title: 'Friday - Final Speed Work', exercises: ['10 min warm-up', '3 x 800m at goal pace (3 min rest)', '10 min cool-down'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest', 'Mental preparation'], isRest: true },
      { title: 'Sunday - Easy Long Run', exercises: ['3-mile conversational pace', 'Keep it easy'] },
    ],
  },
  {
    number: 7, focus: 'Taper & Sharpen',
    days: [
      { title: 'Monday - Maintenance Volume', exercises: ['4 sets of 75% max pushups', '4 sets of 60 sec plank hold', '15 min easy jog'] },
      { title: 'Tuesday - Short Intervals', exercises: ['10 min warm-up', '5 x 400m at race pace (2 min rest)', '10 min cool-down'] },
      { title: 'Wednesday - Rest', exercises: ['Complete rest', 'Sleep and recovery focus'], isRest: true },
      { title: 'Thursday - Light Strength', exercises: ['3 sets of 60 sec plank hold', '3 sets of 20 pushups', 'Keep it light'] },
      { title: 'Friday - Easy Run', exercises: ['2-mile easy conversational pace', 'Focus on feeling fresh'] },
      { title: 'Saturday - Rest', exercises: ['Complete rest', 'Hydrate and prep'], isRest: true },
      { title: 'Sunday - Shakeout Run', exercises: ['1.5-mile easy pace', 'Light strides at end'] },
    ],
  },
  {
    number: 8, focus: 'Test Week',
    days: [
      { title: 'Monday - Final Pushup Check', exercises: ['2 sets of 50% max pushups', '2 sets of 30 sec plank hold', '10 min easy jog'] },
      { title: 'Tuesday - Easy Jog', exercises: ['1.5-mile conversational pace', 'Strides at end (4 x 100m)'] },
      { title: 'Wednesday - Rest', exercises: ['Complete rest', 'Hydrate, eat well, sleep early'], isRest: true },
      { title: 'Thursday - PRT DAY', exercises: ['Pushups (2 min max)', 'Forearm Plank (max hold)', '1.5-mile run (all out!)'] },
      { title: 'Friday - Recovery', exercises: ['Light walk or rest', 'Celebrate your results!'], isRest: true },
      { title: 'Saturday - Rest', exercises: ['Rest and recover', 'Plan your next training cycle'], isRest: true },
      { title: 'Sunday - Easy Activity', exercises: ['Light jog or walk', 'Reflect on your progress'] },
    ],
  },
]

export default function PRTPrep() {
  const [openWeeks, setOpenWeeks] = useState<Set<number>>(new Set([1]))

  const toggleWeek = (week: number) => {
    setOpenWeeks(prev => {
      const next = new Set(prev)
      if (next.has(week)) next.delete(week)
      else next.add(week)
      return next
    })
  }

  const expandAll = () => setOpenWeeks(new Set(PROGRAM.map(w => w.number)))
  const collapseAll = () => setOpenWeeks(new Set())

  return (
    <Container size="lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-2xl">
            💪
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
            8-Week PRT Prep
          </h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">
          Build Strength & Speed for Test Day
        </p>
      </div>

      {/* Program Overview */}
      <Card className="mb-6">
        <CardBody>
          <h3 className="text-[var(--color-primary)] font-bold text-lg mb-3">Program Overview</h3>
          <p className="text-[var(--color-text-secondary)] mb-4">
            This 8-week program is designed to improve your Navy PRT performance with a focus on:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              { label: 'Muscular Endurance', desc: 'Progressive pushup and plank training' },
              { label: 'Cardiovascular Endurance', desc: '1.5-mile run speed and pacing' },
              { label: 'Recovery', desc: 'Built-in rest days and active recovery' },
              { label: 'Progressive Overload', desc: 'Gradually increasing volume and intensity' },
            ].map(item => (
              <li key={item.label} className="flex gap-2 text-sm">
                <Target className="w-4 h-4 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">{item.label}:</strong>{' '}
                  <span className="text-[var(--color-text-muted)]">{item.desc}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-[var(--color-text-muted)] mb-2">
            Stay hydrated and well rested for next week's PRT, and skip preworkout or caffeine if you aren't used to it.
          </p>
          <p className="text-xs text-[var(--color-primary)] font-semibold">
            Complete each workout as written. Listen to your body and scale as needed. Consistency is key!
          </p>
        </CardBody>
      </Card>

      {/* Expand/Collapse Controls */}
      <div className="flex gap-2 mb-4 justify-end">
        <button onClick={expandAll} className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors px-2 py-1">
          Expand All
        </button>
        <span className="text-[var(--color-text-muted)]">|</span>
        <button onClick={collapseAll} className="text-xs text-[var(--color-text-muted)] hover:text-white transition-colors px-2 py-1">
          Collapse All
        </button>
      </div>

      {/* Weeks */}
      <div className="space-y-3">
        {PROGRAM.map(week => {
          const isOpen = openWeeks.has(week.number)
          const isTestWeek = week.number === 8
          const isDeload = week.number === 4

          return (
            <Card
              key={week.number}
              className={isTestWeek ? 'ring-1 ring-[var(--color-primary)]/50' : isDeload ? 'ring-1 ring-green-500/30' : ''}
            >
              <button
                onClick={() => toggleWeek(week.number)}
                className="w-full px-5 py-4 flex items-center gap-3 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-bold text-white">Week {week.number}</span>
                <Badge variant={isTestWeek ? 'warning' : isDeload ? 'success' : 'default'}>
                  {week.focus}
                </Badge>
                <span className="ml-auto text-[var(--color-text-muted)]">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-2">
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      className={`rounded-lg p-4 ${
                        day.isRest
                          ? 'bg-green-500/5 border border-green-500/20'
                          : 'bg-white/[0.03] border border-[var(--color-border)]'
                      }`}
                    >
                      <h4 className={`font-semibold text-sm mb-2 ${
                        day.isRest ? 'text-green-400' :
                        day.title.includes('PRT DAY') ? 'text-[var(--color-primary)]' :
                        'text-white'
                      }`}>
                        {day.title}
                      </h4>
                      <ul className="space-y-1">
                        {day.exercises.map((ex, ei) => (
                          <li key={ei} className="text-sm text-[var(--color-text-muted)] flex gap-2">
                            <span className="text-[var(--color-text-muted)]">•</span>
                            <span>{ex}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </Container>
  )
}
