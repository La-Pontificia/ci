import React from 'react'
import ItemNav from './item'
import { BookIcon, ChartIcon, PortraitUserIcon } from 'icons'

function Nav() {
  return (
    <div
      role="menu"
      className="grid-cols-3 text-base border-b dark:border-neutral-700 font-medium w-full grid text-[15px] text-center text-neutral-600 dark:text-neutral-100/60"
    >
      <ItemNav icon={<BookIcon />} href="/me" text="Reservas" />
      <ItemNav icon={<ChartIcon />} href="/me/records" text="Historial" />
      <ItemNav icon={<PortraitUserIcon />} href="/me/account" text="Cuenta" />
    </div>
  )
}

export default Nav
