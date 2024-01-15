import React from 'react'
import DropDownUser from '../sidebar/user-dropdown'
import { ItemTab } from './item'

export default function Tabs() {
  return (
    <div className="w-full p-2 flex items-center px-3 border-b border-neutral-700 bg-neutral-800">
      <nav className="max-w-5xl font-medium mx-auto flex w-full">
        <ItemTab href="/workspace" title="Pisos y sedes" />
        <ItemTab href="/workspace/users" title="Usuarios" />
      </nav>
      <DropDownUser />
    </div>
  )
}
