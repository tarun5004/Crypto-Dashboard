import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { sidebarMenu } from '../data/sidebarMenu.js'
import { useAppContext } from '../hooks/useAppContext.js'
import { Logo } from '../components/common/Logo.jsx'
import { Avatar } from '../components/common/Avatar.jsx'
import { AppIcon } from '../components/common/AppIcon.jsx'
import { userQuickProfile } from '../data/shellData.js'

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext()
  const [collapsed, setCollapsed] = useState(false)

  const sidebarWidth = useMemo(() => (collapsed ? 'lg:w-[96px]' : 'lg:w-[280px]'), [collapsed])

  const handleClose = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <div className={`fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm transition lg:hidden ${sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} onClick={handleClose} />
      <aside className={`panel-surface-strong fixed inset-y-3 left-3 z-40 flex w-[290px] flex-col rounded-[28px] px-4 py-5 transition duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'} ${sidebarWidth} lg:sticky lg:top-3 lg:h-[calc(100vh-1.5rem)] lg:translate-x-0`}>
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <div className="flex items-center gap-2">
            <button type="button" className="hidden rounded-2xl border border-[var(--border-soft)] p-2 text-[var(--text-secondary)] lg:inline-flex" onClick={() => setCollapsed((currentValue) => !currentValue)}>
              <AppIcon name="menu" />
            </button>
            <button type="button" className="rounded-2xl border border-[var(--border-soft)] p-2 text-[var(--text-secondary)] lg:hidden" onClick={handleClose}>
              <AppIcon name="menu" />
            </button>
          </div>
        </div>

        {!collapsed ? (
          <div className="mt-5 flex items-center gap-3 rounded-[22px] bg-[var(--accent-soft)]/80 p-3">
            <Avatar initials={userQuickProfile.initials} size="lg" accent />
            <div>
              <p className="font-semibold text-[var(--text-primary)]">{userQuickProfile.name}</p>
              <p className="text-sm text-[var(--text-secondary)]">{userQuickProfile.role}</p>
            </div>
          </div>
        ) : null}

        <nav className="mt-6 flex-1 space-y-5 overflow-y-auto pr-1">
          {sidebarMenu.map((group) => (
            <div key={group.groupLabel}>
              {!collapsed ? <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">{group.groupLabel}</p> : null}
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleClose}
                    className={({ isActive }) => `group flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:bg-white hover:text-[var(--text-primary)]'}`}
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`rounded-xl p-2 transition ${isActive ? 'bg-white text-[var(--accent)]' : 'bg-white/60 text-[var(--text-secondary)] group-hover:text-[var(--accent)]'}`}>
                          <AppIcon name={item.icon} size={16} />
                        </span>
                        {!collapsed ? <span>{item.label}</span> : null}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {!collapsed ? (
          <div className="rounded-[22px] bg-gradient-to-br from-[var(--accent-soft)] to-white p-4">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Weekly investor snapshot</p>
            <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">Investor inflows, SIP growth, and market watchlist changes are ready for review.</p>
          </div>
        ) : null}
      </aside>
    </>
  )
}
