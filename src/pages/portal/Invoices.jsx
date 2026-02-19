import { useState, useEffect } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react'

export default function PortalInvoices() {
  const { user } = useAuth()
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchInvoices() {
      if (!user) return
      try {
        const snap = await getDocs(query(collection(db, 'invoices'), where('clientUserId', '==', user.uid)))
        setInvoices(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      } catch {
        // may need index
      } finally {
        setLoading(false)
      }
    }
    fetchInvoices()
  }, [user])

  const statusIcon = {
    paid: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    pending: <Clock className="h-4 w-4 text-yellow-400" />,
    overdue: <AlertTriangle className="h-4 w-4 text-red-400" />,
  }

  const statusColor = {
    paid: 'bg-emerald-500/20 text-emerald-300',
    pending: 'bg-yellow-500/20 text-yellow-300',
    overdue: 'bg-red-500/20 text-red-300',
    draft: 'bg-white/10 text-white/60',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Invoices</h1>
        <p className="text-sm text-white/50 mt-1">View and track all your invoices.</p>
      </div>

      {loading ? (
        <div className="p-12 text-center text-sm text-white/40">Loading...</div>
      ) : invoices.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-12 text-center">
          <FileText className="h-10 w-10 text-white/20 mx-auto mb-3" />
          <div className="text-sm text-white/40">No invoices yet.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Invoice list */}
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/[0.04] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs text-white/50 uppercase tracking-wider">
                    <th className="px-5 py-3">Invoice</th>
                    <th className="px-5 py-3">Amount</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {invoices.map(inv => (
                    <tr
                      key={inv.id}
                      onClick={() => setSelected(inv)}
                      className={`cursor-pointer hover:bg-white/[0.03] transition-colors ${selected?.id === inv.id ? 'bg-white/[0.05]' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <div className="text-white font-medium">{inv.invoiceNumber || inv.id.slice(0, 8)}</div>
                        <div className="text-xs text-white/40">{inv.projectName || ''}</div>
                      </td>
                      <td className="px-5 py-4 text-white font-semibold">${(inv.amount || 0).toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${statusColor[inv.status] || statusColor.draft}`}>
                          {statusIcon[inv.status]}
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white/40 text-xs">{inv.dueDate || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invoice detail */}
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
            {selected ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-white">{selected.invoiceNumber}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${statusColor[selected.status] || statusColor.draft}`}>
                    {selected.status}
                  </span>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-wider">Amount</div>
                    <div className="text-2xl font-display font-bold text-white">${(selected.amount || 0).toLocaleString()}</div>
                  </div>
                  {selected.projectName && (
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Project</div>
                      <div className="text-sm text-white">{selected.projectName}</div>
                    </div>
                  )}
                  {selected.dueDate && (
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Due Date</div>
                      <div className="text-sm text-white">{selected.dueDate}</div>
                    </div>
                  )}
                  {selected.items && (
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Line Items</div>
                      <div className="text-sm text-white/70 whitespace-pre-line bg-white/[0.03] rounded-lg p-3 border border-white/5">
                        {selected.items}
                      </div>
                    </div>
                  )}
                  {selected.createdAt && (
                    <div>
                      <div className="text-xs text-white/40 uppercase tracking-wider">Issued</div>
                      <div className="text-sm text-white/60">{new Date(selected.createdAt).toLocaleDateString()}</div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center text-sm text-white/40 py-8">
                Select an invoice to view details.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
