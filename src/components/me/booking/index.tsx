import { getBookingsByUserId } from 'libs/server/booking'
import { notFound } from 'next/navigation'
import React from 'react'
import Create from './create'
import { AddCircleIcon } from 'icons'
import { Button } from 'commons/button'
import Booking from './booking'
import { getServerSession } from 'next-auth'
import { authOptions } from 'libs/next-auth'

async function Bookings() {
  const session = await getServerSession(authOptions)
  if (!session?.account?._id) return notFound()

  // get bookings
  const bookings = await getBookingsByUserId(session?.account._id)

  return (
    <div className="py-4 flex flex-col h-full">
      {bookings.length > 0 && (
        <Create
          user={session.account}
          trigger={
            <Button
              isFilled
              variant="none"
              className="flex p-2.5 bg-neutral-950 dark:bg-neutral-800 hover:bg-black/80 text-white flex-none rounded-xl w-full items-center gap-2 text-base font-semibold justify-center"
            >
              <AddCircleIcon className="w-8" />
              <span>Nueva reserva</span>
            </Button>
          }
        />
      )}
      {bookings.length > 0 ? (
        <div className="flex flex-grow flex-col divide-y dark:divide-neutral-700 space-y-3 mt-2">
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
        <div className="h-full grid py-10 place-content-center text-center">
          <h1 className="text-2xl font-bold pb-3">
            Hola, {session.account.nick_name.split(' ')[0]}
          </h1>
          <p className="max-w-[40ch] dark:text-neutral-100/50">
            Aún no realizaste ninguna reserva de una mesa o computadora.🪶
          </p>
          <Create
            user={session.account}
            trigger={
              <div className="space-y-3 flex mt-3 flex-col">
                <Button
                  isFilled
                  variant="none"
                  className="flex p-2 dark:text-neutral-100 text-base border-black/50 dark:border-neutral-100/50 text-black dark:bg-neutral-900 bg-neutral-200 font-medium flex-none rounded-full z w-full items-center gap-2 justify-center"
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
