import { useState } from 'react'
import type { MemberInfo } from '@/lib/pdf-engine'
import {
  Button,
  Input,
  Select,
  NumberInput,
  FormSection,
  Card,
  CardBody,
} from '@/components/ui'

interface PDFMemberFormProps {
  onGenerate: (member: MemberInfo) => void
  loading: boolean
}

export function PDFMemberForm({ onGenerate, loading }: PDFMemberFormProps) {
  const [name, setName] = useState('')
  const [rate, setRate] = useState('')
  const [uic, setUic] = useState('')
  const [dodId, setDodId] = useState('')
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState<'M' | 'F'>('M')
  const [cfl1, setCfl1] = useState('')
  const [cfl2, setCfl2] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Name is required'
    if (!rate.trim()) errs.rate = 'Rate is required'
    if (!uic.trim()) errs.uic = 'UIC is required'
    else if (!/^[A-Za-z0-9]{5}$/.test(uic.trim()))
      errs.uic = 'Must be 5 alphanumeric characters'
    if (dodId && !/^\d{10}$/.test(dodId.replace(/\D/g, '')))
      errs.dodId = 'Must be 10 digits'
    if (age < 17 || age > 70) errs.age = 'Age must be 17-70'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    onGenerate({
      name: name.toUpperCase(),
      rate: rate.toUpperCase(),
      uic: uic.toUpperCase(),
      dodId,
      age: String(age),
      gender,
      cfl1: cfl1 || undefined,
      cfl2: cfl2 || undefined,
    })
  }

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormSection title="Member Information">
            <div className="space-y-4">
              <Input
                label="Name (LAST, FIRST MI)"
                placeholder="DOE, JOHN A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Rate/Rank"
                  placeholder="IT2"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  error={errors.rate}
                  required
                />
                <Input
                  label="UIC (5 chars)"
                  placeholder="54321"
                  value={uic}
                  onChange={(e) => setUic(e.target.value)}
                  error={errors.uic}
                  maxLength={5}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="DoD ID (10 digits)"
                  placeholder="1234567890"
                  value={dodId}
                  onChange={(e) => setDodId(e.target.value)}
                  error={errors.dodId}
                  maxLength={10}
                />
                <Select
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'M' | 'F')}
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Select>
                <NumberInput
                  label="Age"
                  value={age}
                  onValueChange={setAge}
                  min={17}
                  max={70}
                  step={1}
                  error={errors.age}
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="CFL Information (Optional)">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="CFL #1 Name"
                placeholder="SMITH, JANE B"
                value={cfl1}
                onChange={(e) => setCfl1(e.target.value)}
              />
              <Input
                label="CFL #2 Name"
                placeholder="JONES, MIKE C"
                value={cfl2}
                onChange={(e) => setCfl2(e.target.value)}
              />
            </div>
          </FormSection>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Generating PDF...' : 'Generate NAVPERS 6110/10'}
          </Button>
        </form>
      </CardBody>
    </Card>
  )
}
