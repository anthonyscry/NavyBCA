/**
 * Utility for conditionally joining CSS class names.
 * Lightweight alternative to clsx/tailwind-merge — filters falsy values
 * and joins remaining class strings with a space.
 *
 * @example
 *   cn('base', isActive && 'active', size === 'lg' && 'text-lg')
 *   // → "base active text-lg" (when isActive=true, size='lg')
 */
export function cn(
  ...inputs: (string | boolean | undefined | null)[]
): string {
  return inputs.filter(Boolean).join(' ')
}
