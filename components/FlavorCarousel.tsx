'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { flavors } from '@/lib/flavors'
import { useFlavor } from '@/lib/FlavorContext'
import { useSound } from '@/lib/SoundContext'
import FlavorCard from '@/components/FlavorCard'
import FlavorDots from '@/components/FlavorDots'

const ADVANCE_INTERVAL = 4500

export default function FlavorCarousel() {
  const { activeIndex, setActiveIndex } = useFlavor()
  const { playFizz } = useSound()
  const dragX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const [slideWidth, setSlideWidth] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  // resetKey increments on manual interaction to restart the 4.5s countdown
  const [resetKey, setResetKey] = useState(0)

  // Refs let the setInterval callback read current values without stale closures
  const activeIndexRef = useRef(activeIndex)
  const slideWidthRef = useRef(slideWidth)
  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])
  useEffect(() => { slideWidthRef.current = slideWidth }, [slideWidth])

  useEffect(() => {
    const update = () => setSlideWidth(window.innerWidth)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // Auto-advance — clears/restarts when paused, when user navigates, or on resize
  useEffect(() => {
    if (isPaused || slideWidth === 0) return

    const id = setInterval(() => {
      const next = (activeIndexRef.current + 1) % flavors.length
      setActiveIndex(next)
      playFizz()
      animate(dragX, -(next * slideWidthRef.current), {
        type: 'spring',
        damping: 30,
        stiffness: 300,
      })
    }, ADVANCE_INTERVAL)

    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, resetKey, slideWidth, dragX, setActiveIndex, playFizz])

  const goToSlide = (i: number) => {
    if (i === activeIndex) return
    setActiveIndex(i)
    playFizz()
    animate(dragX, -(i * slideWidth), { type: 'spring', damping: 30, stiffness: 300 })
    setResetKey((k) => k + 1)
  }

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const { x: offset } = info.offset
    const { x: velocity } = info.velocity
    const threshold = slideWidth * 0.2

    let next = activeIndex
    if (offset < -threshold || velocity < -500) {
      next = Math.min(flavors.length - 1, activeIndex + 1)
    } else if (offset > threshold || velocity > 500) {
      next = Math.max(0, activeIndex - 1)
    }

    if (next !== activeIndex) {
      setActiveIndex(next)
      playFizz()
    }

    animate(dragX, -(next * slideWidth), { type: 'spring', damping: 30, stiffness: 300 })
    setResetKey((k) => k + 1)
  }

  return (
    <section
      id="flavors"
      className="relative overflow-hidden"
      style={{ height: '100svh' }}
      aria-label="Flavor showcase"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        className="flex h-full cursor-grab active:cursor-grabbing select-none"
        style={{ x: dragX, width: `${flavors.length * 100}vw` }}
        drag="x"
        dragConstraints={{
          left: -(flavors.length - 1) * slideWidth,
          right: 0,
        }}
        dragElastic={0.05}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        {flavors.map((flavor, i) => (
          <FlavorCard
            key={flavor.id}
            flavor={flavor}
            index={i}
            isActive={i === activeIndex}
          />
        ))}
      </motion.div>

      <FlavorDots onGoTo={goToSlide} />
    </section>
  )
}
