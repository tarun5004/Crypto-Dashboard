import { useContext } from 'react'
import { ThemeContext } from '../context/themeContextValue.js'

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeContextProvider')
  }

  return context
}
