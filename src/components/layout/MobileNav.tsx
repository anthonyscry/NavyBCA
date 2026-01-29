import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { MOBILE_NAV_ITEMS } from './navigation'

/* ─── MobileNav ─── */

/**
 * Fixed bottom tab bar for mobile — shows top 5 tools with icons + labels.
 * Hidden on desktop (md:hidden). Includes iOS safe-area padding.
 */
export function MobileNav() {
  return (
    <nav
      className={cn(
        'fixed bottom-0 inset-x-0 z-50',
        'bg-navy-blue/95 backdrop-blur-sm',
        'border-t border-border',
        'flex md:hidden',
        'pb-[env(safe-area-inset-bottom)]',
      )}
      aria-label="Mobile navigation"
    >
      {MOBILE_NAV_ITEMS.map(({ to, shortLabel, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            cn(
              'flex-1 flex flex-col items-center justify-center',
              'gap-0.5 py-2 min-h-[56px]',
              'text-[10px] transition-colors',
              isActive
                ? 'text-gold font-medium'
                : 'text-text-secondary active:text-gold',
            )
          }
        >
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
          <span>{shortLabel}</span>
        </NavLink>
      ))}
    </nav>
  )
}
