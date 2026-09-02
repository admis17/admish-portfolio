import { useState, useEffect, useMemo } from 'react'
import { getLeads, addLead, deleteLead, clearLeads } from '../lib/leads.js'

const PASSWORD = 'admish123' // ponytail: hardcoded, move to env if you add a backend
const SESSION_KEY = 'admish_admin_auth'

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const [leads, setLeads] = useState([])
  const [q, setQ] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  async function refresh() { setLeads(await getLeads()) }
  useEffect(() => { refresh() }, [])
  useEffect(() => {
    if (!authed) return
    const id = setInterval(refresh, 2000)
    return () => clearInterval(id)
  }, [authed])

  const filtered = useMemo(() => {
    if (!q.trim()) return leads
    const s = q.toLowerCase()
    return leads.filter(l => `${l.name} ${l.email} ${l.message}`.toLowerCase().includes(s))
  }, [leads, q])

  function handleLogin(e) {
    e.preventDefault()
    if (pw === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setErr('')
    } else setErr('Wrong password')
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setPw('')
  }

  async function handleDelete(id) {
    if (!confirm('Delete this lead?')) return
    const data = await deleteLead(id)
    setLeads(data)
  }

  async function handleClear() {
    if (!confirm(`Delete all ${leads.length} leads? This cannot be undone.`)) return
    await clearLeads()
    setLeads([])
  }

  function exportCSV() {
    const rows = [['Date','Name','Email','Message'], ...filtered.map(l => [new Date(l.date).toLocaleString(), l.name, l.email, `"${l.message.replace(/"/g,'""')}"`])]
    const csv = rows.map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `admish-leads-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
  }

  function copy(text) { navigator.clipboard.writeText(text) }

  async function handleAdd(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return
    await addLead(form)
    setLeads(await getLeads())
    setForm({ name: '', email: '', message: '' })
    setShowAdd(false)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-1">Admin Login</h1>
          <p className="text-sm text-zinc-500 mb-6">Enter password to view leads</p>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-400 mb-3"
            autoFocus
          />
          {err && <p className="text-sm text-red-400 mb-3">{err}</p>}
          <button className="w-full bg-brand-400 hover:bg-brand-300 text-black font-semibold py-2.5 rounded-lg">Login</button>
          <p className="text-xs text-zinc-600 mt-3">Demo password: <span className="text-zinc-400 font-mono">admish123</span></p>
          <a href="#" className="block text-center text-sm text-zinc-500 hover:text-white mt-4">← Back to site</a>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-zinc-900/90 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold">Admish — Leads</h1>
            <p className="text-sm text-zinc-500">{leads.length} total • {filtered.length} shown</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-sm">View site</a>
            <button onClick={() => setShowAdd(!showAdd)} className="px-4 py-2 rounded-lg bg-brand-400 text-black font-semibold text-sm hover:bg-brand-300">{showAdd ? 'Cancel' : '+ Add lead'}</button>
            <button onClick={exportCSV} disabled={!filtered.length} className="px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-zinc-200 disabled:opacity-40">Export CSV</button>
            <button onClick={logout} className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-400 text-sm hover:text-white">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {showAdd && (
          <form onSubmit={handleAdd} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 grid md:grid-cols-3 gap-4">
            <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400" />
            <div className="md:col-span-3 flex gap-3">
              <input required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" className="flex-1 rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400" />
              <button className="px-6 py-2.5 rounded-lg bg-brand-400 text-black font-semibold hover:bg-brand-300">Add</button>
            </div>
          </form>
        )}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search name, email, message..."
            className="flex-1 min-w-[240px] rounded-lg border border-zinc-700 bg-zinc-900 text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          {leads.length > 0 && (
            <button onClick={handleClear} className="px-4 py-2.5 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-950 text-sm">Clear all</button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <p className="text-zinc-300 font-medium">{leads.length === 0 ? 'No leads yet' : 'No matches'}</p>
            <p className="text-sm text-zinc-500 mt-1">{leads.length === 0 ? 'Submit the contact form to see leads here. Leads are stored in localStorage.' : 'Try a different search.'}</p>
          </div>
        ) : (
          <>
            {/* cards on mobile, table on desktop */}
            <div className="hidden md:block bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-800/50 text-zinc-400 text-left">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      <th className="px-4 py-3 font-medium">Name</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Message</th>
                      <th className="px-4 py-3 font-medium w-[80px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {filtered.map(l => (
                      <tr key={l.id} className="hover:bg-zinc-800/30">
                        <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{new Date(l.date).toLocaleString()}</td>
                        <td className="px-4 py-3 font-medium whitespace-nowrap">{l.name}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => copy(l.email)} className="text-brand-400 hover:underline" title="Click to copy">{l.email}</button>
                        </td>
                        <td className="px-4 py-3 text-zinc-300 max-w-[420px] break-words">{l.message}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleDelete(l.id)} className="text-zinc-500 hover:text-red-400">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="md:hidden grid gap-3">
              {filtered.map(l => (
                <div key={l.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex justify-between gap-2">
                    <p className="font-semibold">{l.name}</p>
                    <button onClick={() => handleDelete(l.id)} className="text-xs text-zinc-500 hover:text-red-400">Delete</button>
                  </div>
                  <button onClick={() => copy(l.email)} className="text-sm text-brand-400">{l.email}</button>
                  <p className="text-sm text-zinc-300 mt-2 break-words">{l.message}</p>
                  <p className="text-xs text-zinc-600 mt-2">{new Date(l.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="text-xs text-zinc-600 mt-6">Storage: <span className="font-mono">/api/leads → data/leads.json</span> • Centralized — visible from any device • ponytail: ephemeral filesystem, swap to Postgres/DATABASE_URL if you redeploy often</p>
      </div>
    </div>
  )
}
