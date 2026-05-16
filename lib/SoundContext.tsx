'use client'

import { createContext, useContext, useRef, useState, useCallback } from 'react'

interface SoundContextValue {
  soundEnabled: boolean
  toggleSound: () => void
  playFizz: () => void
}

const SoundContext = createContext<SoundContextValue | null>(null)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const ensureAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    return audioCtxRef.current
  }, [])

  const playFizz = useCallback(() => {
    if (!soundEnabled) return
    try {
      const ctx = ensureAudioCtx()
      if (ctx.state === 'suspended') ctx.resume()

      const sampleRate = ctx.sampleRate
      const duration = 0.35
      const bufferSize = Math.floor(sampleRate * duration)
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate)
      const data = buffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.value = 3500
      filter.Q.value = 0.8

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      source.start()
    } catch {
      // AudioContext not available (SSR guard)
    }
  }, [soundEnabled, ensureAudioCtx])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev)
  }, [])

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playFizz }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used inside SoundProvider')
  return ctx
}
