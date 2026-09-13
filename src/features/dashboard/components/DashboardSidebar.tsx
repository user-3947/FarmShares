/**
 * ============================================================================
 *  Dashboard Sidebar
 * ----------------------------------------------------------------------------
 *  Fixed left rail: Co-op Hub heading, deck switcher, section nav with icons
 *  and the system links. Hidden below the lg breakpoint.
 * ============================================================================
 */
import { Server, ShieldCheck, Sprout, TrendingUp } from 'lucide-react'
import { NAV_ITEMS } from '../dashboard.data'
import type { DashboardView } from '../dashboard.types'

interface DashboardSidebarProps {
  activeNav: string
  onNavChange: (id: string) => void
  /** Currently displayed deck, shown on the switch button chip. */
  view: DashboardView
  onViewToggle: () => void
}

export function DashboardSidebar({ activeNav, onNavChange, view, onViewToggle }: DashboardSidebarProps) {
  return (
    <aside className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-4rem)] w-64 flex-col justify-between bg-surface px-4 py-6 shadow-[4px_0_12px_rgba(163,177,198,0.25)] lg:flex">
      <div className="flex flex-col gap-6">
        {/* Co-op Hub heading */}
        <div className="flex items-center gap-3 px-2">
          <div className="neu-inset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-headline-sm font-bold text-primary">Co-op Hub</h2>
            <p className="text-body-sm font-body-sm text-on-surface-variant">Resource Portal</p>
          </div>
        </div>

        {/* Deck switcher — flips Investor ⇄ Landowner */}
        <button
          className="neu-btn neu-outset flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-label-md font-label-md text-primary"
          type="button"
          onClick={onViewToggle}
        >
          <span className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="font-bold">Switch View</span>
          </span>
          <span className="neu-inset-sm rounded-full px-2 py-0.5 text-label-sm font-label-sm text-on-surface-variant">
            {view}
          </span>
        </button>

        {/* Section nav */}
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
                  onNavChange(item.id)
                }}
              >
                <ItemIcon className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-secondary'}`} />
                {item.label}
              </a>
            )
          })}
        </nav>
      </div>

      {/* System links */}
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
  )
}
