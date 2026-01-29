import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ToastProvider } from '@/components/ui/Toast'
import './index.css'

// Register service worker (online build only — offline build is fully self-contained)
if ('serviceWorker' in navigator && !import.meta.env.VITE_BUILD_MODE) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed — app works fine without it
    })
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </StrictMode>
)
