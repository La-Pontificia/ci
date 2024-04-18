'use client'

import React, { useEffect } from 'react'
import { type User, type Booking as BookingType } from 'types'

import { timeAgo } from 'herpers'
import DropDownBooking from './dropdown'
import { calculateDateRange, cn, getUserProfile, isExpiredVerify } from 'utils'
import axios from 'axios'
import Image from 'next/image'
import { format } from 'date-fns'
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

  // crea un timeago con date-fn
  const restUsers = booking.users.slice(1, booking.users.length)

  const displayType =
    booking.table.type === 'table'
      ? 'Mesa'
      : booking.table.room
      ? 'Sala'
      : 'Computadora'
  return (
    <div className="relative p-2 pb-0">
      <div className="my-1 w-full flex items-start gap-2">
        <div className="w-9 min-w-[36px] aspect-square border dark:border-neutral-500 overflow-hidden rounded-full">
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
        <div className="h-full overflow-x-auto">
          <p>
            <span className="font-semibold lowercase">
              {booking.users[0].names.split(' ')[0]}
            </span>
            <span className="opacity-70 ml-2">
              {format(booking.date, 'dd/MM/yyyy')}
            </span>
          </p>
          <div className="space-y-1 pt-2 dark:text-neutral-200">
            <div>
              Hora:{' '}
              <b>
                {fromTime} - {toTime}{' '}
              </b>
              <span className="opacity-70">({range})</span>
            </div>
            <div className="capitalize">
              Sede:{' '}
              <b>
                {booking.table.floor.headquarder} - {booking.table.floor.name}
              </b>
            </div>
            <div>
              {displayType}: <b>{booking.table.name}</b>
            </div>
            <div className="flex items-center gap-2">
              Estado:{' '}
              <div
                className={cn(
                  'text-green-500 inline-flex items-center gap-1',
                  booking.status === 'cancelled' && 'text-red-500',
                  booking.status === 'completed' && 'text-blue-500',
                  booking.status === 'expired' && 'text-yellow-500'
                )}
              >
                <span className="w-[8px] h-[8px] rounded-full bg-current" />
                <span className="pl-1">{displayStatus}</span>
              </div>
            </div>
            <div className="flex overflow-x-auto hidden-scroll gap-2 w-full pt-2">
              {restUsers.map((user) => {
                return (
                  <div
                    key={user._id.toString()}
                    className="flex flex-col dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 rounded-2xl p-1 py-3 gap-2 items-center text-center"
                  >
                    <div className="w-[60px] aspect-square overflow-hidden rounded-full">
                      <Image
                        loading="lazy"
                        placeholder="blur"
                        className="w-full h-full object-cover"
                        blurDataURL={getUserProfile(user.image)}
                        src={getUserProfile(user.image)}
                        alt={user.names}
                        width={60}
                        height={60}
                      />
                    </div>
                    <div className="font-semibold w-[120px] text-sm">
                      <p className="block line-clamp-1 capitalize text-ellipsis">
                        {user.names
                          .split(' ')
                          .reverse()
                          .slice(0, 2)
                          .join(' ')
                          .toLocaleLowerCase()}
                      </p>
                      <span className="block font-normal opacity-70">
                        {user.email.split('@')[0]}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-auto absolute top-3 right-3 text-sm text-neutral-400 flex items-center gap-1">
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
