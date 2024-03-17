import React from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { getUI } from './utils'
import { cn } from 'utils'

type Props = {
  table: NewTypeTable
}

function Chairs({ table }: Props) {
  const { chairs } = getUI(table)

  const isFor = table.chairs === 4

  const Chair = ({ className }: { className?: string }) => {
    return <span className={`block bg-current rounded-xl ${className}`} />
  }

  const isV = table.ui.rotation === 'vertical'
  const className = 'absolute flex gap-1 justify-between'
  const className2 = `${isV ? 'py-1' : !isFor && 'px-1'}`

  return (
    <>
      {table.type === 'pc' && (
        <span className="absolute inset-1 border-current rounded-full border-[12px]" />
      )}
      <span
        className={cn(
          className,
          'w-full top-1 left-0',
          className2,
          isFor && 'px-6'
        )}
      >
        {chairs[0].map((_, i) => (
          <Chair key={i + 'chairss'} className="w-full h-[25px]" />
        ))}
      </span>

      <span
        className={cn(
          className,
          'flex-col h-full py-6 top-0 left-1',
          className2
        )}
      >
        {chairs[1].map((_, i) => (
          <Chair key={i + 'chair44'} className="h-full w-[25px]" />
        ))}
      </span>

      <span
        className={cn(
          className,
          'flex-col h-full py-6 top-0 right-1',
          className2
        )}
      >
        {chairs[2].map((_, i) => (
          <Chair key={i + 'chair445'} className="h-full w-[25px]" />
        ))}
      </span>

      <span
        className={cn(
          className,
          'gap-1 px-1 w-full bottom-1 left-0',
          className2,
          isFor && 'px-6'
        )}
      >
        {chairs[3].map((_, i) => (
          <Chair key={i + 'chair464'} className="w-full h-[25px]" />
        ))}
      </span>
    </>
  )
}

export default Chairs
