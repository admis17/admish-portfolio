import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import pg from 'pg'

const { Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const DATA_FILE = path.join(__dirname, 'data', 'leads.json')

app.use(cors())
app.use(express.json())

// --- storage: Postgres if DATABASE_URL else file ---
let pool = null
if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
  })
  pool.on('error', e => console.error('pg error', e.message))
  // ponytail: create table on boot, Antideploy runs this before release
  pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      date TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `).then(() => console.log('Postgres leads table ready')).catch(e => console.error('pg init', e.message))
}

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]')
}

async function getLeads() {
  if (pool) {
    const { rows } = await pool.query('SELECT id, name, email, message, date FROM leads ORDER BY date DESC')
    return rows.map(r => ({ ...r, date: new Date(r.date).toISOString() }))
  }
  ensureDataFile()
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]') } catch { return [] }
}

async function addLeadToStore({ name, email, message }) {
  const lead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  }
  if (pool) {
    await pool.query('INSERT INTO leads (id, name, email, message, date) VALUES ($1,$2,$3,$4,$5)', [lead.id, lead.name, lead.email, lead.message, lead.date])
  } else {
    ensureDataFile()
    const leads = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]')
    leads.unshift(lead)
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2))
  }
  return lead
}

async function deleteLeadFromStore(id) {
  if (pool) {
    await pool.query('DELETE FROM leads WHERE id=$1', [id])
    return getLeads()
  }
  ensureDataFile()
  const leads = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]').filter(l => l.id !== id)
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2))
  return leads
}

async function clearLeadsStore() {
  if (pool) await pool.query('DELETE FROM leads')
  else { ensureDataFile(); fs.writeFileSync(DATA_FILE, '[]') }
  return []
}

// --- api ---
app.get('/api/leads', async (req, res) => {
  try { res.json(await getLeads()) } catch (e) { res.status(500).json({ error: e.message }) }
})

app.post('/api/leads', async (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name?.trim() || !email?.trim() || !message?.trim()) return res.status(400).json({ error: 'name, email, message required' })
  try { res.status(201).json(await addLeadToStore({ name, email, message })) } catch (e) { res.status(500).json({ error: e.message }) }
})

app.delete('/api/leads/:id', async (req, res) => {
  try { res.json(await deleteLeadFromStore(req.params.id)) } catch (e) { res.status(500).json({ error: e.message }) }
})

app.delete('/api/leads', async (req, res) => {
  try { res.json(await clearLeadsStore()) } catch (e) { res.status(500).json({ error: e.message }) }
})

app.get('/api/stats', async (req, res) => {
  try {
    const leads = await getLeads()
    const now = new Date()
    const today = leads.filter(l => new Date(l.date).toDateString() === now.toDateString()).length
    const week = leads.filter(l => Date.now() - new Date(l.date) < 7*24*60*60*1000).length
    const byDay = {}
    for (let i=6;i>=0;i--) { const d=new Date(); d.setDate(d.getDate()-i); byDay[d.toISOString().slice(0,10)]=0 }
    leads.forEach(l => { const k=new Date(l.date).toISOString().slice(0,10); if(k in byDay) byDay[k]++ })
    res.json({ total: leads.length, today, week, byDay })
  } catch(e){ res.status(500).json({error:e.message}) }
})

// serve vite build
const dist = path.join(__dirname, 'dist')
app.use(express.static(dist))
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' })
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on ${PORT} ${pool ? '(postgres)' : '(file)'}`))
