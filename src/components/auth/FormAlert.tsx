/**
 * ============================================================================
 *  Form Alert
 * ----------------------------------------------------------------------------
 *  Inline error / success notice used by the auth forms.
 * ============================================================================
 */
import { BadgeCheck, TriangleAlert } from 'lucide-react'

type FormAlertTone = 'error' | 'success'

interface FormAlertProps {
  tone: FormAlertTone
  message: string
}

export function FormAlert({ tone, message }: FormAlertProps) {
  const Icon = tone === 'error' ? TriangleAlert : BadgeCheck
  return (
    <p
      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-label-md font-label-md ${
        tone === 'error'
          ? 'bg-error-container text-on-error-container'
          : 'bg-success-container text-on-success-container'
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {message}
    </p>
  )
}
