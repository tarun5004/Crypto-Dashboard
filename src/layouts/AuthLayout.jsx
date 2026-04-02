import { Outlet } from 'react-router-dom'
import { authHighlights } from '../data/authData.js'
import { Logo } from '../components/common/Logo.jsx'

export const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_0.95fr]">
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <div className="hidden items-center justify-center px-6 py-8 lg:flex">
        <div className="panel-surface-strong grid-dots w-full max-w-2xl rounded-[36px] p-8">
          <Logo />
          <div className="mt-12 max-w-xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Private wealth workspace</p>
            <h2 className="text-4xl font-semibold leading-tight text-[var(--text-primary)]">A calmer, India-first shell for investor operations.</h2>
            <p className="text-base leading-7 text-[var(--text-secondary)]">Track client relationships, market activity, plans, and tasks through one responsive wealth dashboard for Gaur Investor Ltd.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {authHighlights.map((highlight) => (
              <div key={highlight.label} className="rounded-[24px] border border-[var(--border-soft)] bg-white p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{highlight.label}</p>
                <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
