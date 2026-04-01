// This protected route wrapper redirects unauthenticated visitors to the mock sign-in screen.
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace state={{ from: location }} />
  }

  return <Outlet />
}

