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
export const APP_VERSION = '1.2.0'

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

/** Fake telemetry pill shown in auth/dashboard headers. */
export const NODE_STATUS_LABEL = 'Node 12-East Active'

/** Footer / legal strings. The year is derived at render time. */
export const COPYRIGHT_HOLDER = 'FarmShares Cooperative Network'
export const COPYRIGHT_SUFFIX = 'Soft UI Architecture Engine. All rights reserved.'
/** Always current — no hardcoded years anywhere. */
export const COPYRIGHT_YEAR = new Date().getFullYear()

/** Static footer links on the sign-in page (ids become anchor slugs). */
export const AUTH_FOOTER_LINKS = ['Compliance', 'Terms of Use', 'Support Desk']

/** Current contract year shown on dashboard meta rows (dynamic per year). */
export const CURRENT_SEASON = `Season ${new Date().getFullYear()}`
