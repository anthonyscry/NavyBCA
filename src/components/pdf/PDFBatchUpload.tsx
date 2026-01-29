import { useState, useCallback, useRef } from 'react'
import { Upload, Download, FileText, Trash2, Loader } from 'lucide-react'
import type { BatchRow } from '@/lib/pdf-engine'
import {
  BATCH_CSV_TEMPLATE_HEADERS,
  BATCH_CSV_SAMPLE_ROW,
  normalizeBatchRow,
  validateMemberInfo,
} from '@/lib/pdf-engine'
import { Button, Card, CardBody, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

interface PDFBatchUploadProps {
  onGenerate: (rows: BatchRow[]) => void
  loading: boolean
  progress: number // 0-100
  progressText: string
}

function parseCSV(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) return { headers: [], rows: [] }

  const headers = parseCSVLine(lines[0] ?? '')
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i] ?? '')
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? ''
    })
    rows.push(row)
  }

  return { headers, rows }
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

export function PDFBatchUpload({
  onGenerate,
  loading,
  progress,
  progressText,
}: PDFBatchUploadProps) {
  const [rows, setRows] = useState<BatchRow[]>([])
  const [validCount, setValidCount] = useState(0)
  const [invalidCount, setInvalidCount] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processCSV = useCallback((text: string) => {
    const { rows: parsed } = parseCSV(text)

    // Map to BatchRow (best-effort column mapping)
    const batchRows: BatchRow[] = parsed.map((row) => ({
      Name: row.Name ?? row.name ?? '',
      Rate: row.Rate ?? row.rate ?? row.Rank ?? row.rank ?? '',
      UIC: row.UIC ?? row.uic ?? '',
      Age: row.Age ?? row.age ?? '',
      Gender: row.Gender ?? row.gender ?? row.Sex ?? row.sex ?? '',
      DoD_ID: row.DoD_ID ?? row.dodid ?? row.DoDID ?? '',
      CFL1: row.CFL1 ?? row.cfl1 ?? '',
      CFL2: row.CFL2 ?? row.cfl2 ?? '',
      BCA_Date: row.BCA_Date ?? row.bca_date ?? row.Date ?? row.date ?? '',
    }))

    let valid = 0
    let invalid = 0
    batchRows.forEach((r) => {
      const member = normalizeBatchRow(r)
      const result = validateMemberInfo(member)
      if (result.valid) valid++
      else invalid++
    })

    setRows(batchRows)
    setValidCount(valid)
    setInvalidCount(invalid)
  }, [])

  const handleFile = useCallback(
    (file: File) => {
      if (!file.name.endsWith('.csv')) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        if (text) processCSV(text)
      }
      reader.readAsText(file)
    },
    [processCSV],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile],
  )

  const downloadTemplate = useCallback(() => {
    const csv =
      BATCH_CSV_TEMPLATE_HEADERS.join(',') +
      '\n' +
      BATCH_CSV_SAMPLE_ROW.join(',')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'NAVPERS-6110-10-batch-template.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [])

  const clearUpload = useCallback(() => {
    setRows([])
    setValidCount(0)
    setInvalidCount(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const hasData = rows.length > 0

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      {!hasData && (
        <Card
          className={cn(
            'border-2 border-dashed transition-colors cursor-pointer',
            isDragging ? 'border-gold bg-gold/5' : 'border-border',
          )}
        >
          <CardBody
            className="text-center py-10"
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-10 w-10 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary mb-2">
              Drag &amp; drop CSV file here, or click to browse
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileInput}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                downloadTemplate()
              }}
            >
              <Download className="h-4 w-4 mr-1" />
              Download CSV Template
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Preview */}
      {hasData && !loading && (
        <Card>
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gold" />
                <span className="font-semibold text-text-primary">
                  {rows.length} member{rows.length !== 1 ? 's' : ''} loaded
                </span>
              </div>
              <div className="flex gap-2">
                <Badge variant="success">{validCount} valid</Badge>
                {invalidCount > 0 && (
                  <Badge variant="error">{invalidCount} invalid</Badge>
                )}
              </div>
            </div>

            {/* Preview table (first 5 rows) */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-text-tertiary font-medium">
                      Name
                    </th>
                    <th className="text-left py-2 px-2 text-text-tertiary font-medium">
                      Rate
                    </th>
                    <th className="text-left py-2 px-2 text-text-tertiary font-medium">
                      UIC
                    </th>
                    <th className="text-left py-2 px-2 text-text-tertiary font-medium">
                      Gender
                    </th>
                    <th className="text-left py-2 px-2 text-text-tertiary font-medium">
                      Age
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="py-2 px-2 text-text-primary">{row.Name}</td>
                      <td className="py-2 px-2 text-text-primary">{row.Rate}</td>
                      <td className="py-2 px-2 text-text-primary">{row.UIC}</td>
                      <td className="py-2 px-2 text-text-primary">{row.Gender}</td>
                      <td className="py-2 px-2 text-text-primary">{row.Age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {rows.length > 5 && (
                <p className="text-sm text-text-tertiary mt-2 text-center">
                  ...and {rows.length - 5} more
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={clearUpload}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                onClick={() => onGenerate(rows)}
                disabled={validCount === 0}
              >
                Generate {validCount} PDF{validCount !== 1 ? 's' : ''}
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Progress */}
      {loading && (
        <Card>
          <CardBody className="text-center py-8">
            <Loader className="h-8 w-8 text-gold mx-auto mb-3 animate-spin" />
            <p className="text-text-primary font-medium mb-3">{progressText}</p>
            <div className="w-full bg-navy-surface rounded-full h-3 overflow-hidden">
              <div
                className="bg-gold h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-text-tertiary mt-2">{progress}%</p>
          </CardBody>
        </Card>
      )}

      {/* Help */}
      {!hasData && (
        <Card className="bg-navy-surface/50">
          <CardBody>
            <h4 className="text-sm font-semibold text-gold mb-2">CSV Format</h4>
            <p className="text-sm text-text-secondary mb-1">
              <strong>Required:</strong> Name, Rate, UIC, Age, Gender
            </p>
            <p className="text-sm text-text-secondary mb-1">
              <strong>Optional:</strong> DoD_ID, CFL1, CFL2, BCA_Date
            </p>
            <p className="text-sm text-text-tertiary">
              Gender: M/F or Male/Female. Names: &quot;LAST, FIRST MI&quot; format. UIC: 5
              alphanumeric chars.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}
