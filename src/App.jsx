import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Admin from './components/Admin.jsx'

function isAdminRoute() {
  return window.location.hash === '#admin' || window.location.pathname === '/admin'
}
export default function App() {
  const [isAdmin, setIsAdmin] = useState(isAdminRoute)
  useEffect(() => {
    const onChange = () => setIsAdmin(isAdminRoute())
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => { window.removeEventListener('hashchange', onChange); window.removeEventListener('popstate', onChange) }
  }, [])
  if (isAdmin) return <Admin />
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
