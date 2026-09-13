/**
 * ============================================================================
 *  Live Status Badge
 * ----------------------------------------------------------------------------
 *  Pulsing "system live" telemetry pill shown in the auth/dashboard headers.
 * ============================================================================
 */

interface LiveStatusBadgeProps {
  /** Status copy, e.g. "Node 12-East Active". */
  label: string
  /** Extra classes for the outer pill (widths, alignment…). */
  className?: string
}

export function LiveStatusBadge({ label, className = '' }: LiveStatusBadgeProps) {
  return (
    <div className={`neu-inset-sm flex items-center gap-2 rounded-full px-3 py-1.5 ${className}`}>
      <span aria-hidden="true" className="h-2 w-2 animate-pulse rounded-full bg-success" />
      <span className="text-label-sm font-label-sm text-on-surface-variant">{label}</span>
    </div>
  )
}
