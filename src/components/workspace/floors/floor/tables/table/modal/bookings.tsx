import axios from 'axios'
import { convertFormatHour, formatSpanishDate, timeAgo } from 'herpers'
import { CalendarIcon, ClockIcon } from 'icons'
import React, { useEffect, useState } from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { type Booking } from 'types'

type Props = { table: NewTypeTable }

export default function Bookings({ table }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const getReservations = async () => {
    try {
      const { data } = await axios.get(
        `/api/booking/table/${table._id.toString()}`
      )
      setBookings(data as Booking[])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    void getReservations()
  }, [])

  return (
    <div className="pb-4 flex flex-col divide-y divide-neutral-300">
      {bookings.map((booking) => {
        return (
          <div
            className="flex gap-2 rounded-xl p-2 items-center bg-neutral-200"
            key={booking._id.toString()}
          >
            <div>
              <h2 className="font-semibold text-lg">{booking.user.names}</h2>
              <span>{timeAgo(booking.from)}</span>
              <div className="flex space-x-2 text-sm flex-wrap text-neutral-600">
                <span className="flex items-center gap-2">
                  <CalendarIcon className="w-4" />{' '}
                  {formatSpanishDate(booking.date)}
                </span>
                <span className="flex items-center flex-wrap gap-2">
                  <ClockIcon className="w-4" />
                  <span>{convertFormatHour(booking.from)}</span>
                  <span>-</span>
                  <span>{convertFormatHour(booking.to)}</span>
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
