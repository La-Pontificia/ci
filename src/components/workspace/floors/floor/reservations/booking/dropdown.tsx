'use client'

import React from 'react'
import { cn } from 'utils'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { useAuth } from 'stores'
import { MoreHorizonralIcon } from 'icons'
import { type Booking } from 'types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ToastContainer } from 'commons/utils'

function DropDownBooking({ booking }: { booking: Booking }) {
  const user = useAuth((store) => store.session)
  const router = useRouter()
  if (!user) return null

  const url = `https://ci.ilp.edu.pe/booking/${booking._id.toString()}`

  const onCancel = async () => {
    try {
      await axios.patch(`/api/booking/${booking._id.toString()}/cancel`, {})
      toast(ToastContainer('Reserva cancelada'))
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropDown
      triggerButton={({ open }) => (
        <button
          className={cn(
            'flex text-neutral-800 absolute p-1 top-3 right-3 justify-center rounded-xl group font-medium transition-colors items-center gap-2 max-900:gap-0',
            open && 'text-black'
          )}
        >
          <MoreHorizonralIcon className="w-5" />
        </button>
      )}
    >
      <DropDownItem isLink href={url} isExternalLink closeDropDownOnclick>
        Ver
      </DropDownItem>
      {booking.status === 'active' && (
        <DropDownItem
          onClick={onCancel}
          closeDropDownOnclick
          className="text-red-500"
        >
          Cancelar
        </DropDownItem>
      )}
    </DropDown>
  )
}

export default DropDownBooking
