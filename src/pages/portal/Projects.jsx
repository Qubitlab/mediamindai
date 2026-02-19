import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, updateDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { FolderKanban, CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function PortalProjects() {
  const { user } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      if (!user) return
      try {
        const snap = await getDocs(query(collection(db, 'projects'), where('clientUserId', '==', user.uid)))
        setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch {
        // may need index
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [user])

  async function refreshProjects() {
    if (!user) return
    const snap = await getDocs(query(collection(db, 'projects'), where('clientUserId', '==', user.uid)))
    setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  }

  async function handleApprove(projectId) {
    await updateDoc(doc(db, 'projects', projectId), {
      clientApproved: true,
      clientApprovedAt: new Date().toISOString(),
    })
    refreshProjects()
  }

  const statusIcon = {
    active: <Clock className="h-4 w-4 text-emerald-400" />,
    completed: <CheckCircle2 className="h-4 w-4 text-blue-400" />,
    paused: <AlertCircle className="h-4 w-4 text-orange-400" />,
  }

  const statusColor = {
    active: 'border-emerald-500/30 bg-emerald-500/5',
    completed: 'border-blue-500/30 bg-blue-500/5',
    paused: 'border-orange-500/30 bg-orange-500/5',
    draft: 'border-white/10 bg-white/[0.02]',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Your Projects</h1>
        <p className="text-sm text-white/50 mt-1">View project status and approve deliverables.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-white/40">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <FolderKanban className="h-10 w-10 text-white/20 mx-auto mb-3" />
          <div className="text-sm text-white/40">No projects assigned to your account yet.</div>
          <div className="text-xs text-white/30 mt-1">Contact your account manager for access.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(p => (
            <div key={p.id} className={`rounded-xl border p-6 ${statusColor[p.status] || statusColor.draft}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  {statusIcon[p.status] || <FolderKanban className="h-4 w-4 text-white/40" />}
                  <span className="text-xs uppercase tracking-wider text-white/50">{p.status}</span>
                </div>
                {p.clientApproved && (
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Approved
                  </span>
                )}
              </div>

              <h3 className="text-lg font-display font-semibold text-white mb-2">{p.name}</h3>
              {p.description && <p className="text-sm text-white/50 mb-4 leading-relaxed">{p.description}</p>}

              {p.createdAt && (
                <div className="text-xs text-white/30 mb-4">
                  Started {new Date(p.createdAt).toLocaleDateString()}
                </div>
              )}

              {!p.clientApproved && p.status === 'active' && (
                <button
                  onClick={() => handleApprove(p.id)}
                  className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" /> Approve Project
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
