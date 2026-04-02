const toneMap = {
  Active: 'bg-emerald-100 text-emerald-700',
  'On track': 'bg-emerald-100 text-emerald-700',
  Paid: 'bg-emerald-100 text-emerald-700',
  success: 'bg-emerald-100 text-emerald-700',
  'In progress': 'bg-sky-100 text-sky-700',
  'In review': 'bg-indigo-100 text-indigo-700',
  Paused: 'bg-amber-100 text-amber-700',
  warning: 'bg-amber-100 text-amber-700',
  Inactive: 'bg-amber-100 text-amber-700',
  Refunded: 'bg-amber-100 text-amber-700',
  Pending: 'bg-amber-100 text-amber-700',
  Medium: 'bg-amber-100 text-amber-700',
  'At risk': 'bg-rose-100 text-rose-700',
  danger: 'bg-rose-100 text-rose-700',
  Blocked: 'bg-rose-100 text-rose-700',
  Chargeback: 'bg-rose-100 text-rose-700',
  High: 'bg-rose-100 text-rose-700',
  Done: 'bg-slate-200 text-slate-700',
  Completed: 'bg-emerald-100 text-emerald-700',
  Executed: 'bg-emerald-100 text-emerald-700',
  Open: 'bg-sky-100 text-sky-700',
  Low: 'bg-emerald-100 text-emerald-700',
}

export const StatusBadge = ({ value }) => {
  const classes = toneMap[value] ?? 'bg-slate-100 text-slate-700'

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}>{value}</span>
}
