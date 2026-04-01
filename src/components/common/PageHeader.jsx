// This page header component renders a reusable title block with optional actions on every route-level page.
export const PageHeader = ({ eyebrow, title, description, actions }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">{eyebrow}</p> : null}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{description}</p>
        </div>
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}
