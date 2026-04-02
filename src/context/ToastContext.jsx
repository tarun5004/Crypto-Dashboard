import { createContext, useCallback, useMemo, useState } from 'react'
import { createId } from '../utils/ids.js'

export const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    (tone, message) => {
      const id = createId('toast')
      setToasts((currentToasts) => [...currentToasts, { id, tone, message }])
      window.setTimeout(() => dismissToast(id), 3200)
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({
      toasts,
      dismissToast,
      success: (message) => addToast('success', message),
      error: (message) => addToast('error', message),
      info: (message) => addToast('info', message),
    }),
    [addToast, dismissToast, toasts],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
