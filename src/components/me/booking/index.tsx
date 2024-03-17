import { getBookingsByUserId } from 'libs/server/booking'
import { notFound } from 'next/navigation'
import React from 'react'
import Create from './create'
import { AddCircleIcon } from 'icons'
import { Button } from 'commons/button'
import Booking from './booking'
import { getServerSession } from 'next-auth'
import { authOptions } from 'libs/next-auth'

type Props = {
  q: string | undefined
}

async function Bookings({ q }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.account?._id) return notFound()

  // get bookings
  const bookings = await getBookingsByUserId(session?.account._id)

  return (
    <div className="p-4 flex flex-col h-full">
      {bookings.length > 0 && (
        <Create
          user={session.account}
          trigger={
            <Button
              isFilled
              variant="none"
              className="flex h-11 bg-black hover:bg-black/80 text-white flex-none rounded-xl w-full items-center gap-2 font-semibold justify-center"
            >
              <AddCircleIcon className="w-7" />
              <span>Nueva reserva</span>
            </Button>
          }
        />
      )}
      {bookings.length > 0 ? (
        <div className="flex flex-grow flex-col divide-y space-y-3 mt-2">
          {bookings.map((booking) => {
            return (
              <Booking
                currentUser={session.account}
                key={booking._id.toString()}
                booking={booking}
              />
            )
          })}
        </div>
      ) : (
        <div className="h-full grid place-content-center text-center">
          <Create
            user={session.account}
            trigger={
              <div className="space-y-3 flex flex-col">
                <Button
                  isFilled
                  variant="none"
                  className="flex p-1 border px-3 border-black/50 text-black font-bold flex-none rounded-2xl z w-full items-center gap-2 justify-center"
                >
                  <AddCircleIcon className="w-7" />
                  <span>Realiza tu primera reserva</span>
                </Button>
              </div>
            }
          />
        </div>
      )}
    </div>
  )
}

export default Bookings
