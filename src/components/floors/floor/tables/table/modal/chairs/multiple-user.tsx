import axios from 'axios'
import { Button } from 'commons/button'
import { PlusIcon, TrashIcon } from 'icons'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { type TableCurrentUser } from 'types/table'
import { getUserProfile } from 'utils'
import { useModalTable } from '../state'

type Props = {
  table: NewTypeTable
}

export function MultipleUsers({ table }: Props) {
  if (!table.accept_mutiple || table.current_users.length < 1) return null
  const current_users = table.current_users.slice(1)

  const setTables = useTables((store) => store.setTables)
  const tables = useTables((store) => store.tables)

  const fetch = async (form: any) => {
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
    } catch (error) {
      console.error(error)
    }
  }

  const onRemove = async (item: TableCurrentUser) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const ncu = table.current_users.filter(
        (e) => e.user._id !== item.user._id
      )

      // create record
      toast.promise(onCreateRecord(item.user._id.toString()), {
        loading: 'Creando asistencia...',
        success: () => {
          return 'Asistencia creada con éxito'
        },
        error: 'Error',
        finally: () => {
          // update table
          toast.promise(fetch({ current_users: ncu }), {
            loading: 'Actualizando PC',
            success: () => {
              return 'PC actualizada con éxito'
            },
            error: 'Error'
          })
        }
      })
    }
  }

  const onCreateRecord = async (userId: string) => {
    try {
      await axios.post('/api/records/pc/per-user', {
        table_id: table._id,
        user_id: userId
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleClick = () => {
    useModalTable.getState().setIsCompanion(true)
    useModalTable.getState().setChairSelected(table.current_users.length + 1)
    useModalTable.getState().setPage('search')
  }

  return (
    <div className="pt-2 z-[0] w-[450px] overflow-y-auto">
      <div className="grid grid-cols-3 gap-2">
        {current_users?.map((item) => {
          return (
            <div
              key={item.user._id.toString()}
              className="grid relative place-content-center border dark:border-neutral-700 aspect-square p-2 rounded-2xl gap-2"
            >
              <div className="w-[60px] aspect-square mx-auto bg-stone-100 rounded-full overflow-hidden">
                {item.user.image && (
                  <Image
                    width={60}
                    height={60}
                    src={getUserProfile(item.user.image)}
                    className="w-full h-full object-cover"
                    alt={item.user.names}
                  />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-neutral-900 dark:text-white text-xs capitalize font-semibold">
                  {item.user.names.toLocaleLowerCase()}
                </h3>
                <p className="text-xs mt-1 font-medium text-neutral-700 dark:text-neutral-400">
                  {item.user.email}
                </p>
              </div>
              <button
                onClick={async () => await onRemove(item)}
                className="w-[30px] absolute top-2 right-2 rounded-full p-2 hover:text-black text-stone-600 aspect-square bg-stone-200 dark:bg-neutral-700 dark:text-neutral-100"
              >
                <TrashIcon />
              </button>
            </div>
          )
        })}
        <Button
          variant="none"
          className="aspect-square hover:border-black/80 grid place-content-center border-dashed border-2 dark:border-neutral-100/30 rounded-2xl text-sm p-2"
          onClick={handleClick}
        >
          <PlusIcon className="w-7" />
        </Button>
      </div>
    </div>
  )
}
