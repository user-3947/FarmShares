/**
 * ============================================================================
 *  Sign In Form
 * ----------------------------------------------------------------------------
 *  Email + password sign-in card. The role selected above the form is only a
 *  client-side hint — lib/auth re-verifies it against the trusted
 *  `profiles.role` row and rejects mismatches before opening the dashboard.
 * ============================================================================
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Database, LogIn, Mail, ShieldCheck } from 'lucide-react'
import { PasswordField } from '../../../components/auth/PasswordField'
import { RoleSelector } from '../../../components/auth/RoleSelector'
import { TextField } from '../../../components/auth/TextField'
import { FormAlert } from '../../../components/auth/FormAlert'
import { useApp } from '../../../context/AppContext'
import { APP_NAME, APP_SIGNIN_TAGLINE } from '../../../config/app'
import { useTransientMessage } from '../../../hooks/useTransientMessage'
import { signInUser } from '../../../lib/auth'
import { validateLoginFields } from '../../../lib/validation'

export function SignInForm() {
  const { navigate, role, setProfile, setRole } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  // Error alerts vanish on their own — see hooks/useTransientMessage.
  const [error, showError, clearError] = useTransientMessage()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const invalid = validateLoginFields(email, password)
    if (invalid) {
      showError(invalid)
      return
    }
    clearError()
    setBusy(true)
    try {
      // Authorization comes from the trusted profiles row, never the UI pick.
      const profile = await signInUser({ email, password, selectedRole: role })
      setProfile(profile)
      setRole(profile.role)
      navigate('dashboard')
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Unable to sign in. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="neu-outset flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
      {/* Card heading */}
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="neu-inset mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary transition-transform duration-200 hover:scale-105">
          <Database className="h-8 w-8" strokeWidth={2} />
        </div>
        <h1 className="text-headline-xl font-headline-xl tracking-tight text-primary">{APP_NAME}</h1>
        <p className="mt-1 text-body-sm font-body-sm text-on-surface-variant">{APP_SIGNIN_TAGLINE}</p>
      </div>

      <RoleSelector label="Account Role" />

      <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="email"
          icon={Mail}
          id="emailInput"
          label="Email Address"
          placeholder="you@farmshares.coop"
          type="email"
          value={email}
          onChange={setEmail}
        />

        <PasswordField
          autoComplete="current-password"
          id="passwordInput"
          label="Security Key / Password"
          placeholder="password"
          toggleable
          value={password}
          labelTrailing={
            <a
              className="text-label-sm font-label-sm text-primary hover:underline"
              href="#reset"
              onClick={(event) => event.preventDefault()}
            >
              Forgot?
            </a>
          }
          onChange={setPassword}
        />

        {error && <FormAlert message={error} tone="error" />}

        <button
          className="neu-cta mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold disabled:opacity-60"
          disabled={busy}
          type="submit"
        >
          {busy ? 'Verifying…' : 'Enter Portal'}
          <LogIn className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-1.5 pt-2 text-center">
          <span className="text-body-sm font-body-sm text-on-surface-variant">
            Don&apos;t have an account?
          </span>
          <button
            className="text-label-sm font-semibold text-primary hover:underline"
            type="button"
            onClick={() => navigate('create-account')}
          >
            Create Account
          </button>
        </div>
      </form>

      {/* Security footnote (credentials are never displayed in the UI) */}
      <div className="flex items-center justify-center gap-2 border-t border-outline-variant pt-4">
        <ShieldCheck className="h-4.5 w-4.5 text-success" />
        <span className="text-label-sm font-label-sm tracking-wide text-on-surface-variant">
          Secured by Supabase Auth · Row-level security enforced
        </span>
      </div>
    </div>
  )
}
