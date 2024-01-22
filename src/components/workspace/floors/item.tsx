'use client'

import { timeAgo } from 'herpers'
import React from 'react'
import { type Floor as FloorType } from 'types'
import { Toggle } from 'commons/toggle'
import { updateFloor } from 'libs/client/floor'
import Link from 'next/link'

type Props = {
  flour: FloorType
}

function Floor({ flour }: Props) {
  async function toggleStatus() {
    await updateFloor({ status: !flour.status }, flour._id.toString())
  }
  return (
    <div className="relative max-800:w-full" key={flour._id.toString()}>
      <Link
        className="w-[250px] max-800:w-full h-[180px] border border-neutral-300 hover:border-neutral-600 md:w-full flex flex-col font-semibold text-neutral-800 p-5 bg-neutral-100 rounded-2xl shadow-md shadow-black/20"
        href={`/workspace/floors/${flour._id.toString()}`}
      >
        <span className="text-blue-700">{flour.name}</span>
        <span className="text-sm font-normal text-neutral-500">
          {timeAgo(flour.created_at)}
        </span>
        <span className="text-sm capitalize font-normal text-neutral-500">
          - {flour.headquarder}
        </span>
        {IconFloor('w-8 text-neutral-700 mt-auto')}
      </Link>
      <div className="absolute bottom-3 right-2">
        <Toggle onChangeValue={toggleStatus} checked={flour.status} />
      </div>
    </div>
  )
}

const IconFloor = (c?: string) => (
  <svg fill="currentColor" className={c} viewBox="0 0 24 24">
    <path d="M4,9 L4,18.5 C4,19.3284271 4.67157288,20 5.5,20 L15,20 L15,9 L4,9 Z M4,8 L20,8 L20,5.5 C20,4.67157288 19.3284271,4 18.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 L4,8 Z M20,9 L16,9 L16,20 L18.5,20 C19.3284271,20 20,19.3284271 20,18.5 L20,9 Z M21,5.5 L21,18.5 C21,19.8807119 19.8807119,21 18.5,21 L5.5,21 C4.11928813,21 3,19.8807119 3,18.5 L3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L18.5,3 C19.8807119,3 21,4.11928813 21,5.5 Z"></path>{' '}
  </svg>
)

export default Floor
