import { forwardRef } from 'react'
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react'
import type { BCAResult, GoalPath } from '@/lib/bca-engine'
import { Card, CardBody, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

export interface BCAResultsProps {
  result: BCAResult
  goalPaths: GoalPath[]
}

// ─── Sub-components ───

function MetricCard({
  label,
  value,
  sub,
}: {
  label: string
  value: string
  sub?: string
}) {
  return (
    <div className="bg-navy-surface rounded-lg p-4 text-center border border-border">
      <div className="text-xs text-text-tertiary uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className="text-xl font-bold text-text-primary">{value}</div>
      {sub && <div className="text-sm text-text-secondary mt-0.5">{sub}</div>}
    </div>
  )
}

function StepCard({
  step,
  title,
  pass,
  dimmed,
  children,
}: {
  step: number
  title: string
  pass: boolean
  dimmed?: boolean
  children: React.ReactNode
}) {
  return (
    <Card
      className={cn(
        'border-l-4 transition-opacity',
        pass ? 'border-l-success' : 'border-l-error',
        dimmed && 'opacity-50',
      )}
    >
      <CardBody>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant={pass ? 'success' : 'error'}>STEP {step}</Badge>
            <span className="font-semibold text-text-primary">{title}</span>
          </div>
          <Badge variant={pass ? 'success' : 'error'}>
            {pass ? 'PASS' : 'FAIL'}
          </Badge>
        </div>
        {children}
      </CardBody>
    </Card>
  )
}

function GoalPathCard({ path }: { path: GoalPath }) {
  return (
    <Card
      className={cn(
        'relative',
        path.easiest && 'ring-2 ring-success border-success',
      )}
    >
      <CardBody>
        {path.easiest && (
          <div className="absolute -top-3 left-4">
            <Badge variant="success">Easiest Path</Badge>
          </div>
        )}
        <h4
          className={cn(
            'font-semibold text-lg mb-3',
            path.easiest ? 'text-success mt-2' : 'text-text-primary',
          )}
        >
          {path.title}
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {path.waistChange > 0 ? (
            <>
              <GoalDetail
                label="Target Waist"
                value={`${path.targetWaist.toFixed(1)}"`}
                highlight={path.easiest}
              />
              <GoalDetail
                label="Waist to Lose"
                value={`${path.waistChange.toFixed(1)}"`}
                highlight={path.easiest}
              />
            </>
          ) : (
            <GoalDetail
              label="Keep Waist"
              value={`${path.targetWaist.toFixed(1)}"`}
            />
          )}

          {path.weightChange > 0 ? (
            <>
              <GoalDetail
                label="Target Weight"
                value={`${Math.round(path.targetWeight)} lbs`}
                highlight={path.easiest}
              />
              <GoalDetail
                label="Weight to Lose"
                value={`${Math.round(path.weightChange)} lbs`}
                highlight={path.easiest}
              />
            </>
          ) : (
            <GoalDetail
              label="Keep Weight"
              value={`${Math.round(path.targetWeight)} lbs`}
            />
          )}

          <GoalDetail
            label="Est. Timeline"
            value={`${path.timeline} weeks`}
            highlight={path.easiest}
          />
        </div>

        <p className="text-sm text-text-tertiary">{path.note}</p>
      </CardBody>
    </Card>
  )
}

function GoalDetail({
  label,
  value,
  highlight,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div>
      <div className="text-xs text-text-tertiary">{label}</div>
      <div
        className={cn(
          'font-semibold',
          highlight ? 'text-success' : 'text-text-primary',
        )}
      >
        {value}
      </div>
    </div>
  )
}

// ─── Main Results ───

export const BCAResults = forwardRef<HTMLDivElement, BCAResultsProps>(
  function BCAResults({ result, goalPaths }, ref) {
    const heightFt = Math.floor(result.roundedHeight / 12)
    const heightIn = result.roundedHeight % 12

    return (
      <div ref={ref} className="space-y-6 mt-8">
        {/* Status Banner */}
        <Card
          className={cn(
            'border-2',
            result.overallPass ? 'border-success' : 'border-error',
          )}
        >
          <CardBody className="text-center py-6">
            {result.overallPass ? (
              <CheckCircle className="h-12 w-12 text-success mx-auto mb-2" />
            ) : (
              <XCircle className="h-12 w-12 text-error mx-auto mb-2" />
            )}
            <h2
              className={cn(
                'text-2xl font-bold',
                result.overallPass ? 'text-success' : 'text-error',
              )}
            >
              {result.overallPass
                ? 'WITHIN STANDARDS'
                : 'NOT WITHIN STANDARDS'}
            </h2>
            <p className="text-text-tertiary text-sm mt-1">BCA Result</p>
          </CardBody>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard
            label="Height"
            value={`${result.roundedHeight}"`}
            sub={`${heightFt}' ${heightIn}"`}
          />
          <MetricCard
            label="Weight"
            value={`${result.roundedWeight} lbs`}
          />
          <MetricCard label="Waist" value={`${result.roundedWaist}"`} />
          <MetricCard
            label="H-W Diff"
            value={`${result.heightWaistDiff}"`}
          />
        </div>

        {/* Step 1: WHtR */}
        <StepCard step={1} title="Waist-to-Height Ratio" pass={result.step1Pass}>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-text-tertiary mb-1">Your WHtR</div>
              <div
                className={cn(
                  'text-lg font-bold',
                  result.step1Pass ? 'text-success' : 'text-error',
                )}
              >
                {result.whtr.toFixed(4)}
              </div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">Max Allowed</div>
              <div className="text-lg font-bold text-text-primary">0.5499</div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">Max Waist</div>
              <div className="text-lg font-bold text-text-primary">
                {result.maxWaist}&Prime;
              </div>
            </div>
          </div>
          {result.step1Pass && (
            <p className="text-success text-sm mt-3 text-center font-medium">
              &#10003; Step 2 not required &mdash; Within Standards
            </p>
          )}
        </StepCard>

        {/* Step 2: Body Fat */}
        <StepCard
          step={2}
          title="Body Composition"
          pass={result.step2Pass}
          dimmed={result.step1Pass}
        >
          {result.step1Pass && (
            <p className="text-text-tertiary text-sm mb-3 text-center italic">
              Not required &mdash; passed Step 1
            </p>
          )}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-text-tertiary mb-1">
                Est. Body Fat
              </div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  result.step2Pass ? 'text-success' : 'text-error',
                )}
              >
                {result.bodyFatPercent}%
              </div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">Max Allowed</div>
              <div className="text-2xl font-bold text-text-primary">
                {result.maxBodyFat}%
              </div>
            </div>
            <div>
              <div className="text-xs text-text-tertiary mb-1">Difference</div>
              <div
                className={cn(
                  'text-2xl font-bold',
                  result.step2Pass ? 'text-success' : 'text-error',
                )}
              >
                {result.bodyFatDiff >= 0 ? '-' : '+'}
                {Math.abs(result.bodyFatDiff)}%
              </div>
            </div>
          </div>
        </StepCard>

        {/* Warning Box — only when overall fail */}
        {!result.overallPass && (
          <Card className="border-l-4 border-l-warning bg-warning/5">
            <CardBody>
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-warning mb-1">
                    Action Required
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Sailors not within standards for both Step-1 and Step-2 must
                    obtain medical clearance prior to participating in the
                    PRT/CFT. Refer to Guide-1 for High-Performance BCA Exemption
                    details.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Path to Standards — only when overall fail */}
        {!result.overallPass && goalPaths.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-text-primary">
              &#127919; Your Path to Standards
            </h3>
            <p className="text-sm text-text-secondary">
              Here are your options to pass BCA. The{' '}
              <span className="text-success font-semibold">easiest path</span>{' '}
              is highlighted based on the smallest changes needed.
            </p>
            <div className="space-y-4">
              {goalPaths.map((path) => (
                <GoalPathCard key={path.title} path={path} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  },
)
