'use client'

import { flavors } from '@/lib/flavors'
import { useFlavor } from '@/lib/FlavorContext'

interface FlavorDotsProps {
  onGoTo: (i: number) => void
}

export default function FlavorDots({ onGoTo }: FlavorDotsProps) {
  const { activeIndex } = useFlavor()

  return (
    <div
      className="absolute bottom-6 start-1/2 -translate-x-1/2 flex items-center gap-1 z-20"
      aria-label="Flavor navigation"
    >
      {flavors.map((f, i) => (
        <button
          key={f.id}
          onClick={() => onGoTo(i)}
          className={`flavor-dot-btn ${i === activeIndex ? 'is-active' : ''}`}
          aria-label={`Go to ${f.name}`}
          aria-current={i === activeIndex ? 'true' : undefined}
        >
          <span className="flavor-dot-inner" />
        </button>
      ))}
    </div>
  )
}
