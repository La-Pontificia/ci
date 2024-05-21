import { Dialog } from 'commons/dialog'
import { useTheme } from 'next-themes'
import React from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const themes = ['light', 'dark', 'system']
  const displayTheme = (t: string) =>
    t === 'system' ? 'Sistema' : t === 'light' ? 'Claro' : 'Oscuro'
  return (
    <Dialog
      backdrop_blur="sm"
      className="w-[500px] max-md:w-full p-4"
      trigger={
        <button className="w-full text-sm max-md:flex-col max-md:text-xs p-3 font-semibold gap-3 items-center flex rounded-xl">
          <svg
            aria-label="Theme icon"
            fill="currentColor"
            className="w-6"
            role="img"
            viewBox="0 0 24 24"
          >
            <path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
          </svg>
          Apariencia
        </button>
      }
    >
      <h2 className="p-2 pb-4 text-lg font-semibold text-center">
        Apariencia del Sistema
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {themes.map((t) => {
          const isActive = t === theme
          return (
            <button
              onClick={() => setTheme(t)}
              role="tab"
              aria-selected={isActive}
              key={t}
              className="font-medium outline-none rounded-xl aria-selected:outline-4 outline-offset-4 aria-selected:outline-blue-500"
            >
              <div className="rounded-xl overflow-hidden">
                <img src={`/optimize/${t}.webp`} alt="" />
              </div>
              <span className="ml-2 p-2 block">{displayTheme(t)}</span>
            </button>
          )
        })}
      </div>
    </Dialog>
  )
}
