import { Outlet } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext.js'
import { Navbar } from './Navbar.jsx'
import { Sidebar } from './Sidebar.jsx'

export const DashboardLayout = () => {
  const { dismissSystemBanner, systemBanner } = useAppContext()

  return (
    <div className="min-h-screen px-3 py-3 lg:px-4">
      <div className="mx-auto flex max-w-[1680px] gap-3">
        <Sidebar />
        <div className="min-w-0 flex-1 space-y-3 lg:pl-1">
          {systemBanner ? (
            <div className="rounded-[22px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <div className="flex items-center justify-between gap-3">
                <span>{systemBanner}</span>
                <button type="button" className="font-semibold" onClick={dismissSystemBanner}>Dismiss</button>
              </div>
            </div>
          ) : null}
          <Navbar />
          <main className="pb-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
