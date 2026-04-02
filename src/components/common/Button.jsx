import { AppIcon } from './AppIcon.jsx'

export const Button = ({ children, variant = 'primary', icon, className = '', ...props }) => {
  const variants = {
    primary: 'bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]',
    secondary: 'bg-white text-[var(--text-primary)] border border-[var(--border-soft)] hover:bg-[var(--accent-soft)]',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--accent-soft)]',
  }

  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`} {...props}>
      {icon ? <AppIcon name={icon} size={16} /> : null}
      <span>{children}</span>
    </button>
  )
}
