'use client'

import React from 'react'
import { QRNormal } from 'react-qrbtf'
import { type Booking } from 'types'

type Props = {
  booking: Booking
}

function Qr({ booking }: Props) {
  const url = `https://ci.ilp.edu.pe/booking/${booking._id.toString()}`

  const Qr = () => {
    return (
      <QRNormal
        className="scale-110"
        value={url}
        size={90}
        posType="round"
        type="round"
        opacity={90}
        otherColor="currentColor"
        posColor="currentColor"
      />
    )
  }

  return (
    <div className="w-[300px] h-[300px] grid place-content-center bg-neutral-800 relative border-neutral-700 border rounded-3xl">
      <Qr />
    </div>
  )
}

export default Qr
