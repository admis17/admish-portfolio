const KEY = 'admish_leads'
const API = '/api/leads'

function localGet() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] }
}
function localSet(v) { try { localStorage.setItem(KEY, JSON.stringify(v)) } catch {} }

export async function getLeads() {
  try {
    const r = await fetch(API)
    if (!r.ok) throw new Error()
    const data = await r.json()
    localSet(data) // cache for offline
    return data
  } catch {
    return localGet()
  }
}

export async function addLead({ name, email, message }) {
  const payload = { name: name.trim(), email: email.trim(), message: message.trim() }
  try {
    const r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!r.ok) throw new Error()
    const lead = await r.json()
    // keep local cache in sync
    const cache = localGet()
    localSet([lead, ...cache])
    return lead
  } catch {
    // offline fallback
    const leads = localGet()
    const lead = { id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), ...payload, date: new Date().toISOString() }
    localSet([lead, ...leads])
    return lead
  }
}

export async function deleteLead(id) {
  try {
    const r = await fetch(`${API}/${id}`, { method: 'DELETE' })
    if (!r.ok) throw new Error()
    const data = await r.json()
    localSet(data)
    return data
  } catch {
    const leads = localGet().filter(l => l.id !== id)
    localSet(leads)
    return leads
  }
}

export async function clearLeads() {
  try {
    const r = await fetch(API, { method: 'DELETE' })
    if (!r.ok) throw new Error()
    const data = await r.json()
    localSet(data)
    return data
  } catch {
    localSet([])
    return []
  }
}

// sync helpers for components that used sync version before
export function getLeadsSync() { return localGet() }
