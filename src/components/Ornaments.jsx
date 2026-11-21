import { useEffect, useRef } from 'react'

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) { el?.classList.add('in'); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect() }
    }, { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${className}`}>{children}</div>
}

/* Mango-leaf thoranam strung across the top */
export function Thoranam() {
  const n = 9
  return (
    <svg viewBox="0 0 400 90" className="w-full block" aria-hidden="true">
      <path d="M0 6 Q200 26 400 6" fill="none" stroke="#b88a2e" strokeWidth="2.5" />
      {Array.from({ length: n }).map((_, i) => {
        const x = 22 + i * (356 / (n - 1))
        const y = 6 + 20 * Math.sin((i / (n - 1)) * Math.PI) * 0.9 + 3
        return (
          <g key={i} transform={`translate(${x} ${y})`}><g className="sway" style={{ animationDelay: `${i * 0.35}s` }}>
            <path d="M0 0 C-14 22 -10 48 0 66 C10 48 14 22 0 0Z" fill="#2f6b2f" />
            <path d="M0 4 L0 62" stroke="#a6d28a" strokeWidth="1" opacity=".7" />
            <circle cx="0" cy="72" r="5" fill="#e68a00" />
            <circle cx="0" cy="72" r="2" fill="#9b1c1f" />
          </g></g>
        )
      })}
    </svg>
  )
}

/* Thoranam repeated across the width: 1 swag on phones, 2 on tablets, 3+ on desktop */
export function ThoranamRow({ flip = false }) {
  return (
    <div className={`flex w-full pointer-events-none ${flip ? 'rotate-180' : ''}`}>
      <div className="flex-1"><Thoranam /></div>
      <div className="flex-1 hidden md:block"><Thoranam /></div>
      <div className="flex-1 hidden xl:block"><Thoranam /></div>
      <div className="flex-1 hidden 2xl:block"><Thoranam /></div>
    </div>
  )
}

/* Hanging marigold garlands (ref 1 & 3) */
export function Garlands({ side, className = '' }) {
  const strands = [70, 110, 85]
  return (
    <svg viewBox="0 0 60 130" className={`garland absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'} ${className}`} aria-hidden="true">
      {strands.map((len, i) => (
        <g key={i} className="sway" style={{ animationDelay: `${i * 0.8}s` }}>
          <line x1={10 + i * 20} y1="0" x2={10 + i * 20} y2={len} stroke="#7a1a1f" strokeWidth=".8" />
          {Array.from({ length: Math.floor(len / 8) }).map((_, k) => (
            <circle key={k} cx={10 + i * 20} cy={5 + k * 8} r="4" fill={k % 3 === 2 ? '#c8461a' : '#f2a300'} />
          ))}
          <circle cx={10 + i * 20} cy={len + 5} r="5" fill="#b3261e" />
        </g>
      ))}
    </svg>
  )
}

/* Simplified Ganesha mark in maroon line-work */
export function Ganesha({ size = 84 }) {
  return (
    <svg viewBox="0 0 100 110" style={{ width: `clamp(${size * 0.85}px, ${size / 8}vw, ${size * 1.5}px)`, height: 'auto' }} aria-label="Ganesha" role="img">
      <g fill="none" stroke="#7a1a1f" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M38 22 Q50 8 62 22" />
        <path d="M30 24 Q50 14 70 24 L66 34 Q50 28 34 34Z" fill="#e2c26a" stroke="#b88a2e" />
        <path d="M34 36 Q6 30 8 62 Q12 82 34 70" />
        <path d="M66 36 Q94 30 92 62 Q88 82 66 70" />
        <path d="M34 36 Q50 30 66 36 Q70 60 56 72 Q54 92 62 100 Q70 104 72 92" />
        <path d="M34 36 Q30 60 44 72 Q46 90 40 98" />
        <circle cx="43" cy="50" r="1.8" fill="#7a1a1f" />
        <circle cx="57" cy="50" r="1.8" fill="#7a1a1f" />
        <path d="M50 28 L50 38" stroke="#9b1c1f" />
        <path d="M30 88 Q36 76 46 82" />
      </g>
    </svg>
  )
}

