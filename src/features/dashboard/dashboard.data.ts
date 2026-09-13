/**
 * ============================================================================
 *  Dashboard Data
 * ----------------------------------------------------------------------------
 *  All mocked domain data + small derived helpers for the dashboard. Labels
 *  that were previously hardcoded inside JSX live here (or in config/app.ts)
 *  so components stay purely presentational and values stay editable in one
 *  place. Replace these exports with API calls when the backend is ready.
 * ============================================================================
 */
import {
  Banknote,
  ClipboardList,
  Handshake,
  LayoutDashboard,
  Settings,
  Sprout,
  Tractor,
  TrendingUp,
  Wallet,
  Wheat,
} from 'lucide-react'
import { CURRENT_SEASON } from '../../config/app'
import type {
  ChartPalette,
  DashboardView,
  Investment,
  LedgerPoint,
  NavItem,
  Notification,
  RangeKey,
  Stat,
} from './dashboard.types'

/* ------------------------------ Ledger series ----------------------------- */

/** Capital & dividend series per chart horizon. */
export const RANGE_DATA: Record<RangeKey, LedgerPoint[]> = {
  '1M': [
    { month: 'W1', capital: 5.42, dividends: 0.48 },
    { month: 'W2', capital: 5.55, dividends: 0.51 },
    { month: 'W3', capital: 5.61, dividends: 0.56 },
    { month: 'W4', capital: 5.78, dividends: 0.61 },
  ],
  '6M': [
    { month: 'Jul', capital: 4.68, dividends: 0.44 },
    { month: 'Aug', capital: 4.85, dividends: 0.47 },
    { month: 'Sep', capital: 5.12, dividends: 0.5 },
    { month: 'Oct', capital: 5.36, dividends: 0.53 },
    { month: 'Nov', capital: 5.61, dividends: 0.57 },
    { month: 'Dec', capital: 5.94, dividends: 0.61 },
  ],
  '1Y': [
    { month: 'Jan', capital: 3.92, dividends: 0.32 },
    { month: 'Feb', capital: 4.08, dividends: 0.35 },
    { month: 'Mar', capital: 4.25, dividends: 0.37 },
    { month: 'Apr', capital: 4.31, dividends: 0.41 },
    { month: 'May', capital: 4.58, dividends: 0.44 },
    { month: 'Jun', capital: 4.72, dividends: 0.46 },
    { month: 'Jul', capital: 4.68, dividends: 0.44 },
    { month: 'Aug', capital: 4.85, dividends: 0.47 },
    { month: 'Sep', capital: 5.12, dividends: 0.5 },
    { month: 'Oct', capital: 5.36, dividends: 0.53 },
    { month: 'Nov', capital: 5.61, dividends: 0.57 },
    { month: 'Dec', capital: 5.94, dividends: 0.61 },
  ],
}

/* --------------------------------- KPI tiles ------------------------------ */

/** Stat tiles for the investor deck. */
export const INVESTOR_STATS: Stat[] = [
  { label: 'Total Invested', value: '$4.85M', delta: '+12.4% deployment QoQ', progress: 78, icon: Wallet },
  { label: 'Portfolio Value', value: '$6.24M', delta: '+$1.39M net unrealized', progress: 64, icon: TrendingUp },
  { label: 'Active Parcels', value: '12,480 ha', delta: '+820 ha this season', progress: 71, icon: Sprout },
  { label: 'Distributed Dividends', value: '$820k', delta: '+9.6% vs last cycle', progress: 52, icon: Banknote },
]

/** Stat tiles for the landowner deck. */
export const LANDOWNER_STATS: Stat[] = [
  { label: 'Total Acreage', value: '3,240 ha', delta: '+120 ha leased in', progress: 68, icon: Tractor },
  { label: 'Seasonal Yield', value: '86.2%', delta: '+4.1% vs 5-yr average', progress: 86, icon: Wheat },
  { label: 'Active Leases', value: '18', delta: '2 renewals pending', progress: 60, icon: Handshake },
  { label: 'Payouts Received', value: '$412k', delta: '+6.8% vs last season', progress: 48, icon: Banknote },
]

