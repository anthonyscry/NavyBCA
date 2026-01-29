import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label displayed next to the checkbox */
  label?: string
  /** Helper/description text below the label */
  description?: string
  /** Error message */
  error?: string
}

/**
 * Custom-styled checkbox with Navy design tokens.
 *
 * Uses appearance-none with CSS-only check indicator for consistent styling
 * while maintaining native checkbox accessibility (keyboard, screen readers).
 */
export function Checkbox({
  label,
  description,
  error,
  className,
  id: externalId,
  ...props
}: CheckboxProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const errorId = `${id}-error`
  const hasError = Boolean(error)

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={cn(
            'mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded',
            'border bg-navy-surface transition-colors duration-150',
            'checked:border-gold checked:bg-gold',
            'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-blue',
            /* CSS checkmark via pseudo-element */
            'relative checked:after:absolute checked:after:left-[5px] checked:after:top-[1px]',
            'checked:after:h-[10px] checked:after:w-[6px]',
            'checked:after:border-b-2 checked:after:border-r-2 checked:after:border-navy-blue',
            'checked:after:rotate-45 checked:after:content-[""]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            hasError ? 'border-error' : 'border-border',
            className
          )}
          {...props}
        />

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={id}
                className="cursor-pointer text-sm font-medium text-text-primary"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-sm text-text-tertiary">
                {description}
              </span>
            )}
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="ml-8 flex items-center gap-1 text-sm text-error"
        >
          {error}
        </p>
      )}
    </div>
  )
}
