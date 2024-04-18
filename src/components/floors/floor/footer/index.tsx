import { getFloors } from 'libs/server/floor'
import React from 'react'
import { ItemFooter } from './item'

async function Footer({ slug }: { slug: string }) {
  const floors = await getFloors()
  const finded = floors.find((f) => f._id.toString() === slug)
  if (!finded) return null
  const floorsGroup = floors.filter((f) => f.headquarder === finded.headquarder)
  return (
    <div className="fixed flex justify-center pl-[--sidebar-width] inset-x-0 bottom-0 p-5">
      <div className="flex gap-1 items-center px-2 bg-neutral-950 rounded-full">
        <h4 className="capitalize text-sm font-semibold text-white pl-2 border-r pr-4 border-neutral-600">
          {finded.headquarder}
        </h4>
        {floorsGroup.map((floor) => {
          return (
            <ItemFooter
              title={floor.name}
              key={floor._id.toString()}
              href={`/floors/${floor._id.toString()}`}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Footer
