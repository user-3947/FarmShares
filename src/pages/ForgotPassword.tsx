/**
 * ============================================================================
 *  Forgot Password Page (pseudo-flow)
 * ----------------------------------------------------------------------------
 *  /forgot-password — asks for the account email and fires Supabase's
 *  password-recovery email. The emailed link points back at /reset-password.
 *  NOTE: the redirect URL must be allow-listed in the Supabase dashboard
 *  (Authentication → URL Configuration → Redirect URLs).
 * ============================================================================
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { KeyRound, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { FormAlert } from '../components/auth/FormAlert'
import { TextField } from '../components/auth/TextField'
import {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  COPYRIGHT_YEAR,
  NODE_STATUS_LABEL,
  ROUTES,
} from '../config/app'
import { useTransientMessage } from '../hooks/useTransientMessage'
import { requestPasswordReset } from '../lib/auth'
import { validateEmailField } from '../lib/validation'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState(false)
  // Error alerts vanish on their own — see hooks/useTransientMessage.
  const [error, showError] = useTransientMessage()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const invalid = validateEmailField(email)
    if (invalid) {
      showError(invalid)
      return
    }
    setBusy(true)
    try {
      await requestPasswordReset(email.trim())
      setSent(true)
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Unable to send the reset email. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthShell
      mainClassName="max-w-md justify-center py-8"
      statusLabel={NODE_STATUS_LABEL}
      tagline={APP_TAGLINE}
      footer={
        <footer className="mx-auto w-full max-w-max-width px-6 py-4 text-center">
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            © {COPYRIGHT_YEAR} {APP_NAME}. All rights reserved.
          </p>
          <p className="mt-1 text-[0.625rem] font-normal tracking-widest text-on-surface-variant uppercase opacity-70">
            v{APP_VERSION}
          </p>
        </footer>
      }
    >
      <div className="neu-outset flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
        {/* Card heading */}
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="neu-inset mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
            <KeyRound className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="text-headline-xl font-headline-xl tracking-tight text-primary">
            Forgot Password?
          </h1>
          <p className="mt-1 text-body-sm font-body-sm text-on-surface-variant">
            Enter your account email and we&apos;ll send you a reset link.
          </p>
        </div>

        {sent ? (
          /* Confirmation state — a screen result, not a transient alert. */
          <div className="flex flex-col gap-4">
            <div className="neu-inset flex flex-col items-center gap-2 rounded-2xl p-6 text-center">
              <Mail className="h-8 w-8 text-success" />
              <p className="text-title-md font-bold text-on-surface">Check your inbox</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                We sent a password reset link to <span className="font-semibold text-on-surface">{email.trim()}</span>.
                Open it on this device to finish — the link expires soon.
              </p>
            </div>
            <button
              className="text-label-sm font-semibold text-primary hover:underline"
              type="button"
              onClick={() => setSent(false)}
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
            <TextField
              autoComplete="email"
              icon={Mail}
              id="forgotEmail"
              label="Email Address"
              placeholder="you@farmshares.coop"
              type="email"
              value={email}
              onChange={setEmail}
            />

            {error && <FormAlert message={error} tone="error" />}

            <button
              className="neu-cta mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold disabled:opacity-60"
              disabled={busy}
              type="submit"
            >
              {busy ? 'Sending…' : 'Send Reset Link'}
              <Mail className="h-5 w-5" />
            </button>

            <div className="flex items-center justify-center gap-1.5 pt-2 text-center text-body-sm font-body-sm text-on-surface-variant">
              Remembered it?
              <Link className="text-label-sm font-semibold text-primary hover:underline" to={ROUTES.login}>
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </AuthShell>
  )
}