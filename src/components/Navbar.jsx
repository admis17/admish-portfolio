import { useState } from 'react'
import Logo from './Logo.jsx'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home">
          <Logo />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-zinc-400 font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-brand-400 transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-block bg-brand-400 hover:bg-brand-300 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors"
        >
          Get in Touch
        </a>

        <button
          className="md:hidden text-zinc-300"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <ul className="md:hidden flex flex-col gap-1 px-6 pb-4 text-zinc-400 font-medium bg-black border-t border-zinc-800">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 hover:text-brand-400"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
