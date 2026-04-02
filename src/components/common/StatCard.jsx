import { AppIcon } from './AppIcon.jsx'
import { SurfaceCard } from './SurfaceCard.jsx'
import { formatCompactNumber, formatCurrency, formatPercent } from '../../utils/formatters.js'

export const StatCard = ({ item, money = false, compact = false }) => {
  const shouldFormatAsCurrency = item.format === 'currency' || money
  const value = shouldFormatAsCurrency ? formatCurrency(item.value, compact) : formatCompactNumber(item.value)
  const toneClass = item.delta >= 0 ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'

  return (
    <SurfaceCard className="relative overflow-hidden">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[var(--text-secondary)]">{item.label}</p>
          <p className="mt-3 text-[1.7rem] font-semibold tracking-tight text-[var(--text-primary)]">{value}</p>
          {item.subValue ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.subValue}</p> : null}
        </div>
        <div className="rounded-2xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
          <AppIcon name={item.icon} />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{formatPercent(item.delta)}</span>
        <span className="text-sm text-[var(--text-secondary)]">Since last month</span>
      </div>
    </SurfaceCard>
  )
}
