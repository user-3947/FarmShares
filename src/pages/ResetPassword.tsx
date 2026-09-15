/**
 * ============================================================================
 *  Reset Password Page
 * ----------------------------------------------------------------------------
 *  /reset-password — the target of Supabase's recovery email. supabase-js
 *  (detectSessionInUrl) exchanges the token for a single-purpose recovery
 *  session (App.tsx also listens for PASSWORD_RECOVERY and lands here); the
 *  form then swaps the password via updateUser and drops the session.
 * ============================================================================
 */
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { BadgeCheck, KeyRound, Link2Off } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthShell } from '../components/auth/AuthShell'
import { FormAlert } from '../components/auth/FormAlert'
import { PasswordField } from '../components/auth/PasswordField'
import {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  COPYRIGHT_YEAR,
  NODE_STATUS_LABEL,
  ROUTES,
} from '../config/app'
import { useTransientMessage } from '../hooks/useTransientMessage'
import { signOutUser, updateUserPassword } from '../lib/auth'
import { validateResetFields } from '../lib/validation'
import { supabase } from '../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [checking, setChecking] = useState(true)
  const [hasSession, setHasSession] = useState(false)
  const [updated, setUpdated] = useState(false)
  // Error alerts vanish on their own — see hooks/useTransientMessage.
  const [error, showError] = useTransientMessage()

  // The recovery token is exchanged during client init (detectSessionInUrl),
  // which can still be in flight on first paint — so poll the session once
  // and also listen for the recovery sign-in before declaring a dead link.
  useEffect(() => {
    let active = true
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        if (active) setHasSession(Boolean(session))
      })
      .catch(() => setHasSession(false))
      .finally(() => {
        if (active) setChecking(false)
      })
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        setHasSession(true)
        setChecking(false)
      }
    })
    return () => {
      active = false
      data.subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const invalid = validateResetFields(password, confirmPassword)
    if (invalid) {
      showError(invalid)
      return
    }
    setBusy(true)
    try {
      await updateUserPassword(password)
      setUpdated(true)
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Unable to update the password. Try again.')
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
        <div className="flex flex-col items-center pt-2 text-center">
          <div className="neu-inset mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
            <KeyRound className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="text-headline-xl font-headline-xl tracking-tight text-primary">
            Set a New Password
          </h1>
          <p className="mt-1 text-body-sm font-body-sm text-on-surface-variant">
            Choose a strong password — at least 8 characters.
          </p>
        </div>

        {checking ? (
          <p className="py-6 text-center text-label-md font-label-md text-on-surface-variant">
            Verifying your reset link…
          </p>
        ) : updated ? (
          /* Success state — the recovery session is dropped when leaving. */
          <div className="flex flex-col gap-5">
            <div className="neu-inset flex flex-col items-center gap-2 rounded-2xl p-6 text-center">
              <BadgeCheck className="h-8 w-8 text-success" />
              <p className="text-title-md font-bold text-on-surface">Password updated</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                Your password has been changed. Sign in with the new one to continue.
              </p>
            </div>
            <button
              className="neu-cta flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold disabled:opacity-60"
              type="button"
              onClick={() => {
                void signOutUser()
              }}
            >
              Continue to Sign In
            </button>
          </div>
        ) : hasSession ? (
          <form className="flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
            <PasswordField
              autoComplete="new-password"
              id="newPassword"
              label="New Password"
              placeholder="At least 8 characters"
              toggleable
              value={password}
              onChange={setPassword}
            />
            <PasswordField
              autoComplete="new-password"
              compareTo={password}
              id="confirmNewPassword"
              label="Confirm Password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            {error && <FormAlert message={error} tone="error" />}

            <button
              className="neu-cta mt-2 flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold disabled:opacity-60"
              disabled={busy}
              type="submit"
            >
              {busy ? 'Updating…' : 'Update Password'}
            </button>
          </form>
        ) : (
          /* No recovery session — the link is invalid, expired or already used. */
          <div className="flex flex-col gap-4">
            <div className="neu-inset flex flex-col items-center gap-2 rounded-2xl p-6 text-center">
              <Link2Off className="h-8 w-8 text-error" />
              <p className="text-title-md font-bold text-on-surface">Link invalid or expired</p>
              <p className="text-body-sm font-body-sm text-on-surface-variant">
                This password reset link is no longer valid. Request a fresh one and try again.
              </p>
            </div>
            <Link
              className="neu-cta flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-label-md font-bold"
              to={ROUTES.forgotPassword}
            >
              Request a New Link
            </Link>
          </div>
        )}

        <div className="flex items-center justify-center border-t border-outline-variant pt-4 text-center text-body-sm font-body-sm text-on-surface-variant">
          <Link className="text-label-sm font-semibold text-primary hover:underline" to={ROUTES.login}>
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthShell>
  )
}