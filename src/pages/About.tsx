import { Container, Card, CardBody } from '@/components/ui'

export default function About() {
  return (
    <Container size="md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-2xl">
            ⚓
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
            About This Site
          </h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">
          A retired Sailor's quest to never plan another burpee
        </p>
      </div>

      <Card>
        <CardBody className="prose prose-invert max-w-none space-y-5">
          <h2 className="text-[var(--color-primary)] text-xl font-bold">Why I Built This</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            I built this site because planning Command PT week after week was a constant struggle.
            As a retired Sailor, I served as a CFL or ACFL at every command I was stationed at and
            took the CFL course four times in my career. I know what it's like balancing your regular
            job, watchstanding duties, and extra collaterals while still being expected to deliver
            solid PT sessions.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Week after week, I found myself scrambling to plan fresh, varied workouts while juggling
            my IT duties. It got old fast, and I was often stressed out the night before not knowing
            what kind of workout we should do. So I built this site for the Sailors still doing the
            job. I wanted something you could open, get an answer, and move on with your day — no
            spreadsheets, no guesswork, no extra drama. The site is completely free — no subscriptions,
            no logins, no paywalls — with minimal advertising to cover hosting costs.
          </p>

          <h3 className="text-white text-lg font-semibold mt-6">What's Here</h3>
          <ul className="space-y-2 text-[var(--color-text-secondary)]">
            <li><strong className="text-white">BCA Calculator:</strong> Fast pass/fail results using current Guide-4 standards, with saved inputs.</li>
            <li><strong className="text-white">PT Generator:</strong> Ready-to-run 60-minute sessions with warm-up, workout, and cool-down.</li>
            <li><strong className="text-white">Watchbill Generator:</strong> Auto-rotated CFL assignments, holiday blocking, and print-ready calendars.</li>
            <li><strong className="text-white">8-Week PRT Prep:</strong> A simple plan to build pushups, planks, and run endurance.</li>
            <li><strong className="text-white">Exercise Library:</strong> 418+ exercises searchable by type, body part, and difficulty.</li>
            <li><strong className="text-white">Offline Mode:</strong> Download a single HTML file and use it anywhere — even on a ship at sea.</li>
          </ul>

          <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] rounded-r-lg p-5 my-6">
            <p className="text-[var(--color-text-secondary)]">
              <strong className="text-white">Important:</strong> This is an <em>unofficial</em> planning tool.
              Official BCA measurements can only be conducted by certified CFLs/ACFLs.
              Always verify with your command's fitness program.
            </p>
          </div>

          <h3 className="text-white text-lg font-semibold">Contact</h3>
          <p className="text-[var(--color-text-secondary)]">
            Suggestions? Bugs? Feedback? Email me at{' '}
            <a href="mailto:administrator@navybca.com" className="text-[var(--color-primary)] hover:underline">
              administrator@navybca.com
            </a>.
          </p>

          <div className="bg-[var(--color-primary)]/10 border-l-4 border-[var(--color-primary)] rounded-r-lg p-5 text-center">
            <p className="text-white font-semibold text-base">
              Fair winds and following seas to all Sailors still serving.
            </p>
          </div>
        </CardBody>
      </Card>
    </Container>
  )
}
