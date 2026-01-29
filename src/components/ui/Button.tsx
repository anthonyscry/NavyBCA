import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Variant + Size Maps ─── */

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-navy-blue font-semibold hover:brightness-110 hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-navy-alt text-text-primary border border-border hover:bg-navy-surface active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-primary hover:bg-navy-surface-light active:scale-[0.98]',
  danger:
    'bg-error text-white font-semibold hover:brightness-110 active:scale-[0.98]',
  outline:
    'bg-transparent text-gold border border-gold hover:bg-gold/10 active:scale-[0.98]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 min-w-[44px] px-3 text-sm gap-1.5 rounded-[var(--radius-sm)]',
  md: 'h-10 min-w-[44px] px-4 text-sm gap-2 rounded-[var(--radius-md)]',
  lg: 'h-12 min-w-[44px] px-6 text-base gap-2.5 rounded-[var(--radius-md)]',
}

/* ─── Types ─── */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant — defaults to "primary" */
  variant?: ButtonVariant
  /** Size — defaults to "md" */
  size?: ButtonSize
  /** Show a spinner and disable interaction */
  loading?: boolean
  /** Icon element rendered before children */
  iconLeft?: ReactNode
  /** Icon element rendered after children */
  iconRight?: ReactNode
}

/* ─── Component ─── */

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      iconLeft,
      iconRight,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          // Base
          'inline-flex items-center justify-center whitespace-nowrap',
          'transition-all duration-[var(--transition-fast)]',
          'focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
          'cursor-pointer select-none',
          // Variant + Size
          variantStyles[variant],
          sizeStyles[size],
          // Disabled / Loading
          isDisabled && 'pointer-events-none opacity-50',
          // Consumer overrides
          className,
        )}
        {...rest}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    )
  },
)

Button.displayName = 'Button'
