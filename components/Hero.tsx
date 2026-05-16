'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, useReducedMotion } from 'framer-motion'
import { flavors } from '@/lib/flavors'

const LINE_ONE_WORDS = ['Flavors', 'that', "shouldn't", 'work.']
const LINE_TWO_WORDS = ['Until', 'they', 'do.']

const SPRING = { type: 'spring' as const, damping: 20, stiffness: 300 }

// Parallax factors per can (brief spec)
const PARALLAX_FACTORS = [0.02, 0.035, 0.015, 0.025]

// All cans are 18vw wide — consistent size.
// Positions use vh/vw so the cluster scales with the viewport
// and stays fully inside the 100vh hero at all desktop sizes.
const CAN_CLUSTER = [
  {
    image: flavors[0].image,
    name: flavors[0].name,
    pos: { top: '14vh', right: '7vw' } as React.CSSProperties,
    rotation: -8,
    floatDuration: 3.2,
    floatAmplitude: 10,
    floatDelay: 0,
    glowColor: '#FF6B2B',
    glowOpacity: 0.4,
  },
  {
    image: flavors[1].image,
    name: flavors[1].name,
    pos: { top: '9vh', right: '24vw' } as React.CSSProperties,
    rotation: 12,
    floatDuration: 4,
    floatAmplitude: 8,
    floatDelay: 0.4,
    glowColor: '#C8F55A',
    glowOpacity: 0.35,
  },
  {
    image: flavors[2].image,
    name: flavors[2].name,
    pos: { bottom: '10vh', right: '7vw' } as React.CSSProperties,
    rotation: -15,
    floatDuration: 3.6,
    floatAmplitude: 9,
    floatDelay: 0.8,
    glowColor: '#FF8FAB',
    glowOpacity: 0.35,
  },
  {
    image: flavors[3].image,
    name: flavors[3].name,
    pos: { bottom: '15vh', right: '23vw' } as React.CSSProperties,
    rotation: 5,
    floatDuration: 4.4,
    floatAmplitude: 12,
    floatDelay: 1.2,
    glowColor: '#9B6DFF',
    glowOpacity: 0.4,
  },
]

