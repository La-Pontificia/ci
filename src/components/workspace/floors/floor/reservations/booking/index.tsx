'use client'

import React, { useEffect } from 'react'
import { type Booking as BookingType } from 'types'

import { formatSpanishDate } from 'herpers'
import { CalendarIcon, DisplayIcon, Table2Icon } from 'icons'
import DropDownBooking from './dropdown'
import { calculateDateRange, cn, isExpiredVerify } from 'utils'
import Add from './add'
import axios from 'axios'
import { TimerIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

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

  const displayType = booking.table.type === 'pc' ? 'Computadora' : 'Mesa'

  const isExpired = isExpiredVerify(booking.from)
  const onExpired = async () => {
    try {
      await axios.patch(`/api/booking/${booking._id.toString()}/expired`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (isExpired && booking.status === 'active') void onExpired()
  }, [])

  const restUsers = booking.users.slice(1, booking.users.length)

  if (isExpired) return null

  const { fromTime, range, toTime } = calculateDateRange(
    booking.from,
    booking.to
  )

  return (
    <div
      key={booking._id.toString()}
      className="flex relative gap-2 py-2 items-start"
    >
      <div className="space-y-2">
        <div className="w-[40px] bg-neutral-300 aspect-square rounded-full overflow-hidden">
          <Image
            width={40}
            height={40}
            src={booking.users[0].image}
            className="w-full h-full object-cover"
            alt={booking.users[0].names}
          />
        </div>
        {restUsers.length > 0 && (
          <div className="w-[40px] font-semibold text-sm bg-neutral-300 grid place-content-center aspect-square rounded-full overflow-hidden">
            +{restUsers.length}
          </div>
        )}
      </div>
      <div className="pl-1 flex flex-col w-full">
        <div className="flex items-center">
          <div>
            <div className="flex gap-2 divide-x font-medium divide-neutral-300">
              <span className="capitalize">
                {booking.table.floor.headquarder}
              </span>
              <span className="pl-2">{booking.table.floor.name}</span>
              <span className="pl-2">{booking.table.name}</span>
            </div>
            <div className="flex">
              <div className="flex gap-2 text-sm items-center rounded-full bg-neutral-200 p-1 px-3">
                {booking.table.type === 'pc' ? (
                  <DisplayIcon className="w-5" />
                ) : (
                  <Table2Icon className="w-5" />
                )}
                {displayType}
              </div>
            </div>
            <div className="py-1 text-black text-sm font-medium flex gap-1 max-w-max rounded-full">
              {booking.users[0].names}
              {' - '}
              {booking.users[0].email}
            </div>
            <div className="flex space-x-2 text-sm flex-wrap text-neutral-700">
              <span className="flex items-center gap-2">
                <CalendarIcon className="w-4" />{' '}
                {formatSpanishDate(booking.date)}
              </span>
            </div>
            <div className="text-sm">
              <TimerIcon className="w-5 scale-125 inline-flex text-stone-500" />{' '}
              {fromTime} - {toTime}:{' '}
              <span className="text-neutral-400">{range}</span>
            </div>
            <div
              className={cn(
                'text-green-500 p-2 text-xs flex items-center gap-1',
                booking.status === 'cancelled' && 'text-red-500',
                booking.status === 'completed' && 'text-blue-500',
                isExpired && 'text-yellow-500'
              )}
            >
              <span className="w-[8px] h-[8px] rounded-full bg-current" />
              <span className="pl-1">
                {isExpired ? 'Expirado' : displayStatus}
              </span>
            </div>
          </div>
          <Add booking={booking} />
        </div>
      </div>
      <DropDownBooking booking={booking} />
    </div>
  )
}

export default Booking
