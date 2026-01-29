import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label displayed above the input */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message — replaces helper text and triggers error styling */
  error?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Icon element rendered inside the input (left side) */
  icon?: React.ReactNode
  /** Mark the field as required (shows gold asterisk) */
  required?: boolean
}

const sizeClasses = {
  sm: 'h-9 text-sm px-3',
  md: 'h-11 text-base px-3',
  lg: 'h-12 text-lg px-4',
} as const

/**
 * Text input with label-above layout for military clarity.
 *
 * Features: error/helper text, icon support, size variants, accessible.
 */
export function Input({
  label,
  helperText,
  error,
  size = 'md',
  icon,
  required,
  className,
  id: externalId,
  ...props
}: InputProps) {
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
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary">
            {icon}
          </span>
        )}

        <input
          id={id}
          required={required}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full rounded-md border bg-navy-surface text-text-primary placeholder:text-text-hint',
            'transition-colors duration-150',
            'focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            sizeClasses[size],
            icon ? 'pl-10' : null,
            hasError
              ? 'border-error'
              : 'border-border',
            className
          )}
          {...props}
        />
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
