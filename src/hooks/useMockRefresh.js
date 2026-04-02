import { useEffect } from 'react'

export const useMockRefresh = (items, setItems, intervalMs = 5000) => {
  useEffect(() => {
    const interval = window.setInterval(() => {
      setItems((currentItems) =>
        currentItems.map((item) => {
          const price = Number(item.price)
          if (Number.isNaN(price)) {
            return item
          }

          const movement = 1 + (Math.random() * 0.006 - 0.003)
          const nextPrice = Number((price * movement).toFixed(2))
          const nextChange = Number((item.change + (Math.random() * 0.8 - 0.4)).toFixed(2))

          return {
            ...item,
            price: nextPrice,
            change: nextChange,
          }
        }),
      )
    }, intervalMs)

    return () => window.clearInterval(interval)
  }, [intervalMs, setItems])
}
