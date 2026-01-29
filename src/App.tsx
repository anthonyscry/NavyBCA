function App() {
  return (
    <div className="min-h-screen bg-navy-blue flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gold mb-4">
          Navy BCA Calculator
        </h1>
        <p className="text-text-primary">
          React 19 + Vite 7 + Tailwind v4 + TypeScript
        </p>
        <p className="text-text-secondary mt-2 text-sm">
          Build mode: {import.meta.env.VITE_BUILD_MODE ?? 'development'}
        </p>
      </div>
    </div>
  )
}

export default App
