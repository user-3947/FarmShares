/**
 * ============================================================================
 *  Investment Card
 * ----------------------------------------------------------------------------
 *  One syndicated holding: name + ROI badge, allocation totals, and a
 *  subscription bar whose percentage is derived from allocated/target.
 * ============================================================================
 */
import type { Investment } from '../dashboard.types'

interface InvestmentCardProps {
  investment: Investment
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  // Subscription ratio is always computed — never stored as a hardcoded %.
  const subscribed = Math.round((investment.allocated / investment.target) * 100)
  return (
    <div className="neu-inset space-y-3 rounded-2xl bg-surface p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="min-w-0 truncate text-label-lg font-bold text-on-surface">{investment.name}</h4>
        <span className="neu-outset-sm shrink-0 rounded-full bg-surface px-2 py-0.5 text-label-sm font-bold text-success">
          {investment.roi}
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-body-sm font-body-sm text-on-surface-variant">
        <span className="whitespace-nowrap">{investment.category}</span>
        <span className="whitespace-nowrap">
          Allocated: ${investment.allocated.toFixed(2)}M / ${investment.target.toFixed(2)}M
        </span>
      </div>
      <div className="neu-inset-sm h-2 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full rounded-full bg-primary" style={{ width: `${subscribed}%` }} />
      </div>
      <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
        <span>{subscribed}% Subscribed</span>
        <span className="font-semibold text-primary">{investment.stage}</span>
      </div>
    </div>
  )
}
