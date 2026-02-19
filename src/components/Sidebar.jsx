import { NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  Building2,
} from 'lucide-react'

const adminNav = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Clients', to: '/admin/clients', icon: Users },
  { label: 'Invoices', to: '/admin/invoices', icon: FileText },
]

const clientNav = [
  { label: 'Dashboard', to: '/portal', icon: LayoutDashboard },
  { label: 'Projects', to: '/portal/projects', icon: FolderKanban },
  { label: 'Invoices', to: '/portal/invoices', icon: FileText },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { userProfile } = useAuth()
  const navigate = useNavigate()
  const isAdmin = userProfile?.role === 'admin'
  const nav = isAdmin ? adminNav : clientNav

  async function handleSignOut() {
    await signOut(auth)
    navigate('/')
  }

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} shrink-0 h-screen sticky top-0 flex flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300`}>
      {/* Workspace header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {isAdmin ? 'Media Minds AI' : userProfile?.companyName || 'Client Portal'}
              </div>
              <div className="text-xs text-white/50">
                {isAdmin ? 'Admin' : 'Client'}
              </div>
            </div>
          )}
          {!collapsed && (
            <button onClick={onToggle} className="text-white/50 hover:text-white">
              <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {nav.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin' || item.to === '/portal'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-white bg-white/[0.1] ring-1 ring-white/15'
                  : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              }`
            }
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/10 space-y-1">
        {isAdmin && (
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive ? 'text-white bg-white/[0.1]' : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              }`
            }
          >
            <Settings className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
        )}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  )
}
