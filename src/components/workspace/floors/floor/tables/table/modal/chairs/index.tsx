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
    <div className="w-full h-full z-[0] max-900:h-auto max-h-[600px] overflow-y-auto gap-2 hidden-scroll">
      <div
        className={cn(
          'grid grid-cols-2 w-full gap-2',
          table.type === 'pc' && 'grid-cols-1'
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
    </div>
  )
}
