import { FileText, ExternalLink } from 'lucide-react'
import { Container, Card, CardBody } from '@/components/ui'

const REFERENCES = [
  {
    title: 'Guide-4: Body Composition Assessment (BCA)',
    description: 'Official Navy body composition assessment standards, measurement procedures, and maximum body fat percentages. December 2025 revision.',
    url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
    highlight: true,
  },
  {
    title: 'Guide-5A: Physical Readiness Test (PRT)',
    description: 'Official PRT event standards, scoring tables, and administration guidelines for pushups, forearm plank, and cardio events.',
    url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
    highlight: true,
  },
  {
    title: 'OPNAVINST 6110.1K - Physical Readiness Program',
    description: 'The overarching Navy instruction governing the Physical Readiness Program, including BCA and PRT requirements.',
    url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
  },
  {
    title: 'MyNavy HR - Physical Readiness',
    description: 'Official Navy portal for all physical readiness resources, guides, and updates.',
    url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
  },
  {
    title: 'NAVPERS 6110/10 - Physical Readiness Record',
    description: 'The official form used to record BCA and PRT results. Our PDF Generator fills this form automatically.',
    url: 'https://www.mynavyhr.navy.mil/Support-Services/Culture-Resilience/Physical-Readiness/',
  },
]

export default function References() {
  return (
    <Container size="md">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center">
            <FileText className="w-6 h-6 text-[var(--color-background)]" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
            References
          </h1>
        </div>
        <p className="text-[var(--color-text-muted)] text-sm uppercase tracking-widest">
          Official Navy Fitness Documents & Sources
        </p>
      </div>

      <div className="space-y-3">
        {REFERENCES.map((ref, i) => (
          <Card key={i} className={ref.highlight ? 'ring-1 ring-[var(--color-primary)]/30' : ''}>
            <CardBody>
              <div className="flex items-start gap-3">
                <FileText className={`w-5 h-5 flex-shrink-0 mt-0.5 ${ref.highlight ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-sm mb-1">{ref.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed mb-2">{ref.description}</p>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
                  >
                    View on MyNavy HR <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardBody>
          <p className="text-xs text-[var(--color-text-muted)] text-center">
            All references link to official U.S. Navy sources. Check MyNavy HR for the most current versions of all documents.
            This site is not affiliated with or endorsed by the U.S. Navy.
          </p>
        </CardBody>
      </Card>
    </Container>
  )
}
