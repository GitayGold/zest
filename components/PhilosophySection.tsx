'use client'

import { useEffect, useRef } from 'react'

const BODY_LINES = [
  'We set out to make water worth talking about.',
  'Turns out those are the same thing.',
  'ZEST is sparkling water built around flavor combinations',
  'that sound wrong in a text message and taste right in real life.',
  'No artificial anything. No safe choices.',
  'Just water that has opinions.',
]

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const lines = Array.from(section.querySelectorAll<HTMLElement>('.line-reveal'))
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      lines.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    lines.forEach((line) => observer.observe(line))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center px-8 md:px-24 py-32"
      style={{ backgroundColor: 'var(--flavor-bg)', transition: 'background-color 600ms ease' }}
    >
      <div className="max-w-4xl">
        {/* Overline */}
        <p
          className="line-reveal font-body text-xs font-semibold uppercase tracking-[0.3em] mb-8 opacity-50 text-white"
          style={{ transitionDelay: '0ms' }}
        >
          Our Philosophy
        </p>

        {/* Headline */}
        <h2
          className="line-reveal font-display font-extrabold text-white leading-[0.9] mb-12 tracking-tight"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            transitionDelay: '80ms',
          }}
        >
          "We didn't set out to make weird water."
        </h2>

        {/* Body — line by line reveal */}
        <div className="flex flex-col gap-3">
          {BODY_LINES.map((line, i) => (
            <p
              key={i}
              className="line-reveal font-body text-white/75 leading-relaxed"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                transitionDelay: `${160 + i * 80}ms`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Large decorative number */}
      <div
        className="absolute end-8 md:end-24 bottom-16 font-display font-extrabold leading-none select-none pointer-events-none opacity-[0.04] text-white"
        style={{ fontSize: 'clamp(8rem, 20vw, 18rem)' }}
        aria-hidden="true"
      >
        ZEST
      </div>
    </section>
  )
}
