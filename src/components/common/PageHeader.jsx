export const PageHeader = ({ eyebrow, title, description, actions }) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-1.5">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{eyebrow}</p> : null}
        <div>
          <h1 className="text-[1.9rem] font-semibold tracking-tight text-[var(--text-primary)]">{title}</h1>
          <p className="mt-1 max-w-2xl text-[15px] leading-6 text-[var(--text-secondary)]">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  )
}
