import { appBrand } from '../../data/shellData.js'

export const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-lg font-semibold text-[var(--accent)] ring-1 ring-[var(--border-soft)]">
        GI
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold tracking-[0.12em] text-[var(--text-primary)]">{appBrand.name}</p>
          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
            {appBrand.badge}
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">{appBrand.tagLine}</p>
      </div>
    </div>
  )
}
