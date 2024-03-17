import axios from 'axios'
import { useRemainingTime } from 'hooks/useReminingTime'
import React from 'react'
import { toast } from 'sonner'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'

type Props = {
  currentUser: TableCurrentUser
  table: NewTypeTable
}

export const useNotify = ({ currentUser, table }: Props) => {
  const { active } = useRemainingTime(currentUser.from, currentUser.to)
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const removeUser = async () => {
    try {
      const uriRecord =
        table.type === 'pc' ? '/api/records/pc' : '/api/records/table/per-user'
      const newCurrentUsers =
        table.type === 'pc'
          ? []
          : table.current_users.filter((e) => e.chair !== currentUser.chair)

      // create record
      toast.promise(
        axios.post(uriRecord, {
          table_id: table._id,
          user_id: currentUser?.user._id
        }),
        {
          loading: 'Creando asistencia...',
          success: () => {
            return 'Asistencia creada con éxito'
          },
          error: 'Error',
          finally: () => {
            // update table
            toast.promise(
              axios.patch(
                `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
                {
                  current_users: newCurrentUsers
                }
              ),
              {
                loading: 'Actualizando PC/MESA...',
                success: () => {
                  return 'PC/MESA actualizada con éxito'
                },
                error: 'Error'
              }
            )
          }
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

  React.useEffect(() => {
    const playNotification = () => {
      if (!active) {
        const audioElement = new Audio('/notify.mp3')
        void audioElement.play()
      }
    }
    playNotification()
  }, [active])

  const [timeToExtended, setTimeToExtended] = React.useState<number | null>(
    null
  )

  const onExtedTime = async () => {
    if (timeToExtended) {
      try {
        const to = new Date(currentUser.to)
        const newToTime = new Date(to.getTime() + timeToExtended * 60000)
        const newCurrentUsers = table.current_users.map((e) => {
          if (e.chair === currentUser.chair) {
            return {
              ...e,
              to: newToTime
            }
          }
          return e
        })

        toast.promise(
          await axios.patch(
            `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
            {
              current_users: newCurrentUsers
            }
          ),
          {
            loading: 'Extendiendo tiempo...',
            success: () => {
              return 'Tiempo extendido con éxito'
            },
            error: 'Error'
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
        console.error(error)
      }
    }
  }

  const times = [
    {
      display: '30 minutos',
      minute: 30
    },
    {
      display: '1 hora',
      minute: 60
    },
    {
      display: '1h y 30 min',
      minute: 90
    },
    {
      display: '2 horas',
      minute: 120
    }
  ]

  return {
    active,
    times,
    onExtedTime,
    setTimeToExtended,
    removeUser,
    timeToExtended
  }
}
