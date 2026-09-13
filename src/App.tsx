import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { AppContext } from './context/AppContext'
import type { Profile, Role, Theme, View } from './context/AppContext'
import { THEME_STORAGE_KEY } from './config/app'
import { fetchOwnProfile, signOutUser } from './lib/auth'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'

/** Dashboard is code-split: it only loads once the user is authenticated. */
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  const [view, setView] = useState<View>('login')
  const [role, setRole] = useState<Role>('Employee')
  const [profile, setProfile] = useState<Profile | null>(null)
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

  // Restores a persisted session on load and resets the UI after sign-out.
  // Sign-in/up flows call lib/auth themselves and navigate once the trusted
  // profile is validated.
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null)
        setRole('Employee')
        navigate('login')
        return
      }
      if (event === 'INITIAL_SESSION' && session) {
        fetchOwnProfile()
          .then((restored) => {
            setProfile(restored)
            setRole(restored.role)
            navigate('dashboard')
          })
          .catch(() => signOutUser())
      }
    })
    return () => data.subscription.unsubscribe()
  }, [navigate])

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        view,
        navigate,
        role,
        setRole,
        profile,
        setProfile,
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