/* Kuthuvilakku, the traditional brass lamp */
export function Kuthuvilakku({ className = '' }) {
  return (
    <svg viewBox="0 0 60 130" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="brass" x1="0" x2="1">
          <stop offset="0" stopColor="#8a5f12" /><stop offset=".5" stopColor="#f0cf75" /><stop offset="1" stopColor="#8a5f12" />
        </linearGradient>
      </defs>
      <path className="flame" d="M30 4 C22 16 24 24 30 28 C36 24 38 16 30 4Z" fill="#ff9d1c" />
      <path className="flame" d="M30 12 C27 18 28 22 30 24 C32 22 33 18 30 12Z" fill="#fff0a0" />
      <path d="M10 30 Q30 46 50 30 L46 38 Q30 48 14 38Z" fill="url(#brass)" />
      <rect x="27" y="40" width="6" height="40" fill="url(#brass)" />
      <ellipse cx="30" cy="54" rx="9" ry="4" fill="url(#brass)" />
      <ellipse cx="30" cy="70" rx="12" ry="5" fill="url(#brass)" />
      <path d="M20 82 Q30 76 40 82 L48 118 L12 118Z" fill="url(#brass)" />
      <rect x="8" y="118" width="44" height="7" rx="3" fill="url(#brass)" />
    </svg>
  )
}

/* Gold separator with diamond and kolam-style dots */
export function Divider({ className = '' }) {
  return (
    <svg viewBox="0 0 240 24" className={`divider mx-auto block ${className}`} aria-hidden="true">
      <g stroke="#b88a2e" strokeWidth="1.2" fill="none">
        <path d="M6 12 H98" /><path d="M142 12 H234" />
        <path d="M120 3 L131 12 L120 21 L109 12Z" fill="#e2c26a" />
        <path d="M100 12 q4 -6 8 0 q-4 6 -8 0Z" /><path d="M132 12 q4 -6 8 0 q-4 6 -8 0Z" />
      </g>
      <g fill="#9b1c1f"><circle cx="120" cy="12" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="234" cy="12" r="2" /></g>
    </svg>
  )
}

/* Lotus, used as decoration and photo-frame filler */
export function Lotus({ size = 56 }) {
  return (
    <svg viewBox="0 0 80 50" style={{ width: `clamp(${size * 0.7}px, ${size / 7}vw, ${size * 1.6}px)`, height: 'auto' }} aria-hidden="true">
      <g stroke="#9b1c1f" strokeWidth="1">
        <path d="M40 46 C28 38 26 18 40 4 C54 18 52 38 40 46Z" fill="#e86a8a" />
        <path d="M38 46 C20 44 8 30 6 16 C22 18 36 28 38 46Z" fill="#f08fa6" />
        <path d="M42 46 C60 44 72 30 74 16 C58 18 44 28 42 46Z" fill="#f08fa6" />
      </g>
    </svg>
  )
}

/* Rotating-feel mandala (static, subtle) used as faint section backdrop */
export function Mandala({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <g fill="none" stroke="#b88a2e" strokeWidth=".8" opacity=".35">
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={i} cx="100" cy="46" rx="9" ry="30" transform={`rotate(${i * 22.5} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="22" /><circle cx="100" cy="100" r="68" /><circle cx="100" cy="100" r="92" strokeDasharray="2 4" />
      </g>
    </svg>
  )
}

/* Temple-style ornamental frame for each section */
export function Frame({ children, className = '' }) {
  const corner = (cls) => (
    <svg viewBox="0 0 40 40" className={`absolute corner ${cls}`} aria-hidden="true">
      <path d="M2 38 V2 H38" fill="none" stroke="#b88a2e" strokeWidth="2.5" />
      <path d="M8 38 V8 H38" fill="none" stroke="#9b1c1f" strokeWidth="1" />
      <circle cx="8" cy="8" r="3" fill="#b88a2e" />
    </svg>
  )
  return (
    <div className={`relative w-full mx-auto ${className}`}>
      <div className="absolute inset-3 border border-gold/70 pointer-events-none" />
      <div className="absolute inset-[18px] border-2 border-maroon/80 pointer-events-none" />
      {corner('top-1.5 left-1.5')}
      {corner('top-1.5 right-1.5 scale-x-[-1]')}
      {corner('bottom-1.5 left-1.5 scale-y-[-1]')}
      {corner('bottom-1.5 right-1.5 scale-[-1]')}
      <div className="relative frame-pad">{children}</div>
    </div>
  )
}
