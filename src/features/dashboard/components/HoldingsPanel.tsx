/**
 * ============================================================================
 *  Holdings Panel
 * ----------------------------------------------------------------------------
 *  "Active Holdings" rail: the (already search-filtered) investment list with
 *  an empty state, plus the Deal Room CTA. The "Open Calls" chip count is
 *  derived from the data, never hardcoded.
 * ============================================================================
 */
import { ArrowRight, SearchX } from 'lucide-react'
import type { Investment } from '../dashboard.types'
import { InvestmentCard } from './InvestmentCard'

interface HoldingsPanelProps {
  /** Filtered holdings (search applied upstream). */
  investments: Investment[]
  /** Active search term, echoed in the empty state. */
  query: string
  /** Number of holdings currently in an "Open Call" stage. */
  openCalls: number
}

export function HoldingsPanel({ investments, query, openCalls }: HoldingsPanelProps) {
  return (
    <div className="neu-outset flex flex-col justify-between rounded-3xl bg-surface p-5 sm:p-8 lg:col-span-4">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-title-md font-bold text-on-surface">Active Holdings</h3>
          <span className="rounded-full bg-tertiary-container px-2.5 py-0.5 text-label-sm font-label-sm text-on-tertiary-container">
            {openCalls} Open Calls
          </span>
        </div>
        <p className="mb-4 text-body-sm font-body-sm text-on-surface-variant">
          Syndicated fractional stakes across co-op assets.
        </p>

        <div className="neu-scroll max-h-85 space-y-4 overflow-y-auto pr-1">
          {investments.length > 0 ? (
            investments.map((investment) => (
              <InvestmentCard key={investment.name} investment={investment} />
            ))
          ) : (
            <div className="neu-inset flex flex-col items-center gap-2 rounded-2xl bg-surface p-6 text-center">
              <SearchX className="h-6 w-6 text-on-surface-variant" />
              <p className="text-label-md font-label-md text-on-surface-variant">
                No holdings match “{query}”.
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        className="neu-btn neu-outset mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-label-md font-label-md text-primary"
        type="button"
      >
        View Deal Room
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
