// This line chart component renders lightweight SVG trends for dashboard performance widgets from array data.
export const LineChart = ({ series, strokeColor = '#38bdf8', fillColor = 'rgba(56, 189, 248, 0.14)', height = 240 }) => {
  const maxValue = Math.max(...series.map((point) => point.value))
  const minValue = Math.min(...series.map((point) => point.value))
  const range = maxValue - minValue || 1

  const coordinates = series.map((point, index) => {
    const x = (index / (series.length - 1 || 1)) * 100
    const y = 100 - ((point.value - minValue) / range) * 78 - 8
    return { ...point, x, y }
  })

  const linePath = coordinates.map((point) => `${point.x},${point.y}`).join(' ')
  const areaPath = `0,100 ${linePath} 100,100`

  return (
    <div className="space-y-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full" style={{ height }}>
        <defs>
          <linearGradient id="lineFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={fillColor.replace('0.14', '0.28')} />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path d={`M ${areaPath}`} fill="url(#lineFill)" />
        <polyline fill="none" stroke={strokeColor} strokeWidth="2" points={linePath} />
        {coordinates.map((point) => (
          <circle key={point.label} cx={point.x} cy={point.y} r="1.8" fill={strokeColor} />
        ))}
      </svg>
      <div className="grid grid-cols-6 gap-2 text-xs text-slate-500 md:grid-cols-12">
        {series.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  )
}
