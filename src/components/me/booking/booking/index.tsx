'use client'

import React, { useEffect, useState } from 'react'
import { type User, type Booking as BookingType } from 'types'

import { formatSpanishDate, timeAgo } from 'herpers'
import { CalendarIcon, DisplayIcon, LocationIcon, Table2Icon } from 'icons'
import DropDownBooking from './dropdown'
import { calculateDateRange, cn, getUserProfile, isExpiredVerify } from 'utils'
import axios from 'axios'
import Image from 'next/image'
import { TimerIcon } from '@radix-ui/react-icons'

type Props = {
  booking: BookingType
  currentUser: User | null
}

function Booking({ booking, currentUser }: Props) {
  const displayStatus =
    booking.status === 'active'
      ? 'Activo'
      : booking.status === 'cancelled'
      ? 'Cancelado'
      : booking.status === 'completed'
      ? 'Completado'
      : 'Expirado'

  const isExpired = isExpiredVerify(booking.to)

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

  const { fromTime, range, toTime } = calculateDateRange(
    booking.from,
    booking.to
  )

  const [open, setOpen] = useState(false)

  // crea un timeago con date-fn
  const restUsers = booking.users.slice(1, booking.users.length)

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="my-1 w-full text-left">
        <div className="flex items-center gap-2">
          <div className="w-9 aspect-square overflow-hidden rounded-full">
            <Image
              loading="lazy"
              placeholder="blur"
              blurDataURL={getUserProfile(booking.users[0].image)}
              src={getUserProfile(booking.users[0].image)}
              alt={booking.users[0].names}
              className="w-full h-full object-cover"
              width={36}
              height={36}
            />
          </div>
          <h2 className="font-semibold text-sm">{booking.users[0].names}</h2>
        </div>
        <div className="flex h-full">
          <span className="h-10 mx-4 w-[1px] border-r block" />
          <div className="space-y-1 pt-2 text-sm">
            <div>
              <CalendarIcon className="w-5 inline-flex text-stone-500" />{' '}
              {formatSpanishDate(booking.date)}
            </div>
            <div>
              <TimerIcon className="w-5 scale-125 inline-flex text-stone-500" />{' '}
              {fromTime} - {toTime}:{' '}
              <span className="text-neutral-400">{range}</span>
            </div>
            <div>
              <LocationIcon className="w-5 inline-flex text-stone-500" />{' '}
              {booking.table.floor.headquarder} - {booking.table.floor.name}
            </div>
            <div>
              {booking.table.type === 'pc' ? (
                <DisplayIcon className="w-5 inline-flex text-stone-500" />
              ) : (
                <Table2Icon className="w-5 inline-flex text-stone-500" />
              )}{' '}
              {booking.table.name}
            </div>
            <div
              className={cn(
                'text-green-500 flex items-center gap-1',
                booking.status === 'cancelled' && 'text-red-500',
                booking.status === 'completed' && 'text-blue-500',
                booking.status === 'expired' && 'text-yellow-500'
              )}
            >
              <span className="w-[8px] h-[8px] rounded-full bg-current" />
              <span className="pl-1">{displayStatus}</span>
            </div>
            {open && restUsers.length > 0 && (
              <div className="pt-2">
                <div className="space-y-3 w-full flex flex-col">
                  {restUsers.map((user) => {
                    return (
                      <div
                        key={user._id.toString()}
                        className="flex gap-2 items-center"
                      >
                        <div className="w-8 aspect-square overflow-hidden rounded-full">
                          <Image
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={getUserProfile(user.image)}
                            src={getUserProfile(user.image)}
                            alt={user.names}
                            width={32}
                            height={32}
                          />
                        </div>
                        <div className="font-semibold text-sm">
                          <span className="block">{user.names}</span>
                          <span className="block font-normal opacity-70">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </button>
      <div className="ml-auto absolute top-2 right-2 text-sm text-neutral-400 flex items-center gap-1">
        {timeAgo(booking.created_at)}
        <DropDownBooking
          booking={booking}
          isOwner={booking.users[0]._id === currentUser?._id}
        />
      </div>
    </div>
  )
}

export default Booking
