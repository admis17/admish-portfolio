import { FaInstagram, FaLinkedin, FaXTwitter, FaEnvelope } from 'react-icons/fa6'
import { MinimalistHero } from './ui/minimalist-hero.jsx'

const socialLinks = [
  { icon: FaInstagram, href: 'https://www.instagram.com/admishinfotech?igsi=aWtjb2t0dm4zc3A5' },
  { icon: FaLinkedin, href: 'https://linkedin.com' },
  { icon: FaXTwitter, href: 'https://x.com' },
  { icon: FaEnvelope, href: 'https://mail.google.com/mail/?view=cm&fs=1&to=infoadmish@gmail.com' },
]

export default function Hero() {
  return (
    <section id="home" className="pt-8 bg-black">
      <MinimalistHero
        showHeader={false}
        logoText="Admish"
        navLinks={[]}
        mainText="Admish is an IT company helping businesses design, build and scale web, mobile and cloud products — fast, reliable, and built to grow with you."
        readMoreLink="#about"
        ctaPrimary={{ label: 'Start a Project', href: '#contact' }}
        ctaSecondary={{ label: 'View Our Services', href: '#services' }}
        stats={[
          { value: '50+', label: 'Projects Delivered' },
          { value: '30+', label: 'Happy Clients' },
          { value: '5+', label: 'Years Experience' },
        ]}
        imageSrc="/hero-portrait.png"
        imageAlt="Portrait representing the Admish team"
        overlayText={{ part1: 'we build.', part2: 'you grow.' }}
        socialLinks={socialLinks}
        locationText="Serving Clients Worldwide"
      />
    </section>
  )
}
