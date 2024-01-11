import React from 'react'
import { ItemNav } from './item'

type Props = {
  slug: string
}

function FloorNav({ slug }: Props) {
  return (
    <nav className="fixed z-10 top-0 left-[50%] translate-x-[-50%]">
      <div className="flex text-lg justify-center">
        <ItemNav href={`/workspace/floors/${slug}`} title="Mesas" />
        <ItemNav
          href={`/workspace/floors/${slug}/reservations`}
          title="Reservas"
        />
      </div>
    </nav>
  )
}

export default FloorNav
