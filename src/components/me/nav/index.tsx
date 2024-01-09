import React from 'react'
import ItemNav from './item'

function Nav() {
  return (
    <div className="grid-cols-2 text-base w-full grid text-[15px] font-bold text-center text-neutral-400">
      <ItemNav href="/x" text="Mis reservaciones" />
      <ItemNav href="/report" text="Reporte" />
    </div>
  )
}

export default Nav
