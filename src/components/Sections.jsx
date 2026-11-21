import { invitation as d } from '../data/invitation'
import { Reveal, ThoranamRow, Garlands, Ganesha, Kuthuvilakku, Divider, Lotus, Mandala, Frame } from './Ornaments'

const Section = ({ children, className = '' }) => (
  <section className={`relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden ${className}`}>
    <div className="w-full">{children}</div>
  </section>
)

const Backdrop = () => (
  <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(140vw,150svh)] pointer-events-none" />
)

const Row = ({ label, value, className = '' }) => (
  <div className={`py-2.5 text-center ${className}`}>
    <div className="t-label text-gold tracking-wide">{label}</div>
    <div className="font-serif-ta font-bold t-strong leading-snug break-words">{value}</div>
  </div>
)

const SideLamps = () => (
  <div className="hidden lg:flex flex-col items-center justify-center gap-8">
    <Lotus size={64} /><Kuthuvilakku className="lamp-xl" /><Lotus size={64} />
  </div>
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
            <p className="font-serif-ta t-body mt-2 text-red">{d.invocation}</p>
            <p className="font-serif-ta t-strong gold-text mt-3">{d.titleSmall}</p>
            <h1 className="font-serif-ta font-extrabold t-title leading-tight mt-1">{d.title}</h1>
          </Reveal>
          <Reveal delay={300}><Divider className="my-[clamp(1.25rem,3vh,2.5rem)]" /></Reveal>
          <Reveal delay={450}>
            <div className="flex items-center justify-center gap-3">
              <Kuthuvilakku className="lamp lg:hidden" />
              <div className="font-serif-ta font-extrabold text-red t-name leading-[1.3] break-words min-w-0">
                <div>{d.bride.name}</div>
                <div className="t-strong text-gold my-1">{d.labels.and}</div>
                <div>{d.groom.name}</div>
              </div>
              <Kuthuvilakku className="lamp lg:hidden" />
            </div>
          </Reveal>
          <Reveal delay={600}><div className="flex justify-center mt-8 lg:hidden"><Lotus size={64} /></div></Reveal>
        </div>
        <SideLamps />
      </div>
    </Section>
  )
}

const Parents = ({ side }) => (
  <div className="text-center">
    <div className="font-serif-ta t-body text-gold">{side.label}</div>
    <div className="font-serif-ta font-bold t-strong mt-1">{side.father}</div>
    <div className="font-serif-ta font-bold t-strong">{side.mother}</div>
  </div>
)

export function Family() {
  const f = d.family
  return (
    <Section className="md:py-[6vh]">
      <Garlands side="left" className="hidden lg:block" /><Garlands side="right" className="hidden lg:block" />
      <Frame className="md:max-w-[min(64rem,86vw)]">
        <Reveal>
          <p className="font-serif-ta text-center tamil-lines t-body max-w-3xl mx-auto">{f.intro}</p>
          <Divider className="my-5" />
        </Reveal>
        <Reveal delay={150}>
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:gap-10 items-center">
            <Parents side={f.brideSide} />
            <Divider className="divider-sm md:hidden" />
            <div className="hidden md:block w-px h-24 bg-gold/70" />
            <Parents side={f.groomSide} />
          </div>
        </Reveal>
        <Reveal delay={300}>
          <Divider className="my-5" />
          <p className="font-serif-ta text-center tamil-lines t-body max-w-3xl mx-auto">{f.invite}</p>
        </Reveal>
      </Frame>
    </Section>
  )
}

const Portrait = ({ person, label }) => (
  <div className="text-center">
    <div className="portrait relative mx-auto rounded-t-full border-[3px] border-gold p-1.5 bg-sandal">
      <div className="w-full h-full rounded-t-full border border-maroon/70 overflow-hidden flex items-end justify-center bg-gradient-to-b from-sandal to-[#e3c58a]">
        {person.photo ? <img src={person.photo} alt={person.name} loading="lazy" className="w-full h-full object-cover" /> : <Lotus size={70} />}
      </div>
    </div>
    <div className="t-label text-gold mt-3">{label}</div>
    <div className="font-serif-ta font-extrabold t-h2 text-red break-words px-2">{person.name}</div>
  </div>
)

