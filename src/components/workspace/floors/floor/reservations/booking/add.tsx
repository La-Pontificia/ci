'use client'

import axios from 'axios'
import { Button } from 'commons/button'
import { usePending } from 'hooks/usePending'
import { AddCircleIcon } from 'icons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { useFloor } from 'stores'
import { useTables } from 'stores/tables/tables.store'
import { type Booking } from 'types'

function Add({ booking }: { booking: Booking }) {
  if (booking.status !== 'active') return null
  const fetch = useTables((store) => store.fetchTables)
  const floor = useFloor((store) => store.floor)
  const { end, isPending, start } = usePending()
  const today = new Date()
  const router = useRouter()
  const newFrom = new Date(booking.from)
  const isPosibleAsign = today >= newFrom

  const onAdd = async () => {
    if (!window.confirm('¿Estas seguro de culminar esta reserva?')) return
    start()
    try {
      await axios.patch(`/api/booking/${booking._id.toString()}/complete`)
      toast.success('Reserva culminada con exito', {
        description: 'La reserva fue culminada con exito'
      })
      await fetch(floor?._id.toString() ?? '')
      router.refresh()
    } catch (error) {
      toast.error('Ocurrio algo inesperado')
      console.log(error)
    } finally {
      end()
    }
  }
  return (
    <Button
      onClick={onAdd}
      loading={isPending}
      disabled={!isPosibleAsign}
      variant="black"
      className="rounded-xl h-10 w-[130px] ml-auto"
      isFilled
    >
      <div className="flex gap-1 justify-center items-center">
        <AddCircleIcon className="w-6" />
        Asignar
      </div>
    </Button>
  )
}

export default Add