const NOISE_BG =
  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")'

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Per-can parallax — hooks must be at top level, not in loops
  const can0x = useTransform(mouseX, [-800, 800], [-800 * PARALLAX_FACTORS[0], 800 * PARALLAX_FACTORS[0]])
  const can0y = useTransform(mouseY, [-600, 600], [-600 * PARALLAX_FACTORS[0], 600 * PARALLAX_FACTORS[0]])
  const can1x = useTransform(mouseX, [-800, 800], [-800 * PARALLAX_FACTORS[1], 800 * PARALLAX_FACTORS[1]])
  const can1y = useTransform(mouseY, [-600, 600], [-600 * PARALLAX_FACTORS[1], 600 * PARALLAX_FACTORS[1]])
  const can2x = useTransform(mouseX, [-800, 800], [-800 * PARALLAX_FACTORS[2], 800 * PARALLAX_FACTORS[2]])
  const can2y = useTransform(mouseY, [-600, 600], [-600 * PARALLAX_FACTORS[2], 600 * PARALLAX_FACTORS[2]])
  const can3x = useTransform(mouseX, [-800, 800], [-800 * PARALLAX_FACTORS[3], 800 * PARALLAX_FACTORS[3]])
  const can3y = useTransform(mouseY, [-600, 600], [-600 * PARALLAX_FACTORS[3], 600 * PARALLAX_FACTORS[3]])

  const canParallax = [
    { x: can0x, y: can0y },
    { x: can1x, y: can1y },
    { x: can2x, y: can2y },
    { x: can3x, y: can3y },
  ]

  useEffect(() => {
    if (shouldReduce) return
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [mouseX, mouseY, shouldReduce])

  // Entrance delay schedule (seconds)
  const line1Delays = LINE_ONE_WORDS.map((_, i) => 0.1 + i * 0.08)
  const line2Delays = LINE_TWO_WORDS.map((_, i) => 0.8 + i * 0.08)
  const canEntranceDelays = CAN_CLUSTER.map((_, i) => 1.7 + i * 0.15)

  return (
    <section
      className="relative flex flex-col items-start justify-center px-8 md:px-24 overflow-hidden"
      style={{ height: '100vh' }}
      aria-label="Hero"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{ backgroundImage: NOISE_BG, backgroundSize: '200px 200px' }}
        aria-hidden="true"
      />

      {/* Text content — constrained to left 44% on desktop so cans never overlap */}
      <div className="relative z-10 w-full md:max-w-[44%]">
        {/* Eyebrow */}
        <motion.p
          className="font-body text-xs font-bold uppercase tracking-[0.35em] text-white/50 mb-5"
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0 }}
        >
          Premium Sparkling Water
        </motion.p>

        {/* Kinetic headline */}
        <h1
          className="font-display font-extrabold leading-[0.88] tracking-tight text-white mb-5"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
        >
          <span className="block">
            {LINE_ONE_WORDS.map((word, i) => (
              <motion.span
                key={`l1-${i}`}
                className="inline-block"
                style={{ marginRight: i < LINE_ONE_WORDS.length - 1 ? '0.28em' : 0 }}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: line1Delays[i] }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block accent-color">
            {LINE_TWO_WORDS.map((word, i) => (
              <motion.span
                key={`l2-${i}`}
                className="inline-block"
                style={{ marginRight: i < LINE_TWO_WORDS.length - 1 ? '0.28em' : 0 }}
                initial={shouldReduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...SPRING, delay: line2Delays[i] }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          className="font-body text-white/70 max-w-sm mb-7"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)', lineHeight: 1.65 }}
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 1.3 }}
        >
          Sparkling water for people who are bored of sparkling water.
        </motion.p>

        {/* CTA */}
        <motion.a
          href="#flavors"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-display font-bold uppercase tracking-widest text-sm accent-bg"
          style={{ color: '#000' }}
          initial={shouldReduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING, delay: 1.5 }}
          whileHover={shouldReduce ? {} : { scale: 1.05 }}
          whileTap={shouldReduce ? {} : { scale: 0.95 }}
        >
          Pick your flavor
          <svg
            width="16"
            height="16"
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

      {/* Can cluster — desktop only, all cans 18vw, positions in vh/vw */}
      {CAN_CLUSTER.map((can, i) => (
        <motion.div
          key={can.name}
          className="hidden md:block absolute pointer-events-none z-10"
          style={can.pos}
          initial={shouldReduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: canEntranceDelays[i] }}
        >
          {/* Parallax layer */}
          <motion.div style={{ x: canParallax[i].x, y: canParallax[i].y }}>
            {/* Float layer */}
            <motion.div
              animate={shouldReduce ? {} : { y: [0, -can.floatAmplitude, 0] }}
              transition={{
                duration: can.floatDuration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: can.floatDelay,
              }}
              style={{ position: 'relative', display: 'inline-block' }}
            >
              {/* Glow orb */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '75%',
                  height: '30%',
                  borderRadius: '50%',
                  background: can.glowColor,
                  opacity: can.glowOpacity,
                  filter: 'blur(18px)',
                  zIndex: -1,
                }}
              />
              {/* Can image — consistent 18vw across all 4 */}
              <div style={{ transform: `rotate(${can.rotation}deg)` }}>
                <Image
                  src={can.image}
                  alt={can.name}
                  width={260}
                  height={400}
                  className="object-contain"
                  style={{ width: 'clamp(120px, 18vw, 240px)', height: 'auto' }}
                  sizes="18vw"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      {/* Scroll indicator */}
      <div className="absolute bottom-6 flex flex-col items-center gap-2 opacity-40 inset-x-0 mx-auto w-fit">
        <span className="font-body text-white text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <div
          className="w-px h-8 bg-white origin-top"
          style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
        />
      </div>
    </section>
  )
}
