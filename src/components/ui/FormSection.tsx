import { cn } from '@/lib/utils'

export interface FormSectionProps {
  /** Section title — rendered in gold */
  title: string
  /** Optional description below the title */
  description?: string
  /** Child form elements */
  children: React.ReactNode
  /** Additional class names */
  className?: string
}

/**
 * Form section with gold title, description, and divider.
 *
 * Groups related form fields under a titled section with visual separation.
 * Use within forms to organize fields into logical groups (e.g., "Personal Info",
 * "Measurements", "Results").
 */
export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <fieldset className={cn('mb-6 border-none p-0', className)}>
      <legend className="mb-3 flex w-full flex-col gap-1">
        <span className="text-lg font-semibold text-gold">
          {title}
        </span>
        {description && (
          <span className="text-sm text-text-tertiary">
            {description}
          </span>
        )}
        <span
          className="mt-2 block h-px w-full bg-border"
          aria-hidden="true"
        />
      </legend>
      {children}
    </fieldset>
  )
}
