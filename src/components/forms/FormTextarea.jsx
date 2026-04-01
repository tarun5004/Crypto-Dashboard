// This textarea component supports reusable multi-line form fields with the same validation behavior as other inputs.
export const FormTextarea = ({ label, name, register, rules, error, className = '', ...props }) => {
  const registration = register ? register(name, rules) : {}

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-300">{label}</span>
      <textarea
        className={`min-h-28 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50 ${className}`}
        {...registration}
        {...props}
      />
      {error ? <p className="text-xs text-rose-300">{error.message}</p> : null}
    </label>
  )
}
