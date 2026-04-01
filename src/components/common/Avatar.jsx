// This avatar component renders reusable initials-based profile badges for tables, nav, and profile cards.
export const Avatar = ({ initials, size = 'md', accent = false }) => {
  const sizeMap = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
    xl: 'h-20 w-20 text-2xl',
  }

  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-white/10 font-semibold ${sizeMap[size]} ${accent ? 'bg-sky-500/20 text-sky-300' : 'bg-white/6 text-white'}`}
    >
      {initials}
    </div>
  )
}

