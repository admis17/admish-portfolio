import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Helper component for navigation links
const NavLink = ({ href, children }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-zinc-400 transition-colors hover:text-white"
  >
    {children}
  </a>
)

// Helper component for social media icons
const SocialIcon = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-zinc-400 transition-colors hover:text-white">
    <Icon className="h-5 w-5" />
  </a>
)

// The main reusable Hero Section component
export const MinimalistHero = ({
  logoText,
  navLinks,
  badgeText,
  mainText,
  specializedIn,
  readMoreLink,
  ctaPrimary,
  ctaSecondary,
  stats,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  showHeader = true,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-black px-6 py-8 font-sans md:px-8 md:py-12',
        className
      )}
    >
      {/* Header */}
      {showHeader && (
        <header className="z-30 flex w-full max-w-7xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold tracking-wider text-white"
          >
            {logoText}
          </motion.div>
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            <span className="block h-0.5 w-5 bg-white"></span>
          </motion.button>
        </header>
      )}

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left -mt-6 md:-mt-10"
        >
          {badgeText && (
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 py-1.5 pl-2.5 pr-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-zinc-300">{badgeText}</span>
            </span>
          )}

          <p className="mx-auto max-w-xl text-2xl leading-relaxed bg-gradient-to-r from-white via-zinc-200 to-brand-400 bg-clip-text text-transparent md:mx-0">{mainText}</p>

          {specializedIn && (
            <div className="mt-6 flex justify-center text-2xl md:justify-start">{specializedIn}</div>
          )}

          {(ctaPrimary || ctaSecondary) ? (
            <div className="mt-7 flex flex-nowrap justify-center gap-3 md:justify-start">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-brand-400 px-5 py-3 text-base font-semibold text-black transition-colors hover:bg-brand-300 md:px-6 md:text-lg"
                >
                  {ctaPrimary.label}
                </a>
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-zinc-700 px-5 py-3 text-base font-semibold text-zinc-300 transition-colors hover:border-brand-400 hover:text-brand-400 md:px-6 md:text-lg"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          ) : (
            <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-white underline decoration-from-font">
              Read More
            </a>
          )}

          {stats && stats.length > 0 && (
            <div className="mt-9 flex justify-center gap-8 md:justify-start">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold text-brand-400">{stat.value}</p>
                  <p className="text-sm text-zinc-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Center Image (circle baked into the artwork itself) */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          <div
            className="animate-hero-glow pointer-events-none absolute h-56 w-56 rounded-full bg-brand-400/30 blur-3xl md:h-72 md:w-72"
            aria-hidden="true"
          />
          <div className="animate-hero-float relative z-10 w-96 shrink-0 md:w-[500px] lg:w-[620px]">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="w-full object-contain"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              onError={(e) => {
                const target = e.target
                target.onerror = null
                target.src = `https://placehold.co/400x600/eab308/000000?text=Admish`
              }}
            />
          </div>
        </div>

        {/* Right Text */}
        {overlayText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="z-20 order-3 flex items-center justify-center text-center md:justify-start -mt-10 md:-mt-16 lg:-mt-20"
          >
            <h1 className="text-6xl font-extrabold text-white md:text-7xl lg:text-8xl">
              {overlayText.part1}
              <br />
              <span className="text-brand-400">{overlayText.part2}</span>
            </h1>
          </motion.div>
        )}
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-zinc-300"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  )
}
