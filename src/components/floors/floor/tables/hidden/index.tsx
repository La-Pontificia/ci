import React from 'react'
import RemainingTimeHidden from './notify'
import { type NewTypeTable } from 'stores/tables/tables.store'

type Props = {
  table: NewTypeTable
}

function HiddenChairs({ table }: Props) {
  const chairsQuantity = table.chairs
  return (
    <>
      {[...Array(chairsQuantity)].map((_, index) => {
        const currentUser = table.current_users.find(
          (e) => e.chair === index + 1
        )
        if (!currentUser) return null
        return (
          <div key={index + 1} className="hidden">
            <RemainingTimeHidden currentUser={currentUser} table={table} />
          </div>
        )
      })}
    </>
  )
}

export default HiddenChairs
