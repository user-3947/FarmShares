/**
 * ============================================================================
 *  Login Page
 * ----------------------------------------------------------------------------
 *  Unauthenticated entry point. The frame (header/footer) comes from
 *  AuthShell; the card is the feature-level SignInForm. Credentials are never
 *  displayed anywhere in the UI.
 * ============================================================================
 */
import { AuthShell } from '../components/auth/AuthShell'
import {
  APP_NAME,
  APP_TAGLINE,
  APP_VERSION,
  AUTH_FOOTER_LINKS,
  COPYRIGHT_YEAR,
  NODE_STATUS_LABEL,
} from '../config/app'
import { SignInForm } from '../features/auth/components/SignInForm'

export default function LoginPage() {
  return (
    <AuthShell
      mainClassName="max-w-md justify-center py-8"
      statusLabel={NODE_STATUS_LABEL}
      tagline={APP_TAGLINE}
      footer={
        <footer className="mx-auto flex w-full max-w-max-width flex-col items-center justify-between gap-2 px-6 py-4 text-body-sm font-body-sm text-on-surface-variant sm:flex-row">
          <span>
            © {COPYRIGHT_YEAR} {APP_NAME}. All rights reserved.
          </span>
          <div className="flex gap-4 text-label-sm font-label-sm">
            {AUTH_FOOTER_LINKS.map((link) => (
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
          <span className="text-[0.625rem] font-normal tracking-widest uppercase opacity-70">
            v{APP_VERSION}
          </span>
        </footer>
      }
    >
      <SignInForm />
    </AuthShell>
  )
}
