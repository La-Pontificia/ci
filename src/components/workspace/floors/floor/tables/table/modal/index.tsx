import React from 'react'
import ChairList from './chairs'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { MultipleUsers } from './multiple-user'

type Props = { table: NewTypeTable; isReserved: boolean }

export default function ModalContent({ table, isReserved }: Props) {
  return (
    <div className="w-full max-w-[31rem] mx-auto relative max-700:min-h-[auto] min-h-[500px] h-full flex flex-col divide-neutral-800 p-4 pt-0">
      {isReserved && (
        <div className="absolute z-[1] inset-0 bg-white/60 font-semibold text-xl grid place-content-center">
          Mesa reservado
        </div>
      )}
      <h2 className="text-center pb-1 -mt-1.5 text-lg font-semibold">
        {table.name}
      </h2>
      <ChairList table={table} />
      <MultipleUsers table={table} />
    </div>
  )
}
