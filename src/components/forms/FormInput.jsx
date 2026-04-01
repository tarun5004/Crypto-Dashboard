// This form input component standardizes labeled text inputs and validation output for React Hook Form usage.
export const FormInput = ({ label, name, register, rules, error, className = '', ...props }) => {
  const registration = register ? register(name, rules) : {}

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <input
        className={`w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 ${className}`}
        {...registration}
        {...props}
      />
      {error ? <p className="text-xs text-rose-300">{error.message}</p> : null}
    </label>
  )
}
