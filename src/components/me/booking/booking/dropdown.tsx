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

function DropDownBooking({
  booking,
  isOwner
}: {
  booking: Booking
  isOwner: boolean
}) {
  const user = useAuth((store) => store.session)
  const router = useRouter()
  if (!user) return null

  const onCancel = async () => {
    if (!window.confirm('¿Estás seguro de cancelar la reserva?')) return

    try {
      toast.promise(
        axios.patch(`/api/booking/${booking._id.toString()}/cancel`),
        {
          loading: 'Cancelando reserva...',
          success: 'Reserva cancelada',
          error: 'Error al cancelar la reserva'
        }
      )
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
            'flex text-neutral-800 p-1 justify-center rounded-xl group font-medium transition-colors items-center gap-2 max-900:gap-0',
            open && 'text-black'
          )}
        >
          <MoreHorizonralIcon className="w-4" />
        </button>
      )}
    >
      {booking.status === 'active' && (
        <DropDownItem
          disabled={!isOwner}
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
