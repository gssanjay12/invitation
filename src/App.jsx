import { Cover, Family, Couple, Wedding, Reception, Closing } from './components/Sections'

export default function App() {
  return (
    <main className="safe card-paper w-full min-h-[100svh] overflow-x-clip">
      <Cover /><Family /><Couple /><Wedding /><Reception /><Closing />
    </main>
  )
}
