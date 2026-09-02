const KEY = 'admish_leads'

export function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch { return [] }
}

export function addLead({ name, email, message }) {
  const leads = getLeads()
  const lead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  }
  localStorage.setItem(KEY, JSON.stringify([lead, ...leads]))
  return lead
}

export function deleteLead(id) {
  const leads = getLeads().filter(l => l.id !== id)
  localStorage.setItem(KEY, JSON.stringify(leads))
  return leads
}

export function clearLeads() {
  localStorage.setItem(KEY, JSON.stringify([]))
}
