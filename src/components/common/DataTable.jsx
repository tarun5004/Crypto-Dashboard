// This table component renders reusable dashboard tables from typed column metadata and mock data rows.
import { Avatar } from './Avatar.jsx'
import { StatusBadge } from './StatusBadge.jsx'
import { formatCompactNumber, formatCurrency, formatPercent } from '../../utils/formatters.js'

const renderCell = (column, value) => {
  if (column.type === 'identity') {
    return (
      <div className="flex items-center gap-3">
        <Avatar initials={value.avatar} size="sm" accent />
        <div>
          <p className="text-sm font-semibold text-white">{value.title}</p>
          <p className="text-xs text-slate-400">{value.subtitle}</p>
        </div>
      </div>
    )
  }

  if (column.type === 'stacked') {
    return (
      <div>
        <p className="text-sm font-medium text-slate-100">{value.primary}</p>
        <p className="text-xs text-slate-400">{value.secondary}</p>
      </div>
    )
  }

  if (column.type === 'status') {
    return <StatusBadge value={value} />
  }

  if (column.type === 'currency') {
    return <span className="text-sm text-slate-100">{formatCurrency(value)}</span>
  }

  if (column.type === 'currencyCompact') {
    return <span className="text-sm text-slate-100">{formatCurrency(value, true)}</span>
  }

  if (column.type === 'number') {
    return <span className="text-sm text-slate-100">{formatCompactNumber(value)}</span>
  }

  if (column.type === 'change') {
    return <span className={`text-sm font-semibold ${value >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{formatPercent(value)}</span>
  }

  if (column.type === 'progress') {
    return (
      <div className="w-32">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
          <span>{value}%</span>
          <span>Complete</span>
        </div>
        <div className="h-2 rounded-full bg-white/6">
          <div className="h-2 rounded-full bg-sky-400" style={{ width: `${value}%` }} />
        </div>
      </div>
    )
  }

  return <span className="text-sm text-slate-100">{value}</span>
}

export const DataTable = ({ columns, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.id ?? index}-${columns[0].key}`}>
              {columns.map((column) => (
                <td key={column.key} className="rounded-2xl border-y border-white/6 bg-white/[0.03] px-4 py-3 align-middle first:rounded-l-2xl first:border-l first:border-white/6 last:rounded-r-2xl last:border-r last:border-white/6">
                  {renderCell(column, row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

