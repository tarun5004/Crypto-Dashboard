export const FormSelect = ({ label, name, register, rules, options, error, className = '', ...props }) => {
  const registration = register ? register(name, rules) : {}

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
      <select className={`w-full rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--accent)] ${className}`} {...registration} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {error ? <p className="text-xs text-[var(--danger)]">{error.message}</p> : null}
    </label>
  )
}
