import { useEffect, useRef, useState } from 'react'
import { weddingData as d } from '../data/weddingData'
import { ThoranamRow, Garlands, Lotus, Mandala } from './Ornaments'

// ms at which each step starts: 1 loosen, 2 slide away, 3 envelope opens, 4 reveal, 5 done (~4.7s)
const T = [0, 900, 2300, 3400, 4700]
const SPARKS = Array.from({ length: 20 }, (_, i) => ({ x: 8 + ((i * 47) % 84), dx: ((i * 37) % 70) - 35, dl: (i % 7) * 0.3, petal: i % 3 === 0 }))

const Rope = ({ path, cls, w = 9 }) => (
  <g className={`rp ${cls}`}>
    <path d={path} pathLength="1" fill="none" stroke="url(#rope)" strokeWidth={w} strokeLinecap="round" />
    <path d={path} pathLength="1" fill="none" stroke="#f3dc95" strokeOpacity=".75" strokeWidth={w * 0.28} strokeLinecap="round" transform="translate(-1.2 -1.2)" />
  </g>
)

export function Untie({ onReveal }) {
  const [step, setStep] = useState(0)
  const busy = useRef(false)

  useEffect(() => {
    document.body.style.overflow = step < 5 ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [step])

  const start = () => {
    if (busy.current) return
    busy.current = true
    const k = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.25 : 1
    T.forEach((t, i) => setTimeout(() => {
      setStep(i + 1)
      if (i === 3) { window.scrollTo(0, 0); onReveal?.() }
    }, t * k))
  }

  if (step >= 5) return null
  const f = (n) => (step >= n ? '1' : undefined)

  return (
    <div className="untie fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden text-ivory bg-[radial-gradient(circle_at_50%_40%,#7a1a1f,#3d080c_75%)]"
      data-loose={f(1)} data-slide={f(2)} data-open={f(3)} data-reveal={f(4)}
      style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(150vw,150svh)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0"><ThoranamRow /></div>
      <Garlands side="left" /><Garlands side="right" />
      <div className="absolute bottom-3 left-3 right-3 flex justify-between pointer-events-none opacity-90"><Lotus size={60} /><Lotus size={60} /></div>

      <div className="stage relative h-[min(64svh,38rem)] aspect-[4/5]">
        <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="rope" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8a5f12" /><stop offset=".5" stopColor="#d9b24f" /><stop offset="1" stopColor="#7a1a1f" /></linearGradient>
            <linearGradient id="env" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8a1b22" /><stop offset="1" stopColor="#5a0f14" /></linearGradient>
          </defs>
          <rect x="40" y="120" width="320" height="300" rx="5" fill="#3d080c" stroke="#b88a2e" strokeWidth="2" />
          <g className="card">
            <rect x="62" y="140" width="276" height="260" rx="3" fill="#fbf3e2" stroke="#b88a2e" strokeWidth="2.5" />
            <rect x="72" y="150" width="256" height="240" fill="none" stroke="#9b1c1f" strokeWidth="1" />
            <text x="200" y="215" textAnchor="middle" fontSize="30" fill="#b88a2e" style={{ fontFamily: 'var(--font-serif-ta)' }}>{d.titleSmall}</text>
            <text x="200" y="268" textAnchor="middle" fontSize="26" fontWeight="800" fill="#5a0f14" style={{ fontFamily: 'var(--font-serif-ta)' }}>{d.opening.cardTitle}</text>
            <path d="M120 295 H280" stroke="#b88a2e" strokeWidth="1.5" />
          </g>
          <path d="M40 420 L40 120 L200 270 L360 120 L360 420Z" fill="url(#env)" stroke="#b88a2e" strokeWidth="2" />
          <path d="M40 420 L200 285 L360 420" fill="none" stroke="#b88a2e" strokeWidth="1.2" opacity=".7" />
          <path className="flap" d="M40 120 L200 270 L360 120Z" fill="#7a1a1f" stroke="#b88a2e" strokeWidth="2" />

          <Rope cls="rp-h rp-l" path="M190 250 Q100 264 -30 250" />
          <Rope cls="rp-h rp-r" path="M210 250 Q300 236 430 250" />
          <Rope cls="rp-v rp-u" path="M200 238 Q212 120 200 -30" />
          <Rope cls="rp-v rp-d" path="M200 262 Q188 380 200 530" />
          <Rope cls="bow bow-a" path="M200 250 C150 170 100 215 148 262 C168 282 194 264 200 250" w={7} />
          <Rope cls="bow bow-b" path="M200 250 C250 170 300 215 252 262 C232 282 206 264 200 250" w={7} />
          <Rope cls="rp-t tas-a" path="M193 266 C186 300 190 325 186 355" w={6} />
          <Rope cls="rp-t tas-b" path="M207 266 C214 300 210 325 214 355" w={6} />
          <circle className="ring" cx="200" cy="250" r="30" fill="none" stroke="#e2c26a" strokeWidth="1.5" />
          <g className="k-knot">
            <circle cx="200" cy="250" r="19" fill="url(#rope)" stroke="#f3dc95" strokeWidth="2" />
            <circle cx="200" cy="250" r="10" fill="none" stroke="#f3dc95" strokeWidth="2" />
            <circle cx="200" cy="250" r="3" fill="#f3dc95" />
          </g>
        </svg>
        <button type="button" onClick={start} autoFocus aria-label={d.opening.ariaLabel}
          className="knot-btn absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[24%] aspect-square rounded-full bg-transparent border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold-light" />
        {step >= 3 && SPARKS.map((s, i) => (
          <span key={i} className={`spark ${s.petal ? 'spark-petal' : ''}`} style={{ left: `${s.x}%`, '--dx': `${s.dx}px`, animationDelay: `${s.dl}s` }} />
        ))}
      </div>

      <p className={`relative mt-6 px-6 text-center font-serif-ta t-body text-gold-light transition-opacity duration-700 ${step ? 'opacity-0' : 'hint-pulse'}`}>{d.opening.instruction}</p>
    </div>
  )
}
