import { useToast } from '../../hooks/useToast.js'

export const ToastContainer = () => {
  const { dismissToast, toasts } = useToast()

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[500] flex w-[min(92vw,24rem)] flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-[24px] border px-4 py-3 shadow-lg ${
            toast.tone === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : toast.tone === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border-sky-200 bg-sky-50 text-sky-700'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm font-medium">{toast.message}</p>
            <button type="button" className="text-xs font-semibold" onClick={() => dismissToast(toast.id)}>
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
