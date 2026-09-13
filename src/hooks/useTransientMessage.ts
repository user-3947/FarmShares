/**
 * ============================================================================
 *  Transient Message Hook
 * ----------------------------------------------------------------------------
 *  Auto-dismissing state for inline form alerts: every message (error or
 *  success) clears itself after MESSAGE_AUTO_DISMISS_MS so stale alerts never
 *  linger on screen. The timer resets on each new message and is torn down on
 *  unmount.
 * ============================================================================
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { MESSAGE_AUTO_DISMISS_MS } from '../config/app'

/**
 * Holds one transient message.
 * @returns `[message, show, clear]` — `show(text)` displays it and starts the
 * dismiss countdown; `clear()` removes it (and the pending timer) immediately.
 */
export function useTransientMessage(delayMs: number = MESSAGE_AUTO_DISMISS_MS) {
  const [message, setMessage] = useState('')
  const timerRef = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setMessage('')
  }, [])

  const show = useCallback(
    (text: string) => {
      clear()
      setMessage(text)
      timerRef.current = window.setTimeout(clear, delayMs)
    },
    [clear, delayMs],
  )

  // Never leave a stray timer behind after unmount.
  useEffect(() => clear, [clear])

  return [message, show, clear] as const
}