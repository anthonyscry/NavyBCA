// ─── NAVPERS 6110/10 PDF Generation Engine ───
// Uses pdf-lib to overlay text on the official template.
// Ported from batch.html (lines 1060-1126).

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import type { BCAResult } from '@/lib/bca-engine'

// ─── Types ───

export interface MemberInfo {
  name: string       // "LAST, FIRST MI" format
  rate: string       // e.g. "IT2", "BM1"
  uic: string        // 5 alphanumeric chars
  dodId: string      // 10 digits
  age: string        // e.g. "28"
  gender: 'M' | 'F'
  cfl1?: string      // CFL name
  cfl2?: string      // Second CFL name
  bcaDate?: string   // ISO date string, defaults to today
}

export interface BatchRow {
  Name: string
  Rate: string
  UIC: string
  Age: string
  Gender: string
  DoD_ID?: string
  CFL1?: string
  CFL2?: string
  BCA_Date?: string
}

// ─── Date formatting ───

function formatDateDDMMMYYYY(date: Date): string {
  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
  ]
  const d = new Date(date)
  if (isNaN(d.getTime())) d.setTime(Date.now())
  const day = String(d.getDate()).padStart(2, '0')
  const month = months[d.getMonth()] ?? 'JAN'
  const year = d.getFullYear()
  return `${day} ${month} ${year}`
}

// ─── Load the PDF template ───

let cachedTemplateBytes: ArrayBuffer | null = null

export async function loadPdfTemplate(): Promise<ArrayBuffer> {
  if (cachedTemplateBytes) return cachedTemplateBytes

  // In the online build, fetch from public directory.
  // In offline build, the template is inlined as a base64 data URL via Vite's
  // `?url` import (handled in the component layer, not here).
  const response = await fetch('/printed version.pdf')
  if (!response.ok) throw new Error('Failed to load PDF template')
  cachedTemplateBytes = await response.arrayBuffer()
  return cachedTemplateBytes
}

export function setTemplateBytes(bytes: ArrayBuffer): void {
  cachedTemplateBytes = bytes
}

// ─── Generate a single filled PDF ───

export async function generateNavpersPDF(
  member: MemberInfo,
  bcaResult?: BCAResult,
  templateBytes?: ArrayBuffer,
): Promise<Uint8Array> {
  const template = templateBytes ?? (await loadPdfTemplate())
  const pdfDoc = await PDFDocument.load(template)
  const pages = pdfDoc.getPages()
  const page = pages[0]
  if (!page) throw new Error('PDF template has no pages')

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const { height } = page.getSize()

  const drawText = (
    text: string,
    x: number,
    yFromTop: number,
    options?: { fontSize?: number; bold?: boolean },
  ) => {
    const fontSize = options?.fontSize ?? 10
    const useFont = options?.bold ? fontBold : font
    page.drawText(String(text || ''), {
      x,
      y: height - yFromTop,
      size: fontSize,
      font: useFont,
      color: rgb(0, 0, 0),
    })
  }

  // ─── Member info section ───
  const bcaDate = member.bcaDate
    ? new Date(member.bcaDate)
    : new Date()
  const formattedDate = formatDateDDMMMYYYY(bcaDate)
  const sex = member.gender === 'M' ? 'M' : 'F'
  const dodId = member.dodId.replace(/\D/g, '').padStart(10, '0')

  // Row: Date, UIC, DoD ID, Sex, Age, Rate
  drawText(formattedDate, 55, 168)
  drawText(member.uic.toUpperCase(), 145, 168)
  drawText(dodId, 320, 168)
  drawText(sex, 530, 168)
  drawText(member.age, 610, 168)
  drawText(member.rate.toUpperCase(), 690, 168)

  // Signature section: Member name, CFL1, CFL2
  drawText(member.name.toUpperCase(), 55, 512)
  if (member.cfl1) {
    drawText(member.cfl1.toUpperCase(), 55, 537)
  }
  if (member.cfl2) {
    drawText(member.cfl2.toUpperCase(), 55, 562)
  }

  // ─── BCA results (if provided) ───
  if (bcaResult) {
    // Height field area (approximate coordinates from the form layout)
    const heightFt = Math.floor(bcaResult.roundedHeight / 12)
    const heightIn = bcaResult.roundedHeight % 12
    drawText(`${heightFt}'${heightIn}"`, 55, 220)
    drawText(`${bcaResult.roundedWeight}`, 155, 220)
    drawText(`${bcaResult.roundedWaist}`, 255, 220)
    drawText(`${bcaResult.whtr.toFixed(4)}`, 355, 220)
    drawText(`${bcaResult.bodyFatPercent}%`, 455, 220)
    drawText(bcaResult.overallPass ? 'PASS' : 'FAIL', 555, 220, { bold: true })
  }

  return pdfDoc.save()
}

// ─── Batch generation ───

export function normalizeBatchRow(row: BatchRow): MemberInfo {
  const gender = row.Gender.toUpperCase()
  return {
    name: row.Name,
    rate: row.Rate,
    uic: row.UIC,
    age: row.Age,
    gender: gender === 'M' || gender === 'MALE' ? 'M' : 'F',
    dodId: row.DoD_ID ?? '',
    cfl1: row.CFL1,
    cfl2: row.CFL2,
    bcaDate: row.BCA_Date,
  }
}

export function validateMemberInfo(member: MemberInfo): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  if (!member.name?.trim()) errors.push('Name is required')
  if (!member.rate?.trim()) errors.push('Rate is required')
  if (!member.uic?.trim()) errors.push('UIC is required')
  if (member.uic && !/^[A-Za-z0-9]{5}$/.test(member.uic.trim()))
    errors.push('UIC must be 5 alphanumeric characters')
  if (!member.age?.trim()) errors.push('Age is required')
  if (member.dodId && !/^\d{10}$/.test(member.dodId.replace(/\D/g, '').padStart(10, '0')))
    errors.push('DoD ID must be 10 digits')
  return { valid: errors.length === 0, errors }
}

export const BATCH_CSV_TEMPLATE_HEADERS = [
  'Name', 'Rate', 'UIC', 'Age', 'Gender', 'DoD_ID', 'CFL1', 'CFL2', 'BCA_Date',
]

export const BATCH_CSV_SAMPLE_ROW = [
  '"DOE, JOHN A"', 'IT2', '54321', '28', 'M', '1234567890',
  '"SMITH, JANE B"', '"JONES, MIKE C"',
  new Date().toISOString().split('T')[0],
]
