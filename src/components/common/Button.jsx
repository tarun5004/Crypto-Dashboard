// This button component provides one reusable action style for page headers, forms, and cards.
import { AppIcon } from './AppIcon.jsx'

export const Button = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-sky-500 text-slate-950 hover:bg-sky-400',
    secondary: 'bg-white/6 text-white hover:bg-white/10',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/6',
  }

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon ? <AppIcon name={icon} size={16} /> : null}
      <span>{children}</span>
    </button>
  )
}

