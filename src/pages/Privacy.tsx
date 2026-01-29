import { Container, Card, CardBody } from '@/components/ui'

export default function Privacy() {
  return (
    <Container size="md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-2">Last updated: January 2026</p>
      </div>

      <Card>
        <CardBody className="space-y-6">
          <Section title="Overview">
            <p>Navy BCA Calculator ("we", "us", or "our") operates navybca.com. This page informs you of our policies regarding the collection, use, and disclosure of personal information.</p>
          </Section>

          <Section title="Information We Collect">
            <p>We do <strong>not</strong> collect personal information. All calculations run entirely in your browser. We use:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>localStorage:</strong> Your BCA inputs are saved locally on your device when you enable "Remember." This data never leaves your browser.</li>
              <li><strong>Google Analytics (GA4):</strong> We collect anonymous usage statistics (page views, device type, country) to improve the site. No personally identifiable information is collected.</li>
              <li><strong>Google AdSense:</strong> Third-party ads may use cookies. See Google's privacy policy for details.</li>
            </ul>
          </Section>

          <Section title="Cookies">
            <p>We use cookies only through third-party services (Google Analytics, Google AdSense). You can disable cookies in your browser settings.</p>
          </Section>

          <Section title="Data Storage">
            <p>All data entered into our calculators and tools is stored <strong>only</strong> in your browser's localStorage. We have no server, no database, and no way to access your data. Clearing your browser data removes all stored information.</p>
          </Section>

          <Section title="Third-Party Services">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Google Analytics:</strong> Anonymous usage statistics</li>
              <li><strong>Google AdSense:</strong> Advertising to cover hosting costs</li>
            </ul>
          </Section>

          <Section title="Children's Privacy">
            <p>Our site is intended for U.S. military personnel (ages 17+). We do not knowingly collect information from children under 13.</p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy? Email{' '}
              <a href="mailto:administrator@navybca.com" className="text-[var(--color-primary)] hover:underline">
                administrator@navybca.com
              </a>.
            </p>
          </Section>
        </CardBody>
      </Card>
    </Container>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[var(--color-primary)] text-lg font-bold mb-2">{title}</h2>
      <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed space-y-2">{children}</div>
    </div>
  )
}
