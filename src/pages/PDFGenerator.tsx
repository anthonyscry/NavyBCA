import { useState, useCallback } from 'react'
import { FileText, Users } from 'lucide-react'
import type { MemberInfo, BatchRow } from '@/lib/pdf-engine'
import {
  generateNavpersPDF,
  loadPdfTemplate,
  normalizeBatchRow,
  validateMemberInfo,
} from '@/lib/pdf-engine'
import { Container, Button, Card, CardBody } from '@/components/ui'
import { useToast } from '@/components/ui'
import { PDFMemberForm } from '@/components/pdf/PDFMemberForm'
import { PDFBatchUpload } from '@/components/pdf/PDFBatchUpload'

type TabMode = 'single' | 'batch'

export default function PDFGenerator() {
  const [tab, setTab] = useState<TabMode>('single')
  const [loading, setLoading] = useState(false)
  const [batchProgress, setBatchProgress] = useState(0)
  const [batchProgressText, setBatchProgressText] = useState('')
  const { addToast } = useToast()

  // ─── Single PDF generation ───
  const handleSingleGenerate = useCallback(
    async (member: MemberInfo) => {
      setLoading(true)
      try {
        const pdfBytes = await generateNavpersPDF(member)
        downloadPDF(pdfBytes, `NAVPERS-6110-10-${safeName(member.name)}.pdf`)
        addToast({ type: 'success', message: 'PDF generated successfully!' })
      } catch (err) {
        console.error('PDF generation failed:', err)
        addToast({
          type: 'error',
          message: 'Failed to generate PDF. Make sure the template is available.',
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast],
  )

  // ─── Batch PDF generation ───
  const handleBatchGenerate = useCallback(
    async (rows: BatchRow[]) => {
      setLoading(true)
      setBatchProgress(0)
      setBatchProgressText('Loading template...')

      try {
        const templateBytes = await loadPdfTemplate()

        // Validate and filter
        const validMembers: MemberInfo[] = []
        for (const row of rows) {
          const member = normalizeBatchRow(row)
          const result = validateMemberInfo(member)
          if (result.valid) validMembers.push(member)
        }

        if (validMembers.length === 0) {
          addToast({ type: 'error', message: 'No valid rows to process' })
          return
        }

        // Generate PDFs and collect as individual downloads
        // (No JSZip dependency — generate one combined or individual PDFs)
        // For simplicity: if 1 member, single download. If multiple, use JSZip if available,
        // otherwise download sequentially.
        if (validMembers.length === 1) {
          const member = validMembers[0]!
          setBatchProgressText(`Generating PDF for ${member.name}...`)
          const pdfBytes = await generateNavpersPDF(member, undefined, templateBytes)
          downloadPDF(pdfBytes, `NAVPERS-6110-10-${safeName(member.name)}.pdf`)
          setBatchProgress(100)
          addToast({ type: 'success', message: 'PDF generated!' })
        } else {
          // Batch: generate all and create a combined download
          // We'll use dynamic import for JSZip (keeps bundle small for non-batch users)
          setBatchProgressText('Loading ZIP library...')
          const JSZip = (await import('jszip')).default
          const zip = new JSZip()

          for (let i = 0; i < validMembers.length; i++) {
            const member = validMembers[i]!
            setBatchProgressText(`Generating ${i + 1} of ${validMembers.length}...`)
            setBatchProgress(Math.round(((i + 1) / validMembers.length) * 90))

            const pdfBytes = await generateNavpersPDF(member, undefined, templateBytes)
            zip.file(
              `NAVPERS-6110-10-${safeName(member.name)}.pdf`,
              pdfBytes,
            )

            // Yield to UI every 3 iterations
            if (i % 3 === 0) {
              await new Promise((r) => requestAnimationFrame(r))
            }
          }

          setBatchProgressText('Creating ZIP archive...')
          setBatchProgress(95)
          const zipBlob = await zip.generateAsync({ type: 'blob' })

          const dateStr = new Date().toISOString().split('T')[0]
          downloadBlob(zipBlob, `NAVPERS-6110-10-Batch-${dateStr}.zip`)
          setBatchProgress(100)
          addToast({
            type: 'success',
            message: `${validMembers.length} PDFs generated and zipped!`,
          })
        }
      } catch (err) {
        console.error('Batch generation failed:', err)
        addToast({
          type: 'error',
          message: 'Batch generation failed. Check console for details.',
        })
      } finally {
        setLoading(false)
        setBatchProgress(0)
        setBatchProgressText('')
      }
    },
    [addToast],
  )

  return (
    <Container size="md">
      <div className="py-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gold mb-2">
            NAVPERS 6110/10 Generator
          </h1>
          <p className="text-text-secondary text-lg">
            Generate pre-filled BCA forms for printing
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            variant={tab === 'single' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => setTab('single')}
          >
            <FileText className="h-4 w-4 mr-2" />
            Single Form
          </Button>
          <Button
            type="button"
            variant={tab === 'batch' ? 'primary' : 'secondary'}
            className="flex-1"
            onClick={() => setTab('batch')}
          >
            <Users className="h-4 w-4 mr-2" />
            Batch Upload
          </Button>
        </div>

        {/* Tab Content */}
        {tab === 'single' ? (
          <PDFMemberForm onGenerate={handleSingleGenerate} loading={loading} />
        ) : (
          <PDFBatchUpload
            onGenerate={handleBatchGenerate}
            loading={loading}
            progress={batchProgress}
            progressText={batchProgressText}
          />
        )}

        {/* Info */}
        <Card className="mt-6 bg-navy-surface/50">
          <CardBody>
            <h3 className="text-sm font-semibold text-gold mb-2">
              About NAVPERS 6110/10
            </h3>
            <p className="text-sm text-text-secondary">
              This generator fills the official NAVPERS 6110/10 (Rev. 12-2025)
              Body Composition Assessment worksheet. Member information is
              pre-filled; measurement fields are left blank for CFL to complete
              during BCA day. Generated PDFs are ready to print on standard
              letter paper.
            </p>
          </CardBody>
        </Card>
      </div>
    </Container>
  )
}

// ─── Helpers ───

function safeName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 50)
}

function downloadPDF(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: 'application/pdf' })
  downloadBlob(blob, filename)
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
