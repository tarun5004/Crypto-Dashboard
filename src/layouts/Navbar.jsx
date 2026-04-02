import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { COLLECTION_KEYS } from '../utils/schemaVersion.js'
import { quickActions } from '../data/shellData.js'
import { useAppContext } from '../hooks/useAppContext.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'
import { useSearch } from '../hooks/useSearch.js'
import { Avatar } from '../components/common/Avatar.jsx'
import { AppIcon } from '../components/common/AppIcon.jsx'
import { Button } from '../components/common/Button.jsx'

const readCollection = (key) => {
  const value = window.localStorage.getItem(key)
  return value ? JSON.parse(value) : []
}

const getCollectionsForSearch = () => [
  { type: 'Client', route: '/dashboard/clients', items: readCollection(COLLECTION_KEYS.clients) },
  { type: 'Order', route: '/dashboard/orders', items: readCollection(COLLECTION_KEYS.orders) },
  { type: 'Task', route: '/dashboard/tasks', items: readCollection(COLLECTION_KEYS.tasks) },
  { type: 'Product', route: '/dashboard/ecommerce', items: readCollection(COLLECTION_KEYS.ecommerceProducts) },
  { type: 'Market', route: '/dashboard/crypto', items: readCollection(COLLECTION_KEYS.watchlist) },
]

export const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { notifications, markAllNotificationsRead, setSidebarOpen } = useAppContext()
  const { logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [collections, setCollections] = useState(getCollectionsForSearch)
  const [showNotifications, setShowNotifications] = useState(false)
  const { query, setQuery, results } = useSearch(collections)

  useEffect(() => {
    const syncSearch = () => setCollections(getCollectionsForSearch())
    syncSearch()
    window.addEventListener('gaur-storage-sync', syncSearch)
    return () => window.removeEventListener('gaur-storage-sync', syncSearch)
  }, [location.pathname])

  const unreadCount = notifications.filter((notification) => !notification.read).length
  const pageTitle = useMemo(() => location.pathname.split('/').pop()?.replace('-', ' ') ?? 'dashboard', [location.pathname])

  return (
    <header className="panel-surface sticky top-3 z-20 rounded-[24px] px-4 py-3 sm:px-5">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button type="button" className="rounded-2xl border border-[var(--border-soft)] bg-white p-3 text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)] lg:hidden" onClick={() => setSidebarOpen(true)}>
            <AppIcon name="menu" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{pageTitle}</p>
            <div className="relative mt-2">
              <label className="flex min-w-0 items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 sm:min-w-[320px]">
                <AppIcon name="search" className="text-[var(--text-secondary)]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} type="text" placeholder="Search clients, orders, tasks, products..." className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]" />
              </label>
              {query && results.length ? (
                <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 rounded-[24px] border border-[var(--border-soft)] bg-white p-2 shadow-xl">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left transition hover:bg-[var(--accent-soft)]"
                      onClick={() => {
                        navigate(result.route)
                        setQuery('')
                      }}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{result.title}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{result.type} • {result.subtitle}</p>
                      </div>
                      <AppIcon name="arrowRight" className="text-[var(--text-secondary)]" />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} variant={action.type === 'primary' ? 'primary' : 'secondary'} onClick={() => navigate(action.route)}>
              {action.label}
            </Button>
          ))}
          <div className="relative">
            <button type="button" className="relative rounded-2xl border border-[var(--border-soft)] bg-white p-3 text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]" onClick={() => setShowNotifications((value) => !value)}>
              <AppIcon name="bell" />
              {unreadCount > 0 ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[11px] font-semibold text-white">{unreadCount}</span> : null}
            </button>
            {showNotifications ? (
              <div className="absolute right-0 top-[calc(100%+0.5rem)] z-30 w-[min(24rem,88vw)] rounded-[24px] border border-[var(--border-soft)] bg-white p-3 shadow-xl">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Notifications</p>
                  <button type="button" className="text-xs font-semibold text-[var(--accent)]" onClick={markAllNotificationsRead}>Mark all read</button>
                </div>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="rounded-2xl border border-[var(--border-soft)] px-3 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{notification.title}</p>
                        {!notification.read ? <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">New</span> : null}
                      </div>
                      <p className="mt-1 text-xs text-[var(--text-secondary)]">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <button type="button" className="rounded-2xl border border-[var(--border-soft)] bg-white p-3 text-[var(--text-secondary)] transition hover:bg-[var(--accent-soft)]" onClick={toggleTheme}>
            <AppIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <div className="hidden items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white px-3 py-2 sm:flex">
            <Avatar initials={user?.initials ?? 'TG'} accent />
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{user?.name ?? 'Tarun Raj Gaur'}</p>
              <p className="text-xs text-[var(--text-secondary)]">{user?.role ?? 'Managing Director'}</p>
            </div>
          </div>
          <button type="button" className="rounded-2xl border border-[var(--border-soft)] bg-white p-3 text-[var(--text-secondary)] transition hover:bg-rose-50 hover:text-rose-600" onClick={logout}>
            <AppIcon name="logout" />
          </button>
        </div>
      </div>
    </header>
  )
}
