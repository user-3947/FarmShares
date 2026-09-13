/**
 * ============================================================================
 *  Ledger Chart
 * ----------------------------------------------------------------------------
 *  "Portfolio Overview" card: Recharts area chart of capital vs dividends,
 *  a horizon switcher (1M/6M/1Y — keys derived from the data), a legend and
 *  the CSV export action. Chart colors come from a per-theme SVG palette.
 * ============================================================================
 */
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Download } from 'lucide-react'
import type { ChartPalette, LedgerPoint, RangeKey } from '../dashboard.types'

interface LedgerChartProps {
  /** Series for the currently selected horizon. */
  data: LedgerPoint[]
  range: RangeKey
  /** Horizon keys rendered in the switcher (derived from the data module). */
  ranges: RangeKey[]
  onRangeChange: (range: RangeKey) => void
  palette: ChartPalette
  onExport: () => void
}

/** Recharts tooltip content — soft-UI styled value readout. */
interface LedgerTooltipProps {
  active?: boolean
  label?: string | number
  payload?: Array<{ name?: string; value?: number; color?: string }>
}

function LedgerTooltip({ active, label, payload }: LedgerTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null
  }
  return (
    <div className="neu-outset rounded-xl px-4 py-3 text-label-sm font-label-sm">
      <p className="mb-1 font-bold text-on-surface">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center gap-2 text-on-surface-variant">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          {entry.name === 'capital' ? 'Capital' : 'Dividends'}:{' '}
          <span className="font-semibold text-on-surface">${entry.value?.toFixed(2)}M</span>
        </p>
      ))}
    </div>
  )
}

export function LedgerChart({ data, range, ranges, onRangeChange, palette, onExport }: LedgerChartProps) {
  return (
    <div className="neu-outset flex flex-col justify-between rounded-3xl bg-surface p-8 lg:col-span-8">
      {/* Card header: title + horizon switcher */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-title-md font-bold text-on-surface">Portfolio Overview</h3>
          <p className="text-body-sm font-body-sm text-on-surface-variant">
            Capital growth &amp; distributed dividends ({range} horizon)
          </p>
        </div>
        <div className="neu-inset flex items-center gap-1 rounded-xl p-1">
          {ranges.map((key) => (
            <button
              key={key}
              className={`rounded-lg px-3 py-1 text-label-sm font-label-sm transition-all ${
                range === key
                  ? 'neu-outset-sm font-bold text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              type="button"
              onClick={() => onRangeChange(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Area chart */}
      <div className="my-6 h-72 w-full">
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="capitalFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={palette.capital} stopOpacity={0.35} />
                <stop offset="100%" stopColor={palette.capital} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="dividendsFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={palette.dividends} stopOpacity={0.28} />
                <stop offset="100%" stopColor={palette.dividends} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={palette.grid} strokeDasharray="4 4" vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="month"
              tick={{ fill: palette.tick, fontSize: 12 }}
              tickLine={false}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: palette.tick, fontSize: 12 }}
              tickFormatter={(value: number) => `$${value.toFixed(1)}M`}
              tickLine={false}
              width={56}
            />
            <Tooltip content={<LedgerTooltip />} cursor={{ stroke: palette.tick, strokeDasharray: '4 4' }} />
            <Area
              activeDot={{ r: 5, strokeWidth: 2 }}
              dataKey="capital"
              fill="url(#capitalFill)"
              name="Capital"
              stroke={palette.capital}
              strokeWidth={3}
              type="monotone"
            />
            <Area
              activeDot={{ r: 4, strokeWidth: 2 }}
              dataKey="dividends"
              fill="url(#dividendsFill)"
              name="Dividends"
              stroke={palette.dividends}
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend + export action */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-body-sm font-body-sm text-on-surface">Capital Assets</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-tertiary" />
            <span className="text-body-sm font-body-sm text-on-surface">Distributed Dividends</span>
          </div>
        </div>
        <button
          className="neu-btn neu-outset-sm flex items-center gap-2 rounded-xl px-4 py-2 text-label-md font-label-md text-primary"
          type="button"
          onClick={onExport}
        >
          <Download className="h-4 w-4" />
          Export Ledger CSV
        </button>
      </div>
    </div>
  )
}
