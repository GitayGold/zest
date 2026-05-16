'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { type Flavor } from '@/lib/flavors'

interface FlavorCardProps {
  flavor: Flavor
  index: number
  isActive: boolean
}

const SPRING = { type: 'spring' as const, damping: 20, stiffness: 300 }

// Text elements stagger in on slide enter
const TEXT_DELAYS = [0, 0.06, 0.12, 0.18, 0.24]

export default function FlavorCard({ flavor, index, isActive }: FlavorCardProps) {
  const shouldReduce = useReducedMotion()

  const textAnimate = (delayIdx: number) => ({
    animate: shouldReduce
      ? { opacity: 1, y: 0 }
      : isActive
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 12 },
    transition: {
      duration: 0.3,
      ease: 'easeOut' as const,
      delay: isActive && !shouldReduce ? TEXT_DELAYS[delayIdx] : 0,
    },
  })

  const canAnimate = shouldReduce
    ? { opacity: 1, y: 0 }
    : isActive
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 40 }

  return (
    <div
      className="flex-none relative overflow-hidden"
      style={{ width: '100vw', height: '100svh' }}
      data-flavor-index={index}
    >
      {/* Radial glow — slides with content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 70% at 75% 50%, ${flavor.accent}18 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Desktop two-column | Mobile full-height stack */}
      <div className="h-full grid grid-cols-1 md:grid-cols-2 items-center">

        {/* ── TEXT COLUMN ──────────────────────────────── */}
        <div className="relative z-10 flex flex-col gap-5 px-8 md:px-20 py-28 md:py-0 justify-center">

          {/* Flavor category */}
          <motion.p
            className="font-body text-xs font-bold uppercase tracking-[0.35em]"
            style={{ color: flavor.accent }}
            {...textAnimate(0)}
          >
            Sparkling Water
          </motion.p>

          {/* Flavor name */}
          <motion.h2
            className="font-display font-extrabold leading-[0.85] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)' }}
            {...textAnimate(1)}
          >
            {flavor.name}
          </motion.h2>

          {/* Descriptor */}
          <motion.p
            className="font-display font-semibold text-white/90 leading-snug max-w-sm"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}
            {...textAnimate(2)}
          >
            &ldquo;{flavor.descriptor}&rdquo;
          </motion.p>

          {/* Body */}
          <motion.p
            className="font-body text-white/60 leading-relaxed max-w-xs"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
            {...textAnimate(3)}
          >
            {flavor.body}
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#cta"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold text-sm uppercase tracking-widest w-fit mt-2"
            style={{ backgroundColor: flavor.accent, color: '#000' }}
            whileHover={shouldReduce ? {} : { scale: 1.05 }}
            whileTap={shouldReduce ? {} : { scale: 0.95 }}
            {...textAnimate(4)}
          >
            Order Now
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </div>

        {/* ── CAN IMAGE COLUMN (desktop) ────────────────── */}
        <div className="hidden md:flex items-center justify-center h-full py-16">
          {/* Enter/exit wrapper */}
          <motion.div
            animate={canAnimate}
            transition={{ ...SPRING, delay: isActive && !shouldReduce ? 0.08 : 0 }}
            style={{
              filter: `drop-shadow(0 0 60px ${flavor.accent}50)`,
            }}
          >
            {/* Float oscillation — inner wrapper avoids y conflict */}
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src={flavor.image}
                alt={`${flavor.name} sparkling water can`}
                width={340}
                height={520}
                priority={index === 0}
                className="object-contain"
                style={{ maxHeight: '72vh', width: 'auto' }}
                draggable={false}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── CAN IMAGE (mobile — decorative watermark) ── */}
      <div
        className="md:hidden absolute inset-y-0 end-0 w-[55%] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <motion.div
          animate={canAnimate}
          transition={{ ...SPRING, delay: isActive && !shouldReduce ? 0.08 : 0 }}
          style={{ filter: `drop-shadow(0 0 30px ${flavor.accent}40)` }}
        >
          <motion.div
            animate={shouldReduce ? {} : { y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src={flavor.image}
              alt=""
              width={200}
              height={320}
              className="object-contain opacity-25"
              style={{ maxHeight: '55vh', width: 'auto' }}
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
