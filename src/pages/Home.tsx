export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-lg py-xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gold mb-md">
          Navy BCA Calculator
        </h2>
        <p className="text-text-secondary text-lg mb-lg">
          Body Composition Assessment tools for U.S. Navy personnel
        </p>
        <div className="inline-block bg-navy-alt rounded-lg px-lg py-md border border-border">
          <p className="text-text-primary">
            React 19 + Vite 7 + Tailwind v4 + TypeScript
          </p>
          <p className="text-text-hint text-sm mt-sm">
            Build: {import.meta.env.VITE_BUILD_MODE ?? 'development'}
          </p>
        </div>
      </div>
    </div>
  )
}
