import React from 'react'
import DropDownUser from '../sidebar/user-dropdown'
import { ItemTab } from './item'
import { ChartIcon, TableIcon, UsersIcon } from 'icons'

export default function Tabs() {
  return (
    <div className="w-full p-2 flex items-center px-3 border-b border-neutral-200 bg-white">
      <nav className="max-w-5xl font-medium mx-auto flex w-full">
        <ItemTab icon={<TableIcon />} href="/workspace" title="Pisos y sedes" />
        <ItemTab
          icon={<UsersIcon />}
          href="/workspace/users"
          title="Usuarios"
        />
        <ItemTab
          icon={<ChartIcon />}
          href="/workspace/reports"
          title="Reportes"
        />
      </nav>
      <DropDownUser />
    </div>
  )
}
