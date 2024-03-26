import React from 'react'
import { ItemTab } from './item'
import { Chart2Icon, TableIcon, Users2Icon } from 'icons'

export default function Sidebar() {
  return (
    <aside className="w-28 fixed h-[calc(100svh-4rem)] flex flex-col border-r p-2 px-3 border-neutral-200 bg-white">
      <nav className="font-medium flex-grow space-y-1 flex flex-col w-full">
        <ItemTab
          icon={<TableIcon className="scale-110" />}
          href="/floors_and_headquarters"
          title="Pisos y sedes"
        />
        <ItemTab icon={<Users2Icon />} href="/users" title="Usuarios" />
        <ItemTab icon={<Chart2Icon />} href="/reports" title="Reportes" />
      </nav>
      <footer></footer>
    </aside>
  )
}
