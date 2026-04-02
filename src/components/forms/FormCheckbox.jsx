export const FormCheckbox = ({ label, description, name, register }) => {
  const registration = register ? register(name) : {}

  return (
    <label className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-white p-4">
      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-[var(--border-soft)] bg-white text-[var(--accent)]" {...registration} />
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
        <p className="mt-1 text-xs leading-5 text-[var(--text-secondary)]">{description}</p>
      </div>
    </label>
  )
}
