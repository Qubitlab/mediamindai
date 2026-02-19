import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { Plus, Search, MoreVertical, X, FolderKanban } from 'lucide-react'

const statusOptions = ['active', 'completed', 'paused', 'draft']

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ name: '', description: '', clientId: '', status: 'active' })
  const [menuOpen, setMenuOpen] = useState(null)

  async function fetchData() {
    try {
      const [projSnap, clientSnap] = await Promise.all([
        getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'clients')),
      ])
      setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setClients(clientSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      // empty collections are fine
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  function openCreate() {
    setEditing(null)
    setForm({ name: '', description: '', clientId: '', status: 'active' })
    setShowModal(true)
  }

  function openEdit(project) {
    setEditing(project)
    setForm({ name: project.name, description: project.description || '', clientId: project.clientId || '', status: project.status || 'active' })
    setShowModal(true)
    setMenuOpen(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const client = clients.find(c => c.id === form.clientId)
    const data = {
      ...form,
      clientName: client?.name || '',
      updatedAt: new Date().toISOString(),
    }

    if (editing) {
      await updateDoc(doc(db, 'projects', editing.id), data)
    } else {
      data.createdAt = new Date().toISOString()
      await addDoc(collection(db, 'projects'), data)
    }

    setShowModal(false)
    fetchData()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this project?')) return
    await deleteDoc(doc(db, 'projects', id))
    setMenuOpen(null)
    fetchData()
  }

  const filtered = projects.filter(p =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColor = {
    active: 'bg-emerald-500/20 text-emerald-300',
    completed: 'bg-blue-500/20 text-blue-300',
    paused: 'bg-orange-500/20 text-orange-300',
    draft: 'bg-white/10 text-white/60',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Projects</h1>
          <p className="text-sm text-white/50 mt-1">Manage all client projects.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          placeholder="Search projects..."
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-white/40">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban className="h-10 w-10 text-white/20 mx-auto mb-3" />
            <div className="text-sm text-white/40">No projects found.</div>
            <button onClick={openCreate} className="mt-3 text-sm text-violet-400 hover:text-violet-300">Create your first project</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Created</th>
                  <th className="px-5 py-3 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="text-white font-medium">{p.name}</div>
                      {p.description && <div className="text-xs text-white/40 mt-0.5 truncate max-w-xs">{p.description}</div>}
                    </td>
                    <td className="px-5 py-4 text-white/60">{p.clientName || '—'}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${statusColor[p.status] || statusColor.draft}`}>
                        {p.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/40 text-xs">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-5 py-4 relative">
                      <button onClick={() => setMenuOpen(menuOpen === p.id ? null : p.id)} className="text-white/40 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuOpen === p.id && (
                        <div className="absolute right-5 top-10 z-20 bg-brand-surface border border-white/15 rounded-lg shadow-xl py-1 w-32">
                          <button onClick={() => openEdit(p)} className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/[0.08]">Edit</button>
                          <button onClick={() => handleDelete(p.id)} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowModal(false)}>
          <div className="bg-brand-surface border border-white/15 rounded-2xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? 'Edit Project' : 'New Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Project Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Website Redesign"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
                  placeholder="Brief description..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Client</label>
                <select
                  value={form.clientId}
                  onChange={e => setForm({ ...form, clientId: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                >
                  <option value="">No client</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                >
                  {statusOptions.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-white/10 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
                  {editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
