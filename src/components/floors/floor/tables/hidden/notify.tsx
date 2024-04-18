'use client'

import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'

import React from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'
import { useNotify } from './use-notify'
import { calculateDateRange, getUserProfile } from 'utils'
import { TimerIcon } from '@radix-ui/react-icons'

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
    <Dialog empty trigger={null} open={!active}>
      <div className="bg-white dark:bg-neutral-800 w-[400px] p-3 rounded-3xl text-neutral-800 dark:text-white">
        <div className="p-2 text-xl text-center text-neutral-800 dark:text-white">
          Terminó el tiempo de la{' '}
          <b>
            {table.name} - Silla {currentUser.chair}
          </b>
        </div>
        <div className="text-center font-semibold">
          {fromTime} - {toTime}
        </div>
        <div className=" gap-2">
          <span className="block mt-4 mx-auto w-[100px] h-[100px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={getUserProfile(currentUser.user.image)}
              alt=""
            />
          </span>
          <h2 className="text-lg pt-2 font-medium capitalize text-center">
            {currentUser.user.names.toLowerCase()}
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
                  className="w-fit p-2 aria-selected:text-white aria-selected:border-blue-600 transition-all aria-selected:bg-blue-600 dark:aria-selected:bg-blue-700 text-sm rounded-xl border border-stone-300 dark:border-neutral-600 aria-selected:border-transparent dark:aria-selected:border-transparent font-semibold"
                >
                  {time.display}
                </button>
              )
            })}
          </div>
        </div>
        <div className="gap-2 pt-3 space-y-2">
          <Button
            onClick={removeUser}
            className="w-full mt-3 dark:bg-white bg-black hover:bg-black dark:text-black text-white rounded-xl p-3"
            isFilled
          >
            Remover
          </Button>
          <Button
            disabled={timeToExtended === null}
            onClick={onExtedTime}
            className="w-full mt-3 dark:bg-white bg-black hover:bg-black dark:text-black text-white rounded-xl p-3"
            isFilled
          >
            <TimerIcon className="inline-block mr-1 w-5 h-5" />
            Extender tiempo
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default RemainingTimeHidden
