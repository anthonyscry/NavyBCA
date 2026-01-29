import { cn } from '@/lib/utils'

export interface FormGroupProps {
  /** Child form elements */
  children: React.ReactNode
  /** Additional class names */
  className?: string
}

/**
 * Spacing wrapper for form fields — provides consistent vertical rhythm.
 *
 * Wraps individual inputs or small groups of related fields with mb-4 spacing.
 */
export function FormGroup({ children, className }: FormGroupProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  )
}
