// This logo component keeps the product branding consistent between the sidebar and auth layout.
import { appBrand } from '../../data/shellData.js'

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/20 text-lg font-semibold text-sky-300 ring-1 ring-sky-400/20">
        DS
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-white/90">{appBrand.name}</p>
          <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            {appBrand.badge}
          </span>
        </div>
        <p className="text-xs text-slate-400">{appBrand.tagLine}</p>
      </div>
    </div>
  )
}

