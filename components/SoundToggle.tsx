'use client'

import { useSound } from '@/lib/SoundContext'

export default function SoundToggle() {
  const { soundEnabled, toggleSound } = useSound()

  return (
    <button
      onClick={toggleSound}
      className="flex items-center justify-center w-11 h-11 rounded-full text-white/60 hover:text-white transition-colors duration-200"
      aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
    >
      {soundEnabled ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}
