'use client'

import React from 'react'
import { ItemNav } from './item'
import { useUI } from 'stores'

type Props = {
  slug: string
}

function FloorNav({ slug }: Props) {
  const isEditing = useUI((store) => store.isEditing)
  return (
    <div className="flex justify-center w-full fixed top-2 left-0 pl-[--sidebar-width] pointer-events-none z-50">
      <header
        aria-hidden={isEditing}
        className="aria-hidden:opacity-25 pointer-events-auto aria-hidden:pointer-events-none"
      >
        <div className="flex text-lg justify-center">
          <ItemNav href={`/floors/${slug}`} title="Mesas" />
          <ItemNav
            href={`/floors/${slug}/reservations`}
            title="Reservaciones"
          />
        </div>
      </header>
    </div>
  )
}

export default FloorNav
