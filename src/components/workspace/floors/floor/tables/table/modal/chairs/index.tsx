import React from 'react'
import Chair from './chair'
import { cn } from 'utils'
import { type NewTypeTable } from 'stores/tables/tables.store'

type Props = {
  table: NewTypeTable
}

export default function ChairList({ table }: Props) {
  const chairsQuantity = table.chairs
  return (
    <div className="flex flex-wrap pl-4 w-[300px] min-w-[300px] h-full items-center justify-center gap-2 hidden-scroll">
      <div
        className={cn(
          'grid grid-cols-2 gap-2',
          table.type === 'pc' && 'grid-cols-1'
        )}
      >
        {[...Array(chairsQuantity)].map((_, index) => (
          <Chair
            index={index + 1}
            key={index + 1}
            currentUser={table.current_users.find((e) => e.chair === index + 1)}
            table={table}
          />
        ))}
      </div>
    </div>
  )
}
