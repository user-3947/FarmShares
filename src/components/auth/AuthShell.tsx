/**
 * ============================================================================
 *  Auth Shell
 * ----------------------------------------------------------------------------
 *  Page frame shared by every unauthenticated screen: brand header with live
 *  status + theme toggle, a centered main slot for the auth card, and a
 *  page-specific footer slot.
 * ============================================================================
 */
import type { ReactNode } from 'react'
import { BrandLogo } from '../ui/BrandLogo'
import { LiveStatusBadge } from '../ui/LiveStatusBadge'
import { ThemeToggle } from '../ui/ThemeToggle'

interface AuthShellProps {
  /** Tagline under the brand wordmark; omit for the compact logo only. */
  tagline?: string
  /** Copy for the live-status telemetry pill in the header. */
  statusLabel: string
  /** Page content (the auth card). */
  children: ReactNode
  /** Footer content — composed by each page (copy differs per page). */
  footer: ReactNode
  /** Width/positioning utilities for the main column, e.g. "max-w-md". */
  mainClassName: string
}

export function AuthShell({ tagline, statusLabel, children, footer, mainClassName }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top bar: brand identity + telemetry + theme switch */}
      <header className="mx-auto flex w-full max-w-max-width items-center justify-between px-4 py-2 sm:px-6">
        <BrandLogo tagline={tagline} />
        <div className="flex items-center gap-2">
          <LiveStatusBadge label={statusLabel} />
          <ThemeToggle />
        </div>
      </header>

      {/* Centered auth card slot */}
      <main className={`mx-auto flex w-full flex-col px-4 sm:px-6 ${mainClassName}`}>
        {children}
      </main>

      {/* Page-specific legal footer */}
      {footer}
    </div>
  )
}
