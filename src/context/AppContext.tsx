/**
 * ============================================================================
 *  App Context
 * ----------------------------------------------------------------------------
 *  Global UI state: theme, login role and the trusted profile row. Routing is
 *  owned by react-router — `navigate` maps a View name onto its real URL (see
 *  App.tsx). APP_VERSION lives in config/app.ts — this module stays state +
 *  typing only.
 * ============================================================================
 */
import { createContext, useContext } from 'react'

export type View = 'login' | 'create-account' | 'dashboard'
export type Theme = 'light' | 'dark'
export type Role = 'Investor' | 'Landowner' | 'Employee'

export const ROLES: Role[] = ['Investor', 'Landowner', 'Employee']

/** Row from public.profiles — the trusted source for identity & authorization. */
export interface Profile {
  id: string
  full_name: string
  email: string
  role: Role
}

export interface AppContextValue {
  theme: Theme
  toggleTheme: () => void
  /** Navigates to the given screen through its real URL (react-router). */
  navigate: (view: View) => void
  role: Role
  setRole: (role: Role) => void
  profile: Profile | null
  setProfile: (profile: Profile | null) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp must be used inside <AppContext.Provider>')
  }
  return ctx
}
