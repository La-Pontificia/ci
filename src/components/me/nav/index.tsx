import React from 'react'
import ItemNav from './item'
import { AccountIcon, ChartIcon, TableIcon } from 'icons'

function Nav() {
  return (
    <div className="grid-cols-3 border-t border-neutral-300 text-base font-medium w-full grid text-[15px] text-center text-neutral-600">
      <ItemNav icon={<TableIcon />} href="/me" text="Reservas" />
      <ItemNav icon={<ChartIcon />} href="/me/records" text="Historial" />
      <ItemNav icon={<AccountIcon />} href="/me/account" text="Cuenta" />
    </div>
  )
}

export default Nav
