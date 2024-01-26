import { getBooking } from 'libs/server/booking'
import { ObjectId } from 'mongodb'
import React from 'react'
import Qr from './qr'
import { CalendarIcon, ClockIcon } from 'icons'
import { convertFormatHour } from 'herpers'
import { cn, isExpiredVerify } from 'utils'

async function Booking({ params: { slug } }: { params: { slug: string } }) {
  const recover = await getBooking(new ObjectId(slug))
  if (!recover) return null

  const displayStatus =
    recover.status === 'active'
      ? 'Activo'
      : recover.status === 'cancelled'
      ? 'Cancelado'
      : 'Completado'

  const isExpired = isExpiredVerify(recover.to)

  return (
    <div className="h-screen grid gap-4 place-content-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto">
        <img
          src={recover.user.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <Qr booking={recover} />
      <div className="flex space-y-1 text-lg items-center flex-col text-center text-neutral-800">
        <span className="flex items-center gap-2">
          <CalendarIcon className="w-6" /> {recover.date.toDateString()}
        </span>
        <span className="flex items-center flex-wrap gap-2">
          <ClockIcon className="w-6" />
          <span>{convertFormatHour(recover.from)}</span>
          <span>-</span>
          <span>{convertFormatHour(recover.to)}</span>
        </span>
        <div
          className={cn(
            'text-green-500 text-sm flex items-center gap-1',
            recover.status === 'cancelled' && 'text-red-500',
            recover.status === 'completed' && 'text-blue-500',
            isExpired && 'text-yellow-500'
          )}
        >
          <span className="w-[8px] h-[8px] rounded-full bg-current" />
          <span className="pl-1">{isExpired ? 'Expirado' : displayStatus}</span>
        </div>
      </div>
    </div>
  )
}

export default Booking
