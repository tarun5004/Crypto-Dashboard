// This donut chart component turns segment percentages into a reusable conic-gradient summary visualization.
export const DonutChart = ({ segments }) => {
  const gradient = segments
    .map((segment, index) => {
      const start = segments.slice(0, index).reduce((sum, item) => sum + item.value, 0)
      return `${segment.color} ${start}% ${start + segment.value}%`
    })
    .join(', ')

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
      <div className="relative mx-auto flex h-44 w-44 items-center justify-center rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-950/90 text-center text-xs text-slate-300">
          Mixed traffic
        </div>
      </div>
      <div className="flex-1 space-y-3">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-sm text-slate-200">{segment.label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{segment.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
