import { Button } from 'commons/button'
import { XmarkIcon } from 'icons'
import React, { useState } from 'react'
import { type Table, type TableCurrentUser } from 'types/table'
import RemainingTime from './remaining-time'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { useModal } from 'hooks/useModal'
import Users from './users'
import { useForm } from 'react-hook-form'
import User from './user'
import { type User as UserType } from 'types'
import { calculateTimeMargin, parseTimeStringToDate } from 'utils'
import axios from 'axios'
import { usePending } from 'hooks/usePending'

type Props = {
  table: NewTypeTable
  currentUser?: TableCurrentUser
  index: number
}

export type TypeForm = {
  from: string
  to: string
}

function Chair({ index, table, currentUser }: Props) {
  const { onOpenModal, open, onCloseModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const { end, isPending, start } = usePending()
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const { control, watch } = useForm<TypeForm>({
    defaultValues: {
      from: '',
      to: ''
    }
  })

  const onAdd = async (u: UserType | null) => {
    if (u) setSelectedUser(u)
    onCloseModal()
  }

  const constructTimes = () => {
    const date = new Date()
    const newDateTo = parseTimeStringToDate(watch().to, date)
    const { displayTime, time } = calculateTimeMargin(date, newDateTo)
    return {
      displayTime,
      time,
      date,
      newDateTo
    }
  }

  const onSubmit = (u: UserType | null) => {
    if (!u) return setSelectedUser(null)
    const { displayTime, time, date, newDateTo } = constructTimes()
    const newCurrentUser: TableCurrentUser = {
      user: {
        _id: u._id,
        email: u.email,
        image: u.image,
        names: u.names,
        tenant: u.tenant,
        type_user: u.type_user
      },
      to: newDateTo,
      from: date,
      chair: index,
      display_time: displayTime,
      time
    }
    const newCurrentUsers: Table['current_users'] = [
      ...table.current_users,
      newCurrentUser
    ]
    void onUpdateTable(newCurrentUsers)
  }

  const onUpdateTable = async (current_users: Table['current_users']) => {
    start()
    try {
      await axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        {
          current_users
        }
      )
      setTables(
        tables.map((t) => {
          if (t._id === table._id) {
            return {
              ...t,
              current_users
            }
          }
          return t
        })
      )
      setSelectedUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      end()
    }
  }

  const onRemove = () => {
    if (currentUser) {
      const newCurrentUsers = table.current_users.filter(
        (u) => u.user._id !== currentUser.user._id
      )
      void onUpdateTable(newCurrentUsers)
      onCloseModal()
    } else {
      setSelectedUser(null)
      onCloseModal()
    }
  }

  return (
    <>
      <div className="relative z-[1]">
        {currentUser && (
          <Button
            onClick={onRemove}
            className="absolute top-2 left-[50%] translate-x-[-50%] z-[2]"
          >
            Eliminar
          </Button>
        )}
        <Button
          onClick={onOpenModal}
          data-occupied={!!currentUser}
          className={
            'h-[200px] z-[1] w-full data-[occupied=true]:bg-green-400/40 grid place-content-center relative bg-neutral-200/80 hover:border-neutral-800 border border-transparent rounded-2xl'
          }
          variant="none"
        >
          <div className="absolute text-sm tracking-tight top-3 left-3 text-neutral-800 font-medium">
            {index}
          </div>
          {currentUser ? (
            <>
              <span className="absolute top-4 right-4 w-[10px] animate-ping h-[10px] bg-green-600 rounded-full"></span>
              <span className="absolute top-4 right-4 w-[10px] h-[10px] bg-green-600 rounded-full"></span>
              <div>
                <div
                  className={
                    'w-[70px] h-[70px] border border-neutral-400 mx-auto relative z-10 overflow-hidden rounded-full'
                  }
                >
                  <img
                    width={70}
                    height={70}
                    className="w-full h-full object-cover"
                    src={currentUser?.user.image}
                    alt={currentUser?.user.names}
                  />
                </div>
                <span className="text-sm pt-2 block">
                  {currentUser.user.names}
                </span>
              </div>
              <RemainingTime currentUser={currentUser} />
            </>
          ) : (
            <div className="rotate-45 text-neutral-800">
              <XmarkIcon className="w-8" />
            </div>
          )}
        </Button>
      </div>
      {open && <Users onAdd={onAdd} />}
      {selectedUser && (
        <User
          isPending={isPending}
          onSubmit={onSubmit}
          user={selectedUser}
          control={control}
        />
      )}
    </>
  )
}

export default Chair
