import { useModal } from 'hooks/useModal'
import { usePending } from 'hooks/usePending'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTables } from 'stores/tables/tables.store'
import { type User as UserType } from 'types'
import { type Props, type TypeForm } from '.'
import {
  calculateTimeMargin,
  checkReservations,
  parseTimeStringToDate
} from 'utils'
import { type Table, type TableCurrentUser } from 'types/table'
import axios from 'axios'
import { toast } from 'sonner'
import { formatSpanishDateAndTime } from 'herpers'

export const useChair = ({ index, table, currentUser }: Props) => {
  const { onOpenModal, open, onCloseModal } = useModal()
  const [selectedUser, setSelectedUser] = React.useState<UserType | null>(null)
  const { end, isPending, start } = usePending()
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const { control, watch, setValue } = useForm<TypeForm>({
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
    if (!u) return setSelectedUser(null)
    const newCurrentUser: TableCurrentUser = {
      user: {
        _id: u._id,
        email: u.email,
        image: u.image,
        names: u.names
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
    void onUpdateTable({
      current_users: newCurrentUsers
    })
  }

  const onUpdateTable = async (form: any) => {
    start()
    try {
      await axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        form
      )
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
      setSelectedUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      end()
    }
  }

  const onRemove = async () => {
    if (
      currentUser &&
      window.confirm('¿Estás seguro de eliminar este usuario?')
    ) {
      try {
        const newCurrentUsers =
          table.type === 'pc'
            ? []
            : table.current_users.filter(
                (u) => u.user._id !== currentUser.user._id
              )

        // create record
        toast.promise(onCreateRecord, {
          loading: 'Creando asistencia...',
          success: () => {
            return 'Asistencia creada con éxito'
          },
          error: 'Error',
          finally: () => {
            // update table
            toast.promise(
              onUpdateTable({
                current_users: newCurrentUsers
              }),
              {
                loading: 'Actualizando MESA/PC',
                success: () => {
                  return 'MESA/PC actualizada con éxito'
                },
                error: 'Error'
              }
            )
          }
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      setSelectedUser(null)
      onCloseModal()
    }
  }

  const onCreateRecord = async () => {
    try {
      const uri =
        table.type === 'pc' ? '/api/records/pc' : '/api/records/table/per-user'
      await axios.post(uri, {
        table_id: table._id,
        user_id: currentUser?.user._id
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    control,
    currentUser,
    isPending,
    onAdd,
    onOpenModal,
    onRemove,
    open,
    selectedUser,
    setSelectedUser,
    onSubmit,
    setValue
  }
}
