import { Dialog } from 'commons/dialog'
import { useModal } from 'hooks/useModal'
import React from 'react'
import { QRNormal } from 'react-qrbtf'
import { type Booking } from 'types'

type Props = {
  booking: Booking
}

function Qr({ booking }: Props) {
  const url = `https://ci.ilp.edu.pe/booking/${booking._id.toString()}`
  const { onOpenModal, open, setOpen } = useModal()

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
    <Dialog
      onOpenChange={setOpen}
      {...{ open }}
      backdropBlur
      trigger={
        <button
          onClick={onOpenModal}
          className="w-[120px] min-w-[120px] h-[120px] grid place-content-center bg-neutral-800 hover:scale-105 relative border-neutral-700 border rounded-2xl"
        >
          <Qr />
        </button>
      }
    >
      <div className="w-[300px] h-[300px] grid place-content-center bg-neutral-800 relative border-neutral-700 border rounded-3xl">
        <Qr />
      </div>
    </Dialog>
  )
}

export default Qr
