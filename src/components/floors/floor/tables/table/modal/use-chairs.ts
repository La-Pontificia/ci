import axios from 'axios'
import { toast } from 'sonner'
import { NewTypeTable, useTables } from 'stores/tables/tables.store'

export type Props = {
  table: NewTypeTable
}

export const useChairs = ({ table }: Props) => {
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

  const onRemoveAll = async () => {
    if (
      window.confirm(
        '¿Estás seguro de que deseas eliminar a todos los usuarios de esta mesa?'
      )
    ) {
      try {
        // create record
        toast.promise(onCreateRecord, {
          loading: 'Creando asistencia...',
          success: () => {
            return 'Asistencia creada con éxito'
          },
          error: 'Error',
          finally: () => {
            void onUpdateTable({
              current_users: []
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
      await axios.post('/api/records/table', {
        table_id: table._id
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    onRemoveAll
  }
}
