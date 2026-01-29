import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/* ─── Types ─── */

export interface PageTransitionProps {
  /** Content to wrap with fade-in animation */
  children: ReactNode
  /** Additional class names */
  className?: string
}

/* ─── Component ─── */

/**
 * Wraps page content with a 150ms fade-in animation.
 * Respects `prefers-reduced-motion` via the Tailwind `motion-reduce:` variant.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <div className={cn('animate-fade-in motion-reduce:animate-none', className)}>
      {children}
    </div>
  )
}
