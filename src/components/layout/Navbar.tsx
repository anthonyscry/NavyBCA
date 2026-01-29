import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { NAV_ITEMS } from './navigation'

/* ─── Navbar ─── */

/**
 * Desktop navigation bar — sticky top, hidden on mobile.
 * Displays "Navy BCA" brand, tool links with active states,
 * and an Online/Offline build badge.
 */
export function Navbar() {
  const isOffline = import.meta.env.VITE_BUILD_MODE === 'offline'

  return (
    <nav
      className={cn(
        'sticky top-0 z-50',
        'bg-navy-blue/95 backdrop-blur-sm',
        'border-b border-border',
        'hidden md:flex',
      )}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-lg py-md">
        {/* ── Brand ── */}
        <NavLink
          to="/"
          className="text-xl font-bold text-gold hover:text-gold-dark transition-colors"
          aria-label="Navy BCA — Home"
        >
          Navy BCA
        </NavLink>

        {/* ── Tool Links ── */}
        <div className="flex items-center gap-sm">
          {NAV_ITEMS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 rounded-md text-sm transition-colors',
                  isActive
                    ? 'text-gold font-medium'
                    : 'text-text-secondary hover:text-gold',
                )
              }
            >
              {label}
            </NavLink>
          ))}

          {/* ── Online / Offline Badge ── */}
          <Badge variant={isOffline ? 'warning' : 'success'} className="ml-sm">
            {isOffline ? 'Offline' : 'Online'}
          </Badge>
        </div>
      </div>
    </nav>
  )
}
