import { Alert } from 'commons/alert'
import { Button } from 'commons/button'
import React from 'react'
import { type Booking } from 'types'

function Add({ booking }: { booking: Booking }) {
  if (booking.status !== 'active') return null

  const addReservation = async () => {
    console.log(booking)
  }
  return (
    <Alert
      onOk={addReservation}
      title="¿Agregar y completar la reseración?"
      description="Al confirmar el usuario se asignara al cubículo reservado y la reservacion cambiará al estado de completado"
      trigger={
        <Button variant="grey" className="rounded-xl w-full" isFilled>
          Agregar
        </Button>
      }
    />
  )
}

export default Add
