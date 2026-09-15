/**
 * ============================================================================
 *  Dashboard Hero
 * ----------------------------------------------------------------------------
 *  Intro card: ecosystem badge + telemetry sync label, page title/subtitle
 *  (from config) and the deck switcher — rendered from DASHBOARD_VIEWS /
 *  VIEW_META so adding a deck needs no new ternaries.
 * ============================================================================
 */
import { DASHBOARD_SUBTITLE, DASHBOARD_TITLE } from '../../../config/app'
import { DASHBOARD_VIEWS, SYNC_LABEL, VIEW_META } from '../dashboard.data'
import type { DashboardView } from '../dashboard.types'

interface DashboardHeroProps {
  view: DashboardView
  onViewChange: (view: DashboardView) => void
}

export function DashboardHero({ view, onViewChange }: DashboardHeroProps) {
  return (
    <div className="neu-outset flex flex-col justify-between gap-4 rounded-2xl bg-surface p-6 md:flex-row md:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm font-label-sm tracking-wider text-on-secondary-container uppercase">
            Unified Ecosystem
          </span>
          <span className="text-body-sm font-body-sm text-on-surface-variant">{SYNC_LABEL}</span>
        </div>
        <h1 className="mt-1 text-headline-lg font-headline-lg text-on-surface sm:text-headline-xl sm:font-headline-xl">
          {DASHBOARD_TITLE}
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant">{DASHBOARD_SUBTITLE}</p>
      </div>

      {/* Deck switcher */}
      <div className="neu-inset flex w-full items-center gap-1.5 rounded-xl p-1.5 md:w-auto">
        {DASHBOARD_VIEWS.map((option) => {
          const meta = VIEW_META[option]
          const OptionIcon = meta.icon
          return (
            <button
              key={option}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-label-md font-label-md transition-all md:flex-none ${
                view === option
                  ? 'neu-outset-sm font-semibold text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              type="button"
              onClick={() => onViewChange(option)}
            >
              <OptionIcon className="h-4 w-4" />
              {meta.buttonLabel}
            </button>
          )
        })}
      </div>
    </div>
  )
}
