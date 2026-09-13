/**
 * ============================================================================
 *  Sign Up Form
 * ----------------------------------------------------------------------------
 *  Cooperative account creation: role hint + name/email/passwords + terms.
 *  On success without a session, Supabase wants email confirmation and the
 *  user is told to verify the inbox before signing in.
 * ============================================================================
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, BadgeCheck, Lock, Mail, Sprout, User } from 'lucide-react'
import { FormAlert } from '../../../components/auth/FormAlert'
import { PasswordField } from '../../../components/auth/PasswordField'
import { RoleSelector } from '../../../components/auth/RoleSelector'
import { TextField } from '../../../components/auth/TextField'
import { useApp } from '../../../context/AppContext'
import { APP_SIGNUP_TAGLINE } from '../../../config/app'
import { fetchOwnProfile, signUpUser } from '../../../lib/auth'
import { validateSignUpFields } from '../../../lib/validation'

interface SignUpFormState {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

const INITIAL_FORM: SignUpFormState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false,
}

export function SignUpForm() {
  const { navigate, role, setProfile } = useApp()
  const [form, setForm] = useState<SignUpFormState>(INITIAL_FORM)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  /** Generic field updater so inputs stay one-liners. */
  const update = <K extends keyof SignUpFormState>(key: K, value: SignUpFormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const invalid = validateSignUpFields(form)
    if (invalid) {
      setError(invalid)
      return
    }
    if (!form.terms) {
      setError('Please accept the Terms of Service & Privacy Policy.')
      return
    }
    setError('')
    setBusy(true)
    try {
      // user_metadata is consumed by the DB trigger that inserts public.profiles.
      const { needsEmailConfirmation } = await signUpUser({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        role,
      })
      if (needsEmailConfirmation) {
        setNotice('Account created. Check your inbox to confirm your email, then sign in.')
      } else {
        setProfile(await fetchOwnProfile())
        navigate('dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create account. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="neu-outset rounded-3xl p-6 sm:p-10">
      {/* Card heading */}
      <div className="mb-8 text-center">
        <div className="neu-inset mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
          <Sprout className="h-8 w-8" strokeWidth={2} />
        </div>
        <h1 className="mb-2 text-headline-xl font-headline-xl tracking-tight text-on-surface">
          Create Account
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant">{APP_SIGNUP_TAGLINE}</p>
      </div>

      <div className="mb-8">
        <RoleSelector label="Select Account Role" />
      </div>

      <form className="space-y-5" noValidate onSubmit={handleSubmit}>
        <TextField
          autoComplete="name"
          icon={User}
          id="fullName"
          label="Full Name"
          placeholder="e.g. Alex Morgan"
          value={form.fullName}
          onChange={(value) => update('fullName', value)}
        />

        <TextField
          autoComplete="email"
          icon={Mail}
          id="workEmail"
          label="Work Email Address"
          placeholder="alex@farmshares.coop"
          type="email"
          value={form.email}
          onChange={(value) => update('email', value)}
        />

        <PasswordField
          autoComplete="new-password"
          id="masterPassword"
          label="Master Password"
          placeholder="At least 8 characters"
          toggleable
          value={form.password}
          onChange={(value) => update('password', value)}
        />

        <PasswordField
          autoComplete="new-password"
          compareTo={form.password}
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={(value) => update('confirmPassword', value)}
        />

        {error && <FormAlert message={error} tone="error" />}

        {notice && !error && <FormAlert message={notice} tone="success" />}

        {/* Terms & conditions checkbox */}
        <div className="pt-2">
          <label className="group flex cursor-pointer select-none items-start gap-3.5">
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
            className="neu-cta group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-label-md font-bold disabled:opacity-60"
            disabled={busy}
            type="submit"
          >
            {busy ? 'Creating Account…' : 'Create Account'}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </form>

      {/* Swap to sign-in + security note */}
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
  )
}
