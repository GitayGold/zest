'use client'

import { useEffect, useRef } from 'react'
import { useFlavor } from '@/lib/FlavorContext'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const { flavor } = useFlavor()

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        el.classList.add('is-hovering')
      }
    }

    const onLeave = () => {
      el.classList.remove('is-hovering')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  // Keep accent color in sync — CSS var handles it, but force repaint if needed
  void flavor.accent

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
      style={{ left: '-100px', top: '-100px' }}
    />
  )
}
