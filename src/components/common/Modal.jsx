import { createPortal } from 'react-dom'

export const Modal = ({ isOpen, title, description, onClose, children, footer }) => {
  if (!isOpen) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-[400] flex items-end justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div className="panel-surface-strong w-full max-w-2xl rounded-[28px] p-5 shadow-2xl sm:p-6" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
            {description ? <p className="mt-1 text-sm text-[var(--text-secondary)]">{description}</p> : null}
          </div>
          <button type="button" className="rounded-2xl border border-[var(--border-soft)] px-3 py-2 text-sm text-[var(--text-secondary)]" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="mt-5">{children}</div>
        {footer ? <div className="mt-5">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}
