'use client'

import axios from 'axios'
import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'
import { useRemainingTime } from 'hooks/useReminingTime'
import React, { useEffect } from 'react'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'

type Props = {
  currentUser: TableCurrentUser
  table: NewTypeTable
}

function RemainingTimeHidden({ table, currentUser }: Props) {
  const { active } = useRemainingTime(currentUser.from, currentUser.to)
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)
  const removeUser = async () => {
    try {
      const newCurrentUsers = table.current_users.filter(
        (e) => e.chair !== currentUser.chair
      )
      await axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        {
          current_users: newCurrentUsers
        }
      )
      setTables(
        tables.map((t) => {
          if (t._id === table._id) {
            return {
              ...t,
              current_users: newCurrentUsers
            }
          }
          return t
        })
      )
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
        <div className="flex gap-2 pt-5">
          <Button
            variant="white-secondary"
            className="w-full"
            isFilled
            onClick={removeUser}
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default RemainingTimeHidden
