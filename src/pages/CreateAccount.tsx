import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Eye,
  EyeOff,
  Hash,
  Leaf,
  Lock,
  Mail,
  Moon,
  Sprout,
  Sun,
  TriangleAlert,
  User,
} from 'lucide-react'
import { APP_VERSION, useApp } from '../context/AppContext'
import type { Role } from '../context/AppContext'

const ROLES: Role[] = ['Investor', 'Landowner', 'Employee']

interface FormState {
  fullName: string
  email: string
  entityId: string
  password: string
  confirmPassword: string
  terms: boolean
}

const initialForm: FormState = {
  fullName: '',
  email: '',
  entityId: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

const CreateAccount: React.FC = () => {
  const { theme, toggleTheme, navigate, role, setRole } = useApp()
  const [form, setForm] = useState<FormState>(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!form.fullName.trim() || !form.email.trim() || !form.password) {
      setError('Fill in your name, work email and password to continue.')
      return
    }
    if (form.password.length < 8) {
      setError('Master password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!form.terms) {
      setError('Please accept the Terms of Service & Privacy Policy.')
      return
    }
    setError('')
    navigate('dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="mx-auto flex w-full max-w-max-width items-center justify-between px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="neu-outset flex h-10 w-10 items-center justify-center rounded-xl text-primary">
            <Leaf className="h-5 w-5" strokeWidth={2.25} />
          </div>
          <div>
            <span className="block text-headline-sm font-headline-sm tracking-tight text-primary">
              FarmShares
            </span>
            <span className="text-label-sm font-label-sm tracking-wide text-on-surface-variant uppercase">
              Cooperative Portal
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="neu-inset-sm flex items-center gap-2 rounded-full px-3 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-label-sm font-label-sm text-on-surface-variant">Node 12-East Active</span>
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

      <main className="mx-auto w-full max-w-xl px-4 py-4 sm:px-6">
        <div className="neu-outset rounded-3xl p-6 sm:p-10">
          <div className="mb-8 text-center">
            <div className="neu-inset mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
              <Sprout className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="mb-2 text-headline-xl font-headline-xl tracking-tight text-on-surface">
              Create Account
            </h1>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Join the cooperative &amp; manage shared farm resources
            </p>
          </div>

          <div className="mb-8">
            <label className="mb-2.5 block text-label-md font-label-md tracking-wider text-on-surface-variant uppercase">
              Select Account Role
            </label>
            <div
              className="neu-inset-sm flex items-center gap-1.5 rounded-xl p-1.5"
              id="role-selector"
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
                    className={`flex-1 rounded-lg py-2.5 text-center text-label-md font-label-md transition-all ${
                      isActive
                        ? 'neu-inset-sm font-bold text-primary'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`
                  }
                  >
                    {item}
                  </button>
                )
              })}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label
                className="mb-2 block text-label-md font-label-md text-on-surface-variant"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
                <User className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
                  id="fullName"
                  placeholder="e.g. Alex Morgan"
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(event) => update('fullName', event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-label-md font-label-md text-on-surface-variant"
                htmlFor="workEmail"
              >
                Work Email Address
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
                <Mail className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
                  id="workEmail"
                  placeholder="alex@farmshares.coop"
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-label-md font-label-md text-on-surface-variant"
                htmlFor="entityId"
              >
                Cooperative / Entity ID
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
                <Hash className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
                  id="entityId"
                  placeholder="FS-COOP-9482"
                  required
                  type="text"
                  value={form.entityId}
                  onChange={(event) => update('entityId', event.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-label-md font-label-md text-on-surface-variant"
                htmlFor="masterPassword"
              >
                Master Password
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
                <Lock className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
                <input
                  className="w-full border-0 bg-transparent p-0 pr-8 text-body-md font-body-md text-on-surface outline-none"
                  id="masterPassword"
                  placeholder="At least 8 characters"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => update('password', event.target.value)}
                />
                <button
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="flex items-center p-1 text-on-surface-variant transition-colors hover:text-primary"
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label
                className="mb-2 block text-label-md font-label-md text-on-surface-variant"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
                <BadgeCheck
                  className={`mr-3 h-5 w-5 shrink-0 ${
                    form.confirmPassword && form.confirmPassword === form.password
                      ? 'text-success'
                      : 'text-on-surface-variant'
                  }`}
                />
                <input
                  className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  type="password"
                  value={form.confirmPassword}
                  onChange={(event) => update('confirmPassword', event.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="flex items-center gap-2 rounded-xl bg-error-container px-3 py-2 text-label-md font-label-md text-on-error-container">
                <TriangleAlert className="h-4 w-4 shrink-0" />
                {error}
              </p>
            )}

            <div className="pt-2">
              <label className="group flex cursor-pointer items-start gap-3.5 select-none">
                <div className="neu-inset-sm mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded">
                  <input
                    checked={form.terms}
                    className="peer sr-only"
                    id="terms"
                    required
                    type="checkbox"
                    onChange={(event) => update('terms', event.target.checked)}
                  />
                  <span
                    className={`scale-0 text-base font-bold text-primary transition-transform ${
                      form.terms ? 'scale-100' : ''
                    }`}
                  >
                    <BadgeCheck className="h-4 w-4" />
                  </span>
                </div>
                <span className="text-body-sm font-body-sm leading-tight text-on-surface-variant">
                  I agree to the FarmShares{' '}
                  <a
                    className="font-semibold text-primary underline hover:text-secondary"
                    href="#terms"
                    onClick={(event) => event.preventDefault()}
                  >
                    Terms of Service
                  </a>{' '}
                  &amp;{' '}
                  <a
                    className="font-semibold text-primary underline hover:text-secondary"
                    href="#privacy"
                    onClick={(event) => event.preventDefault()}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div className="pt-4">
              <button
                className="neu-cta group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-label-md font-bold"
                type="submit"
              >
                Create Account
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-outline-variant pt-6 sm:flex-row">
            <button
              className="flex items-center gap-1.5 text-label-md font-label-md text-on-surface-variant transition-colors hover:text-primary"
              type="button"
              onClick={() => navigate('login')}
            >
              Already have an account?
              <span className="font-bold text-primary">Sign In</span>
            </button>
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Lock className="h-4 w-4" />
              <span className="text-label-sm font-label-sm tracking-wide">256-bit SSL Encrypted</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-max-width py-4 text-center">
        <p className="text-label-sm font-label-sm text-on-surface-variant">
          © 2026 FarmShares Cooperative Network. Soft UI Architecture Engine. All rights reserved.
        </p>
        <p className="mt-1 text-[0.625rem] font-normal tracking-widest text-on-surface-variant uppercase opacity-70">
          v{APP_VERSION}
        </p>
      </footer>
    </div>
  )
}

export default CreateAccount
