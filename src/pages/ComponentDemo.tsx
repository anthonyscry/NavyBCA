import { useState, useCallback } from 'react'
import { Plus, ArrowRight, Download, Search } from 'lucide-react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Badge,
  Container,
  Input,
  NumberInput,
  Select,
  Checkbox,
  FormGroup,
  FormSection,
  useToast,
  LoadingOverlay,
  Skeleton,
} from '@/components/ui'

/* ─── Component Demo Page ─── */

export default function ComponentDemo() {
  const { addToast } = useToast()

  /* ── Toast state ── */
  const triggerToast = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info') => {
      const messages: Record<typeof type, { title: string; message: string }> = {
        success: { title: 'Success', message: 'BCA calculation saved successfully.' },
        error: { title: 'Error', message: 'Failed to load BCA tables.' },
        warning: { title: 'Warning', message: 'Measurements outside normal range.' },
        info: { title: 'Info', message: 'New PRT cycle begins next month.' },
      }
      addToast({ type, ...messages[type] })
    },
    [addToast],
  )

  /* ── Loading overlay state ── */
  const [showLoading, setShowLoading] = useState(false)
  const toggleLoading = useCallback(() => {
    setShowLoading(true)
    setTimeout(() => setShowLoading(false), 3000)
  }, [])

  /* ── Controlled input state ── */
  const [textValue, setTextValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [height, setHeight] = useState(70)
  const [weight, setWeight] = useState(180)
  const [gender, setGender] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [receiveUpdates, setReceiveUpdates] = useState(true)

  return (
    <>
      {showLoading && <LoadingOverlay message="Calculating BCA results…" />}

      <Container size="lg" className="py-8 md:py-12">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gold mb-2">
          Component Library
        </h1>
        <p className="text-text-secondary mb-8">
          All UI components from the Navy BCA design system.
        </p>

        {/* ─── Buttons ─── */}
        <FormSection title="Buttons" description="5 variants, 3 sizes, loading, disabled, icons, and full-width.">
          {/* Variants */}
          <p className="text-sm font-medium text-text-tertiary mb-3">Variants</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="danger">Danger</Button>
          </div>

          {/* Sizes */}
          <p className="text-sm font-medium text-text-tertiary mb-3">Sizes</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          {/* States */}
          <p className="text-sm font-medium text-text-tertiary mb-3">States</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>

          {/* With Icons */}
          <p className="text-sm font-medium text-text-tertiary mb-3">With Icons</p>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button iconLeft={<Plus className="h-4 w-4" />}>Add Entry</Button>
            <Button variant="secondary" iconRight={<ArrowRight className="h-4 w-4" />}>
              Next Step
            </Button>
            <Button variant="outline" iconLeft={<Download className="h-4 w-4" />}>
              Export CSV
            </Button>
          </div>

          {/* Full Width */}
          <p className="text-sm font-medium text-text-tertiary mb-3">Full Width</p>
          <Button className="w-full">Full Width Button</Button>
        </FormSection>

        {/* ─── Cards ─── */}
        <FormSection title="Cards" description="Compositional card with header, body, footer, hover effect, and responsive grid.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card with header + body + footer */}
            <Card noPadding>
              <CardHeader className="p-4">
                <h3 className="text-base font-semibold text-text-primary">BCA Results</h3>
                <p className="text-sm text-text-tertiary">Last assessment: Jan 2026</p>
              </CardHeader>
              <CardBody className="px-4">
                <p className="text-text-secondary">
                  Body fat: <span className="font-semibold text-success">18%</span>
                </p>
                <p className="text-text-secondary mt-1">
                  WHtR: <span className="font-semibold text-success">0.49</span>
                </p>
              </CardBody>
              <CardFooter className="p-4">
                <Button size="sm" variant="secondary">View Details</Button>
                <Button size="sm" variant="ghost">Dismiss</Button>
              </CardFooter>
            </Card>

            {/* Card with hover effect */}
            <Card className="hover:shadow-md hover:border-gold/30 transition-all cursor-pointer">
              <h3 className="text-base font-semibold text-text-primary mb-2">PT Session</h3>
              <p className="text-sm text-text-secondary">
                60-minute workout with 12 exercises. Hover to see the glow effect.
              </p>
            </Card>

            {/* Body-only card */}
            <Card>
              <p className="text-sm text-text-secondary">
                Simple body-only card with default padding. Use for quick info blocks.
              </p>
            </Card>
          </div>
        </FormSection>

        {/* ─── Badges ─── */}
        <FormSection title="Badges" description="5 variants, BCA-relevant status labels.">
          <p className="text-sm font-medium text-text-tertiary mb-3">Variants</p>
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="default">DEFAULT</Badge>
            <Badge variant="success">PASS</Badge>
            <Badge variant="error">FAIL</Badge>
            <Badge variant="warning">WARNING</Badge>
            <Badge variant="info">INFO</Badge>
          </div>

          <p className="text-sm font-medium text-text-tertiary mb-3">BCA Status Labels</p>
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">BCA PASS</Badge>
            <Badge variant="error">BCA FAIL</Badge>
            <Badge variant="warning">PROBATIONARY</Badge>
            <Badge variant="info">PENDING REVIEW</Badge>
            <Badge variant="default">NOT ASSESSED</Badge>
          </div>
        </FormSection>

        {/* ─── Inputs ─── */}
        <FormSection title="Text Inputs" description="Normal, error, helper text, icon, and disabled states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              helperText="As shown on military ID"
            />
            <Input
              label="Search Exercises"
              placeholder="Search…"
              icon={<Search className="h-4 w-4" />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Input
              label="Email"
              placeholder="sailor@navy.mil"
              error="Invalid email address"
            />
            <Input
              label="DoD ID"
              placeholder="1234567890"
              disabled
              helperText="Contact admin to update"
            />
          </div>
        </FormSection>

        {/* ─── Number Inputs ─── */}
        <FormSection title="Number Inputs" description="Stepper buttons with unit display, min/max clamping.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NumberInput
              label="Height"
              unit="in"
              min={50}
              max={84}
              step={0.5}
              value={height}
              onValueChange={setHeight}
              helperText="50–84 inches"
            />
            <NumberInput
              label="Weight"
              unit="lbs"
              min={80}
              max={400}
              step={1}
              value={weight}
              onValueChange={setWeight}
              helperText="80–400 pounds"
            />
          </div>
        </FormSection>

        {/* ─── Select ─── */}
        <FormSection title="Select" description="Native select with Navy styling and error state.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Gender"
              placeholder="Select gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
            <Select
              label="Branch"
              placeholder="Select branch"
              error="Selection is required"
            >
              <option value="navy">Navy</option>
              <option value="marines">Marines</option>
            </Select>
          </div>
        </FormSection>

        {/* ─── Checkbox ─── */}
        <FormSection title="Checkbox" description="Checked, unchecked, and with description text.">
          <div className="flex flex-col gap-4">
            <Checkbox
              label="I agree to the terms of service"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <Checkbox
              label="Receive PRT reminders"
              description="Get notified 30 days before your next Physical Readiness Test."
              checked={receiveUpdates}
              onChange={(e) => setReceiveUpdates(e.target.checked)}
            />
          </div>
        </FormSection>

        {/* ─── Toast Notifications ─── */}
        <FormSection title="Toast Notifications" description="Trigger each toast type with a button.">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => triggerToast('success')}
            >
              Success Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => triggerToast('error')}
            >
              Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => triggerToast('warning')}
            >
              Warning Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => triggerToast('info')}
            >
              Info Toast
            </Button>
          </div>
        </FormSection>

        {/* ─── Loading Overlay ─── */}
        <FormSection title="Loading Overlay" description="Full-screen overlay with spinner — shows for 3 seconds.">
          <Button variant="outline" onClick={toggleLoading}>
            Show Loading Overlay (3s)
          </Button>
        </FormSection>

        {/* ─── Skeleton ─── */}
        <FormSection title="Skeleton" description="Loading placeholders — text lines, circular, and rectangular.">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Text lines */}
            <Card>
              <p className="text-sm font-medium text-text-tertiary mb-3">Text Lines</p>
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" width="100%" height="1em" />
                <Skeleton variant="text" width="80%" height="1em" />
                <Skeleton variant="text" width="60%" height="1em" />
              </div>
            </Card>

            {/* Circular */}
            <Card>
              <p className="text-sm font-medium text-text-tertiary mb-3">Circular</p>
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width="40px" height="40px" />
                <Skeleton variant="circular" width="56px" height="56px" />
                <Skeleton variant="circular" width="32px" height="32px" />
              </div>
            </Card>

            {/* Rectangular */}
            <Card>
              <p className="text-sm font-medium text-text-tertiary mb-3">Rectangular</p>
              <Skeleton variant="rectangular" width="100%" height="80px" />
            </Card>
          </div>
        </FormSection>

        {/* ─── FormGroup + FormSection Composition ─── */}
        <FormSection title="FormGroup + FormSection" description="Composing form layouts with consistent spacing.">
          <Card>
            <FormSection title="Personal Information" description="Grouped form fields with FormGroup spacing.">
              <FormGroup>
                <Input label="Last Name" placeholder="Smith" required />
              </FormGroup>
              <FormGroup>
                <Input label="First Name" placeholder="John" required />
              </FormGroup>
              <FormGroup>
                <Select label="Rate/Rank" placeholder="Select rate" required>
                  <option value="e1">E-1 SR</option>
                  <option value="e2">E-2 SA</option>
                  <option value="e3">E-3 SN</option>
                  <option value="e4">E-4 PO3</option>
                  <option value="e5">E-5 PO2</option>
                  <option value="e6">E-6 PO1</option>
                  <option value="e7">E-7 CPO</option>
                </Select>
              </FormGroup>
              <FormGroup className="mb-0">
                <Checkbox label="CFL certified" description="Command Fitness Leader qualification" />
              </FormGroup>
            </FormSection>
          </Card>
        </FormSection>
      </Container>
    </>
  )
}
