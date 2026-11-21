import { weddingData as d } from '../data/weddingData'
import { Reveal, ThoranamRow, Garlands, Ganesha, Kuthuvilakku, Divider, Lotus, Mandala, Frame, Photo } from './Ornaments'

const mapHref = (p) => p.mapUrl || (p.mapQuery ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapQuery)}` : '')

const Section = ({ children, className = '' }) => (
  <section className={`relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden ${className}`}>
    <div className="w-full">{children}</div>
  </section>
)
const Backdrop = () => (
  <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(140vw,150svh)] pointer-events-none" />
)
const GarlandsLg = () => (<><Garlands side="left" className="hidden lg:block" /><Garlands side="right" className="hidden lg:block" /></>)

// Optional-aware row: renders nothing when value is empty. href makes it a Google Maps link.
const Row = ({ label, value, href }) => !value ? null : (
  <div className="py-2.5 text-center min-w-[12rem]">
    <div className="t-label text-gold tracking-wide">{label}</div>
    {href
      ? <a href={href} target="_blank" rel="noopener noreferrer" className="font-serif-ta font-bold t-strong leading-snug break-words underline decoration-dotted decoration-gold underline-offset-4">{value}</a>
      : <div className="font-serif-ta font-bold t-strong leading-snug break-words">{value}</div>}
  </div>
)

const Place = ({ p }) => {
  const href = mapHref(p), l = d.labels
  return (
    <>
      <Row label={l.location} value={p.location} href={href} />
      <Row label={l.venue} value={p.venue} href={href} />
      {p.address && <p className="font-serif-ta text-center t-body tamil-lines max-w-2xl mx-auto"><a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted decoration-gold underline-offset-4">{p.address}</a></p>}
    </>
  )
}

const SideLamps = () => (
  <div className="hidden lg:flex flex-col items-center justify-center gap-8"><Lotus size={64} /><Kuthuvilakku className="lamp-xl" /><Lotus size={64} /></div>
)

export function Cover() {
  return (
    <Section>
      <div className="absolute inset-x-0 top-0"><ThoranamRow /></div>
      <Garlands side="left" /><Garlands side="right" />
      <Backdrop />
      <div className="relative grid lg:grid-cols-[1fr_minmax(0,48rem)_1fr] items-center gap-6 px-[clamp(1.5rem,6vw,4rem)] pt-[clamp(7rem,20vh,14rem)] pb-[clamp(3rem,8vh,6rem)]">
        <SideLamps />
        <div className="text-center">
          <Reveal><div className="flex justify-center"><Ganesha /></div></Reveal>
          <Reveal delay={150}>
            {d.titleSmall && <p className="font-serif-ta t-strong gold-text mt-3">{d.titleSmall}</p>}
            <h1 className="font-serif-ta font-extrabold t-title leading-tight mt-1">{d.title}</h1>
            {d.blessingLine && <p className="font-serif-ta t-body mt-2 text-red">{d.blessingLine}</p>}
          </Reveal>
          <Reveal delay={300}><Divider className="my-[clamp(1.25rem,3vh,2.5rem)]" /></Reveal>
          <Reveal delay={450}>
            <div className="flex items-center justify-center gap-3">
              <Kuthuvilakku className="lamp lg:hidden" />
              <div className="font-serif-ta font-extrabold text-red t-name leading-[1.3] break-words min-w-0">
                <div>{d.bride.name}</div>
                {d.connector && <div className="t-strong text-gold my-1">{d.connector}</div>}
                <div>{d.groom.name}</div>
              </div>
              <Kuthuvilakku className="lamp lg:hidden" />
            </div>
          </Reveal>
        </div>
        <SideLamps />
      </div>
    </Section>
  )
}

export function Family() {
  const f = d.family
  const sides = [f.brideSide, f.groomSide].filter((x) => x && (x.parents || x.father || x.mother))
  return (
    <Section className="md:py-[6vh]">
      <GarlandsLg />
      <Frame className="md:max-w-[min(64rem,86vw)]">
        <Reveal>
          {d.blessingLine && <p className="font-serif-ta text-center font-bold text-red t-strong">{d.blessingLine}</p>}
          {f.intro && <p className="font-serif-ta text-center tamil-lines t-body max-w-3xl mx-auto mt-3">{f.intro}</p>}
          <Divider className="my-5" />
        </Reveal>
        <Reveal delay={150}>
          <div className={`grid gap-5 items-center ${sides.length > 1 ? 'md:grid-cols-[1fr_auto_1fr] md:gap-10' : ''}`}>
            {sides.map((s, i) => (
              <div key={i} className="contents">
                {i > 0 && <><Divider className="divider-sm md:hidden" /><div className="hidden md:block w-px h-24 bg-gold/70" /></>}
                <div className="text-center">
                  {s.label && <div className="font-serif-ta t-body text-gold">{s.label}</div>}
                  {s.parents && <div className="font-serif-ta font-bold t-strong mt-1 max-w-xl mx-auto leading-relaxed">{s.parents}</div>}
                  {s.father && <div className="font-serif-ta font-bold t-strong mt-1">{s.father}</div>}
                  {s.mother && <div className="font-serif-ta font-bold t-strong">{s.mother}</div>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        {f.invite && <Reveal delay={300}><Divider className="my-5" /><p className="font-serif-ta text-center tamil-lines t-body max-w-3xl mx-auto">{f.invite}</p></Reveal>}
      </Frame>
    </Section>
  )
}

const Portrait = ({ person, name, label }) => (
  <div className="text-center">
    <div className="portrait relative mx-auto rounded-t-full border-[3px] border-gold p-1.5 bg-sandal shadow-[0_8px_30px_rgba(90,15,20,.25)]">
      <div className="w-full h-full rounded-t-full border border-maroon/70 overflow-hidden bg-gradient-to-b from-sandal to-[#e3c58a]">
        <Photo name={name} alt={person.name} />
      </div>
    </div>
    <div className="font-serif-ta font-extrabold t-h2 text-red break-words px-2 mt-4">{person.name}</div>
    {person.tagline && <div className="font-sans-ta t-label text-gold mt-1 max-w-[20rem] mx-auto leading-relaxed">{person.tagline}</div>}
  </div>
)

export function Couple() {
  return (
    <Section>
      <Backdrop /><GarlandsLg />
      <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-start gap-8 md:gap-[clamp(2rem,6vw,6rem)] max-w-6xl mx-auto px-6 py-14">
        <Reveal><Portrait person={d.bride} name="bride" /></Reveal>
        <Reveal delay={150}>
          <div className="flex md:flex-col items-center justify-center gap-3 md:pt-24">
            <Divider className="divider-sm md:hidden" /><div className="hidden md:block w-px h-20 bg-gold/70" />
            <Lotus size={46} />
            <Divider className="divider-sm md:hidden" /><div className="hidden md:block w-px h-20 bg-gold/70" />
          </div>
        </Reveal>
        <Reveal delay={300}><Portrait person={d.groom} name="groom" /></Reveal>
      </div>
    </Section>
  )
}

export function Wedding() {
  const w = d.wedding, l = d.labels
  const tamil = [w.tamilMonth, w.tamilDate].filter(Boolean).join(' ')
  const hasPlace = w.location || w.venue || w.address
  return (
    <Section className="md:py-[6vh]">
      <GarlandsLg />
      <Frame className="bg-sandal/50 md:max-w-[min(60rem,86vw)]">
        <Reveal>
          <h2 className="font-serif-ta font-extrabold t-h2 text-center text-red">{w.heading}</h2>
          <Divider className="my-3" />
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-wrap justify-center gap-x-10 max-w-3xl mx-auto">
            <Row label={l.date} value={w.date} /><Row label={l.day} value={w.day} />
            <Row label={l.celebrations} value={w.celebrations} /><Row label={l.tamilDate} value={tamil} />
            <Row label={l.nakshatram} value={w.nakshatram} /><Row label={l.muhurtham} value={w.muhurtham} />
            <Row label={l.time} value={w.time} /><Row label={l.ceremony} value={w.ceremony} />
          </div>
        </Reveal>
        {hasPlace && <Reveal delay={300}><Divider className="my-3" /><Place p={w} /></Reveal>}
      </Frame>
    </Section>
  )
}

export function Reception() {
  const r = d.reception, l = d.labels
  return (
    <Section>
      <Backdrop /><GarlandsLg />
      <div className="relative text-center max-w-4xl mx-auto px-8 py-16">
        <Reveal>
          <div className="flex justify-center gap-[clamp(1.5rem,4vw,4rem)] items-end"><Kuthuvilakku className="lamp" /><Lotus size={70} /><Kuthuvilakku className="lamp" /></div>
          <h2 className="font-serif-ta font-extrabold t-h2 text-red mt-5">{r.heading}</h2>
          <Divider className="my-3" />
        </Reveal>
        <Reveal delay={150}>
          <div className="flex flex-wrap justify-center gap-x-10"><Row label={l.date} value={r.date} /><Row label={l.day} value={r.day} /><Row label={l.time} value={r.time} /></div>
          <Divider className="divider-sm my-3" />
          <Place p={r} />
        </Reveal>
      </div>
    </Section>
  )
}

export function Closing() {
  const c = d.closing
  return (
    <Section>
      <Garlands side="left" /><Garlands side="right" />
      <Backdrop />
      <div className="relative text-center max-w-4xl mx-auto px-[clamp(2.5rem,8vw,6rem)] pt-20 pb-[clamp(6rem,18vh,12rem)]">
        <Reveal><div className="flex justify-center"><Ganesha size={64} /></div></Reveal>
        <Reveal delay={150}>
          <Divider className="my-5" />
          {c.blessing && <p className="font-serif-ta font-bold text-gold t-strong tamil-lines">{c.blessing}</p>}
          {c.message && <p className="font-serif-ta font-extrabold text-red t-close leading-[1.6] mt-4">{c.message}</p>}
        </Reveal>
        <Reveal delay={300}>
          <Divider className="my-5" />
          {c.from && <p className="font-serif-ta t-body">{c.from}</p>}
          <div className="flex justify-center mt-6"><Lotus size={60} /></div>
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0"><ThoranamRow flip /></div>
    </Section>
  )
}
