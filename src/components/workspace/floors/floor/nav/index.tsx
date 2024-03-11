'use client'

import React from 'react'
import { ItemNav } from './item'
import { useUI } from 'stores'
import { Portal } from 'commons/portal'

type Props = {
  slug: string
}

function FloorNav({ slug }: Props) {
  const isEditing = useUI((store) => store.isEditing)
  return (
    <Portal isVisible>
      <nav
        aria-hidden={isEditing}
        className="fixed  aria-hidden:opacity-25 aria-hidden:pointer-events-none z-50 top-1 left-[50%] translate-x-[-50%]"
      >
        <div className="flex text-lg justify-center">
          <ItemNav href={`/workspace/floors/${slug}`} title="Mesas" />
          <ItemNav
            href={`/workspace/floors/${slug}/reservations`}
            title="Reservaciones"
          />
        </div>
      </nav>
    </Portal>
  )
}

export default FloorNav
