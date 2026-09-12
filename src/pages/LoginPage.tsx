import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  Database,
  Eye,
  EyeOff,
  Fingerprint,
  Leaf,
  Lock,
  LogIn,
  Moon,
  ShieldCheck,
  Sun,
  TriangleAlert,
  User,
} from 'lucide-react'
import { APP_VERSION, useApp } from '../context/AppContext'
import type { Role } from '../context/AppContext'

const ROLES: Role[] = ['Investor', 'Landowner', 'Employee']

const LoginPage: React.FC = () => {
  const { theme, toggleTheme, navigate, role, setRole } = useApp()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.trim() || !password.trim()) {
      setError('Enter your username and security key to continue.')
      return
    }
    setError('')
    navigate('dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex w-full max-w-max-width items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="neu-outset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
            <Leaf className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <span className="hidden text-label-sm font-label-sm tracking-wide text-on-surface-variant uppercase sm:inline-block">
            Cooperative Resource Portal
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="neu-inset-sm flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-label-sm font-label-sm tracking-wider text-on-surface-variant uppercase">
              Node: Active
            </span>
          </div>
          <button
            aria-label="Toggle visual theme"
            type="button"
            onClick={toggleTheme}
            className="neu-btn neu-outset-sm flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-8 sm:px-6">
        <div className="neu-outset flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col items-center pt-2 text-center">
            <div className="neu-inset mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary transition-transform duration-200 hover:scale-105">
              <Database className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="text-headline-xl font-headline-xl tracking-tight text-primary">FarmShares</h1>
            <p className="mt-1 text-body-sm font-body-sm text-on-surface-variant">
              Single sign-on to the cooperative farm &amp; share ledger
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="px-1 text-label-sm font-semibold text-on-surface-variant">
              ACCOUNT ROLE
            </label>
            <div
              aria-label="Account Role Selection"
              className="neu-inset-sm flex items-center justify-between gap-1 rounded-xl p-1.5"
              role="radiogroup"
            >
              {ROLES.map((item) => {
                const isActive = item === role
                return (
                  <button
                    key={item}
                    aria-checked={isActive}
                    type="button"
                    onClick={() => setRole(item)}
                    className={`flex-1 rounded-lg py-2 text-center text-label-md font-label-md transition-all duration-150 ${
                      isActive
                        ? 'neu-inset-sm font-bold text-primary'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-1.5">
              <label
                className="px-1 text-label-sm font-semibold text-on-surface-variant"
                htmlFor="usernameInput"
              >
                USERNAME OR MEMBER ID
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3">
                <User className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  autoComplete="username"
                  id="usernameInput"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
                  placeholder="username"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <label
                  className="text-label-sm font-semibold text-on-surface-variant"
                  htmlFor="passwordInput"
                >
                  SECURITY KEY / PASSWORD
                </label>
                <a
                  className="text-label-sm font-label-sm text-primary hover:underline"
                  href="#reset"
                  onClick={(event) => event.preventDefault()}
                >
                  Forgot?
                </a>
              </div>
              <div className="neu-well relative flex items-center rounded-xl px-4 py-3">
                <Lock className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  autoComplete="current-password"
                  id="passwordInput"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full border-0 bg-transparent p-0 pr-8 text-body-md font-body-md text-on-surface outline-none"
                  placeholder="password"
                  required
                />
                <button
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-xl bg-error-container px-3 py-2 text-label-md font-label-md text-on-error-container">
                <TriangleAlert className="h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setUsername('farm.member')
                  setPassword('passkey-demo')
                  setError('')
                }}
                className="neu-btn neu-outset group flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-label-md font-label-md text-on-surface"
              >
                <Fingerprint className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
                Verify via Biometric Passkey
              </button>
            </div>

            <button
              type="submit"
              className="neu-cta mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold"
            >
              Enter Portal
              <LogIn className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-center">
              <span className="text-body-sm font-body-sm text-on-surface-variant">
                Don&apos;t have an account?
              </span>
              <button
                type="button"
                onClick={() => navigate('create-account')}
                className="text-label-sm font-semibold text-primary hover:underline"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="flex items-center justify-center gap-2 border-t border-outline-variant pt-4">
            <ShieldCheck className="h-4.5 w-4.5 text-success" />
            <span className="text-label-sm font-label-sm tracking-wide text-on-surface-variant">
              256-bit Encrypted Session • ISO/IEC 27001
            </span>
          </div>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-max-width flex-col items-center justify-between gap-2 px-6 py-4 text-body-sm font-body-sm text-on-surface-variant sm:flex-row">
        <span>© FarmShares. All rights reserved.</span>
        <div className="flex gap-4 text-label-sm font-label-sm">
          {['Compliance', 'Terms of Use', 'Support Desk'].map((link) => (
            <a
              key={link}
              className="transition-colors hover:text-primary"
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(event) => event.preventDefault()}
            >
              {link}
            </a>
          ))}
        </div>
        <span className="text-[0.625rem] font-normal tracking-widest uppercase opacity-70">v{APP_VERSION}</span>
      </footer>
    </div>
  )
}

export default LoginPage
