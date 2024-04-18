import React, { Suspense } from 'react'
import SearchBooking from './search'
import { LineLoading } from 'commons/loading/line'
import Reservations from 'components/floors/floor/reservations'

type Props = {
  params: { slug: string }
  searchParams: { q: string | undefined } | null
}

function ReservationsPage({ params, searchParams }: Props) {
  return (
    <div className="max-w-7xl mt-14 mx-auto px-3 py-5 w-full pt-5">
      <SearchBooking searchParams placeholder="Buscar reserva" />
      <Suspense
        key={`query-bookings-${searchParams?.q}`}
        fallback={
          <div className="grid place-content-center p-20">
            <LineLoading size={20} />
          </div>
        }
      >
        <Reservations params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default ReservationsPage
