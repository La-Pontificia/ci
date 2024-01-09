import { Button } from 'commons/button'
import { XmarkIcon } from 'icons'
import React from 'react'

function MePage() {
  return (
    <div className="h-full grid place-content-center">
      <h2 className="text-neutral-400 py-2">
        Aún no hay reservas registradas.
      </h2>
      <Button
        isFilled
        variant="white-secondary"
        className="flex rounded-xl h-11 items-center gap-2 font-semibold justify-center"
      >
        <XmarkIcon className="w-5 rotate-45" />
        <span>Crear ahora</span>
      </Button>
    </div>
  )
}

export default MePage
