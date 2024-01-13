import Booking from 'components/me/booking'
import React from 'react'

function MePage({
  searchParams: { q }
}: {
  searchParams: {
    q: string | undefined
  }
}) {
  return <Booking q={q} />
}

export default MePage
