import { createContext, useState } from 'react'
import { initialNotifications } from '../data/shellData.js'

export const AppContext = createContext(null)

export const AppContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCryptoPair, setSelectedCryptoPair] = useState('BTC/USD')
  const [notifications, setNotifications] = useState(initialNotifications)

  const markAllNotificationsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        selectedCryptoPair,
        setSelectedCryptoPair,
        notifications,
        setNotifications,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
