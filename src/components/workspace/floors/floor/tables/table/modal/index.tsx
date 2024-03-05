import React from 'react'
import ChairList from './chairs'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { MultipleUsers } from './multiple-user'
// import Bookings from './bookings'

type Props = { table: NewTypeTable }

export default function ModalContent({ table }: Props) {
  return (
    <div className="w-full max-700:min-h-[auto] min-h-[500px] h-full flex flex-col divide-neutral-800 p-4">
      {/* <Bookings table={table} /> */}
      <ChairList table={table} />
      <MultipleUsers table={table} />
    </div>
  )
}
