import { useId, useCallback, type InputHTMLAttributes } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface NumberInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'onChange'
  > {
  /** Label displayed above the input */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message — replaces helper text and triggers error styling */
  error?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Unit label displayed inside the input (right side) */
  unit?: string
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step for increment/decrement */
  step?: number
  /** Current numeric value */
  value?: number | string
  /** Callback when value changes */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  /** Callback with the parsed numeric value */
  onValueChange?: (value: number) => void
  /** Mark the field as required (shows gold asterisk) */
  required?: boolean
}

const sizeClasses = {
  sm: 'h-9 text-sm',
  md: 'h-11 text-base',
  lg: 'h-12 text-lg',
} as const

/**
 * Numeric input with increment/decrement buttons and optional unit display.
 *
 * Features: stepper buttons, unit label, min/max clamping, accessible.
 */
export function NumberInput({
  label,
  helperText,
  error,
  size = 'md',
  unit,
  min,
  max,
  step = 1,
  value,
  onChange,
  onValueChange,
  required,
  className,
  id: externalId,
  disabled,
  ...props
}: NumberInputProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const errorId = `${id}-error`
  const helperId = `${id}-helper`
  const hasError = Boolean(error)

  const numericValue =
    typeof value === 'string' ? parseFloat(value) : (value ?? 0)

  const clamp = useCallback(
    (v: number) => {
      let clamped = v
      if (min !== undefined) clamped = Math.max(min, clamped)
      if (max !== undefined) clamped = Math.min(max, clamped)
      return clamped
    },
    [min, max]
  )

  const handleStep = useCallback(
    (direction: 1 | -1) => {
      if (disabled) return
      const next = clamp(numericValue + step * direction)
      onValueChange?.(next)
    },
    [disabled, numericValue, step, clamp, onValueChange]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      const parsed = parseFloat(e.target.value)
      if (!isNaN(parsed)) {
        onValueChange?.(parsed)
      }
    },
    [onChange, onValueChange]
  )

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

      <div className="relative flex">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          required={required}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          className={cn(
            'w-full rounded-l-md border bg-navy-surface text-text-primary placeholder:text-text-hint',
            'transition-colors duration-150 px-3',
            'focus:border-gold focus:ring-1 focus:ring-gold focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            /* Hide native spinner */
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            sizeClasses[size],
            unit && 'pr-12',
            hasError ? 'border-error' : 'border-border',
            className
          )}
          {...props}
        />

        {unit && (
          <span className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 text-sm text-text-tertiary">
            {unit}
          </span>
        )}

        {/* Stepper buttons */}
        <div className="flex flex-col border-y border-r border-border rounded-r-md overflow-hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Increase ${label ?? 'value'}`}
            disabled={disabled || (max !== undefined && numericValue >= max)}
            onClick={() => handleStep(1)}
            className={cn(
              'flex items-center justify-center px-2 flex-1',
              'bg-navy-surface text-text-secondary',
              'hover:bg-navy-alt hover:text-gold transition-colors duration-150',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Decrease ${label ?? 'value'}`}
            disabled={disabled || (min !== undefined && numericValue <= min)}
            onClick={() => handleStep(-1)}
            className={cn(
              'flex items-center justify-center px-2 flex-1',
              'bg-navy-surface text-text-secondary border-t border-border',
              'hover:bg-navy-alt hover:text-gold transition-colors duration-150',
              'disabled:opacity-30 disabled:cursor-not-allowed'
            )}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
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
