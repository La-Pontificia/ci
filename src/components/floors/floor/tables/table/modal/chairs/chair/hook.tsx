import { useTables } from 'stores/tables/tables.store'
import { type Props } from '.'

import axios from 'axios'
import { toast } from 'sonner'

export const useChair = ({ table, currentUser }: Props) => {
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const onUpdateTable = (form: any) => {
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
        }
      }
    )
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
            void onUpdateTable({
              current_users: newCurrentUsers
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
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
    currentUser,
    onRemove
  }
}
