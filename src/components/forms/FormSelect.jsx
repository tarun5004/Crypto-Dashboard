// This select component keeps dropdown styling and validation messaging consistent across settings and trade forms.
export const FormSelect = ({ label, name, register, rules, options, error, className = '', ...props }) => {
  const registration = register ? register(name, rules) : {}

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <select
        className={`w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition focus:border-sky-400/50 ${className}`}
        {...registration}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-rose-300">{error.message}</p> : null}
    </label>
  )
}

