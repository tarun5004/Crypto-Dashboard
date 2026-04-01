// This status badge component maps shared workflow states to consistent colors across all tables and cards.
const toneMap = {
  Active: 'bg-emerald-500/15 text-emerald-300',
  'On track': 'bg-emerald-500/15 text-emerald-300',
  Paid: 'bg-emerald-500/15 text-emerald-300',
  success: 'bg-emerald-500/15 text-emerald-300',
  'In progress': 'bg-sky-500/15 text-sky-300',
  'In review': 'bg-indigo-500/15 text-indigo-300',
  Paused: 'bg-amber-500/15 text-amber-300',
  warning: 'bg-amber-500/15 text-amber-300',
  Inactive: 'bg-amber-500/15 text-amber-300',
  Refunded: 'bg-amber-500/15 text-amber-300',
  'At risk': 'bg-rose-500/15 text-rose-300',
  danger: 'bg-rose-500/15 text-rose-300',
  Blocked: 'bg-rose-500/15 text-rose-300',
  Chargeback: 'bg-rose-500/15 text-rose-300',
  Done: 'bg-white/10 text-slate-200',
}

export const StatusBadge = ({ value }) => {
  const classes = toneMap[value] ?? 'bg-white/10 text-slate-300'

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}>{value}</span>
}
