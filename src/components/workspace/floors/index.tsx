import { getFloors } from 'libs/server/floor'
import React from 'react'
import Floor from './floor'
import { convertTimestampToJSDate } from 'herpers'

async function Floors() {
  const flours = await getFloors()
  return (
    <>
      {flours.map((flour) => (
        <Floor
          key={flour._id}
          flour={{
            ...flour,
            created_at: convertTimestampToJSDate(flour.created_at)
          }}
        />
      ))}
    </>
  )
}

export default Floors
