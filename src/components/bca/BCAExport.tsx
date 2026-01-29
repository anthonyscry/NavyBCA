import { useCallback } from 'react'
import { Download, Printer } from 'lucide-react'
import type { BCAResult, GoalPath } from '@/lib/bca-engine'
import { Button } from '@/components/ui'

export interface BCAExportProps {
  result: BCAResult
  goalPaths: GoalPath[]
}

function buildCSV(result: BCAResult, goalPaths: GoalPath[]): string {
  const today = new Date().toISOString().split('T')[0]
  let csv = 'Navy BCA Results\n'
  csv += `Date,${today}\n`
  csv += `Gender,${result.gender}\n`
  csv += '\n'
  csv += 'Measurements\n'
  csv += `Height,${result.roundedHeight}"\n`
  csv += `Weight,${result.roundedWeight} lbs\n`
  csv += `Waist,${result.roundedWaist}"\n`
  csv += '\n'
  csv += 'Results\n'
  csv += `Overall Status,${result.overallPass ? 'WITHIN STANDARDS' : 'NOT WITHIN STANDARDS'}\n`
  csv += `Step 1 (WHtR),${result.step1Pass ? 'PASS' : 'FAIL'}\n`
  csv += `WHtR Value,${result.whtr.toFixed(4)}\n`
  csv += `Step 2 (Body Fat),${result.step2Pass ? 'PASS' : 'FAIL'}\n`
  csv += `Body Fat %,${result.bodyFatPercent}%\n`
  csv += `Max Allowed BF%,${result.maxBodyFat}%\n`

  if (!result.overallPass && goalPaths.length > 0) {
    csv += '\nPath to Standards\n'
    goalPaths.forEach((path, index) => {
      csv += `\nOption ${index + 1},${path.title}\n`
      if (path.waistChange > 0) {
        csv += `Target Waist,${path.targetWaist.toFixed(1)}"\n`
        csv += `Waist to Lose,${path.waistChange.toFixed(1)}"\n`
      } else {
        csv += `Keep Waist,${path.targetWaist.toFixed(1)}"\n`
      }
      if (path.weightChange > 0) {
        csv += `Target Weight,${Math.round(path.targetWeight)} lbs\n`
        csv += `Weight to Lose,${Math.round(path.weightChange)} lbs\n`
      } else {
        csv += `Keep Weight,${Math.round(path.targetWeight)} lbs\n`
      }
      csv += `Est. Timeline,${path.timeline} weeks\n`
      csv += `Note,"${path.note}"\n`
    })
  }

  return csv
}

export function BCAExport({ result, goalPaths }: BCAExportProps) {
  const handleCSVExport = useCallback(() => {
    const csv = buildCSV(result, goalPaths)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const today = new Date().toISOString().split('T')[0]

    const a = document.createElement('a')
    a.href = url
    a.download = `Navy-BCA-Results-${today}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [result, goalPaths])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="flex gap-3 mt-6 justify-center">
      <Button
        type="button"
        variant="secondary"
        onClick={handleCSVExport}
        aria-label="Export results to CSV"
      >
        <Download className="h-4 w-4 mr-2" />
        Export to CSV
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={handlePrint}
        aria-label="Print or save as PDF"
      >
        <Printer className="h-4 w-4 mr-2" />
        Print / Save PDF
      </Button>
    </div>
  )
}
