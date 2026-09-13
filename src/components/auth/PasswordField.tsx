/**
 * ============================================================================
 *  Password Field
 * ----------------------------------------------------------------------------
 *  Neumorphic password input with internal show/hide state. Two modes:
 *  - Primary (default): Lock icon + visibility eye toggle.
 *  - Confirm (pass `compareTo`): BadgeCheck icon glows when the re-typed
 *    password matches the primary one.
 * ============================================================================
 */
import { useState } from 'react'
import type { ReactNode } from 'react'
import { BadgeCheck, Eye, EyeOff, Lock } from 'lucide-react'

interface PasswordFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
  /** Visibility eye toggle — used by primary password fields. */
  toggleable?: boolean
  /** When provided, the field acts as confirm-password with a match indicator. */
  compareTo?: string
  /** Optional element on the right of the label row (e.g. "Forgot?" link). */
  labelTrailing?: ReactNode
}

export function PasswordField({
  id,
  label,
  value,
  onChange,
  placeholder,
  autoComplete,
  toggleable = false,
  compareTo,
  labelTrailing,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)
  const isConfirm = compareTo !== undefined
  const matched = isConfirm && value.length > 0 && value === compareTo

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between px-1">
        <label className="text-label-sm font-semibold text-on-surface-variant" htmlFor={id}>
          {label}
        </label>
        {labelTrailing}
      </div>
      <div className="neu-well relative flex items-center rounded-xl px-4 py-3.5">
        {isConfirm ? (
          <BadgeCheck
            className={`mr-3 h-5 w-5 shrink-0 ${matched ? 'text-success' : 'text-on-surface-variant'}`}
          />
        ) : (
          <Lock className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
        )}
        <input
          autoComplete={autoComplete}
          className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
          id={id}
          placeholder={placeholder}
          required
          type={toggleable && visible ? 'text' : 'password'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {toggleable && (
          <button
            aria-label={visible ? 'Hide password' : 'Show password'}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:text-primary"
            type="button"
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
          </button>
        )}
      </div>
    </div>
  )
}
