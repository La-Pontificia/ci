import { getUserByIdentifier } from 'libs/server'
import { getBookings } from 'libs/server/booking'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'
import Create from './create'
import Booking from './booking'

type Props = {
  q: string | undefined
}

async function Bookings({ q }: Props) {
  const storeCookie = cookies()
  const id = storeCookie.get('uft-ln')?.value ?? ''
  const user = await getUserByIdentifier(id)
  if (!user) return notFound()

  // get bookings
  const bookings = await getBookings(user._id, '', 10)

  return (
    <div className="p-4 flex flex-col h-full">
      {bookings.length > 0 ? (
        <div className="flex flex-col h-full divide-y divide-neutral-700">
          {bookings.map((booking) => {
            return <Booking key={booking._id.toString()} booking={booking} />
          })}
        </div>
      ) : (
        <div className="h-full grid place-content-center">
          <p>Aun no hay reservas registradas</p>
        </div>
      )}
      <Create />
    </div>
  )
}

export default Bookings