/* ------------------------- Holdings & notifications ----------------------- */

/** Syndicated fractional stakes listed in the Active Holdings panel. */
export const INVESTMENTS: Investment[] = [
  { name: 'Cascade Wind Basin', category: 'Renewables', roi: '16.4% ROI', allocated: 1.2, target: 1.5, stage: 'Stage III Closing' },
  { name: 'Willamette Vineyard Trust', category: 'Viticulture', roi: '12.8% ROI', allocated: 0.85, target: 1.0, stage: 'Distribution Active' },
  { name: 'Harvest Grain Collective', category: 'Cereals', roi: '9.7% ROI', allocated: 0.48, target: 0.78, stage: 'Open Call' },
]

/** Items rendered in the bell dropdown. */
export const NOTIFICATIONS: Notification[] = [
  { icon: Sprout, title: 'Grain harvest logged', detail: 'Block 7-B · 42.5 tonnes', time: '12m' },
  { icon: Wallet, title: 'Dividend distribution approved', detail: '$82k to 134 shareholders', time: '1h' },
  { icon: Tractor, title: 'Tractor F-04 maintenance due', detail: 'Scheduled for Friday', time: '5h' },
]

/** Stat tiles per deck — the page just reads DECK_STATS[view]. */
export const DECK_STATS: Record<DashboardView, Stat[]> = {
  Investor: INVESTOR_STATS,
  Landowner: LANDOWNER_STATS,
}

/* ------------------------------ Navigation meta --------------------------- */

/** Sidebar navigation entries (anchor ids double as section keys). */
export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'portfolio', label: 'Portfolio & Lands', icon: Sprout },
  { id: 'tasks', label: 'Tasks & Planning', icon: ClipboardList },
  { id: 'analytics', label: 'Analytics & Export', icon: TrendingUp },
  { id: 'preferences', label: 'Preferences', icon: Settings },
]

/** Deck keys for the switcher (drives rendering — no hardcoded ternaries). */
export const DASHBOARD_VIEWS: DashboardView[] = ['Investor', 'Landowner']

/** Per-deck copy + icon for the view switcher and hero context row. */
export const VIEW_META: Record<
  DashboardView,
  { buttonLabel: string; contextLabel: string; icon: typeof Wallet }
> = {
  Investor: { buttonLabel: 'Investor Deck', contextLabel: 'Tier 1 Co-op Access · Fund V', icon: Wallet },
  Landowner: { buttonLabel: 'Landowner Base', contextLabel: `${CURRENT_SEASON} · Blocks 1-12`, icon: Tractor },
}

/* -------------------------------- Chart meta ------------------------------ */

/** Chart palette mirrors index.css tokens (SVG attributes cannot use CSS vars). */
export const CHART_PALETTE: Record<'light' | 'dark', ChartPalette> = {
  light: { grid: '#cdd7bf', tick: '#57644f', capital: '#3d7d46', dividends: '#c2821f' },
  dark: { grid: '#35402c', tick: '#a3b294', capital: '#7fc98a', dividends: '#e3ab52' },
}

/** Minutes since the last (mocked) telemetry sync shown in the hero badge. */
export const SYNC_STALENESS_MINUTES = 4
export const SYNC_LABEL = `Updated ${SYNC_STALENESS_MINUTES} mins ago`

/* ------------------------------ Ledger export ----------------------------- */

/** Builds the CSV body for a ledger series. */
export function buildLedgerCsv(points: LedgerPoint[]): string {
  const rows = ['Month,Capital ($M),Dividends ($M)']
  points.forEach((point) => rows.push(`${point.month},${point.capital},${point.dividends}`))
  return rows.join('\n')
}

/** Downloads the ledger CSV with a dynamic, range-aware filename. */
export function exportLedgerCsv(range: RangeKey, points: LedgerPoint[]): void {
  const blob = new Blob([buildLedgerCsv(points)], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `farmshares-ledger-${range.toLowerCase()}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
