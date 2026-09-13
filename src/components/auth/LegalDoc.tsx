/**
 * ============================================================================
 *  Legal Document
 * ----------------------------------------------------------------------------
 *  Shared frame for the pseudo legal pages (Terms of Service, Privacy
 *  Policy). Composes AuthShell with a back-to-sign-in footer and renders the
 *  numbered sections inside a soft-UI card. Copy is supplied by each page.
 * ============================================================================
 */
import { ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthShell } from './AuthShell'
import {
  APP_TAGLINE,
  COPYRIGHT_HOLDER,
  COPYRIGHT_YEAR,
  LEGAL_TEMPLATE_NOTE,
  NODE_STATUS_LABEL,
  ROUTES,
} from '../../config/app'

/** One numbered section of a legal document. */
export interface LegalSection {
  heading: string
  /** Paragraphs rendered under the heading, in order. */
  paragraphs: string[]
  /** Optional bullet list after the paragraphs. */
  bullets?: string[]
}

interface LegalDocProps {
  icon: LucideIcon
  title: string
  /** Lead-in line under the document title. */
  summary: string
  /** Small "last updated" line in the header. */
  updatedLabel: string
  sections: LegalSection[]
}

export function LegalDoc({ icon: Icon, title, summary, updatedLabel, sections }: LegalDocProps) {
  return (
    <AuthShell
      mainClassName="max-w-3xl justify-center py-8"
      statusLabel={NODE_STATUS_LABEL}
      tagline={APP_TAGLINE}
      footer={
        <footer className="mx-auto w-full max-w-max-width px-6 py-4 text-center">
          <Link
            className="inline-flex items-center gap-1.5 text-label-md font-semibold text-primary transition-colors hover:text-secondary"
            to={ROUTES.login}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </Link>
          <p className="mt-2 text-label-sm font-label-sm text-on-surface-variant">
            © {COPYRIGHT_YEAR} {COPYRIGHT_HOLDER}. All rights reserved.
          </p>
        </footer>
      }
    >
      <article className="neu-outset rounded-3xl p-6 sm:p-10">
        {/* Document heading */}
        <header className="mb-8 text-center">
          <div className="neu-inset mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl text-primary">
            <Icon className="h-8 w-8" strokeWidth={2} />
          </div>
          <h1 className="mb-2 text-headline-xl font-headline-xl tracking-tight text-on-surface">{title}</h1>
          <p className="text-body-md font-body-md text-on-surface-variant">{summary}</p>
          <p className="mt-2 text-label-sm font-label-sm tracking-wide text-on-surface-variant">{updatedLabel}</p>
        </header>

        {/* Numbered sections */}
        <div className="flex flex-col">
          {sections.map((section, index) => (
            <section className="border-t border-outline-variant pt-6" key={section.heading}>
              <h2 className="mb-2 text-title-md font-bold text-on-surface">
                {index + 1}. {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p className="text-body-md font-body-md leading-relaxed text-on-surface-variant" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {section.bullets.map((bullet) => (
                    <li className="flex items-start gap-2 text-body-md font-body-md text-on-surface-variant" key={bullet}>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Template disclaimer */}
        <p className="mt-8 border-t border-outline-variant pt-4 text-label-sm font-label-sm text-on-surface-variant">
          {LEGAL_TEMPLATE_NOTE}
        </p>
      </article>
    </AuthShell>
  )
}