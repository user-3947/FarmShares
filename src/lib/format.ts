/**
 * ============================================================================
 *  Display Formatting Helpers
 * ----------------------------------------------------------------------------
 *  Small pure functions that turn domain values into display strings.
 * ============================================================================
 */

/** Builds an avatar monogram from a person's full name (e.g. "A. Morgan" → "AM"). */
export function initialsFromName(fullName: string, fallback = 'FS'): string {
  const trimmed = fullName.trim()
  if (!trimmed) return fallback
  return (
    trimmed
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || fallback
  )
}
