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
      <div className="flex justify-center w-full fixed top-2 pointer-events-none z-50">
        <header
          aria-hidden={isEditing}
          className="aria-hidden:opacity-25 pointer-events-auto aria-hidden:pointer-events-none"
        >
          <div className="flex text-lg justify-center">
            <ItemNav href={`/workspace/floors/${slug}`} title="Mesas" />
            <ItemNav
              href={`/workspace/floors/${slug}/reservations`}
              title="Reservaciones"
            />
          </div>
        </header>
      </div>
    </Portal>
  )
}

export default FloorNav
