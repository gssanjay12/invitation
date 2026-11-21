import { useEffect, useRef, useState } from 'react'
import { weddingData as d } from '../data/weddingData'
import { Reveal, Divider, Lotus, Mandala, Photo } from './Ornaments'

const PETAL = 'M100 100 C80 78 82 40 100 14 C118 40 120 78 100 100Z'
const RINGS = [
  { n: 8, off: 0, s: 1, fill: 'url(#pg1)', delay: 0 },
  { n: 8, off: 22.5, s: 0.78, fill: 'url(#pg2)', delay: 120 },
  { n: 6, off: 0, s: 0.55, fill: 'url(#pg3)', delay: 240 },
]
const norm = (a) => { a = ((a % 360) + 360) % 360; return a > 180 ? a - 360 : a }
const DRIFT = [[-38, -70], [30, -90], [-12, -110], [48, -60], [-50, -95], [8, -120]]
const DURATION = 1500

export function BloomSection() {
  const { bloom } = d
  const [open, setOpen] = useState(false)
  const busy = useRef(false)
  const wrap = useRef(null)

  const toggle = () => {
    if (busy.current) return            // ignore taps while animating
    busy.current = true
    setOpen((o) => !o)
    setTimeout(() => { busy.current = false }, DURATION)
  }

  // tap outside the flower closes it
  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (wrap.current && !wrap.current.contains(e.target)) toggle() }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [open])

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
      <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(140vw,150svh)] pointer-events-none" />
      <div className="relative w-full text-center px-6 py-14">
        <Reveal>
          <p className="font-serif-ta font-bold t-strong tamil-lines max-w-2xl mx-auto">{bloom.greeting}</p>
          <Divider className="my-4" />
        </Reveal>

        <div ref={wrap} className={`bloom-wrap relative mx-auto w-[min(92vw,34rem,62svh)] aspect-square ${open ? 'is-open' : ''}`}>
          <div className="glow absolute inset-[6%] rounded-full pointer-events-none" />
          <div className="breathe absolute inset-0">
            <svg viewBox="0 0 200 200" className="flower-svg absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <linearGradient id="pg1" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#fde4ea" /><stop offset="1" stopColor="#e86a8a" /></linearGradient>
                <linearGradient id="pg2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#fff0f3" /><stop offset="1" stopColor="#f08fa6" /></linearGradient>
                <linearGradient id="pg3" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#fffaf0" /><stop offset="1" stopColor="#f6a9bd" /></linearGradient>
              </defs>
              {RINGS.map((r, ri) =>
                Array.from({ length: r.n }).map((_, i) => {
                  const a = norm(r.off + (360 / r.n) * i)
                  const deg = open ? a : a * 0.12
                  return (
                    <path key={`${ri}-${i}`} d={PETAL} fill={r.fill} stroke="#b88a2e" strokeWidth=".7"
                      className="petal"
                      style={{ transform: `rotate(${deg}deg) scale(${open ? r.s : r.s * 0.86})`, transitionDelay: `${open ? r.delay + i * 25 : 0}ms` }} />
                  )
                })
              )}
              <circle cx="100" cy="100" r="7" fill="#e2c26a" stroke="#b88a2e" strokeWidth=".8" className="bud-core" />
            </svg>
          </div>

          {/* revealed photograph, centred in the bloom */}
          <div className="absolute left-1/2 top-1/2 w-[42%] aspect-[4/5] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="bloom-photo w-full h-full rounded-t-full border-[3px] border-gold p-1 bg-sandal shadow-[0_0_30px_rgba(226,194,106,.6)]">
              <div className="w-full h-full rounded-t-full border border-maroon/70 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-sandal to-[#e3c58a]">
                <Photo name="couple" alt={bloom.names} />
              </div>
            </div>
          </div>

          {open && DRIFT.map(([x, y], i) => (
            <svg key={i} viewBox="0 0 20 30" className="drift" style={{ '--x': `${x}px`, '--y': `${y}px`, animationDelay: `${0.9 + i * 0.5}s` }} aria-hidden="true">
              <path d="M10 28 C2 20 3 8 10 1 C17 8 18 20 10 28Z" fill="#f6a9bd" stroke="#b88a2e" strokeWidth=".6" />
            </svg>
          ))}

          <button type="button" onClick={toggle} aria-expanded={open}
            aria-label={open ? bloom.closeLabel : bloom.openLabel}
            className="bloom-btn absolute inset-0 rounded-full cursor-pointer bg-transparent border-0 p-0 outline-none focus-visible:ring-2 focus-visible:ring-gold" />
        </div>

        <div className="relative mt-4 min-h-[7.5rem]">
          <p className={`hint font-serif-ta t-body text-gold absolute inset-x-0 ${open ? 'is-off' : ''}`}>{bloom.hint}</p>
          <div className={`bloom-names font-serif-ta font-extrabold text-red t-h2 leading-[1.35] ${open ? 'is-on' : ''}`}>
            <div>{bloom.names}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
