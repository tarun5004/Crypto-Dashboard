export const DonutChart = ({ segments, centerLabel = 'Portfolio mix' }) => {
  const gradient = segments
    .map((segment, index) => {
      const start = segments.slice(0, index).reduce((sum, item) => sum + item.value, 0)
      return `${segment.color} ${start}% ${start + segment.value}%`
    })
    .join(', ')

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-center text-xs font-medium text-[var(--text-secondary)] shadow-sm">
          {centerLabel}
        </div>
      </div>
      <div className="flex-1 space-y-3">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-sm text-[var(--text-primary)]">{segment.label}</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
