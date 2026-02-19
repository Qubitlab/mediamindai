import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useAuth } from '../contexts/AuthContext'
import { Search, Bell, Menu } from 'lucide-react'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { userProfile } = useAuth()

  return (
    <div className="min-h-screen bg-brand-black text-white flex">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>

      {/* Sidebar - mobile */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:hidden transform transition-transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-black/80 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileOpen(true)} className="lg:hidden text-white/70 hover:text-white">
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  className="w-64 rounded-lg border border-white/10 bg-white/[0.05] py-2 pl-10 pr-4 text-sm text-white/90 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="h-8 w-8 rounded-lg border border-white/10 bg-white/[0.05] flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.1] transition-colors">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-xs font-bold">
                  {(userProfile?.name || 'U')[0].toUpperCase()}
                </div>
                <span className="hidden sm:block text-sm text-white/80">{userProfile?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
