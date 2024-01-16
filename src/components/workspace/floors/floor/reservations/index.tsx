import { getAllBookingsByFloor } from 'libs/server/booking'
import { ObjectId } from 'mongodb'
import React from 'react'
import Booking from './booking'

type Props = {
  params: { slug: string }
  searchParams: { q: string | undefined } | null
}

async function Reservations({ params, searchParams }: Props) {
  const bookings = await getAllBookingsByFloor(
    new ObjectId(params.slug),
    searchParams?.q,
    30
  )
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
          <p>No hay nada que mostrar</p>
        </div>
      )}
    </div>
  )
}

export default Reservations
