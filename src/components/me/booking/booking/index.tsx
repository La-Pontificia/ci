'use client'

import React, { useEffect } from 'react'
import { type Booking as BookingType } from 'types'

import { convertFormatHour, formatSpanishDate } from 'herpers'
import Qr from './qr'
import { CalendarIcon, ClockIcon, DisplayIcon, TableIcon } from 'icons'
import DropDownBooking from './dropdown'
import { cn, isExpiredVerify } from 'utils'
import axios from 'axios'

type Props = {
  booking: BookingType
}

function Booking({ booking }: Props) {
  const displayStatus =
    booking.status === 'active'
      ? 'Activo'
      : booking.status === 'cancelled'
      ? 'Cancelado'
      : 'Completado'

  const displayType = booking.table.type === 'pc' ? 'Computadora' : 'Cubículo'

  const isExpired = isExpiredVerify(booking.to)

  const onExpired = async () => {
    try {
      await axios.patch(`/api/booking/${booking._id.toString()}`, {
        status: 'expired'
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isExpired && booking.status === 'active') void onExpired()
  }, [])

  return (
    <div
      key={booking._id.toString()}
      className="flex relative gap-3 py-3 items-center"
    >
      <Qr booking={booking} />
      <div className="pl-1 flex flex-col gap-1">
        <div className="flex gap-2 divide-x font-medium divide-neutral-700">
          <span className="capitalize">{booking.table.floor.headquarder}</span>
          <span className="pl-2">{booking.table.floor.name}</span>
          <span className="pl-2">{booking.table.name}</span>
        </div>
        <div className="flex">
          <div className="flex gap-2 text-sm items-center rounded-full bg-neutral-200 p-1 px-3">
            {booking.table.type === 'pc' ? (
              <DisplayIcon className="w-4" />
            ) : (
              <TableIcon className="w-4" />
            )}
            {displayType}
          </div>
        </div>
        <div className="flex space-x-2 max-700:space-x-0 max-700:flex-col text-xs flex-wrap text-neutral-600">
          <span className="flex items-center gap-2">
            <CalendarIcon className="w-4" /> {formatSpanishDate(booking.date)}
          </span>
          <span className="flex items-center flex-wrap gap-2">
            <ClockIcon className="w-4" />
            <span>{convertFormatHour(booking.from)}</span>
            <span>-</span>
            <span>{convertFormatHour(booking.to)}</span>
          </span>
          <span>{booking.time}:00</span>
        </div>
        <div
          className={cn(
            'text-green-500 text-sm flex items-center gap-1',
            booking.status === 'cancelled' && 'text-red-500',
            booking.status === 'completed' && 'text-blue-500',
            isExpired && 'text-yellow-500'
          )}
        >
          <span className="w-[8px] h-[8px] rounded-full bg-current" />
          <span className="pl-1">{isExpired ? 'Expirado' : displayStatus}</span>
        </div>
      </div>
      <DropDownBooking booking={booking} />
    </div>
  )
}

export default Booking
