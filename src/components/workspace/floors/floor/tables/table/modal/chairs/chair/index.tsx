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
import { calculateTimeMargin } from 'utils'
import axios from 'axios'
import Image from 'next/image'
import { usePending } from 'hooks/usePending'

type Props = {
  table: NewTypeTable
  currentUser?: TableCurrentUser
  index: number
}

function Chair({ index, table, currentUser }: Props) {
  const { onOpenModal, open, onCloseModal } = useModal()
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const { end, isPending, start } = usePending()
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const { control, watch } = useForm<TableCurrentUser>({
    defaultValues: {
      from: currentUser?.from ?? '',
      to: currentUser?.to ?? ''
    }
  })

  const onAdd = async (u: UserType | null) => {
    if (u) setSelectedUser(u)
    onCloseModal()
  }

  const constructTimes = () => {
    const date = new Date()
    const hour = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    const newFrom = `${hour}:${min}`
    const { displayTime, time } = calculateTimeMargin(newFrom, watch().to)
    return {
      displayTime,
      time,
      newFrom
    }
  }

  const onSubmit = (u: UserType | null) => {
    if (!u) return setSelectedUser(null)
    const { displayTime, time, newFrom } = constructTimes()
    const newCurrentUser: TableCurrentUser = {
      user: {
        _id: u._id,
        email: u.email,
        image: u.image,
        names: u.names,
        tenant: u.tenant,
        type_user: u.type_user
      },
      date: new Date(),
      to: watch().to,
      from: newFrom,
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

  // const removeCurrentUser = () => {
  //   if (currentUser) {
  //     // void removeUserByTable(table, currentUser.chair)
  //     onCloseModal()
  //   } else {
  //     setSelectedUser(null)
  //     onCloseModal()
  //   }
  // }

  return (
    <>
      <Button
        onClick={onOpenModal}
        data-occupied={!!currentUser}
        className={
          'h-[100px] z-[1] data-[occupied=true]:bg-green-400/10 w-[100px] grid place-content-center relative bg-neutral-800/80 hover:border-neutral-300 border border-transparent rounded-2xl'
        }
        variant="none"
      >
        <div className="absolute text-sm tracking-tight top-3 left-3 text-neutral-400 font-medium">
          {index}
        </div>
        {currentUser ? (
          <>
            <span className="absolute top-4 right-4 w-[10px] animate-ping h-[10px] bg-green-600 rounded-full"></span>
            <span className="absolute top-4 right-4 w-[10px] h-[10px] bg-green-600 rounded-full"></span>
            <div>
              <div
                className={
                  'w-[50px] h-[50px] border border-neutral-800 mx-auto relative z-10 overflow-hidden rounded-full'
                }
              >
                <Image
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                  src={currentUser?.user.image}
                  alt={currentUser?.user.names}
                />
              </div>
            </div>
            <RemainingTime currentUser={currentUser} />
          </>
        ) : (
          <div className="rotate-45 text-neutral-500">
            <XmarkIcon className="w-8" />
          </div>
        )}
      </Button>
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