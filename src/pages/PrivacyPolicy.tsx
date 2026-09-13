/**
 * ============================================================================
 *  Privacy Policy Page (pseudo)
 * ----------------------------------------------------------------------------
 *  Placeholder privacy copy rendered through the shared LegalDoc frame. Swap
 *  the SECTIONS data for counsel-reviewed text before production — no
 *  component changes needed.
 * ============================================================================
 */
import { ShieldCheck } from 'lucide-react'
import { LegalDoc } from '../components/auth/LegalDoc'
import type { LegalSection } from '../components/auth/LegalDoc'
import { APP_NAME, COPYRIGHT_YEAR } from '../config/app'

const SECTIONS: LegalSection[] = [
  {
    heading: 'Information We Collect',
    paragraphs: ['When you register and use the portal, the cooperative processes:'],
    bullets: [
      'account data — full name, email address and the member role you select;',
      'authentication metadata managed by our auth provider (session tokens, timestamps);',
      'operational data you generate while using the portal (holdings, ledger entries, preferences).',
    ],
  },
  {
    heading: 'How We Use Your Information',
    paragraphs: [
      `Your data is used exclusively to operate the ${APP_NAME} service: authenticating you, showing the correct role deck, keeping the shared ledger accurate and contacting you about your membership.`,
      'We do not sell personal data, and we do not use it for third-party advertising.',
    ],
  },
  {
    heading: 'Where Your Data Lives',
    paragraphs: [
      'Member data is stored in a managed Supabase (PostgreSQL) database. Row-Level Security policies restrict every table so a signed-in member can only read and update their own row — there is deliberately no public lookup endpoint for profiles or emails.',
    ],
  },
  {
    heading: 'Cookies & Local Storage',
    paragraphs: [
      'The portal stores only what it needs in your browser: your session token (so you stay signed in) and your light/dark theme preference in localStorage. No tracking or advertising cookies are used.',
    ],
  },
  {
    heading: 'Sharing & Disclosure',
    paragraphs: [
      'We share data only with the service providers required to run the portal (hosting, database, email delivery for account confirmation), under agreements that limit their use of the data. Disclosure may also occur where required by law.',
    ],
  },
  {
    heading: 'Your Rights',
    paragraphs: ['Subject to applicable law, you may request:'],
    bullets: [
      'a copy of the personal data we hold about you;',
      'correction of inaccurate data;',
      'deletion of your account and associated data, subject to cooperative record-keeping obligations.',
    ],
  },
  {
    heading: 'Data Retention',
    paragraphs: [
      'Account and ledger data is retained while your membership is active and for the period required by cooperative statutes and accounting rules, after which it is deleted or anonymized.',
    ],
  },
  {
    heading: 'Changes & Contact',
    paragraphs: [
      `This policy may be updated as the Service evolves; material changes will be announced to members. Privacy questions and data requests can be sent to the ${APP_NAME} board through your member representative or the Support Desk.`,
    ],
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalDoc
      icon={ShieldCheck}
      sections={SECTIONS}
      summary={`How the ${APP_NAME} cooperative collects, stores and protects member data.`}
      title="Privacy Policy"
      updatedLabel={`Template document · Last updated ${COPYRIGHT_YEAR}`}
    />
  )
}