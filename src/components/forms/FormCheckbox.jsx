// This checkbox field component keeps boolean preference inputs aligned with the shared form system.
export const FormCheckbox = ({ label, description, name, register }) => {
  const registration = register ? register(name) : {}

  return (
    <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-white/15 bg-slate-950 text-sky-400" {...registration} />
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </label>
  )
}

