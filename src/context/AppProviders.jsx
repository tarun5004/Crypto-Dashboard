import { AppContextProvider } from './AppContext.jsx'
import { AuthContextProvider } from './AuthContext.jsx'
import { ThemeContextProvider } from './ThemeContext.jsx'
import { ToastProvider } from './ToastContext.jsx'

export const AppProviders = ({ children }) => {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <ToastProvider>
          <AppContextProvider>{children}</AppContextProvider>
        </ToastProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}
