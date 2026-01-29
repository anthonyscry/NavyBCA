import {
  Calculator,
  FileText,
  Dumbbell,
  Library,
  Calendar,
  Target,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ─── Navigation Item Type ─── */

export interface NavItem {
  /** URL path */
  to: string
  /** Full label shown on desktop */
  label: string
  /** Short label for mobile tab bar */
  shortLabel: string
  /** Lucide icon component */
  icon: LucideIcon
}

/* ─── All Navigation Items (desktop + mobile) ─── */

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'BCA Calculator', shortLabel: 'BCA', icon: Calculator },
  { to: '/pdf', label: 'PDF Generator', shortLabel: 'PDF', icon: FileText },
  { to: '/workout', label: 'PT Generator', shortLabel: 'Workout', icon: Dumbbell },
  { to: '/exercises', label: 'Exercise Library', shortLabel: 'Library', icon: Library },
  { to: '/watchbill', label: 'Watchbill', shortLabel: 'Watchbill', icon: Calendar },
  { to: '/prt-prep', label: 'PRT Prep', shortLabel: 'PRT', icon: Target },
]

/* ─── Mobile Items (top 5 — skip Watchbill) ─── */

export const MOBILE_NAV_ITEMS: NavItem[] = NAV_ITEMS.filter(
  (item) => item.to !== '/watchbill',
)
