import { AppContextProvider } from './AppContext.jsx'
import { AuthContextProvider } from './AuthContext.jsx'
import { ThemeContextProvider } from './ThemeContext.jsx'

export const AppProviders = ({ children }) => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}
