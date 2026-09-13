/**
 * ============================================================================
 *  Role Selector
 * ----------------------------------------------------------------------------
 *  Radiogroup shared by sign-in / sign-up. The picked role is only a UI hint —
 *  authorization is always re-verified against the trusted `profiles.role`
 *  row server-side (see lib/auth.ts).
 * ============================================================================
 */
import { ROLES, useApp } from '../../context/AppContext'

interface RoleSelectorProps {
  /** Visible label rendered above the radiogroup. */
  label: string
}

export function RoleSelector({ label }: RoleSelectorProps) {
  const { role, setRole } = useApp()

  return (
    <div className="flex flex-col gap-2">
      <label className="px-1 text-label-sm font-semibold text-on-surface-variant uppercase">
        {label}
      </label>
      <div
        aria-label="Account Role Selection"
        className="neu-inset-sm flex items-center justify-between gap-1 rounded-xl p-1.5"
        role="radiogroup"
      >
        {ROLES.map((item) => {
          const isActive = item === role
          return (
            <button
              key={item}
              aria-checked={isActive}
              className={`flex-1 rounded-lg py-2 text-center text-label-md font-label-md transition-all duration-150 ${
                isActive
                  ? 'neu-inset-sm font-bold text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
              onClick={() => setRole(item)}
              role="radio"
              type="button"
            >
              {item}
            </button>
          )
        })}
      </div>
    </div>
  )
}
