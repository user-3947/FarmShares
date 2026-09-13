/**
 * ============================================================================
 *  Theme Toggle
 * ----------------------------------------------------------------------------
 *  Light/dark switch driven by the global AppContext theme. The current theme
 *  is persisted by App.tsx under THEME_STORAGE_KEY.
 * ============================================================================
 */
import { Moon, Sun } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useApp()
  return (
    <button
      aria-label="Toggle visual theme"
      className="neu-btn neu-outset-sm flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary"
      title="Toggle Theme"
      type="button"
      onClick={toggleTheme}
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </button>
  )
}
