import React from 'react'
import ItemNav from './item'

function Nav() {
  return (
    <div className="grid-cols-2 text-base font-medium w-full grid text-[15px] text-center text-neutral-400">
      <ItemNav href="/me" text="Mis reservaciones" />
      <ItemNav href="/me/report" text="Reporte" />
    </div>
  )
}

export default Nav
