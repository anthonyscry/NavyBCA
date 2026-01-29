import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Card Root ─── */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove default padding — useful when child sections handle their own spacing */
  noPadding?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ noPadding = false, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-[var(--radius-md)] border border-border bg-navy-alt',
        'transition-shadow duration-[var(--transition-base)]',
        'hover:shadow-sm',
        !noPadding && 'p-[var(--spacing-lg)]',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
)
Card.displayName = 'Card'

/* ─── Card Header ─── */

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--spacing-xs)]',
        'pb-[var(--spacing-md)] border-b border-border',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
)
CardHeader.displayName = 'CardHeader'

/* ─── Card Body ─── */

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn('py-[var(--spacing-md)]', className)}
      {...rest}
    >
      {children}
    </div>
  ),
)
CardBody.displayName = 'CardBody'

/* ─── Card Footer ─── */

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--spacing-sm)]',
        'pt-[var(--spacing-md)] border-t border-border',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
)
CardFooter.displayName = 'CardFooter'
