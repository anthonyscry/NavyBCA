import { cn } from '@/lib/utils'

/* ─── Types ─── */

export type SkeletonVariant = 'text' | 'circular' | 'rectangular'

export interface SkeletonProps {
  /** Shape variant — defaults to "text" */
  variant?: SkeletonVariant
  /** Width (CSS value). Defaults: text="100%", circular="40px", rectangular="100%" */
  width?: string
  /** Height (CSS value). Defaults: text="1em", circular="40px", rectangular="120px" */
  height?: string
  /** Additional class names */
  className?: string
}

/* ─── Variant Styles ─── */

const variantStyles: Record<SkeletonVariant, string> = {
  text: 'rounded-[var(--radius-sm)]',
  circular: 'rounded-full',
  rectangular: 'rounded-[var(--radius-md)]',
}

const defaultDimensions: Record<SkeletonVariant, { width: string; height: string }> = {
  text: { width: '100%', height: '1em' },
  circular: { width: '40px', height: '40px' },
  rectangular: { width: '100%', height: '120px' },
}

/* ─── Component ─── */

/**
 * Skeleton placeholder for loading states.
 * Displays a pulsing shape that matches the eventual content layout.
 */
export function Skeleton({
  variant = 'text',
  width,
  height,
  className,
}: SkeletonProps) {
  const defaults = defaultDimensions[variant]

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'bg-navy-surface animate-pulse motion-reduce:animate-none',
        variantStyles[variant],
        className,
      )}
      style={{
        width: width ?? defaults.width,
        height: height ?? defaults.height,
      }}
    />
  )
}
