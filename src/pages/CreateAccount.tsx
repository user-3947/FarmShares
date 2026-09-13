/**
 * ============================================================================
 *  Create Account Page
 * ----------------------------------------------------------------------------
 *  Cooperative registration screen. AuthShell provides the frame; SignUpForm
 *  (features/auth) owns validation, terms and the email-confirmation notice.
 * ============================================================================
 */
import { AuthShell } from '../components/auth/AuthShell'
import {
  APP_TAGLINE,
  APP_VERSION,
  COPYRIGHT_HOLDER,
  COPYRIGHT_SUFFIX,
  COPYRIGHT_YEAR,
  NODE_STATUS_LABEL,
} from '../config/app'
import { SignUpForm } from '../features/auth/components/SignUpForm'

export default function CreateAccount() {
  return (
    <AuthShell
      mainClassName="max-w-xl py-4"
      statusLabel={NODE_STATUS_LABEL}
      tagline={APP_TAGLINE}
      footer={
        <footer className="mx-auto w-full max-w-max-width py-4 text-center">
          <p className="text-label-sm font-label-sm text-on-surface-variant">
            © {COPYRIGHT_YEAR} {COPYRIGHT_HOLDER}. {COPYRIGHT_SUFFIX}
          </p>
          <p className="mt-1 text-[0.625rem] font-normal tracking-widest text-on-surface-variant uppercase opacity-70">
            v{APP_VERSION}
          </p>
        </footer>
      }
    >
      <SignUpForm />
    </AuthShell>
  )
}
