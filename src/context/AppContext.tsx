import { createContext, useContext } from 'react'

export type View = 'login' | 'create-account' | 'dashboard'
export type Theme = 'light' | 'dark'
export type Role = 'Investor' | 'Landowner' | 'Employee'

export const APP_VERSION = '1.0.1'

export interface AppContextValue {
  theme: Theme
  toggleTheme: () => void
  view: View
  navigate: (view: View) => void
  role: Role
  setRole: (role: Role) => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) {
    throw new Error('useApp must be used inside <AppContext.Provider>')
  }
  return ctx
}
