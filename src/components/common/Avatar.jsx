export const Avatar = ({ initials, size = 'md', accent = false }) => {
  const sizeMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-18 w-18 text-xl',
  }

  return (
    <div className={`flex items-center justify-center rounded-2xl border border-[var(--border-soft)] font-semibold ${sizeMap[size]} ${accent ? 'bg-[var(--accent-soft)] text-[var(--accent)]' : 'bg-white text-[var(--text-primary)]'}`}>
      {initials}
    </div>
  )
}
