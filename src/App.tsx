/**
 * ============================================================================
 *  App
 * ----------------------------------------------------------------------------
 *  Composition root. BrowserRouter owns the URL; AppContext owns global UI
 *  state (theme · role · trusted profile); the route table wires every page —
 *  /login, /create, the protected /dashboard and the pseudo legal pages.
 * ============================================================================
 */
import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AppContext, useApp } from './context/AppContext'
import type { Profile, Role, Theme, View } from './context/AppContext'
import { ROUTES, THEME_STORAGE_KEY } from './config/app'
import { fetchOwnProfile, signOutUser } from './lib/auth'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import CreateAccount from './pages/CreateAccount'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'

/** Dashboard is code-split: it only loads once the user is authenticated. */
const Dashboard = lazy(() => import('./pages/Dashboard'))

/** View name → canonical URL (paths live in config/app.ts). */
const VIEW_PATHS: Record<View, string> = {
  login: ROUTES.login,
  'create-account': ROUTES.createAccount,
  'forgot-password': ROUTES.forgotPassword,
  'reset-password': ROUTES.resetPassword,
  dashboard: ROUTES.dashboard,
}

/** Full-screen splash shared by session restore and the lazy dashboard. */
function Splash({ label }: { label: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <span className="text-label-md font-label-md text-on-surface-variant">{label}</span>
    </div>
  )
}

/** Gate for /dashboard: splash during restore, redirect when signed out. */
function RequireProfile({ booting, children }: { booting: boolean; children: ReactNode }) {
  const { profile } = useApp()
  if (booting) return <Splash label="Restoring session…" />
  if (!profile) return <Navigate replace to={ROUTES.login} />
  return <>{children}</>
}

/** Keeps every real-route navigation at the top of the page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppShell />
    </BrowserRouter>
  )
}

function AppShell() {
  const routerNavigate = useNavigate()
  const [role, setRole] = useState<Role>('Employee')
  const [profile, setProfile] = useState<Profile | null>(null)
  // True until Supabase reports the restored (or absent) session on boot —
  // prevents /dashboard refreshes from flashing the login screen.
  const [booting, setBooting] = useState(true)
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

  // The auth listener is subscribed once; it reads the latest router navigate
  // through a ref so identity churn on re-renders never re-subscribes it.
  const navigateRef = useRef(routerNavigate)
  useEffect(() => {
    navigateRef.current = routerNavigate
  }, [routerNavigate])

  /** Context-level navigation: View name → real URL (scroll handled by ScrollToTop). */
  const navigate = useCallback((next: View) => {
    navigateRef.current(VIEW_PATHS[next])
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
      if (event === 'PASSWORD_RECOVERY') {
        // The emailed link created a single-purpose recovery session — send
        // the user to the new-password form instead of the dashboard.
        setProfile(null)
        navigate('reset-password')
        return
      }
      if (event === 'INITIAL_SESSION') {
        // Never hijack a recovery flow into the dashboard: on /reset-password
        // the session restore is handled by the reset screen itself.
        if (window.location.pathname === ROUTES.resetPassword) {
          setBooting(false)
          return
        }
        if (!session) {
          setBooting(false)
          return
        }
        fetchOwnProfile()
          .then((restored) => {
            setProfile(restored)
            setRole(restored.role)
            navigate('dashboard')
          })
          .catch(() => signOutUser())
          .finally(() => setBooting(false))
      }
    })
    return () => data.subscription.unsubscribe()
  }, [navigate])

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        navigate,
        role,
        setRole,
        profile,
        setProfile,
      }}
    >
      <Routes>
        <Route element={<Navigate replace to={ROUTES.login} />} path={ROUTES.root} />
        <Route element={<LoginPage />} path={ROUTES.login} />
        <Route element={<CreateAccount />} path={ROUTES.createAccount} />
        <Route element={<CreateAccount />} path={ROUTES.createAccountAlias} />
        <Route element={<TermsOfService />} path={ROUTES.termsOfService} />
        <Route element={<PrivacyPolicy />} path={ROUTES.privacyPolicy} />
        <Route element={<ForgotPassword />} path={ROUTES.forgotPassword} />
        <Route element={<ResetPassword />} path={ROUTES.resetPassword} />
        <Route
          element={
            <RequireProfile booting={booting}>
              <Suspense fallback={<Splash label="Loading portal…" />}>
                <Dashboard />
              </Suspense>
            </RequireProfile>
          }
          path={ROUTES.dashboard}
        />
        {/* Unknown URLs fall back to the sign-in screen. */}
        <Route element={<Navigate replace to={ROUTES.login} />} path="*" />
      </Routes>
    </AppContext.Provider>
  )
}

export default App

