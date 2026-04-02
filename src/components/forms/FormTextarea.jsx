export const FormTextarea = ({ label, name, register, rules, error, className = '', ...props }) => {
  const registration = register ? register(name, rules) : {}

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
      <textarea className={`min-h-28 w-full rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] ${className}`} {...registration} {...props} />
      {error ? <p className="text-xs text-[var(--danger)]">{error.message}</p> : null}
    </label>
  )
}
