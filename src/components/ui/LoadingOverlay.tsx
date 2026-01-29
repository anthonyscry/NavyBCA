import { cn } from '@/lib/utils'

/* ─── Types ─── */

export interface LoadingOverlayProps {
  /** Message displayed below the spinner */
  message?: string
  /** Additional class names */
  className?: string
}

/* ─── Component ─── */

/**
 * Full-screen loading overlay with gold spinner and optional message.
 * Uses `aria-live="assertive"` so screen readers announce loading state.
 */
export function LoadingOverlay({
  message = 'Loading…',
  className,
}: LoadingOverlayProps) {
  return (
    <div
      role="status"
      aria-live="assertive"
      className={cn(
        'fixed inset-0 z-[90]',
        'bg-navy-blue/80 backdrop-blur-sm',
        'flex flex-col items-center justify-center gap-4',
        className,
      )}
    >
      {/* Gold spinner */}
      <svg
        className="h-10 w-10 animate-spin text-gold motion-reduce:animate-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {message && (
        <p className="text-sm text-text-secondary">{message}</p>
      )}
    </div>
  )
}
