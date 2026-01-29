import { Outlet } from 'react-router-dom'

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-navy-blue text-text-primary">
      <header className="border-b border-border px-lg py-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-gold">Navy BCA</h1>
          <nav className="flex gap-md">
            <span className="text-text-secondary text-sm">
              {import.meta.env.VITE_BUILD_MODE === 'offline' ? 'Offline' : 'Online'}
            </span>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
