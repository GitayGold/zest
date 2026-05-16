'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { flavors, type Flavor } from './flavors'

interface FlavorContextValue {
  activeIndex: number
  setActiveIndex: (i: number) => void
  flavor: Flavor
}

const FlavorContext = createContext<FlavorContextValue | null>(null)

export function FlavorProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndexState] = useState(0)

  const setActiveIndex = useCallback((i: number) => {
    setActiveIndexState(i)
  }, [])

  useEffect(() => {
    const f = flavors[activeIndex]
    document.documentElement.style.setProperty('--flavor-bg', f.bg)
    document.documentElement.style.setProperty('--flavor-accent', f.accent)
  }, [activeIndex])

  return (
    <FlavorContext.Provider
      value={{ activeIndex, setActiveIndex, flavor: flavors[activeIndex] }}
    >
      {children}
    </FlavorContext.Provider>
  )
}

export function useFlavor(): FlavorContextValue {
  const ctx = useContext(FlavorContext)
  if (!ctx) throw new Error('useFlavor must be used inside FlavorProvider')
  return ctx
}
