// This stat card component displays metric totals with trend context and iconography from page data files.
import { AppIcon } from './AppIcon.jsx'
import { SurfaceCard } from './SurfaceCard.jsx'
import { formatCompactNumber, formatCurrency, formatPercent } from '../../utils/formatters.js'

export const StatCard = ({ item, money = false, compact = false }) => {
  const value = money ? formatCurrency(item.value, compact) : formatCompactNumber(item.value)
  const toneClass = item.delta >= 0 ? 'text-emerald-300 bg-emerald-500/10' : 'text-rose-300 bg-rose-500/10'

  return (
    <SurfaceCard className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">{item.label}</p>
          <p className="mt-4 text-3xl font-semibold tracking-tight text-white">{value}</p>
          {item.subValue ? <p className="mt-1 text-sm text-slate-400">{item.subValue}</p> : null}
        </div>
        <div className="rounded-2xl bg-white/6 p-3 text-sky-300">
          <AppIcon name={item.icon} />
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{formatPercent(item.delta)}</span>
        <span className="text-sm text-slate-400">Since last month</span>
      </div>
    </SurfaceCard>
  )
}
