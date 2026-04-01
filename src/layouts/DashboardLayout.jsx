// This dashboard layout wraps all protected pages with the shared sidebar, navbar, and content spacing.
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { Sidebar } from './Sidebar.jsx'

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen px-4 py-4 lg:px-6">
      <div className="mx-auto flex max-w-[1700px] gap-4">
        <Sidebar />
        <div className="min-w-0 flex-1 space-y-4">
          <Navbar />
          <main className="pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
