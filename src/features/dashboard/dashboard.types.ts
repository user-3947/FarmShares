/**
 * ============================================================================
 *  Dashboard Types
 * ----------------------------------------------------------------------------
 *  Domain shapes for the dashboard feature. All payloads are currently mocked
 *  in ./dashboard.data — swap the data module for API calls when the backend
 *  lands without touching component code.
 * ============================================================================
 */
import type { LucideIcon } from 'lucide-react'

/** Ledger chart horizon. */
export type RangeKey = '1M' | '6M' | '1Y'

/** Which operator deck is displayed (independent of the login role). */
export type DashboardView = 'Investor' | 'Landowner'

/** One point on the portfolio area chart (values in $M). */
export interface LedgerPoint {
  month: string
  capital: number
  dividends: number
}

/** Hero KPI tile. */
export interface Stat {
  label: string
  value: string
  delta: string
  /** Filled portion of the progress bar (0–100). */
  progress: number
  icon: LucideIcon
}

/** A syndicated holding shown in the Active Holdings panel. */
export interface Investment {
  name: string
  category: string
  roi: string
  allocated: number
  target: number
  stage: string
}

/** Item in the notifications dropdown. */
export interface Notification {
  icon: LucideIcon
  title: string
  detail: string
  time: string
}

/** Sidebar navigation entry (`id` doubles as the anchor slug). */
export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

/** SVG chart colors per theme — SVG attributes cannot resolve CSS vars. */
export interface ChartPalette {
  grid: string
  tick: string
  capital: string
  dividends: string
}
