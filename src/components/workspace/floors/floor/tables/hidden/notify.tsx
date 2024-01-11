'use client'

import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'
import { useRemainingTime } from 'hooks/useReminingTime'
import React, { useEffect } from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'
import { addMinutes } from 'utils'

type Props = {
  currentUser: TableCurrentUser
  table: NewTypeTable
}

function RemainingTimeHidden({ table, currentUser }: Props) {
  const { active } = useRemainingTime(currentUser.from, currentUser.to)

  const removeUser = async () => {
    try {
      console.log('removed')
      // await removeUserByTable(table, currentUser.chair)
    } catch (error) {
      console.log(error)
    }
  }

  const onAddMinute = async () => {
    const newTo = addMinutes(currentUser.to, 15)
    const newCurrentUser: TableCurrentUser = {
      ...currentUser,
      to: newTo
    }
    try {
      console.log(newCurrentUser)
      console.log('add minutes')
      // await updateUserByTable(table, newCurrentUser)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const playNotification = () => {
      if (!active) {
        const audioElement = new Audio('/notify.mp3')
        void audioElement.play()
      }
    }
    playNotification()
  }, [active])

  return (
    <>
      <Dialog backdropBlur open={!active}>
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-3xl text-neutral-100">
          <div className="p-2 text-sm text-neutral-300">
            Terminó el tiempo del cubículo{' '}
            <b>
              {table.name} - Silla {currentUser.chair}
            </b>
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
          <div className="flex gap-2 justify-end pt-5">
            <Button onClick={onAddMinute} variant="grey" isFilled>
              + 15 minutos
            </Button>
            <Button variant="white" isFilled onClick={removeUser}>
              Eliminar
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default RemainingTimeHidden
