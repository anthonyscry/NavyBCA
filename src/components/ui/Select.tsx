import { useId, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label displayed above the select */
  label?: string
  /** Helper text displayed below the select */
  helperText?: string
  /** Error message — replaces helper text and triggers error styling */
  error?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Mark the field as required (shows gold asterisk) */
  required?: boolean
  /** Placeholder option text (disabled, shown when no value selected) */
  placeholder?: string
}

const sizeClasses = {
  sm: 'h-9 text-sm px-3 pr-8',
  md: 'h-11 text-base px-3 pr-8',
  lg: 'h-12 text-lg px-4 pr-10',
} as const

/**
 * Native select element with custom Navy styling.
 *
 * Uses appearance-none with a custom chevron for consistent cross-browser look
 * while maintaining native accessibility and mobile UX (native dropdown).
 */
export function Select({
  label,
  helperText,
  error,
  size = 'md',
  required,
  placeholder,
  className,
  id: externalId,
  children,
  ...props
}: SelectProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
          {required && (
            <span className="ml-1 text-gold" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full appearance-none rounded-md border bg-navy-surface text-text-primary',
            'transition-colors duration-150',
            'focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            hasError ? 'border-error' : 'border-border',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {/* Custom chevron */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>

      {hasError ? (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1 text-sm text-error"
        >
          <svg
            className="h-4 w-4 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-sm text-text-tertiary">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
