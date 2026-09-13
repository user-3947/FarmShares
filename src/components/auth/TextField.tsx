/**
 * ============================================================================
 *  Text Field
 * ----------------------------------------------------------------------------
 *  Neumorphic single-line input with a leading icon — used for name/email
 *  entries on the auth screens. Keeps form markup identical across pages.
 * ============================================================================
 */
import type { LucideIcon } from 'lucide-react'

interface TextFieldProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  /** Leading decorative icon. */
  icon: LucideIcon
  type?: 'text' | 'email'
  placeholder?: string
  autoComplete?: string
}

export function TextField({
  id,
  label,
  value,
  onChange,
  icon: Icon,
  type = 'text',
  placeholder,
  autoComplete,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="px-1 text-label-sm font-semibold text-on-surface-variant" htmlFor={id}>
        {label}
      </label>
      <div className="neu-well flex items-center rounded-xl px-4 py-3.5">
        <Icon className="mr-3 h-5 w-5 shrink-0 text-on-surface-variant" />
        <input
          autoComplete={autoComplete}
          className="w-full border-0 bg-transparent p-0 text-body-md font-body-md text-on-surface outline-none"
          id={id}
          placeholder={placeholder}
          required
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}
