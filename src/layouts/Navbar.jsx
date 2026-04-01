// This navbar component hosts global actions like search, notifications, theme switching, and user session controls.
import { quickActions } from '../data/shellData.js'
import { useAppContext } from '../hooks/useAppContext.js'
import { useAuth } from '../hooks/useAuth.js'
import { useTheme } from '../hooks/useTheme.js'
import { Avatar } from '../components/common/Avatar.jsx'
import { AppIcon } from '../components/common/AppIcon.jsx'
import { Button } from '../components/common/Button.jsx'

export const Navbar = () => {
  const { notifications, markAllNotificationsRead, setSidebarOpen } = useAppContext()
  const { logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <header className="panel-surface sticky top-4 z-20 rounded-[28px] px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08] lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <AppIcon name="menu" />
          </button>
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:min-w-[320px]">
            <AppIcon name="search" className="text-slate-500" />
            <input type="text" placeholder="Search dashboards, clients, or reports..." className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {quickActions.map((action) => (
            <Button key={action.label} variant={action.type === 'primary' ? 'primary' : 'secondary'}>
              {action.label}
            </Button>
          ))}
          <button
            type="button"
            className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]"
            onClick={markAllNotificationsRead}
          >
            <AppIcon name="bell" />
            {unreadCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sky-400 px-1 text-[11px] font-semibold text-slate-950">
                {unreadCount}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-white/[0.08]"
            onClick={toggleTheme}
          >
            <AppIcon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <div className="hidden h-10 w-px bg-white/10 sm:block" />
          <div className="hidden items-center gap-3 rounded-2xl bg-white/[0.04] px-3 py-2 sm:flex">
            <Avatar initials={user?.initials ?? 'DU'} accent />
            <div>
              <p className="text-sm font-semibold text-white">{user?.name ?? 'Demo User'}</p>
              <p className="text-xs text-slate-400">{user?.role ?? 'Workspace member'}</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-slate-300 transition hover:bg-rose-500/15 hover:text-rose-200"
            onClick={logout}
          >
            <AppIcon name="logout" />
          </button>
        </div>
      </div>
    </header>
  )
}
