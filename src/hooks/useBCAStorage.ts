import { useState, useCallback } from 'react'
import type { Gender } from '@/lib/bca-engine'

// ─── Storage keys (match old site for migration compatibility) ───
const KEY_REMEMBER = 'navyBcaRemember'
const KEY_DATA = 'navyBcaData'

export interface BCAStoredData {
  gender: Gender
  heightFeet: number
  heightInches: number
  weight: number
  waist: number
  timestamp: string // ISO 8601
}

export interface UseBCAStorageReturn {
  rememberEnabled: boolean
  setRememberEnabled: (enabled: boolean) => void
  loadSavedData: () => BCAStoredData | null
  saveData: (data: Omit<BCAStoredData, 'timestamp'>) => void
  clearData: () => void
}

function safeGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function safeSetItem(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.warn('[useBCAStorage] Failed to write localStorage:', e)
  }
}

function safeRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn('[useBCAStorage] Failed to remove localStorage key:', e)
  }
}

function isValidGender(v: unknown): v is Gender {
  return v === 'male' || v === 'female'
}

function isInRange(v: unknown, min: number, max: number): v is number {
  return typeof v === 'number' && !isNaN(v) && v >= min && v <= max
}

function isValidHalfInch(v: unknown, min: number, max: number): v is number {
  return isInRange(v, min, max) && (v as number) % 0.5 === 0
}

export function useBCAStorage(): UseBCAStorageReturn {
  const [rememberEnabled, setRememberState] = useState<boolean>(
    () => safeGetItem(KEY_REMEMBER) === 'true',
  )

  const setRememberEnabled = useCallback((enabled: boolean) => {
    setRememberState(enabled)
    if (enabled) {
      safeSetItem(KEY_REMEMBER, 'true')
    } else {
      safeRemoveItem(KEY_REMEMBER)
      safeRemoveItem(KEY_DATA)
    }
  }, [])

  const loadSavedData = useCallback((): BCAStoredData | null => {
    if (safeGetItem(KEY_REMEMBER) !== 'true') return null

    const raw = safeGetItem(KEY_DATA)
    if (!raw) return null

    try {
      const data = JSON.parse(raw) as Record<string, unknown>

      // Validate every field
      const gender = isValidGender(data.gender) ? data.gender : null
      const heightFeet = isInRange(data.heightFeet, 4, 7)
        ? (data.heightFeet as number)
        : null
      const heightInches = isValidHalfInch(data.heightInches, 0, 11.5)
        ? (data.heightInches as number)
        : null
      const weight = isInRange(data.weight, 61, 400)
        ? (data.weight as number)
        : null
      const waist = isInRange(data.waist, 20, 60) ? (data.waist as number) : null

      // If any critical field is invalid, clear and bail
      if (
        gender === null ||
        heightFeet === null ||
        heightInches === null ||
        weight === null ||
        waist === null
      ) {
        console.warn('[useBCAStorage] Stored data failed validation, clearing.')
        safeRemoveItem(KEY_DATA)
        return null
      }

      return {
        gender,
        heightFeet,
        heightInches,
        weight,
        waist,
        timestamp:
          typeof data.timestamp === 'string'
            ? data.timestamp
            : new Date().toISOString(),
      }
    } catch (e) {
      console.warn('[useBCAStorage] Corrupt stored data, clearing:', e)
      safeRemoveItem(KEY_DATA)
      return null
    }
  }, [])

  const saveData = useCallback(
    (data: Omit<BCAStoredData, 'timestamp'>) => {
      if (!rememberEnabled) return
      const payload: BCAStoredData = {
        ...data,
        timestamp: new Date().toISOString(),
      }
      safeSetItem(KEY_REMEMBER, 'true')
      safeSetItem(KEY_DATA, JSON.stringify(payload))
    },
    [rememberEnabled],
  )

  const clearData = useCallback(() => {
    safeRemoveItem(KEY_DATA)
  }, [])

  return {
    rememberEnabled,
    setRememberEnabled,
    loadSavedData,
    saveData,
    clearData,
  }
}
