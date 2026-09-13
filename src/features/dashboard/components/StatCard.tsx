/**
 * ============================================================================
 *  Stat Card
 * ----------------------------------------------------------------------------
 *  Hero KPI tile: label + icon, headline value, positive delta and a progress
 *  rail. Fed by Stat objects from dashboard.data.
 * ============================================================================
 */
import { ArrowUpRight } from 'lucide-react'
import type { Stat } from '../dashboard.types'

interface StatCardProps {
  stat: Stat
}

export function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon
  return (
    <div className="neu-inset flex flex-col justify-between rounded-2xl bg-surface p-6">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className="text-label-md font-label-md">{stat.label}</span>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="mt-4">
        <div className="text-headline-lg font-bold tracking-tight text-on-surface">{stat.value}</div>
        <div className="mt-1 flex items-center gap-1 text-label-sm font-label-sm text-success">
          <ArrowUpRight className="h-3.5 w-3.5" />
          {stat.delta}
        </div>
      </div>
      <div className="neu-inset-sm mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div className="h-full rounded-full bg-primary" style={{ width: `${stat.progress}%` }} />
      </div>
    </div>
  )
}
