import React from 'react'
import ChairList from './chairs'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { MultipleUsers } from './multiple-user'

type Props = { table: NewTypeTable; isReserved: boolean }

export default function ModalContent({ table, isReserved }: Props) {
  return (
    <div className="w-full relative max-700:min-h-[auto] min-h-[500px] h-full flex flex-col divide-neutral-800 p-4">
      {isReserved && (
        <div className="absolute z-[1] inset-0 bg-white/60 font-semibold text-xl grid place-content-center">
          Mesa reservado
        </div>
      )}
      <ChairList table={table} />
      <MultipleUsers table={table} />
    </div>
  )
}
