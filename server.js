import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const DATA_FILE = path.join(__dirname, 'data', 'leads.json')

app.use(cors())
app.use(express.json())

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]')
}
function readLeads() {
  ensureDataFile()
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]') } catch { return [] }
}
function writeLeads(leads) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2))
}

app.get('/api/leads', (req, res) => {
  res.json(readLeads())
})

app.post('/api/leads', (req, res) => {
  const { name, email, message } = req.body || {}
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'name, email, message required' })
  }
  const leads = readLeads()
  const lead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
    date: new Date().toISOString(),
  }
  leads.unshift(lead)
  writeLeads(leads)
  res.status(201).json(lead)
})

app.delete('/api/leads/:id', (req, res) => {
  const leads = readLeads().filter(l => l.id !== req.params.id)
  writeLeads(leads)
  res.json(leads)
})

app.delete('/api/leads', (req, res) => {
  writeLeads([])
  res.json([])
})

// serve vite build
const dist = path.join(__dirname, 'dist')
app.use(express.static(dist))
app.use((req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' })
  res.sendFile(path.join(dist, 'index.html'))
})

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
