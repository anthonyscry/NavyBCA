import type { Gender } from '@/lib/bca-engine'
import {
  Button,
  Select,
  NumberInput,
  FormSection,
  Checkbox,
} from '@/components/ui'
import { Card, CardBody } from '@/components/ui'

export interface BCAFormProps {
  gender: Gender
  heightFeet: number
  heightInches: number
  weight: number
  waist: number
  rememberEnabled: boolean
  onGenderChange: (gender: Gender) => void
  onHeightFeetChange: (value: number) => void
  onHeightInchesChange: (value: number) => void
  onWeightChange: (value: number) => void
  onWaistChange: (value: number) => void
  onRememberChange: (enabled: boolean) => void
  onCalculate: () => void
}

const FEET_OPTIONS = [4, 5, 6, 7] as const
const INCHES_OPTIONS = Array.from({ length: 24 }, (_, i) => i * 0.5) // 0, 0.5, 1 … 11.5

export function BCAForm({
  gender,
  heightFeet,
  heightInches,
  weight,
  waist,
  rememberEnabled,
  onGenderChange,
  onHeightFeetChange,
  onHeightInchesChange,
  onWeightChange,
  onWaistChange,
  onRememberChange,
  onCalculate,
}: BCAFormProps) {
  const maxBF = gender === 'male' ? 26 : 36
  const genderLabel = gender === 'male' ? 'males' : 'females'

  return (
    <Card>
      <CardBody className="space-y-6">
        {/* Gender Toggle */}
        <FormSection title="Gender">
          <div className="flex gap-2" role="group" aria-label="Gender selection">
            <Button
              type="button"
              variant={gender === 'male' ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => onGenderChange('male')}
              aria-pressed={gender === 'male'}
            >
              &#9794; Male
            </Button>
            <Button
              type="button"
              variant={gender === 'female' ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => onGenderChange('female')}
              aria-pressed={gender === 'female'}
            >
              &#9792; Female
            </Button>
          </div>
          <p className="text-sm text-text-tertiary mt-1">
            Max BF%: <span className="text-gold font-medium">{maxBF}%</span> for{' '}
            {genderLabel}
          </p>
        </FormSection>

        {/* Height */}
        <FormSection title="Height (rounded up to nearest &frac12;&Prime;)">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Feet"
              value={String(heightFeet)}
              onChange={(e) => onHeightFeetChange(Number(e.target.value))}
              aria-label="Height in feet"
            >
              {FEET_OPTIONS.map((ft) => (
                <option key={ft} value={String(ft)}>
                  {ft} ft
                </option>
              ))}
            </Select>

            <Select
              label="Inches"
              value={String(heightInches)}
              onChange={(e) => onHeightInchesChange(Number(e.target.value))}
              aria-label="Height in inches"
            >
              {INCHES_OPTIONS.map((inch) => (
                <option key={inch} value={String(inch)}>
                  {inch} in
                </option>
              ))}
            </Select>
          </div>
        </FormSection>

        {/* Weight */}
        <NumberInput
          label="Weight (lbs) \u2014 Rounded to nearest pound"
          value={weight}
          onValueChange={onWeightChange}
          min={61}
          max={400}
          step={1}
          unit="lbs"
          required
          aria-label="Enter your weight in pounds"
        />

        {/* Waist */}
        <NumberInput
          label="Waist at Umbilicus (inches) \u2014 Rounded down to nearest &frac12;&Prime;"
          value={waist}
          onValueChange={onWaistChange}
          min={20}
          max={60}
          step={0.5}
          unit="in"
          helperText="Measured at bellybutton level, tape parallel to deck"
          required
          aria-label="Enter your waist measurement in inches"
        />

        {/* Remember Toggle */}
        <Checkbox
          label="Remember Inputs"
          checked={rememberEnabled}
          onChange={(e) => onRememberChange(e.target.checked)}
        />
        {rememberEnabled && (
          <p className="text-xs text-text-tertiary -mt-4 ml-7">
            Inputs will be saved on this device
          </p>
        )}

        {/* Calculate Button */}
        <Button
          type="button"
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onCalculate}
          aria-label="Calculate Body Composition Assessment"
        >
          Calculate BCA
        </Button>
      </CardBody>
    </Card>
  )
}
