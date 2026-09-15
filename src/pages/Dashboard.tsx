/**
 * ============================================================================
 *  Dashboard Page
 * ----------------------------------------------------------------------------
 *  Composition root for the authenticated portal. Owns only the UI state
 *  (deck view, chart range, active section, search term) and derives the rest
 *  from features/dashboard data; all markup lives in feature components.
 * ============================================================================
 */
import { useMemo, useState } from 'react'
import { TrendingUp } from 'lucide-react'
import { APP_NAME, APP_VERSION } from '../config/app'
import { useApp } from '../context/AppContext'
import { initialsFromName } from '../lib/format'
import { DashboardHeader } from '../features/dashboard/components/DashboardHeader'
import { DashboardHero } from '../features/dashboard/components/DashboardHero'
import { DashboardSidebar } from '../features/dashboard/components/DashboardSidebar'
import { HoldingsPanel } from '../features/dashboard/components/HoldingsPanel'
import { LedgerChart } from '../features/dashboard/components/LedgerChart'
import { StatCard } from '../features/dashboard/components/StatCard'
import {
  CHART_PALETTE,
  DECK_STATS,
  DASHBOARD_VIEWS,
  exportLedgerCsv,
  INVESTMENTS,
  RANGE_DATA,
  VIEW_META,
} from '../features/dashboard/dashboard.data'
import type { DashboardView, RangeKey } from '../features/dashboard/dashboard.types'

export default function Dashboard() {
  const { theme, role, profile } = useApp()

  // Deck defaults to the login role (landowners start on their own deck).
  const [view, setView] = useState<DashboardView>(role === 'Landowner' ? 'Landowner' : 'Investor')
  const [range, setRange] = useState<RangeKey>('1Y')
  const [activeNav, setActiveNav] = useState('overview')
  const [query, setQuery] = useState('')
  // Below lg the sidebar lives in a drawer, opened from the header hamburger.
  const [navOpen, setNavOpen] = useState(false)

  /* Derived values — data-driven, nothing hardcoded in the markup. */
  const stats = DECK_STATS[view]
  const chartData = RANGE_DATA[range]
  const ranges = Object.keys(RANGE_DATA) as RangeKey[]
  const palette = theme === 'dark' ? CHART_PALETTE.dark : CHART_PALETTE.light
  const initials = initialsFromName(profile?.full_name ?? '')

  /** Case-insensitive filter over holding names/categories. */
  const visibleInvestments = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INVESTMENTS
    return INVESTMENTS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
    )
  }, [query])

  /** Holdings currently raising capital — feeds the "Open Calls" chip. */
  const openCalls = useMemo(() => INVESTMENTS.filter((item) => item.stage === 'Open Call').length, [])

  /** Cycles to the next deck in DASHBOARD_VIEWS (future-proof for new decks). */
  const toggleView = () =>
    setView((current) => DASHBOARD_VIEWS[(DASHBOARD_VIEWS.indexOf(current) + 1) % DASHBOARD_VIEWS.length])

  const handleExport = () => exportLedgerCsv(range, chartData)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        activeNav={activeNav}
        initials={initials}
        query={query}
        onMenuToggle={() => setNavOpen(true)}
        onNavChange={setActiveNav}
        onQueryChange={setQuery}
      />

      <div className="flex pt-28 md:pt-16">
        <DashboardSidebar
          activeNav={activeNav}
          mobileOpen={navOpen}
          onMobileClose={() => setNavOpen(false)}
          onNavChange={setActiveNav}
          onViewToggle={toggleView}
          view={view}
        />

        <main className="mx-auto w-full flex-1 space-y-space-24 p-4 sm:p-6 lg:ml-64 lg:p-10">
          <DashboardHero view={view} onViewChange={setView} />

          <section className="space-y-space-24">
            {/* Section heading + deck context row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="neu-inset flex h-8 w-8 items-center justify-center rounded-lg text-primary">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">{view} Interface</h2>
              </div>
              <span className="text-label-md font-label-md text-on-surface-variant">
                {VIEW_META[view].contextLabel}
              </span>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-1 gap-space-24 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            {/* Ledger chart + holdings rail */}
            <div className="grid grid-cols-1 gap-space-24 lg:grid-cols-12">
              <LedgerChart
                data={chartData}
                palette={palette}
                range={range}
                ranges={ranges}
                onExport={handleExport}
                onRangeChange={setRange}
              />
              <HoldingsPanel investments={visibleInvestments} openCalls={openCalls} query={query} />
            </div>
          </section>

          <footer className="px-6 py-4 text-center text-[0.625rem] font-normal tracking-widest text-on-surface-variant uppercase opacity-70">
            {APP_NAME} · v{APP_VERSION}
          </footer>
        </main>
      </div>
    </div>
  )
}
