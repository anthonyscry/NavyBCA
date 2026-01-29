import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Types ─── */

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastData {
  id: string
  type: ToastType
  message: string
  /** Optional title displayed above the message */
  title?: string
}

export interface ToastContextValue {
  addToast: (toast: Omit<ToastData, 'id'>) => void
  removeToast: (id: string) => void
}

/* ─── Toast Style Maps ─── */

const accentColor: Record<ToastType, string> = {
  success: 'border-l-success',
  error: 'border-l-error',
  warning: 'border-l-warning',
  info: 'border-l-info',
}

const iconMap: Record<ToastType, typeof CheckCircle> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const iconColor: Record<ToastType, string> = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
}

/* ─── Constants ─── */

const MAX_TOASTS = 5
const AUTO_DISMISS_MS = 5000

/* ─── Context ─── */

const ToastContext = createContext<ToastContextValue | null>(null)

/**
 * Hook to access toast notifications.
 * Must be used within a `<ToastProvider>`.
 *
 * @example
 *   const { addToast } = useToast()
 *   addToast({ type: 'success', message: 'Saved!' })
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast must be used within a <ToastProvider>')
  }
  return ctx
}

/* ─── Single Toast Item ─── */

interface ToastItemProps {
  toast: ToastData
  onClose: (id: string) => void
}

function ToastItem({ toast, onClose }: ToastItemProps) {
  const Icon = iconMap[toast.type]

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        // Layout
        'flex items-start gap-3 p-3',
        // Appearance
        'rounded-lg bg-navy-alt border border-border shadow-md',
        // Left accent border
        'border-l-[3px]',
        accentColor[toast.type],
        // Animation (respect reduced-motion)
        'animate-fade-in motion-reduce:animate-none',
      )}
    >
      <Icon
        className={cn('h-5 w-5 shrink-0 mt-0.5', iconColor[toast.type])}
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-text-primary">{toast.title}</p>
        )}
        <p className="text-sm text-text-secondary">{toast.message}</p>
      </div>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className={cn(
          'shrink-0 p-1 rounded-[var(--radius-sm)]',
          'text-text-tertiary hover:text-text-primary',
          'hover:bg-navy-surface-light',
          'transition-colors duration-[var(--transition-fast)]',
          'focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
          'cursor-pointer',
        )}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

/* ─── Provider ─── */

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([])
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
  }, [])

  const addToast = useCallback(
    (toast: Omit<ToastData, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      const newToast: ToastData = { ...toast, id }

      setToasts((prev) => {
        const next = [...prev, newToast]
        // Enforce max toasts — remove oldest
        if (next.length > MAX_TOASTS) {
          const removed = next.shift()!
          const timer = timersRef.current.get(removed.id)
          if (timer) {
            clearTimeout(timer)
            timersRef.current.delete(removed.id)
          }
        }
        return next
      })

      // Auto-dismiss after timeout
      const timer = setTimeout(() => removeToast(id), AUTO_DISMISS_MS)
      timersRef.current.set(id, timer)
    },
    [removeToast],
  )

  // Cleanup all timers on unmount
  useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container */}
      {toasts.length > 0 && (
        <div
          aria-label="Notifications"
          className={cn(
            'fixed z-[100]',
            // Mobile: top-center
            'top-4 inset-x-4',
            // Desktop (md+): bottom-right
            'md:top-auto md:bottom-4 md:left-auto md:right-4 md:inset-x-auto',
            'md:w-80',
            // Stack toasts
            'flex flex-col gap-2',
          )}
        >
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
