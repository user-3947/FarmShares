/**
 * ============================================================================
 *  App Identity & Global Constants
 * ----------------------------------------------------------------------------
 *  Single source of truth for branded copy and app-wide constants so no UI
 *  file hardcodes names, versions or keys. Bump APP_VERSION in lock-step with
 *  package.json on every release (see devLog.md for the release history).
 * ============================================================================
 */

/** Display version — keep in sync with package.json. */
export const APP_VERSION = '1.3.0'

export const APP_NAME = 'FarmShares'

/** Taglines rendered under/next to the brand mark. */
export const APP_TAGLINE = 'Cooperative Resource Portal'
export const APP_SIGNIN_TAGLINE = 'Single sign-on to the cooperative farm & share ledger'
export const APP_SIGNUP_TAGLINE = 'Join the cooperative & manage shared farm resources'

/** Hero card labels for the two dashboard views. */
export const DASHBOARD_TITLE = 'Resource & Yield Matrix'
export const DASHBOARD_SUBTITLE =
  'Synchronized real-time telemetry across co-op capital holdings and registered agricultural parcels.'

/** localStorage key used to persist the selected theme. */
export const THEME_STORAGE_KEY = 'farmshares-theme'

/** Client-side routes — the single source of truth for every URL path. */
export const ROUTES = {
  root: '/',
  login: '/login',
  createAccount: '/create',
  /** Legacy alias kept for the old in-app spelling of the sign-up screen. */
  createAccountAlias: '/create-account',
  dashboard: '/dashboard',
  termsOfService: '/terms-of-service',
  privacyPolicy: '/privacy-policy',
} as const

/** Delay before a transient form alert (error / success) auto-dismisses. */
export const MESSAGE_AUTO_DISMISS_MS = 5000

/** Disclaimer rendered at the foot of the pseudo legal pages. */
export const LEGAL_TEMPLATE_NOTE =
  'Placeholder copy for the FarmShares demo — have it reviewed by counsel before any production use.'

/** Fake telemetry pill shown in auth/dashboard headers. */
export const NODE_STATUS_LABEL = 'Node 12-East Active'

/** Footer / legal strings. The year is derived at render time. */
export const COPYRIGHT_HOLDER = 'FarmShares Cooperative Network'
export const COPYRIGHT_SUFFIX = 'Soft UI Architecture Engine. All rights reserved.'
/** Always current — no hardcoded years anywhere. */
export const COPYRIGHT_YEAR = new Date().getFullYear()

/** Footer legal links on the sign-in page (label + real route). */
export const AUTH_FOOTER_LINKS: ReadonlyArray<{ label: string; path: string }> = [
  { label: 'Terms of Service', path: ROUTES.termsOfService },
  { label: 'Privacy Policy', path: ROUTES.privacyPolicy },
]

/** Current contract year shown on dashboard meta rows (dynamic per year). */
export const CURRENT_SEASON = `Season ${new Date().getFullYear()}`
