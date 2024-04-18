import { Button } from 'commons/button'
import { Select } from 'commons/select'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  calculateTimeMargin,
  checkReservations,
  converterForma12Hour,
  generateFullDayHourList,
  getUserProfile,
  parseTimeStringToDate
} from 'utils'
import { toDate } from 'date-fns'
import { useModalTable } from './state'
import { toast } from 'sonner'
import axios from 'axios'
import { NewTypeTable, useTables } from 'stores/tables/tables.store'
import { formatSpanishDateAndTime } from 'herpers'
import { Table, TableCurrentUser } from 'types/table'

export type TypeForm = {
  from: string
  to: string
}

type Props = {
  table: NewTypeTable
}
function Configure(props: Props) {
  const table = props.table
  const setTables = useTables((s) => s.setTables)
  const tables = useTables((s) => s.tables)

  const now = toDate(new Date())
  const user = useModalTable((store) => store.userSelected)

  if (!user) return null

  const { control, setValue, watch } = useForm<TypeForm>({
    defaultValues: {
      from: '',
      to: ''
    }
  })

  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const toHour = generateFullDayHourList(
    `${currentHour}:${currentMinute}`
  ).slice(1, 6)

  useEffect(() => {
    setValue('to', toHour[0])
  }, [])

  //

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

  const onSubmit = () => {
    if (!watch().to) {
      return toast.error('Error', {
        description: 'Debes seleccionar una hora de salida'
      })
    }
    const { displayTime, time, date, newDateTo } = constructTimes()
    const reservation = checkReservations(table.reserved_dates ?? [], newDateTo)
    if (reservation) {
      return toast.error('No puedes asignar en este horario', {
        description: (
          <>
            La mesa/pc está reservada de{' '}
            <b>{formatSpanishDateAndTime(reservation[0])}</b> a{' '}
            <b>{formatSpanishDateAndTime(reservation[1])}</b>
          </>
        )
      })
    }

    const us = useModalTable.getState().userSelected
    const chair = useModalTable.getState().chairSelected

    if (!us) return
    if (!chair) return

    const newCurrentUser: TableCurrentUser = {
      user: {
        _id: us._id,
        email: us.email,
        image: us.image,
        names: us.names
      },
      to: newDateTo,
      from: date,
      chair,
      display_time: displayTime,
      time
    }
    const newCurrentUsers: Table['current_users'] = [
      ...table.current_users,
      newCurrentUser
    ]
    void onUpdateTable({
      current_users: newCurrentUsers
    })
  }

  const onUpdateTable = (form: any, finalFunction?: () => void) => {
    toast.promise(
      axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        form
      ),
      {
        loading: 'Actualizando MESA/PC',
        success: () => {
          return 'MESA/PC actualizada con éxito'
        },
        error: 'Error',
        finally: () => {
          setTables(
            tables.map((t) => {
              if (t._id === table._id) {
                return {
                  ...t,
                  ...(form as typeof table)
                }
              }
              return t
            })
          )
          useModalTable.getState().resetState()
          finalFunction?.()
        }
      }
    )
  }

  return (
    <div className=" flex flex-col w-[500px] h-full">
      <div className="flex-grow">
        <div className="grid py-5">
          <span className="w-[120px] aspect-square mx-auto block rounded-full overflow-hidden">
            <Image
              width={120}
              className="w-full h-full object-cover"
              height={120}
              src={getUserProfile(user.image)}
              alt={user.names}
            />
          </span>
          <span className="text-lg font-medium mx-auto pt-2 capitalize">
            {user.names.toLowerCase()}
          </span>
          <span className="text-center pt-3 block text-neutral-500 dark:text-neutral-200 text-base">
            {user.email} -{' '}
            <span className="text-blue-500 font-semibold">{user.tenant}</span>
          </span>
        </div>
        <div>
          <Select
            control={control}
            rules={{ required: true }}
            className="border-0 w-full h-14 font-semibold max-md:w-full rounded-xl bg-neutral-200 dark:bg-neutral-800"
            placeholder="Hasta:"
            name="to"
          >
            {toHour.map((item) => {
              return (
                <option key={item} value={item}>
                  {converterForma12Hour(item)}
                </option>
              )
            })}
          </Select>
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <Button
          onClick={onSubmit}
          className="w-full bg-blue-600/50 text-base p-3 dark:bg-blue-600 rounded-xl text-center"
          variant="none"
          isFilled
        >
          Agregar usuario a la mesa
        </Button>
      </div>
    </div>
  )
}

export default Configure
