import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Variant Styles ─── */

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-navy-surface text-text-secondary border border-border',
  success:
    'bg-success/20 text-success border border-success/40',
  error:
    'bg-error/20 text-error border border-error/40',
  warning:
    'bg-warning/20 text-warning border border-warning/40',
  info:
    'bg-info/20 text-info border border-info/40',
}

/* ─── Types ─── */

export type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant — defaults to "default" */
  variant?: BadgeVariant
}

/* ─── Component ─── */

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', className, children, ...rest }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center',
        'px-2.5 py-0.5 text-xs font-medium',
        'rounded-full whitespace-nowrap',
        variantStyles[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  ),
)

Badge.displayName = 'Badge'
