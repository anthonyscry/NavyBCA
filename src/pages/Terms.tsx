import { Container, Card, CardBody } from '@/components/ui'

export default function Terms() {
  return (
    <Container size="md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] via-white to-[var(--color-primary)] bg-clip-text text-transparent">
          Terms of Use
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-2">Last updated: January 2026</p>
      </div>

      <Card>
        <CardBody className="space-y-6">
          <Section title="Acceptance of Terms">
            <p>By accessing or using navybca.com, you agree to be bound by these Terms of Use. If you do not agree, please do not use the site.</p>
          </Section>

          <Section title="Disclaimer">
            <p>This is an <strong>unofficial</strong> tool. It is NOT affiliated with, endorsed by, or connected to the U.S. Navy, Department of Defense, or any government entity. All calculations and workout programs are provided for <strong>informational and planning purposes only</strong>.</p>
          </Section>

          <Section title="No Medical Advice">
            <p>The information on this site does not constitute medical advice. Always consult with your medical provider before starting any exercise program. Body composition results should be verified by a certified Command Fitness Leader (CFL).</p>
          </Section>

          <Section title="Accuracy">
            <p>We strive for accuracy based on current Navy standards (Guide-4, December 2025). However, regulations change and errors are possible. Always verify official results with your CFL and the latest Navy publications.</p>
          </Section>

          <Section title="Use at Your Own Risk">
            <p>You use this site and its tools at your own risk. We are not responsible for any decisions made based on the information provided, including but not limited to BCA calculations, workout programs, or scheduling tools.</p>
          </Section>

          <Section title="Intellectual Property">
            <p>The code, design, and content of this site are the property of the site creator. Exercise data and fitness programs are general knowledge adapted for Navy PT standards.</p>
          </Section>

          <Section title="Modifications">
            <p>We reserve the right to modify these terms at any time. Continued use of the site after changes constitutes acceptance of the new terms.</p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about these terms? Email{' '}
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
