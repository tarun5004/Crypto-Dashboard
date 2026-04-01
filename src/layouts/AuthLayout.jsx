// This auth layout provides a focused sign-in shell separate from the protected dashboard interface.
import { Outlet } from 'react-router-dom'
import { authHighlights } from '../data/authData.js'
import { Logo } from '../components/common/Logo.jsx'

export const AuthLayout = () => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-transparent lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex items-center justify-center px-6 py-10 lg:px-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
      <div className="hidden items-center justify-center px-10 py-10 lg:flex">
        <div className="panel-surface-strong grid-dots w-full max-w-2xl rounded-[40px] p-10">
          <Logo />
          <div className="mt-16 max-w-xl space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">Protected workspace</p>
            <h2 className="text-4xl font-semibold leading-tight text-white">One shell for analytics, commerce, and crypto operations.</h2>
            <p className="text-base leading-7 text-slate-400">The mock app keeps auth lightweight while still exercising nested routes, context providers, and reusable Tailwind components.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {authHighlights.map((highlight) => (
              <div key={highlight.label} className="rounded-[28px] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{highlight.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{highlight.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

