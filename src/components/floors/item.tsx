'use client'

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
    <div
      className="border flex items-center w-full relative text-sm dark:hover:border-neutral-500 hover:border-neutral-800 border-neutral-400 h-full font-semibold text-neutral-800 p-5  dark:border-neutral-800 rounded-2xl"
      key={flour._id.toString()}
    >
      <Link
        className="absolute z-[1] inset-0"
        href={`/floors/${flour._id.toString()}`}
      />
      <div>
        <span className="text-neutral-800 dark:text-neutral-50 font-bold text-lg">
          {flour.name}
        </span>
      </div>
      <div className="z-[2] ml-auto relative">
        <Toggle onChangeValue={toggleStatus} checked={flour.status}>
          Estado
        </Toggle>
      </div>
    </div>
  )
}

export default Floor
