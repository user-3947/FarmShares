import { useMemo, useState } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Bell,
  ClipboardList,
  Download,
  Handshake,
  LayoutDashboard,
  Leaf,
  LogOut,
  Moon,
  Search,
  SearchX,
  Server,
  Settings,
  ShieldCheck,
  Sprout,
  Sun,
  TrendingUp,
  Tractor,
  Wallet,
  Wheat,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { APP_VERSION, useApp } from '../context/AppContext'

/* ------------------------------ Data model ------------------------------- */

type RangeKey = '1M' | '6M' | '1Y'
type DashboardView = 'Investor' | 'Landowner'

interface LedgerPoint {
  month: string
  capital: number
  dividends: number
}

interface Stat {
  label: string
  value: string
  delta: string
  progress: number
  icon: LucideIcon
}

interface Investment {
  name: string
  category: string
  roi: string
  allocated: number
  target: number
  stage: string
}

interface Notification {
  icon: LucideIcon
  title: string
  detail: string
  time: string
}

const RANGE_DATA: Record<RangeKey, LedgerPoint[]> = {
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

const INVESTOR_STATS: Stat[] = [
  { label: 'Total Invested', value: '$4.85M', delta: '+12.4% deployment QoQ', progress: 78, icon: Wallet },
  { label: 'Portfolio Value', value: '$6.24M', delta: '+$1.39M net unrealized', progress: 64, icon: TrendingUp },
  { label: 'Active Parcels', value: '12,480 ha', delta: '+820 ha this season', progress: 71, icon: Sprout },
  { label: 'Distributed Dividends', value: '$820k', delta: '+9.6% vs last cycle', progress: 52, icon: Banknote },
]

const LANDOWNER_STATS: Stat[] = [
  { label: 'Total Acreage', value: '3,240 ha', delta: '+120 ha leased in', progress: 68, icon: Tractor },
  { label: 'Seasonal Yield', value: '86.2%', delta: '+4.1% vs 5-yr average', progress: 86, icon: Wheat },
  { label: 'Active Leases', value: '18', delta: '2 renewals pending', progress: 60, icon: Handshake },
  { label: 'Payouts Received', value: '$412k', delta: '+6.8% vs last season', progress: 48, icon: Banknote },
]

const INVESTMENTS: Investment[] = [
  { name: 'Cascade Wind Basin', category: 'Renewables', roi: '16.4% ROI', allocated: 1.2, target: 1.5, stage: 'Stage III Closing' },
  { name: 'Willamette Vineyard Trust', category: 'Viticulture', roi: '12.8% ROI', allocated: 0.85, target: 1.0, stage: 'Distribution Active' },
  { name: 'Harvest Grain Collective', category: 'Cereals', roi: '9.7% ROI', allocated: 0.48, target: 0.78, stage: 'Open Call' },
]

const NOTIFICATIONS: Notification[] = [
  { icon: Sprout, title: 'Grain harvest logged', detail: 'Block 7-B · 42.5 tonnes', time: '12m' },
  { icon: Wallet, title: 'Dividend distribution approved', detail: '$82k to 134 shareholders', time: '1h' },
  { icon: Tractor, title: 'Tractor F-04 maintenance due', detail: 'Scheduled for Friday', time: '5h' },
]

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'portfolio', label: 'Portfolio & Lands', icon: Sprout },
  { id: 'tasks', label: 'Tasks & Planning', icon: ClipboardList },
  { id: 'analytics', label: 'Analytics & Export', icon: TrendingUp },
  { id: 'preferences', label: 'Preferences', icon: Settings },
]

/* Chart palette mirrors index.css tokens (SVG attributes cannot resolve CSS vars) */
const CHART_PALETTE = {
  light: { grid: '#cdd7bf', tick: '#57644f', capital: '#3d7d46', dividends: '#c2821f' },
  dark: { grid: '#35402c', tick: '#a3b294', capital: '#7fc98a', dividends: '#e3ab52' },
}

