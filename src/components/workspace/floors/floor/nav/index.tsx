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
    <nav
      aria-hidden={isEditing}
      className="fixed aria-hidden:opacity-25 aria-hidden:pointer-events-none  z-10 top-0 left-[50%] translate-x-[-50%]"
    >
      <div className="flex text-lg justify-center">
        <ItemNav href={`/workspace/floors/${slug}`} title="Mesas" />
        <ItemNav
          href={`/workspace/floors/${slug}/reservations`}
          title="Reservaciones"
        />
      </div>
    </nav>
  )
}

export default FloorNav
