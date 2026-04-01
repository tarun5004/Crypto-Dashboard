// This sidebar component renders grouped navigation from mock menu data and handles desktop plus mobile shell behavior.
import { NavLink } from 'react-router-dom'
import { sidebarMenu } from '../data/sidebarMenu.js'
import { useAppContext } from '../hooks/useAppContext.js'
import { Logo } from '../components/common/Logo.jsx'
import { Avatar } from '../components/common/Avatar.jsx'
import { AppIcon } from '../components/common/AppIcon.jsx'
import { userQuickProfile } from '../data/shellData.js'

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useAppContext()

  const handleClose = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/65 backdrop-blur-sm transition lg:hidden ${sidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={handleClose}
      />
      <aside
        className={`panel-surface-strong fixed inset-y-4 left-4 z-40 flex w-[288px] flex-col rounded-[32px] px-5 py-6 transition duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-[125%]'} lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]`}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            className="rounded-2xl border border-white/10 p-2 text-slate-300 transition hover:bg-white/6 lg:hidden"
            onClick={handleClose}
          >
            <AppIcon name="menu" />
          </button>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-[24px] bg-white/[0.04] p-4">
          <Avatar initials={userQuickProfile.initials} size="lg" accent />
          <div>
            <p className="font-semibold text-white">{userQuickProfile.name}</p>
            <p className="text-sm text-slate-400">{userQuickProfile.role}</p>
          </div>
        </div>

        <nav className="mt-8 flex-1 space-y-6 overflow-y-auto pr-1">
          {sidebarMenu.map((group) => (
            <div key={group.groupLabel}>
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{group.groupLabel}</p>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={handleClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-sky-500/15 text-sky-300' : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'}`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`rounded-xl p-2 transition ${isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-white/[0.04] text-slate-400 group-hover:text-white'}`}>
                          <AppIcon name={item.icon} size={16} />
                        </span>
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="rounded-[24px] bg-gradient-to-br from-sky-500/20 to-indigo-500/10 p-5">
          <p className="text-sm font-semibold text-white">Weekly sales report</p>
          <p className="mt-2 text-xs leading-5 text-slate-300">Your refreshed dashboard snapshot is ready with the latest revenue and client movement.</p>
          <button type="button" className="mt-4 w-full rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15">
            Download report
          </button>
        </div>
      </aside>
    </>
  )
}

