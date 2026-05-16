'use client'

import { useState, useEffect, useRef } from 'react'
import { flavors } from '@/lib/flavors'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [bgIndex, setBgIndex] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Auto-cycle through flavor backgrounds every 3s
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % flavors.length)
    }, 3000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  const currentFlavor = flavors[bgIndex]

  return (
    <section
      id="cta"
      className="cta-section relative min-h-screen flex flex-col items-center justify-center px-8 py-32 text-center overflow-hidden"
      style={{ backgroundColor: currentFlavor.bg }}
    >
      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="font-display font-extrabold text-white/[0.03] leading-none"
          style={{ fontSize: 'clamp(8rem, 25vw, 22rem)' }}
        >
          ZEST
        </span>
      </div>

      <div className="relative z-10 max-w-2xl w-full">
        {/* Headline */}
        <h2
          className="font-display font-extrabold text-white leading-[0.9] tracking-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
        >
          Your first case ships free.
        </h2>

        {/* Subline */}
        <p
          className="font-body text-white/70 mb-12"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
        >
          4 flavors. 24 cans. One very good decision.
        </p>

        {/* Form */}
        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="text-6xl font-display font-extrabold accent-color"
              aria-live="polite"
            >
              Done.
            </div>
            <p className="font-body text-white/70 text-lg">
              We'll be in touch. You made the right call.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
            noValidate
          >
            <label htmlFor="zest-email" className="sr-only">
              Email address
            </label>
            <input
              id="zest-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-6 py-4 rounded-full font-body text-sm bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:border-white/60 transition-colors duration-200 min-h-[44px]"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full font-display font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 min-h-[44px] whitespace-nowrap accent-bg"
              style={{ color: '#000' }}
            >
              Send me ZEST
            </button>
          </form>
        )}

        {/* Fine print */}
        {!submitted && (
          <p className="font-body text-white/35 text-xs mt-6 leading-relaxed">
            No commitment. Cancel whenever. We'll still think you made the right call.
          </p>
        )}
      </div>

      {/* Mobile fixed CTA — shown before form submission */}
      {!submitted && (
        <a
          href="#cta"
          className="md:hidden fixed bottom-6 start-1/2 -translate-x-1/2 w-[90vw] max-w-md px-8 py-5 rounded-full font-display font-bold text-sm uppercase tracking-widest text-center z-40 accent-bg transition-all duration-200 active:scale-95"
          style={{ color: '#000' }}
        >
          Get ZEST — First case free
        </a>
      )}
    </section>
  )
}
