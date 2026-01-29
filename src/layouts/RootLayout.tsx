import { Outlet, useLocation } from 'react-router-dom'
import { Navbar, MobileNav, Footer } from '@/components/layout'
import { PageTransition } from '@/components/ui'

/* ─── Root Layout ─── */

/**
 * Application shell: Navbar (desktop) → Main content → Footer (desktop)
 * Mobile shows bottom tab bar (MobileNav) with safe-area clearance.
 */
export default function RootLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-navy-blue text-text-primary">
      <Navbar />

      <main className="flex-1 pb-16 md:pb-0">
        <PageTransition key={pathname}>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
      <MobileNav />
    </div>
  )
}
