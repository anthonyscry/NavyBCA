import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/* ─── Footer ─── */

/**
 * Desktop-only footer with legal links and Navy disclaimer.
 * Hidden on mobile (hidden md:block) — mobile uses bottom tab bar instead.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'hidden md:block',
        'border-t border-border',
        'bg-navy-blue',
      )}
    >
      <div className="max-w-6xl mx-auto px-lg py-lg">
        {/* ── Legal Links ── */}
        <div className="flex flex-wrap items-center gap-md text-sm text-text-secondary mb-md">
          <Link to="/about" className="hover:text-gold transition-colors">
            About
          </Link>
          <Link to="/references" className="hover:text-gold transition-colors">
            References
          </Link>
          <Link to="/privacy" className="hover:text-gold transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-gold transition-colors">
            Terms of Service
          </Link>
        </div>

        {/* ── Disclaimer ── */}
        <p className="text-xs text-text-tertiary leading-relaxed">
          This is an <strong>unofficial</strong> tool and is not affiliated with,
          endorsed by, or connected to the U.S. Navy or Department of Defense.
          Always verify calculations against official Navy publications and
          consult your Command Fitness Leader for official assessments.
        </p>

        {/* ── Copyright ── */}
        <p className="text-xs text-text-tertiary mt-sm">
          &copy; {year} NavyBCA.com — Built by a retired Sailor for those who serve.
        </p>
      </div>
    </footer>
  )
}
