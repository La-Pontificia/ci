import React from 'react'
import ChairList from './chairs'
import { type NewTypeTable } from 'stores/tables/tables.store'

type Props = { table: NewTypeTable }

export default function ModalContent({ table }: Props) {
  return (
    <div className="h-full w-full divide-x divide-neutral-800 p-4 flex">
      <div className="w-full h-full flex flex-col">
        <h2 className="text-center text-lg font-bold text-neutral-400">
          Reservaciones
        </h2>
        <div className="h-full w-full grid place-content-center">
          <span className="text-blue-600">No hay nada que mostrar</span>
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-center text-lg font-bold text-neutral-400">
          Sillas
        </h2>
        <ChairList table={table} />
      </div>
    </div>
  )
}
