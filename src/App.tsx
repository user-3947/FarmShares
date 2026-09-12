import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import type { Role, Theme, View } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'

const Dashboard = lazy(() => import('./pages/Dashboard'))

const THEME_STORAGE_KEY = 'farmshares-theme'

function App() {
  const [view, setView] = useState<View>('login')
  const [role, setRole] = useState<Role>('Employee')
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'dark' || stored === 'light' ? stored : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const navigate = useCallback((next: View) => {
    setView(next)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        view,
        navigate,
        role,
        setRole,
      }}
    >
      {view === 'login' && <LoginPage />}
      {view === 'create-account' && <CreateAccount />}
      {view === 'dashboard' && (
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
              <span className="text-label-md font-label-md text-on-surface-variant">
                Loading portal…
              </span>
            </div>
          }
        >
          <Dashboard />
        </Suspense>
      )}
    </AppContext.Provider>
  )
}

export default App

