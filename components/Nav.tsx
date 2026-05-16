'use client'

import { useState, useEffect } from 'react'
import { useFlavor } from '@/lib/FlavorContext'
import SoundToggle from '@/components/SoundToggle'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { flavor } = useFlavor()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/10' : ''
      }`}
    >
      {/* Logo */}
      <a
        href="#"
        className="nav-logo font-display text-2xl font-extrabold tracking-tight border-b-2 pb-0.5"
        style={{
          color: flavor.accent,
          borderColor: flavor.accent,
        }}
      >
        ZEST
      </a>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        {[
          { label: 'Flavors', href: '#flavors' },
          { label: 'About', href: '#about' },
          { label: 'Get Zest', href: '#cta' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="font-body text-sm font-medium text-white/80 hover:text-white transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </nav>

      <SoundToggle />
    </header>
  )
}
