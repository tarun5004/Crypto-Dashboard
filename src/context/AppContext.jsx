import { useState } from 'react'
import { initialNotifications } from '../data/shellData.js'
import { useLocalStorageCollection } from '../hooks/useLocalStorageCollection.js'
import { COLLECTION_KEYS, initializeSchema } from '../utils/schemaVersion.js'
import { AppContext } from './appContextValue.js'

const schemaState = initializeSchema()

export const AppContextProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCryptoPair, setSelectedCryptoPair] = useState('NIFTY 50 / INR')
  const [systemBanner, setSystemBanner] = useState(schemaState.message)
  const notificationsCollection = useLocalStorageCollection(COLLECTION_KEYS.notifications, initialNotifications, 'notification')

  const markAllNotificationsRead = () => {
    notificationsCollection.setItems((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const value = {
    sidebarOpen,
    setSidebarOpen,
    selectedCryptoPair,
    setSelectedCryptoPair,
    notifications: notificationsCollection.items,
    setNotifications: notificationsCollection.setItems,
    createNotification: notificationsCollection.createItem,
    updateNotification: notificationsCollection.updateItem,
    deleteNotification: notificationsCollection.deleteItem,
    markAllNotificationsRead,
    systemBanner,
    dismissSystemBanner: () => setSystemBanner(''),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
