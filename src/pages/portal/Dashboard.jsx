import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { FolderKanban, FileText, Clock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PortalDashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!user) return
      try {
        const [projSnap, invSnap] = await Promise.all([
          getDocs(query(collection(db, 'projects'), where('clientUserId', '==', user.uid))),
          getDocs(query(collection(db, 'invoices'), where('clientUserId', '==', user.uid))),
        ])
        setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })))
        setInvoices(invSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch {
        // may not have indexed queries yet
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const activeProjects = projects.filter(p => p.status === 'active').length
  const pendingInvoices = invoices.filter(i => i.status === 'pending').length
  const totalOwed = invoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + (i.amount || 0), 0)

  const statusColor = {
    active: 'bg-emerald-500/20 text-emerald-300',
    completed: 'bg-blue-500/20 text-blue-300',
    paused: 'bg-orange-500/20 text-orange-300',
    draft: 'bg-white/10 text-white/60',
    paid: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-yellow-500/20 text-yellow-300',
    overdue: 'bg-red-500/20 text-red-300',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Welcome Back</h1>
        <p className="text-sm text-white/50 mt-1">Here&apos;s an overview of your projects and invoices.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3 mb-3">
            <FolderKanban className="h-5 w-5 text-violet-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider">Active Projects</span>
          </div>
          <div className="text-3xl font-display font-bold text-white">{loading ? '—' : activeProjects}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3 mb-3">
            <FileText className="h-5 w-5 text-yellow-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider">Pending Invoices</span>
          </div>
          <div className="text-3xl font-display font-bold text-white">{loading ? '—' : pendingInvoices}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-5 w-5 text-emerald-400" />
            <span className="text-xs text-white/50 uppercase tracking-wider">Amount Due</span>
          </div>
          <div className="text-3xl font-display font-bold text-white">{loading ? '—' : `$${totalOwed.toLocaleString()}`}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04]">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Your Projects</h3>
            <Link to="/portal/projects" className="text-xs text-violet-400 hover:text-violet-300">View all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-sm text-white/40">Loading...</div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">No projects assigned yet.</div>
            ) : (
              projects.slice(0, 5).map(p => (
                <div key={p.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <FolderKanban className="h-4 w-4 text-white/30" />
                    <span className="text-sm text-white">{p.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColor[p.status] || statusColor.draft}`}>
                    {p.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Invoices */}
        <div className="rounded-xl border border-white/10 bg-white/[0.04]">
          <div className="flex items-center justify-between p-5 border-b border-white/10">
            <h3 className="text-sm font-semibold text-white">Recent Invoices</h3>
            <Link to="/portal/invoices" className="text-xs text-violet-400 hover:text-violet-300">View all</Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              <div className="p-8 text-center text-sm text-white/40">Loading...</div>
            ) : invoices.length === 0 ? (
              <div className="p-8 text-center text-sm text-white/40">No invoices yet.</div>
            ) : (
              invoices.slice(0, 5).map(inv => (
                <div key={inv.id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <div className="text-sm text-white">{inv.invoiceNumber || inv.id.slice(0, 8)}</div>
                    <div className="text-xs text-white/40">{inv.projectName || ''}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">${(inv.amount || 0).toLocaleString()}</div>
                    <div className="flex items-center gap-1 justify-end">
                      {inv.status === 'paid' && <CheckCircle2 className="h-3 w-3 text-emerald-400" />}
                      <span className={`text-xs ${inv.status === 'paid' ? 'text-emerald-400' : inv.status === 'overdue' ? 'text-red-400' : 'text-yellow-400'}`}>
                        {inv.status}
                      </span>
                    </div>
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