/* ------------------------------- Components ------------------------------ */

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

interface StatCardProps {
  stat: Stat
}

function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon
  return (
    <div className="neu-inset flex flex-col justify-between rounded-2xl bg-surface p-6">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className="text-label-md font-label-md">{stat.label}</span>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="mt-4">
        <div className="text-headline-lg font-bold tracking-tight text-on-surface">
          {stat.value}
        </div>
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

interface InvestmentCardProps {
  investment: Investment
}

function InvestmentCard({ investment }: InvestmentCardProps) {
  const subscribed = Math.round((investment.allocated / investment.target) * 100)
  return (
    <div className="neu-inset space-y-3 rounded-2xl bg-surface p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-label-lg font-bold text-on-surface">
          {investment.name}
        </h4>
        <span className="neu-outset-sm rounded-full bg-surface px-2 py-0.5 text-label-sm font-bold text-success">
          {investment.roi}
        </span>
      </div>
      <div className="flex justify-between text-body-sm font-body-sm text-on-surface-variant">
        <span>{investment.category}</span>
        <span>
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

/* ------------------------------- Page ------------------------------------ */

const Dashboard: React.FC = () => {
  const { theme, toggleTheme, navigate, role } = useApp()
  const [view, setView] = useState<DashboardView>(role === 'Landowner' ? 'Landowner' : 'Investor')
  const [range, setRange] = useState<RangeKey>('1Y')
  const [activeNav, setActiveNav] = useState('overview')
  const [query, setQuery] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(NOTIFICATIONS.length)

  const stats = view === 'Investor' ? INVESTOR_STATS : LANDOWNER_STATS
  const chartData = RANGE_DATA[range]
  const palette = theme === 'dark' ? CHART_PALETTE.dark : CHART_PALETTE.light

  const visibleInvestments = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return INVESTMENTS
    return INVESTMENTS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q),
    )
  }, [query])

  const handleExport = () => {
    const rows = ['Month,Capital ($M),Dividends ($M)']
    chartData.forEach((point) => {
      rows.push(`${point.month},${point.capital},${point.dividends}`)
    })
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `farmshares-ledger-${range.toLowerCase()}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full bg-surface shadow-[0_6px_14px_rgba(163,177,198,0.25)]">
        <div className="mx-auto flex w-full max-w-max-width items-center justify-between px-6 py-3 lg:px-10">
          <div className="flex items-center gap-space-24">
            <div className="flex items-center gap-2">
              <div className="neu-outset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
                <Leaf className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <span className="text-headline-sm font-bold tracking-tight text-primary">
                FarmShares
              </span>
            </div>
            <div className="neu-inset hidden w-72 items-center rounded-xl px-4 py-2 text-on-surface-variant md:flex lg:w-96">
              <Search className="mr-2 h-4 w-4 shrink-0 text-secondary" />
              <input
                className="w-full border-none bg-transparent text-body-sm font-body-sm text-on-surface outline-none"
                placeholder="Search parcels, holdings, yields..."
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              {query && (
                <button
                  aria-label="Clear search"
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-outline transition-colors hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <nav className="hidden items-center gap-2 xl:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                className={`rounded-xl px-4 py-2 text-label-md font-label-md transition-all duration-150 ${
                  activeNav === item.id
                    ? 'neu-inset-sm font-semibold text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  setActiveNav(item.id)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-space-16">
            <button
              aria-label="Toggle theme"
              className="neu-btn neu-outset-sm flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary"
              title="Toggle Theme"
              type="button"
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <div className="relative">
              <button
                aria-label="Notifications"
                className="neu-btn neu-outset-sm relative flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary"
                title="Notifications"
                type="button"
                onClick={() => setNotificationsOpen((open) => !open)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-tertiary ring-2 ring-surface" />
                )}
              </button>
              {notificationsOpen && (
                <div className="neu-outset absolute right-0 top-12 w-80 rounded-2xl bg-surface p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-title-md font-bold text-on-surface">Notifications</h4>
                    <button
                      aria-label="Close notifications"
                      className="text-on-surface-variant transition-colors hover:text-primary"
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {NOTIFICATIONS.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <li
                          key={item.title}
                          className="neu-inset-sm flex items-start gap-3 rounded-xl bg-surface p-3"
                        >
                          <ItemIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div className="min-w-0 flex-1">
                            <p className="text-label-md font-semibold text-on-surface">
                              {item.title}
                            </p>
                            <p className="text-label-sm font-label-sm text-on-surface-variant">{item.detail}</p>
                          </div>
                          <span className="text-label-sm font-label-sm text-outline">{item.time}</span>
                        </li>
                      )
                    })}
                  </ul>
                  {unreadCount > 0 && (
                    <button
                      className="neu-btn neu-outset-sm mt-3 w-full rounded-xl py-2 text-label-md font-label-md text-primary"
                      type="button"
                      onClick={() => setUnreadCount(0)}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 border-l border-outline-variant pl-3">
              <div className="neu-inset-sm flex h-10 w-10 items-center justify-center rounded-full text-label-md font-bold text-primary">
                AM
              </div>
              <button
                aria-label="Log out"
                className="neu-btn neu-outset-sm flex h-10 w-10 items-center justify-center rounded-xl text-error hover:text-error-container"
                title="Log Out"
                type="button"
                onClick={() => navigate('login')}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-16">
        <aside className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-4rem)] w-64 flex-col justify-between bg-surface px-4 py-6 shadow-[4px_0_12px_rgba(163,177,198,0.25)] lg:flex">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-2">
              <div className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-headline-sm font-bold text-primary">Co-op Hub</h2>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Resource Portal</p>
              </div>
            </div>
            <button
              className="neu-btn neu-outset flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-label-md font-label-md text-primary"
              type="button"
              onClick={() => setView((current) => (current === 'Investor' ? 'Landowner' : 'Investor'))}
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="font-bold">Switch View</span>
              </span>
              <span className="neu-inset-sm rounded-full px-2 py-0.5 text-label-sm font-label-sm text-on-surface-variant">
                {view}
              </span>
            </button>
            <nav className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => {
                const ItemIcon = item.icon
                const isActive = activeNav === item.id
                return (
                  <a
                    key={item.id}
                    className={`flex items-center gap-3 rounded-xl p-3 text-label-md font-label-md transition-all duration-150 ${
                      isActive
                        ? 'neu-inset font-semibold text-primary'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      setActiveNav(item.id)
                    }}
                  >
                    <ItemIcon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-secondary'}`} />
                    {item.label}
                  </a>
                )
              })}
            </nav>
          </div>
          <div className="flex flex-col gap-2 border-t border-outline-variant pt-4">
            <a
              className="flex items-center gap-3 rounded-xl p-2.5 text-label-md font-label-md text-on-surface-variant transition-colors hover:text-primary"
              href="#system"
              onClick={(event) => event.preventDefault()}
            >
              <Server className="h-5 w-5 text-secondary" />
              System Status
              <span className="ml-auto h-2 w-2 rounded-full bg-success" />
            </a>
            <a
              className="flex items-center gap-3 rounded-xl p-2.5 text-label-md font-label-md text-on-surface-variant transition-colors hover:text-primary"
              href="#security"
              onClick={(event) => event.preventDefault()}
            >
              <ShieldCheck className="h-5 w-5 text-secondary" />
              Security Center
            </a>
          </div>
        </aside>

        <main className="mx-auto w-full flex-1 space-y-space-24 p-6 lg:ml-64 lg:p-10">
          <div className="neu-outset flex flex-col justify-between gap-4 rounded-2xl bg-surface p-6 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary-container px-2.5 py-0.5 text-label-sm font-label-sm tracking-wider text-on-secondary-container uppercase">
                  Unified Ecosystem
                </span>
                <span className="text-body-sm font-body-sm text-on-surface-variant">Updated 4 mins ago</span>
              </div>
              <h1 className="mt-1 text-headline-xl font-headline-xl text-on-surface">Resource &amp; Yield Matrix</h1>
              <p className="text-body-md font-body-md text-on-surface-variant">
                Synchronized real-time telemetry across co-op capital holdings and registered agricultural parcels.
              </p>
            </div>
            <div className="neu-inset flex items-center gap-1.5 rounded-xl p-1.5">
              {(['Investor', 'Landowner'] as DashboardView[]).map((option) => (
                <button
                  key={option}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-label-md font-label-md transition-all ${
                    view === option
                      ? 'neu-outset-sm font-semibold text-primary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
                  type="button"
                  onClick={() => setView(option)}
                >
                  {option === 'Investor' ? <Wallet className="h-4 w-4" /> : <Tractor className="h-4 w-4" />}
                  {option === 'Investor' ? 'Investor Deck' : 'Landowner Base'}
                </button>
              ))}
            </div>
          </div>

          <section className="space-y-space-24">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="neu-inset flex h-8 w-8 items-center justify-center rounded-lg text-primary">
                  <TrendingUp className="h-4.5 w-4.5" />
                </div>
                <h2 className="text-headline-lg font-headline-lg text-on-surface">{view} Interface</h2>
              </div>
              <span className="text-label-md font-label-md text-on-surface-variant">
                {view === 'Investor' ? 'Tier 1 Co-op Access · Fund V' : 'Season 2026 · Blocks 1-12'}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-space-24 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-space-24 lg:grid-cols-12">
              <div className="neu-outset flex flex-col justify-between rounded-3xl bg-surface p-8 lg:col-span-8">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-title-md font-bold text-on-surface">Portfolio Overview</h3>
                    <p className="text-body-sm font-body-sm text-on-surface-variant">
                      Capital growth &amp; distributed dividends ({range} horizon)
                    </p>
                  </div>
                  <div className="neu-inset flex items-center gap-1 rounded-xl p-1">
                    {(Object.keys(RANGE_DATA) as RangeKey[]).map((key) => (
                      <button
                        key={key}
                        className={`rounded-lg px-3 py-1 text-label-sm font-label-sm transition-all ${
                          range === key
                            ? 'neu-outset-sm font-bold text-primary'
                            : 'text-on-surface-variant hover:text-primary'
                        }`
                      }
                        type="button"
                        onClick={() => setRange(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="my-6 h-72 w-full">
                  <ResponsiveContainer height="100%" width="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
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
                      <Tooltip
                        content={<LedgerTooltip />}
                        cursor={{ stroke: palette.tick, strokeDasharray: '4 4' }}
                      />
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
                    onClick={handleExport}
                  >
                    <Download className="h-4 w-4" />
                    Export Ledger CSV
                  </button>
                </div>
              </div>

              <div className="neu-outset flex flex-col justify-between rounded-3xl bg-surface p-8 lg:col-span-4">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-title-md font-bold text-on-surface">Active Holdings</h3>
                    <span className="rounded-full bg-tertiary-container px-2.5 py-0.5 text-label-sm font-label-sm text-on-tertiary-container">
                      3 Open Calls
                    </span>
                  </div>
                  <p className="mb-4 text-body-sm font-body-sm text-on-surface-variant">
                    Syndicated fractional stakes across co-op assets.
                  </p>
                  <div className="neu-scroll max-h-85 space-y-4 overflow-y-auto pr-1">
                    {visibleInvestments.length > 0 ? (
                      visibleInvestments.map((investment) => (
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
            </div>
          </section>
          <footer className="px-6 py-4 text-center text-[0.625rem] font-normal tracking-widest text-on-surface-variant uppercase opacity-70">
            FarmShares · v{APP_VERSION}
          </footer>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
