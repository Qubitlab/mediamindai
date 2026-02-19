import { useState, useEffect } from 'react'
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import {
  FolderKanban,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const statCards = [
  { label: 'Active Projects', key: 'projects', icon: FolderKanban, color: 'violet' },
  { label: 'Total Clients', key: 'clients', icon: Users, color: 'fuchsia' },
  { label: 'Invoices', key: 'invoices', icon: FileText, color: 'blue' },
  { label: 'Revenue', key: 'revenue', icon: DollarSign, color: 'emerald' },
]

const colorMap = {
  violet: 'from-violet-500 to-violet-600',
  fuchsia: 'from-fuchsia-500 to-fuchsia-600',
  blue: 'from-blue-500 to-blue-600',
  emerald: 'from-emerald-500 to-emerald-600',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, clients: 0, invoices: 0, revenue: '$0' })
  const [recentProjects, setRecentProjects] = useState([])
  const [recentInvoices, setRecentInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectSnap, clientSnap, invoiceSnap] = await Promise.all([
          getDocs(collection(db, 'projects')),
          getDocs(collection(db, 'clients')),
          getDocs(collection(db, 'invoices')),
        ])

        let totalRevenue = 0
        invoiceSnap.forEach(doc => {
          const data = doc.data()
          if (data.status === 'paid') totalRevenue += data.amount || 0
        })

        setStats({
          projects: projectSnap.size,
          clients: clientSnap.size,
          invoices: invoiceSnap.size,
          revenue: `$${totalRevenue.toLocaleString()}`,
        })

        const projQ = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(5))
        const projSnap = await getDocs(projQ)
        setRecentProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })))

        const invQ = query(collection(db, 'invoices'), orderBy('createdAt', 'desc'), limit(5))
        const invSnap = await getDocs(invQ)
        setRecentInvoices(invSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch {
        // Firestore may not have data yet
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const statusColor = {
    active: 'bg-emerald-500/20 text-emerald-300',
    completed: 'bg-blue-500/20 text-blue-300',
    paused: 'bg-orange-500/20 text-orange-300',
    paid: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-yellow-500/20 text-yellow-300',
    overdue: 'bg-red-500/20 text-red-300',
    draft: 'bg-white/10 text-white/60',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/50 mt-1">Overview of your business.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.key} className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${colorMap[card.color]} flex items-center justify-center`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-display font-bold text-white">
              {loading ? '—' : stats[card.key]}
            </div>
            <div className="text-xs text-white/50 mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent projects */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Recent Projects</h3>
            <Link to="/admin/projects" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-sm text-white/40">Loading...</div>
            ) : recentProjects.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No projects yet.{' '}
                <Link to="/admin/projects" className="text-violet-400 hover:text-violet-300">Create one</Link>
              </div>
            ) : (
              recentProjects.map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02]">
                  <div>
                    <div className="text-sm text-white">{p.name}</div>
                    <div className="text-xs text-white/40 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3 w-3" />
                      {p.clientName || 'No client'}
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor[p.status] || statusColor.draft}`}>
                    {p.status || 'draft'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent invoices */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Recent Invoices</h3>
            <Link to="/admin/invoices" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-sm text-white/40">Loading...</div>
            ) : recentInvoices.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">
                No invoices yet.{' '}
                <Link to="/admin/invoices" className="text-violet-400 hover:text-violet-300">Create one</Link>
              </div>
            ) : (
              recentInvoices.map(inv => (
                <div key={inv.id} className="flex items-center justify-between px-5 py-3 hover:bg-white/[0.02]">
                  <div>
                    <div className="text-sm text-white">#{inv.invoiceNumber || inv.id.slice(0, 6)}</div>
                    <div className="text-xs text-white/40 mt-0.5">{inv.clientName || 'No client'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">${(inv.amount || 0).toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor[inv.status] || statusColor.draft}`}>
                      {inv.status || 'draft'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
