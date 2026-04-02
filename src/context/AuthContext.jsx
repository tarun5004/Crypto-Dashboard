import { useState } from 'react'
import { defaultUser, signInDefaults } from '../data/authData.js'
import { AuthContext } from './authContextValue.js'

const AUTH_STORAGE_KEY = 'gaur_session'

const getStoredUser = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
  return storedUser ? JSON.parse(storedUser) : null
}

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => getStoredUser())

  const login = ({ email, password }) => {
    const nextUser = {
      ...defaultUser,
      email: email || signInDefaults.email,
      sessionLabel: password ? 'Mock session active' : 'Demo access',
    }

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser))
    setUser(nextUser)
    return nextUser
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>{children}</AuthContext.Provider>
}
