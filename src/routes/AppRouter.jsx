// This router composes auth, protected dashboard routes, and default redirects from the route configuration map.
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout.jsx'
import { AuthLayout } from '../layouts/AuthLayout.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { dashboardRoutes, managementRoutes } from './routeConfig.js'
import { ProtectedRoute } from './ProtectedRoute.jsx'
import { SignInPage } from '../pages/auth/SignInPage.jsx'
import { AnalyticsPage } from '../pages/dashboard/AnalyticsPage.jsx'
import { EcommercePage } from '../pages/dashboard/EcommercePage.jsx'
import { CryptoPage } from '../pages/dashboard/CryptoPage.jsx'
import { SettingsPage } from '../pages/management/SettingsPage.jsx'
import { ClientsPage } from '../pages/management/ClientsPage.jsx'
import { OrdersPage } from '../pages/management/OrdersPage.jsx'
import { PricingPage } from '../pages/management/PricingPage.jsx'
import { ProfilePage } from '../pages/management/ProfilePage.jsx'
import { TasksPage } from '../pages/management/TasksPage.jsx'

const routeRegistry = {
  analytics: AnalyticsPage,
  ecommerce: EcommercePage,
  crypto: CryptoPage,
  settings: SettingsPage,
  clients: ClientsPage,
  orders: OrdersPage,
  pricing: PricingPage,
  profile: ProfilePage,
  tasks: TasksPage,
}

const HomeRedirect = () => {
  const { isAuthenticated } = useAuth()
  return <Navigate to={isAuthenticated ? '/dashboard/analytics' : '/auth/sign-in'} replace />
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Navigate to="analytics" replace />} />
            {[...dashboardRoutes, ...managementRoutes].map((route) => {
              const RouteComponent = routeRegistry[route.key]
              return <Route key={route.key} path={route.path} element={<RouteComponent />} />
            })}
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

