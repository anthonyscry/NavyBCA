import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

/* ─── Size Map ─── */

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',   // 640px
  md: 'max-w-screen-md',   // 768px
  lg: 'max-w-screen-lg',   // 1024px
  xl: 'max-w-screen-xl',   // 1280px
}

/* ─── Types ─── */

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Max-width constraint — defaults to "lg" */
  size?: ContainerSize
}

/* ─── Component ─── */

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = 'lg', className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mx-auto w-full px-[var(--spacing-lg)]',
        sizeStyles[size],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  ),
)

Container.displayName = 'Container'
