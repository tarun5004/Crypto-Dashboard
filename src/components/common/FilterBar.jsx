import { AppIcon } from './AppIcon.jsx'
import { Button } from './Button.jsx'

export const FilterBar = ({ query, onQueryChange, filterValue, onFilterChange, filterOptions = [], addLabel, onAdd, resultCount }) => {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-[var(--border-soft)] bg-white/65 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3">
          <AppIcon name="search" className="text-[var(--text-secondary)]" />
          <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search records..." className="w-full bg-transparent text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-secondary)]" />
        </label>
        {filterOptions.length ? (
          <select value={filterValue} onChange={(event) => onFilterChange(event.target.value)} className="rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3 text-sm text-[var(--text-primary)] outline-none">
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
      </div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-[var(--text-secondary)]">{resultCount} records</span>
        {addLabel ? <Button onClick={onAdd}>{addLabel}</Button> : null}
      </div>
    </div>
  )
}
