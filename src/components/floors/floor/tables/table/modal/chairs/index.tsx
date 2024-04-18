import React from 'react'
import Chair from './chair'
import { cn } from 'utils'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { MultipleUsers } from './multiple-user'

type Props = {
  table: NewTypeTable
}

export default function Chairs({ table }: Props) {
  const chairsQuantity = table.chairs
  return (
    <div className="w-full z-[0] overflow-y-auto gap-2 hidden-scroll">
      <div
        className={cn(
          'grid grid-flow-col grid-rows-2 auto-rows-auto w-full gap-2',
          table.type === 'pc' && 'grid-rows-1'
        )}
      >
        {[...Array(chairsQuantity)].map((_, index) => (
          <Chair
            index={index + 1}
            key={index + 1 + 'chair-sscs'}
            currentUser={table.current_users.find((e) => e.chair === index + 1)}
            table={table}
          />
        ))}
      </div>
      <MultipleUsers table={table} />
    </div>
  )
}
