import { useEffect, useState } from 'react'
import { weddingData } from './data/weddingData'
import { Untie } from './components/Untie'
import { BloomSection } from './components/BloomingFlower'
import { Cover, Family, Couple, Wedding, Reception, Closing } from './components/Sections'

export default function App() {
  const [opened, setOpened] = useState(false)

  // theme + fonts come from weddingData.js
  useEffect(() => {
    const r = document.documentElement.style
    Object.entries(weddingData.theme).forEach(([k, v]) => r.setProperty(`--color-${k}`, v))
    r.setProperty('--font-serif-ta', weddingData.fonts.serif)
    r.setProperty('--font-sans-ta', weddingData.fonts.sans)
  }, [])

  return (
    <>
      <Untie onReveal={() => setOpened(true)} />
      {opened && (
        <main className="safe card-paper w-full min-h-[100svh] overflow-x-clip">
          <Cover /><Family /><Couple /><BloomSection /><Wedding /><Reception /><Closing />
        </main>
      )}
    </>
  )
}