export function Couple() {
  return (
    <Section>
      <Backdrop />
      <Garlands side="left" className="hidden lg:block" /><Garlands side="right" className="hidden lg:block" />
      <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-[clamp(2rem,6vw,6rem)] max-w-6xl mx-auto px-6 py-14">
        <Reveal><Portrait person={d.groom} label={d.labels.groomBlessing} /></Reveal>
        <Reveal delay={150}>
          <div className="flex md:flex-col items-center justify-center gap-3">
            <Divider className="divider-sm md:hidden" /><div className="hidden md:block w-px h-20 bg-gold/70" />
            <Lotus size={46} />
            <Divider className="divider-sm md:hidden" /><div className="hidden md:block w-px h-20 bg-gold/70" />
          </div>
        </Reveal>
        <Reveal delay={300}><Portrait person={d.bride} label={d.labels.brideBlessing} /></Reveal>
      </div>
    </Section>
  )
}

export function Wedding() {
  const w = d.wedding, l = d.labels
  return (
    <Section className="md:py-[6vh]">
      <Garlands side="left" className="hidden lg:block" /><Garlands side="right" className="hidden lg:block" />
      <Frame className="bg-sandal/50 md:max-w-[min(60rem,86vw)]">
        <Reveal>
          <h2 className="font-serif-ta font-extrabold t-h2 text-center text-red">{w.heading}</h2>
          <Divider className="my-3" />
        </Reveal>
        <Reveal delay={150}>
          <div className="grid sm:grid-cols-2 sm:gap-x-10 max-w-3xl mx-auto">
            <Row label={l.date} value={w.date} />
            <Row label={l.day} value={w.day} />
            <Row label={l.tamilDate} value={`${w.tamilMonth} ${w.tamilDate}`} />
            <Row label={l.nakshatram} value={w.nakshatram} />
            <Row label={l.muhurtham} value={w.muhurtham} className="sm:col-span-2" />
          </div>
        </Reveal>
        <Reveal delay={300}>
          <Divider className="my-3" />
          <Row label={l.venue} value={w.venue} />
          <p className="font-serif-ta text-center t-body tamil-lines max-w-2xl mx-auto">{w.address}</p>
        </Reveal>
      </Frame>
    </Section>
  )
}

export function Reception() {
  const r = d.reception, l = d.labels
  return (
    <Section>
      <Backdrop />
      <Garlands side="left" className="hidden md:block" /><Garlands side="right" className="hidden md:block" />
      <div className="relative text-center max-w-4xl mx-auto px-8 py-16">
        <Reveal>
          <div className="flex justify-center gap-[clamp(1.5rem,4vw,4rem)] items-end"><Kuthuvilakku className="lamp" /><Lotus size={70} /><Kuthuvilakku className="lamp" /></div>
          <h2 className="font-serif-ta font-extrabold t-h2 text-red mt-5">{r.heading}</h2>
          <Divider className="my-3" />
        </Reveal>
        <Reveal delay={150}>
          <div className="grid sm:grid-cols-3 sm:gap-6">
            <Row label={l.date} value={r.date} /><Row label={l.day} value={r.day} /><Row label={l.time} value={r.time} />
          </div>
          <Divider className="divider-sm my-3" />
          <Row label={l.venue} value={r.venue} />
          <p className="font-serif-ta t-body tamil-lines max-w-2xl mx-auto">{r.address}</p>
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
          <p className="font-serif-ta font-bold text-gold t-strong tamil-lines">{c.blessing}</p>
          <p className="font-serif-ta font-extrabold text-red t-close leading-[1.6] mt-4">{c.message}</p>
        </Reveal>
        <Reveal delay={300}>
          <Divider className="my-5" />
          <p className="font-serif-ta t-body">{c.from}</p>
          <div className="flex justify-center mt-6"><Lotus size={60} /></div>
        </Reveal>
      </div>
      <div className="absolute inset-x-0 bottom-0"><ThoranamRow flip /></div>
    </Section>
  )
}
