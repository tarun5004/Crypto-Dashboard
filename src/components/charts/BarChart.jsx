export const BarChart = ({ series, color = 'bg-[var(--accent)]' }) => {
  const maxValue = Math.max(...series.map((point) => point.value))

  return (
    <div className="space-y-4">
      <div className="flex h-52 items-end gap-2 sm:gap-3">
        {series.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-44 w-full items-end rounded-t-3xl bg-[var(--accent-soft)] px-1.5 pb-1">
              <div className={`w-full rounded-t-2xl ${color}`} style={{ height: `${(point.value / maxValue) * 100}%` }} />
            </div>
            <span className="text-[11px] text-[var(--text-secondary)]">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
