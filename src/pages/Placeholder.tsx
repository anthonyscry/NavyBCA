import { useLocation } from 'react-router-dom'
import { Container } from '@/components/ui'
import { NAV_ITEMS } from '@/components/layout'

/* ─── Placeholder Page ─── */

/**
 * Generic placeholder for routes under construction.
 * Displays the tool name based on the current URL path.
 */
export default function Placeholder() {
  const { pathname } = useLocation()

  const navItem = NAV_ITEMS.find((item) => item.to === pathname)
  const title = navItem?.label ?? 'Page'
  const Icon = navItem?.icon

  return (
    <Container size="md" className="py-xl">
      <div className="text-center">
        {Icon && (
          <Icon
            size={48}
            strokeWidth={1.5}
            className="mx-auto mb-md text-gold"
            aria-hidden="true"
          />
        )}
        <h1 className="text-2xl font-bold text-gold mb-sm">{title}</h1>
        <p className="text-text-secondary">
          This tool is under construction. Check back soon.
        </p>
      </div>
    </Container>
  )
}
