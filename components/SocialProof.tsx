'use client'

import { useEffect, useRef } from 'react'

const QUOTES = [
  {
    text: 'I bought it as a joke. I subscribed the next day.',
    author: 'Maya R.',
    location: 'Tel Aviv',
  },
  {
    text: 'The Mango Chili one made me call my mom.',
    author: 'James K.',
    location: 'London',
  },
  {
    text: "I don't even like sparkling water. I like ZEST.",
    author: 'Sofia M.',
    location: 'Barcelona',
  },
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = Array.from(section.querySelectorAll<HTMLElement>('.card-reveal'))
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      cards.forEach((el) => el.classList.add('is-visible'))
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
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-8 md:px-24 overflow-hidden"
      style={{ backgroundColor: 'var(--flavor-bg)', transition: 'background-color 600ms ease' }}
    >
      {/* Section label */}
      <p className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-white/40 mb-16">
        Real humans. Real opinions.
      </p>

      {/* Quote grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {QUOTES.map((quote, i) => (
          <div
            key={i}
            className="card-reveal relative p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            {/* Opening quote mark */}
            <span
              className="block font-display font-extrabold leading-none mb-4 accent-color"
              style={{ fontSize: '4rem', lineHeight: 1 }}
              aria-hidden="true"
            >
              "
            </span>

            <p className="font-body text-white text-lg md:text-xl leading-snug mb-6">
              {quote.text}
            </p>

            <p className="font-body text-white/50 text-sm">
              — {quote.author}, {quote.location}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
