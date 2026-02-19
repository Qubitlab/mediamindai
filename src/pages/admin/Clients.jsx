import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { Plus, Search, MoreVertical, X, Users } from 'lucide-react'

export default function AdminClients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
  const [menuOpen, setMenuOpen] = useState(null)

  async function fetchClients() {
    try {
      const snap = await getDocs(query(collection(db, 'clients'), orderBy('createdAt', 'desc')))
      setClients(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      // empty collection is fine
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchClients() }, [])

  function openCreate() {
    setEditing(null)
    setForm({ name: '', email: '', phone: '', company: '' })
    setShowModal(true)
  }

  function openEdit(client) {
    setEditing(client)
    setForm({ name: client.name || '', email: client.email || '', phone: client.phone || '', company: client.company || '' })
    setShowModal(true)
    setMenuOpen(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const data = { ...form, updatedAt: new Date().toISOString() }

    if (editing) {
      await updateDoc(doc(db, 'clients', editing.id), data)
    } else {
      data.createdAt = new Date().toISOString()
      await addDoc(collection(db, 'clients'), data)
    }

    setShowModal(false)
    fetchClients()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this client?')) return
    await deleteDoc(doc(db, 'clients', id))
    setMenuOpen(null)
    fetchClients()
  }

  const filtered = clients.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Clients</h1>
          <p className="text-sm text-white/50 mt-1">Manage your client directory.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
          <Plus className="h-4 w-4" /> Add Client
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          placeholder="Search clients..."
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-white/40">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="h-10 w-10 text-white/20 mx-auto mb-3" />
            <div className="text-sm text-white/40">No clients found.</div>
            <button onClick={openCreate} className="mt-3 text-sm text-violet-400 hover:text-violet-300">Add your first client</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Company</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500/30 to-fuchsia-500/30 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                          {(c.name || '?')[0].toUpperCase()}
                        </div>
                        <span className="text-white font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/60">{c.company || '—'}</td>
                    <td className="px-5 py-4 text-white/60">{c.email || '—'}</td>
                    <td className="px-5 py-4 text-white/60">{c.phone || '—'}</td>
                    <td className="px-5 py-4 relative">
                      <button onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)} className="text-white/40 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuOpen === c.id && (
                        <div className="absolute right-5 top-10 z-20 bg-brand-surface border border-white/15 rounded-lg shadow-xl py-1 w-32">
                          <button onClick={() => openEdit(c)} className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/[0.08]">Edit</button>
                          <button onClick={() => handleDelete(c.id)} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">Delete</button>
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
              <h2 className="text-lg font-display font-bold text-white">{editing ? 'Edit Client' : 'Add Client'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Name</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Company</label>
                <input
                  value={form.company}
                  onChange={e => setForm({ ...form, company: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Phone</label>
                <input
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-white/10 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
                  {editing ? 'Update' : 'Add Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
