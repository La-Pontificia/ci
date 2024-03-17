'use client'

import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'

import React from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'
import { useNotify } from './use-notify'
import { calculateDateRange } from 'utils'

type Props = {
  currentUser: TableCurrentUser
  table: NewTypeTable
}

function RemainingTimeHidden({ table, currentUser }: Props) {
  const {
    active,
    onExtedTime,
    removeUser,
    setTimeToExtended,
    times,
    timeToExtended
  } = useNotify({
    currentUser,
    table
  })

  const { fromTime, toTime } = calculateDateRange(
    new Date(table.current_users[0].from),
    new Date(table.current_users[0].to)
  )

  return (
    <Dialog open={!active}>
      <div className="bg-white w-[400px] p-3 rounded-3xl text-neutral-800">
        <div className="p-2 text-xl text-center text-neutral-800">
          Terminó el tiempo de la{' '}
          <b>
            {table.name} - Silla {currentUser.chair}
          </b>
        </div>
        <div className="text-center font-semibold">
          {fromTime} - {toTime}
        </div>
        <div className=" gap-2">
          <span className="block  mx-auto w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={currentUser.user.image}
              alt=""
            />
          </span>
          <h2 className="text-lg pt-2 font-medium text-center">
            {currentUser.user.names}
          </h2>
        </div>
        <div className="text-center pt-1">
          <h3 className="text-sm">Extender tiempo</h3>
          <div className="flex gap-2 justify-center pt-1">
            {times.map((time) => {
              return (
                <button
                  onClick={() => setTimeToExtended(time.minute)}
                  key={time.minute}
                  aria-selected={time.minute === timeToExtended}
                  className="w-fit p-2 aria-selected:text-white aria-selected:border-blue-600 transition-all aria-selected:bg-blue-600 text-sm rounded-xl border border-stone-300 font-semibold"
                >
                  {time.display}
                </button>
              )
            })}
          </div>
        </div>
        <div className="gap-2 pt-3 space-y-2">
          <Button
            variant="white-secondary"
            className="w-full text-sm p-3 rounded-full"
            isFilled
            onClick={removeUser}
          >
            Remover usuario
          </Button>
          <Button
            disabled={timeToExtended === null}
            variant="black"
            className="w-full text-sm p-3 rounded-full"
            isFilled
            onClick={onExtedTime}
          >
            Extender tiempo
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default RemainingTimeHidden
