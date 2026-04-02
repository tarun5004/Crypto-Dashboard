import { Button } from './Button.jsx'

export const EmptyState = ({ title, description, actionLabel, onAction }) => {
  return (
    <div className="rounded-[24px] border border-dashed border-[var(--border-soft)] bg-white/50 p-6 text-center">
      <p className="text-lg font-semibold text-[var(--text-primary)]">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">{description}</p>
      {actionLabel ? (
        <div className="mt-4">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  )
}
