import { getFloors } from 'libs/server/floor'
import React from 'react'
import Floor from './item'
import CreateFloor from './create'
import { divideAndGroupByHeadquarter } from 'utils'

async function Floors() {
  const flours = await getFloors()
  const divider = divideAndGroupByHeadquarter(flours)
  return (
    <div className="w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold py-4">Pisos y sedes</h2>
      <div className="border-b dark:border-neutral-700 pb-4">
        <h2 className="pb-3 text-sm opacity-80">Alameda</h2>
        <div className="space-y-3 gap-5">
          {divider.alameda.map((flour) => (
            <Floor key={flour._id.toString()} flour={flour} />
          ))}
          <CreateFloor defaultHeadquarter="alameda" />
        </div>
      </div>
      <div className="pt-4">
        <h2 className="pb-3 text-sm opacity-80">Jazmines</h2>
        <div className="flex flex-wrap gap-5">
          {divider.jazmines.map((flour) => (
            <Floor key={flour._id.toString()} flour={flour} />
          ))}
          <CreateFloor defaultHeadquarter="jazmines" />
        </div>
      </div>
    </div>
  )
}

export default Floors
