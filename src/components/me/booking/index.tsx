import { getUserByIdentifier } from 'libs/server'
import { getBookings } from 'libs/server/booking'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'
import Create from './create'
import Booking from './booking'
import { TableIcon } from 'icons'
import { Button } from 'commons/button'

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
      {bookings.length > 0 && (
        <Create
          trigger={
            <Button
              isFilled
              variant="none"
              className="flex h-11 bg-black hover:bg-black/80 text-white flex-none rounded-full w-full items-center gap-2 font-semibold justify-center"
            >
              <TableIcon className="w-5" />
              <span>Nueva reserva</span>
            </Button>
          }
        />
      )}
      {bookings.length > 0 ? (
        <div className="flex flex-grow flex-col divide-y divide-neutral-300">
          {bookings.map((booking) => {
            return <Booking key={booking._id.toString()} booking={booking} />
          })}
        </div>
      ) : (
        <div className="h-full grid place-content-center text-center">
          <Create
            trigger={
              <div className="space-y-3 flex flex-col">
                <TableIcon className="w-20 text-neutral-400 mx-auto" />
                <h2 className="text-2xl font-bold">Crear reserva</h2>
                <p className="text-sm">
                  Los registros de reservas se mostrarán en esta página.{' '}
                </p>
                <span className="font-medium text-sm text-blue-500">
                  Realiza tu primera reserva
                </span>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}

export default Bookings
