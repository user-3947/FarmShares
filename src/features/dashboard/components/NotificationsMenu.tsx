/**
 * ============================================================================
 *  Notifications Menu
 * ----------------------------------------------------------------------------
 *  Bell button + dropdown feed. Open state and the unread badge live here;
 *  "Mark all as read" clears the badge. Feed data comes from dashboard.data.
 * ============================================================================
 */
import { useState } from 'react'
import { Bell, X } from 'lucide-react'
import { NOTIFICATIONS } from '../dashboard.data'

export function NotificationsMenu() {
  const [open, setOpen] = useState(false)
  // Badge starts with every item unread — derived from the feed, not hardcoded.
  const [unreadCount, setUnreadCount] = useState(NOTIFICATIONS.length)

  return (
    <div className="relative">
      <button
        aria-label="Notifications"
        className="neu-btn neu-outset-sm relative flex h-10 w-10 items-center justify-center rounded-xl text-on-surface-variant hover:text-primary"
        title="Notifications"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-tertiary ring-2 ring-surface" />
        )}
      </button>

      {open && (
        <div className="neu-outset absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] rounded-2xl bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-title-md font-bold text-on-surface">Notifications</h4>
            <button
              aria-label="Close notifications"
              className="text-on-surface-variant transition-colors hover:text-primary"
              type="button"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <ul className="space-y-2">
            {NOTIFICATIONS.map((item) => {
              const ItemIcon = item.icon
              return (
                <li key={item.title} className="neu-inset-sm flex items-start gap-3 rounded-xl bg-surface p-3">
                  <ItemIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="text-label-md font-semibold text-on-surface">{item.title}</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">{item.detail}</p>
                  </div>
                  <span className="text-label-sm font-label-sm text-outline">{item.time}</span>
                </li>
              )
            })}
          </ul>
          {unreadCount > 0 && (
            <button
              className="neu-btn neu-outset-sm mt-3 w-full rounded-xl py-2 text-label-md font-label-md text-primary"
              type="button"
              onClick={() => setUnreadCount(0)}
            >
              Mark all as read
            </button>
          )}
        </div>
      )}
    </div>
  )
}
