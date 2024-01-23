import { getFloors } from 'libs/server/floor'
import React from 'react'
import Floor from './item'
import { divideAndGroupByHeadquarter } from 'utils'
import CreateFloor from './create'

async function Floors() {
  const flours = await getFloors()
  const groupedFloor = divideAndGroupByHeadquarter(flours)
  return (
    <div className="max-700:justify-center">
      <CreateFloor />
      <h2 className="py-3 pl-2">Alameda</h2>
      <div className="flex flex-wrap gap-2">
        {groupedFloor.alameda.map((flour) => (
          <Floor key={flour._id.toString()} flour={flour} />
        ))}
      </div>
      <h2 className="py-3 pl-2">Jazminez</h2>
      <div className="flex flex-wrap gap-2">
        {groupedFloor.jazmines.map((flour) => (
          <Floor key={flour._id.toString()} flour={flour} />
        ))}
      </div>
    </div>
  )
}

export default Floors
