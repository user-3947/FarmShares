/**
 * ============================================================================
 *  Terms of Service Page (pseudo)
 * ----------------------------------------------------------------------------
 *  Placeholder legal copy rendered through the shared LegalDoc frame. Swap
 *  the SECTIONS data for counsel-reviewed text when the co-op incorporates —
 *  no component changes needed.
 * ============================================================================
 */
import { ScrollText } from 'lucide-react'
import { LegalDoc } from '../components/auth/LegalDoc'
import type { LegalSection } from '../components/auth/LegalDoc'
import { APP_NAME, COPYRIGHT_YEAR } from '../config/app'

const SECTIONS: LegalSection[] = [
  {
    heading: 'Acceptance of Terms',
    paragraphs: [
      `By accessing or using the ${APP_NAME} portal (the "Service"), you agree to be bound by these Terms of Service and any operating rules published by the cooperative. If you do not agree, do not use the Service.`,
      'These terms apply to every member role — investors, landowners and employees — and to anyone browsing the public screens of the portal.',
    ],
  },
  {
    heading: 'Membership & Accounts',
    paragraphs: [
      'Access to the dashboard requires an approved account. You are responsible for the accuracy of the information you provide during sign-up and for keeping your password confidential.',
      'One account per person. Notify the cooperative immediately if you suspect unauthorized use of your account.',
    ],
  },
  {
    heading: 'Acceptable Use',
    paragraphs: ['You agree not to:'],
    bullets: [
      'interfere with or disrupt the Service, its telemetry or its infrastructure;',
      'attempt to access data belonging to other members without authorization;',
      'scrape, reverse-engineer or resell any part of the portal;',
      'use the Service for any unlawful or fraudulent purpose.',
    ],
  },
  {
    heading: 'Shares, Contributions & Payouts',
    paragraphs: [
      `Capital ledgers, dividend figures and parcel data shown in the portal are sample values for demonstration purposes and do not constitute a financial statement, an offer, or investment advice.`,
      'Actual share classes, payout schedules and redemption rules are defined in your signed cooperative membership agreement, which prevails over anything shown on screen.',
    ],
  },
  {
    heading: 'Fees & Changes to the Service',
    paragraphs: [
      'The cooperative may modify or discontinue any part of the Service, or change applicable fees, with reasonable notice to members. Continued use after a change constitutes acceptance of the updated terms.',
    ],
  },
  {
    heading: 'Limitation of Liability',
    paragraphs: [
      `To the maximum extent permitted by law, ${APP_NAME} provides the Service "as is" without warranties of any kind. The cooperative is not liable for indirect, incidental or consequential damages arising from your use of, or inability to use, the Service.`,
    ],
  },
  {
    heading: 'Suspension & Termination',
    paragraphs: [
      'We may suspend or terminate an account that violates these terms, jeopardizes other members, or is used fraudulently. You may stop using the Service at any time; provisions that by their nature should survive termination will survive.',
    ],
  },
  {
    heading: 'Governing Law & Contact',
    paragraphs: [
      'These terms are governed by the laws of the cooperative\u2019s place of incorporation, without regard to conflict-of-law rules. Questions about these terms can be sent to the cooperative board through your member representative or the Support Desk.',
    ],
  },
]

export default function TermsOfService() {
  return (
    <LegalDoc
      icon={ScrollText}
      sections={SECTIONS}
      summary={`The ground rules for using the ${APP_NAME} cooperative portal.`}
      title="Terms of Service"
      updatedLabel={`Template document · Last updated ${COPYRIGHT_YEAR}`}
    />
  )
}