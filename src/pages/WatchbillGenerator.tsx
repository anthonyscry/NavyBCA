import { useState, useMemo, useCallback } from 'react'
import { Calendar, Printer, Plus, Trash2 } from 'lucide-react'
import { Container, Card, CardBody, Button, Select, Input, Badge } from '@/components/ui'

/* ── Federal Holidays 2025–2027 ── */
const HOLIDAYS: Record<number, { date: string; name: string }[]> = {
  2025: [
    { date: '2025-01-01', name: "New Year's Day" }, { date: '2025-01-20', name: 'Martin Luther King Jr. Day' },
    { date: '2025-02-17', name: "Presidents' Day" }, { date: '2025-05-26', name: 'Memorial Day' },
    { date: '2025-06-19', name: 'Juneteenth' }, { date: '2025-07-04', name: 'Independence Day' },
    { date: '2025-09-01', name: 'Labor Day' }, { date: '2025-10-13', name: 'Columbus Day' },
    { date: '2025-11-11', name: 'Veterans Day' }, { date: '2025-11-27', name: 'Thanksgiving' },
    { date: '2025-12-25', name: 'Christmas' },
  ],
  2026: [
    { date: '2026-01-01', name: "New Year's Day" }, { date: '2026-01-19', name: 'Martin Luther King Jr. Day' },
    { date: '2026-02-16', name: "Presidents' Day" }, { date: '2026-05-25', name: 'Memorial Day' },
    { date: '2026-06-19', name: 'Juneteenth' }, { date: '2026-07-03', name: 'Independence Day (Observed)' },
    { date: '2026-09-07', name: 'Labor Day' }, { date: '2026-10-12', name: 'Columbus Day' },
    { date: '2026-11-11', name: 'Veterans Day' }, { date: '2026-11-26', name: 'Thanksgiving' },
    { date: '2026-12-25', name: 'Christmas' },
  ],
  2027: [
    { date: '2027-01-01', name: "New Year's Day" }, { date: '2027-01-18', name: 'Martin Luther King Jr. Day' },
    { date: '2027-02-15', name: "Presidents' Day" }, { date: '2027-05-31', name: 'Memorial Day' },
    { date: '2027-06-18', name: 'Juneteenth (Observed)' }, { date: '2027-07-05', name: 'Independence Day (Observed)' },
    { date: '2027-09-06', name: 'Labor Day' }, { date: '2027-10-11', name: 'Columbus Day' },
    { date: '2027-11-11', name: 'Veterans Day' }, { date: '2027-11-25', name: 'Thanksgiving' },
    { date: '2027-12-24', name: 'Christmas (Observed)' },
  ],
}

type DayType = 'pt' | 'fep' | 'none'
type DayKey = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat'

