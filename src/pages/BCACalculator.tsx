import { useState, useRef, useEffect, useCallback } from 'react'
import type { Gender, BCAResult, GoalPath } from '@/lib/bca-engine'
import { calculateBCA, calculateGoalPaths } from '@/lib/bca-engine'
import { useBCAStorage } from '@/hooks/useBCAStorage'
import { Container } from '@/components/ui'
import { BCAForm } from '@/components/bca/BCAForm'
import { BCAResults } from '@/components/bca/BCAResults'
import { BCAExport } from '@/components/bca/BCAExport'

export default function BCACalculator() {
  // ─── Form state ───
  const [gender, setGender] = useState<Gender>('male')
  const [heightFeet, setHeightFeet] = useState(5)
  const [heightInches, setHeightInches] = useState(10)
  const [weight, setWeight] = useState(180)
  const [waist, setWaist] = useState(34)

  // ─── Results state ───
  const [result, setResult] = useState<BCAResult | null>(null)
  const [goalPaths, setGoalPaths] = useState<GoalPath[]>([])
  const resultsRef = useRef<HTMLDivElement>(null)

  // ─── Storage ───
  const {
    rememberEnabled,
    setRememberEnabled,
    loadSavedData,
    saveData,
    clearData,
  } = useBCAStorage()

  // Load saved data on mount
  useEffect(() => {
    const saved = loadSavedData()
    if (saved) {
      setGender(saved.gender)
      setHeightFeet(saved.heightFeet)
      setHeightInches(saved.heightInches)
      setWeight(saved.weight)
      setWaist(saved.waist)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-save when inputs change (debounced via dependency)
  useEffect(() => {
    if (rememberEnabled) {
      saveData({ gender, heightFeet, heightInches, weight, waist })
    }
  }, [gender, heightFeet, heightInches, weight, waist, rememberEnabled, saveData])

  // ─── Handlers ───

  const handleCalculate = useCallback(() => {
    const bcaResult = calculateBCA({
      gender,
      heightFeet,
      heightInches,
      weight,
      waist,
    })
    setResult(bcaResult)

    if (!bcaResult.overallPass) {
      const paths = calculateGoalPaths(
        bcaResult.roundedHeight,
        bcaResult.roundedWeight,
        bcaResult.roundedWaist,
        gender,
        bcaResult.maxBodyFat,
        bcaResult.maxWaist,
      )
      setGoalPaths(paths)
    } else {
      setGoalPaths([])
    }

    // Scroll to results after render
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [gender, heightFeet, heightInches, weight, waist])

  const handleReset = useCallback(() => {
    setGender('male')
    setHeightFeet(5)
    setHeightInches(10)
    setWeight(180)
    setWaist(34)
    setResult(null)
    setGoalPaths([])
    clearData()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [clearData])

  return (
    <Container size="md">
      <div className="py-xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">
            Navy BCA Calculator
          </h1>
          <p className="text-text-secondary text-lg">
            Body Composition Assessment &mdash; Guide-4 (December 2025)
          </p>
        </div>

        {/* Form */}
        <BCAForm
          gender={gender}
          heightFeet={heightFeet}
          heightInches={heightInches}
          weight={weight}
          waist={waist}
          rememberEnabled={rememberEnabled}
          onGenderChange={setGender}
          onHeightFeetChange={setHeightFeet}
          onHeightInchesChange={setHeightInches}
          onWeightChange={setWeight}
          onWaistChange={setWaist}
          onRememberChange={setRememberEnabled}
          onCalculate={handleCalculate}
        />

        {/* Results */}
        {result && (
          <>
            <BCAResults
              ref={resultsRef}
              result={result}
              goalPaths={goalPaths}
            />

            {/* Export Buttons */}
            <BCAExport result={result} goalPaths={goalPaths} />

            {/* Reset Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleReset}
                className="text-text-tertiary hover:text-text-primary underline underline-offset-4 transition-colors text-sm"
              >
                Reset Calculator
              </button>
            </div>
          </>
        )}
      </div>
    </Container>
  )
}
