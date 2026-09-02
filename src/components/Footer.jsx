import Logo from './Logo.jsx'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black text-zinc-400 py-10 px-6 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo variant="dark" />
        <p className="text-sm text-zinc-500">
          © {year} Admish. All rights reserved.
        </p>
        <div className="flex gap-5 text-sm">
          <a href="#home" className="hover:text-brand-400 transition-colors">Home</a>
          <a href="#services" className="hover:text-brand-400 transition-colors">Services</a>
          <a href="#contact" className="hover:text-brand-400 transition-colors">Contact</a>
          <a href="#admin" className="hover:text-brand-400 transition-colors opacity-60">Admin</a>
        </div>
      </div>
    </footer>
  )
}