const DAY_KEYS: DayKey[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const DAY_NAMES: Record<DayKey, string> = { sun: 'Sunday', mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday' }
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const YEARS = [2025, 2026, 2027]
const TIME_OPTIONS = [
  { value: '05:30', label: '0530' }, { value: '06:00', label: '0600' },
  { value: '06:30', label: '0630' }, { value: '07:00', label: '0700' },
  { value: '11:30', label: '1130' }, { value: '15:00', label: '1500' },
]
const DEFAULT_LOCATIONS = ['Base Gym', 'Track']

interface CalendarDay {
  day: number
  dayOfWeek: DayKey
  type: DayType
  holiday?: string
  cfl?: string
  location?: string
  time?: string
}

/* ── Component ── */
export default function WatchbillGenerator() {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())
  const [daySchedule, setDaySchedule] = useState<Record<DayKey, DayType>>({
    sun: 'none', mon: 'pt', tue: 'fep', wed: 'pt', thu: 'fep', fri: 'pt', sat: 'none',
  })
  const [defaultTime, setDefaultTime] = useState('06:00')
  const [roster, setRoster] = useState<string[]>(['IT2 Smith'])
  const [newCfl, setNewCfl] = useState('')
  const [locations, setLocations] = useState<string[]>(DEFAULT_LOCATIONS)
  const [newLocation, setNewLocation] = useState('')
  const [generated, setGenerated] = useState<CalendarDay[] | null>(null)

  // Holiday lookup
  const holidayMap = useMemo(() => {
    const map = new Map<string, string>()
    ;(HOLIDAYS[year] ?? []).forEach(h => map.set(h.date, h.name))
    return map
  }, [year])

  const toggleDayType = useCallback((day: DayKey, type: DayType) => {
    setDaySchedule(prev => ({ ...prev, [day]: type }))
  }, [])

  const addCFL = () => {
    const name = newCfl.trim()
    if (name && !roster.includes(name)) {
      setRoster(prev => [...prev, name])
      setNewCfl('')
    }
  }

  const removeCFL = (idx: number) => {
    setRoster(prev => prev.filter((_, i) => i !== idx))
  }

  const addLocation = () => {
    const loc = newLocation.trim()
    if (loc && !locations.includes(loc)) {
      setLocations(prev => [...prev, loc])
      setNewLocation('')
    }
  }

  const removeLocation = (idx: number) => {
    if (idx < DEFAULT_LOCATIONS.length) return // can't remove defaults
    setLocations(prev => prev.filter((_, i) => i !== idx))
  }

  const generate = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: CalendarDay[] = []
    let cflIndex = 0

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d)
      const dow = DAY_KEYS[date.getDay()] as DayKey
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const holiday = holidayMap.get(dateStr)
      const type: DayType = holiday ? 'none' : daySchedule[dow]

      const day: CalendarDay = { day: d, dayOfWeek: dow, type, holiday }

      if (type === 'pt' || type === 'fep') {
        if (roster.length > 0) {
          day.cfl = roster[cflIndex % roster.length]
          cflIndex++
        }
        day.time = defaultTime
        day.location = locations[0] ?? 'TBD'
      }

      days.push(day)
    }

    setGenerated(days)
  }

  const handlePrint = () => window.print()

  // Stats
  const stats = useMemo(() => {
    if (!generated) return null
    const pt = generated.filter(d => d.type === 'pt').length
    const fep = generated.filter(d => d.type === 'fep').length
    const hol = generated.filter(d => d.holiday).length
    return { pt, fep, holidays: hol, total: pt + fep }
  }, [generated])

  return (
    <Container size="lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[var(--color-background)]" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
            PT Watchbill Generator
          </h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">
          Command PT & FEP Schedule Builder
        </p>
      </div>

      {/* Configuration Form - hidden when printing */}
      <div className="print:hidden">
        <Card className="mb-4">
          <CardBody>
            {/* Month / Year */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">Month</label>
                <Select value={String(month)} onChange={e => setMonth(Number(e.target.value))}>
                  {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </Select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">Year</label>
                <Select value={String(year)} onChange={e => setYear(Number(e.target.value))}>
                  {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                </Select>
              </div>
            </div>

            {/* Day Schedule */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Schedule Days of the Week</label>
              <div className="space-y-2">
                {DAY_KEYS.map(day => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="w-24 text-sm font-medium text-[var(--color-text-secondary)]">{DAY_NAMES[day]}</span>
                    <div className="flex gap-1">
                      {(['pt', 'fep', 'none'] as DayType[]).map(type => (
                        <button
                          key={type}
                          onClick={() => toggleDayType(day, type)}
                          className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
                            daySchedule[day] === type
                              ? type === 'pt'
                                ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/50'
                                : type === 'fep'
                                ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/50'
                                : 'bg-white/10 text-[var(--color-text-muted)] ring-1 ring-white/20'
                              : 'bg-white/[0.03] text-[var(--color-text-muted)] hover:bg-white/[0.06]'
                          }`}
                        >
                          {type === 'none' ? 'Off' : type.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">Set PT for M/W/F and FEP for T/Th, or customize as needed</p>
            </div>

            {/* Default Time */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1.5">Default PT Time</label>
              <Select value={defaultTime} onChange={e => setDefaultTime(e.target.value)}>
                {TIME_OPTIONS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </Select>
            </div>

            {/* Locations */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">Locations</label>
              <div className="space-y-1 mb-2">
                {locations.map((loc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-text-secondary)] flex-1">{loc}</span>
                    {i >= DEFAULT_LOCATIONS.length && (
                      <button onClick={() => removeLocation(i)} className="text-red-400 hover:text-red-300 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom location..."
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addLocation()}
                  className="flex-1"
                />
                <Button variant="secondary" size="sm" onClick={addLocation}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* CFL Roster */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">CFL/ACFL Roster</label>
              <div className="space-y-1 mb-2">
                {roster.map((name, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2">
                    <span className="text-sm text-[var(--color-text-secondary)] flex-1">{name}</span>
                    <button onClick={() => removeCFL(i)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., IT2 Smith"
                  value={newCfl}
                  onChange={e => setNewCfl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addCFL()}
                  className="flex-1"
                />
                <Button variant="secondary" size="sm" onClick={addCFL}>
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">Add all CFLs and ACFLs who will lead PT (rotates automatically)</p>
            </div>

            {/* Generate Button */}
            <Button onClick={generate} className="w-full">
              Generate Watchbill
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Generated Output */}
      {generated && stats && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 print:hidden">
            {[
              { label: 'PT Days', value: stats.pt, color: 'text-green-400' },
              { label: 'FEP Days', value: stats.fep, color: 'text-blue-400' },
              { label: 'Holidays', value: stats.holidays, color: 'text-red-400' },
              { label: 'Total Sessions', value: stats.total, color: 'text-[var(--color-primary)]' },
            ].map(s => (
              <Card key={s.label}>
                <CardBody className="text-center py-3">
                  <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Print button */}
          <div className="flex justify-end mb-3 print:hidden">
            <Button variant="secondary" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
          </div>

          {/* Calendar Header (visible when printing) */}
          <div className="hidden print:block text-center mb-4">
            <h2 className="text-xl font-bold">{MONTHS[month]} {year} PT Watchbill</h2>
          </div>

          {/* Calendar Grid */}
          <Card>
            <CardBody className="p-2 sm:p-4">
              <h2 className="text-lg font-bold text-[var(--color-primary)] mb-3 print:hidden">
                {MONTHS[month]} {year}
              </h2>

              {/* Day Headers */}
              <div className="hidden sm:grid grid-cols-7 gap-1 mb-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-1 sm:grid-cols-7 gap-1">
                {/* Empty cells for offset */}
                {Array.from({ length: new Date(year, month, 1).getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} className="hidden sm:block" />
                ))}

                {generated.map(day => (
                  <div
                    key={day.day}
                    className={`rounded-lg p-2 min-h-[70px] sm:min-h-[90px] border transition-colors ${
                      day.holiday
                        ? 'bg-red-500/5 border-red-500/30 border-l-4 border-l-red-500'
                        : day.type === 'pt'
                        ? 'bg-green-500/5 border-green-500/30 border-l-4 border-l-green-500'
                        : day.type === 'fep'
                        ? 'bg-blue-500/5 border-blue-500/30 border-l-4 border-l-blue-500'
                        : 'bg-white/[0.02] border-[var(--color-border)] border-l-4 border-l-[var(--color-border)]'
                    }`}
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-sm font-bold text-white">{day.day}</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] sm:hidden uppercase">{DAY_NAMES[day.dayOfWeek]}</span>
                    </div>

                    {day.holiday && (
                      <p className="text-[10px] text-red-400 font-semibold leading-tight">{day.holiday}</p>
                    )}

                    {(day.type === 'pt' || day.type === 'fep') && !day.holiday && (
                      <div className="space-y-0.5">
                        <Badge variant={day.type === 'pt' ? 'success' : 'info'}>
                          {day.type.toUpperCase()}
                        </Badge>
                        {day.time && (
                          <p className="text-[10px] text-[var(--color-text-muted)]">
                            {day.time.replace(':', '')}
                          </p>
                        )}
                        {day.cfl && (
                          <p className="text-[10px] text-[var(--color-primary)] font-semibold truncate" title={day.cfl}>
                            {day.cfl}
                          </p>
                        )}
                        {day.location && (
                          <p className="text-[9px] text-[var(--color-text-muted)] truncate">{day.location}</p>
                        )}
                      </div>
                    )}

                    {day.type === 'none' && !day.holiday && (
                      <p className="text-[10px] text-[var(--color-text-muted)] italic">Off</p>
                    )}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </Container>
  )
}
