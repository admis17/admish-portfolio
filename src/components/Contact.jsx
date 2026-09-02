import { useState } from 'react'
import { addLead } from '../lib/leads.js'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function handleSubmit(e) {
    e.preventDefault()
    addLead(form)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">
        <div>
          <p className="text-brand-400 font-semibold mb-3 uppercase text-sm tracking-wide">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Let's build something great together
          </h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            Have a project in mind? Tell us about it and we'll get back to
            you within one business day.
          </p>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z M4 4l8 9 8-9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=infoadmish@gmail.com" target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-brand-400">infoadmish@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 5c0 9 7 16 16 16l3-4-6-3-2 2c-3-1.5-4.5-3-6-6l2-2-3-6z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Phone</p>
                <a href="tel:+918657218418" className="font-medium text-white hover:text-brand-400">+91 8657218418</a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 text-brand-400 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-zinc-500">Office</p>
                <p className="font-medium text-white">Your City, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-14 h-14 rounded-full bg-brand-400/10 text-brand-400 flex items-center justify-center mb-4">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Thank you!</h3>
              <p className="text-zinc-400 text-sm mb-6">
                Your message has been received. We'll be in touch soon.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', message:'' }) }} className="text-sm text-zinc-400 hover:text-white underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-black text-white px-4 py-2.5 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-brand-400 hover:bg-brand-300 text-black font-semibold py-3 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
