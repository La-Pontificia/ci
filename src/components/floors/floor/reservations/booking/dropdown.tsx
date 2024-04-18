'use client'

import React from 'react'
import { cn } from 'utils'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { MoreHorizonralIcon } from 'icons'
import { type Booking } from 'types'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTables } from 'stores/tables/tables.store'
import { useFloor } from 'stores'

function DropDownBooking({ booking }: { booking: Booking }) {
  const router = useRouter()
  const prefetchTables = useTables((store) => store.fetchTables)
  const floor = useFloor((store) => store.floor)
  const onCancel = async () => {
    try {
      toast.promise(
        axios.patch(`/api/booking/${booking._id.toString()}/cancel`),
        {
          loading: 'Cancelando reserva...',
          success: 'Reserva cancelada con exito',
          error: 'Ocurrio algo inesperado'
        }
      )
      await prefetchTables(floor?._id.toString() ?? '')
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
            'flex text-neutral-800 dark:text-neutral-300 absolute p-1 top-3 right-3 justify-center rounded-xl group font-medium transition-colors items-center gap-2 max-900:gap-0',
            open && 'text-black dark:text-white'
          )}
        >
          <MoreHorizonralIcon className="w-4" />
        </button>
      )}
    >
      {booking.status === 'active' && (
        <DropDownItem onClick={onCancel} sencible className="text-red-500">
          Cancelar
        </DropDownItem>
      )}
    </DropDown>
  )
}

export default DropDownBooking
