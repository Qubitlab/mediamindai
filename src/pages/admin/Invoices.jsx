import { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'
import { Plus, Search, MoreVertical, X, FileText } from 'lucide-react'

const statusOptions = ['draft', 'pending', 'paid', 'overdue']

export default function AdminInvoices() {
  const [invoices, setInvoices] = useState([])
  const [clients, setClients] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [form, setForm] = useState({ invoiceNumber: '', clientId: '', projectId: '', amount: '', status: 'pending', dueDate: '', items: '' })
  const [menuOpen, setMenuOpen] = useState(null)

  async function fetchData() {
    try {
      const [invSnap, clientSnap, projSnap] = await Promise.all([
        getDocs(query(collection(db, 'invoices'), orderBy('createdAt', 'desc'))),
        getDocs(collection(db, 'clients')),
        getDocs(collection(db, 'projects')),
      ])
      setInvoices(invSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setClients(clientSnap.docs.map(d => ({ id: d.id, ...d.data() })))
      setProjects(projSnap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      // empty collections
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  function openCreate() {
    setEditing(null)
    const nextNum = `INV-${String(invoices.length + 1).padStart(4, '0')}`
    setForm({ invoiceNumber: nextNum, clientId: '', projectId: '', amount: '', status: 'pending', dueDate: '', items: '' })
    setShowModal(true)
  }

  function openEdit(inv) {
    setEditing(inv)
    setForm({
      invoiceNumber: inv.invoiceNumber || '',
      clientId: inv.clientId || '',
      projectId: inv.projectId || '',
      amount: inv.amount?.toString() || '',
      status: inv.status || 'pending',
      dueDate: inv.dueDate || '',
      items: inv.items || '',
    })
    setShowModal(true)
    setMenuOpen(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const client = clients.find(c => c.id === form.clientId)
    const project = projects.find(p => p.id === form.projectId)
    const data = {
      ...form,
      amount: parseFloat(form.amount) || 0,
      clientName: client?.name || '',
      projectName: project?.name || '',
      updatedAt: new Date().toISOString(),
    }

    if (editing) {
      await updateDoc(doc(db, 'invoices', editing.id), data)
    } else {
      data.createdAt = new Date().toISOString()
      await addDoc(collection(db, 'invoices'), data)
    }

    setShowModal(false)
    fetchData()
  }

  async function handleDelete(id) {
    if (!confirm('Delete this invoice?')) return
    await deleteDoc(doc(db, 'invoices', id))
    setMenuOpen(null)
    fetchData()
  }

  const filtered = invoices.filter(inv =>
    inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColor = {
    paid: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-yellow-500/20 text-yellow-300',
    overdue: 'bg-red-500/20 text-red-300',
    draft: 'bg-white/10 text-white/60',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Invoices</h1>
          <p className="text-sm text-white/50 mt-1">Create and track client invoices.</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
          <Plus className="h-4 w-4" /> New Invoice
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.05] py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          placeholder="Search invoices..."
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-white/40">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-10 w-10 text-white/20 mx-auto mb-3" />
            <div className="text-sm text-white/40">No invoices found.</div>
            <button onClick={openCreate} className="mt-3 text-sm text-violet-400 hover:text-violet-300">Create your first invoice</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                  <th className="px-5 py-3">Invoice</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Due</th>
                  <th className="px-5 py-3 w-12" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(inv => (
                  <tr key={inv.id} className="hover:bg-white/[0.02]">
                    <td className="px-5 py-4 text-white font-medium">{inv.invoiceNumber || inv.id.slice(0, 8)}</td>
                    <td className="px-5 py-4 text-white/60">{inv.clientName || '—'}</td>
                    <td className="px-5 py-4 text-white/60">{inv.projectName || '—'}</td>
                    <td className="px-5 py-4 text-white font-semibold">${(inv.amount || 0).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full ${statusColor[inv.status] || statusColor.draft}`}>
                        {inv.status || 'draft'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-white/40 text-xs">{inv.dueDate || '—'}</td>
                    <td className="px-5 py-4 relative">
                      <button onClick={() => setMenuOpen(menuOpen === inv.id ? null : inv.id)} className="text-white/40 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuOpen === inv.id && (
                        <div className="absolute right-5 top-10 z-20 bg-brand-surface border border-white/15 rounded-lg shadow-xl py-1 w-32">
                          <button onClick={() => openEdit(inv)} className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/[0.08]">Edit</button>
                          <button onClick={() => handleDelete(inv.id)} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">Delete</button>
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
          <div className="bg-brand-surface border border-white/15 rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-bold text-white">{editing ? 'Edit Invoice' : 'New Invoice'}</h2>
              <button onClick={() => setShowModal(false)} className="text-white/40 hover:text-white"><X className="h-5 w-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Invoice Number</label>
                <input
                  value={form.invoiceNumber}
                  onChange={e => setForm({ ...form, invoiceNumber: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  placeholder="INV-0001"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Client</label>
                  <select
                    value={form.clientId}
                    onChange={e => setForm({ ...form, clientId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  >
                    <option value="">Select client</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Project</label>
                  <select
                    value={form.projectId}
                    onChange={e => setForm({ ...form, projectId: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  >
                    <option value="">Select project</option>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={form.amount}
                    onChange={e => setForm({ ...form, amount: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                    placeholder="5000"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Due Date</label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={e => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                  />
                </div>
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
              <div>
                <label className="block text-xs text-white/50 uppercase tracking-wider mb-2">Line Items / Notes</label>
                <textarea
                  value={form.items}
                  onChange={e => setForm({ ...form, items: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
                  placeholder="Website design - $3,000&#10;Development - $2,000"
                  rows={4}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 rounded-lg border border-white/10 py-3 text-sm text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 rounded-lg bg-violet-600 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors">
                  {editing ? 'Update' : 'Create Invoice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
