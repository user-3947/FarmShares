/**
 * ============================================================================
 *  Dashboard Header
 * ----------------------------------------------------------------------------
 *  Fixed top bar: brand, global search (state lifted to the page so it can
 *  filter holdings), desktop section nav, theme toggle, notifications and the
 *  account block (avatar initials from the trusted profile + sign-out).
 *  Responsive: below md the search drops to its own full-width row; below lg
 *  a hamburger opens the sidebar drawer instead of the desktop rail.
 * ============================================================================
 */
import { LogOut, Menu, Search, X } from 'lucide-react'
import { BrandLogo } from '../../../components/ui/BrandLogo'
import { ThemeToggle } from '../../../components/ui/ThemeToggle'
import { useApp } from '../../../context/AppContext'
import { signOutUser } from '../../../lib/auth'
import { NAV_ITEMS } from '../dashboard.data'
import { NotificationsMenu } from './NotificationsMenu'

interface DashboardHeaderProps {
  query: string
  onQueryChange: (query: string) => void
  activeNav: string
  onNavChange: (id: string) => void
  /** Avatar monogram derived from the profile's full name. */
  initials: string
  /** Opens the below-lg navigation drawer. */
  onMenuToggle: () => void
}

export function DashboardHeader({
  query,
  onQueryChange,
  activeNav,
  onNavChange,
  initials,
  onMenuToggle,
}: DashboardHeaderProps) {
  const { navigate } = useApp()

  return (
    <header className="fixed top-0 z-50 w-full bg-surface shadow-[0_6px_14px_rgba(163,177,198,0.25)]">
      <div className="mx-auto w-full max-w-max-width px-4 py-3 sm:px-6 lg:px-10">
        {/* Primary row: brand · (desktop search) · actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <button
              aria-label="Open navigation"
              className="neu-btn neu-outset-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary lg:hidden"
              title="Menu"
              type="button"
              onClick={onMenuToggle}
            >
              <Menu className="h-5 w-5" />
            </button>
            <BrandLogo />
          </div>

          {/* Global search — filters the holdings rail */}
          <div className="neu-inset hidden w-72 items-center rounded-xl px-4 py-2 text-on-surface-variant md:flex lg:w-96">
            <Search className="mr-2 h-4 w-4 shrink-0 text-secondary" />
            <input
              className="w-full border-none bg-transparent text-body-sm font-body-sm text-on-surface outline-none"
              placeholder="Search parcels, holdings, yields..."
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
            />
            {query && (
              <button
                aria-label="Clear search"
                className="text-outline transition-colors hover:text-primary"
                type="button"
                onClick={() => onQueryChange('')}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-space-16">
            <ThemeToggle />
            <NotificationsMenu />

            {/* Account: avatar monogram + sign-out */}
            <div className="flex items-center gap-2 border-l border-outline-variant pl-2 sm:gap-3 sm:pl-3">
              <div className="neu-inset-sm flex h-10 w-10 items-center justify-center rounded-full text-label-md font-bold text-primary">
                {initials}
              </div>
              <button
                aria-label="Log out"
                className="neu-btn neu-outset-sm flex h-10 w-10 items-center justify-center rounded-xl text-error hover:text-error-container"
                title="Log Out"
                type="button"
                onClick={() => {
                  navigate('login')
                  void signOutUser()
                }}
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact full-width search row (mobile only) */}
        <div className="neu-inset mt-3 flex items-center rounded-xl px-4 py-2 text-on-surface-variant md:hidden">
          <Search className="mr-2 h-4 w-4 shrink-0 text-secondary" />
          <input
            className="w-full border-none bg-transparent text-body-sm font-body-sm text-on-surface outline-none"
            placeholder="Search parcels, holdings, yields..."
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query && (
            <button
              aria-label="Clear search"
              className="text-outline transition-colors hover:text-primary"
              type="button"
              onClick={() => onQueryChange('')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Section nav (desktop only) */}
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
                onNavChange(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
