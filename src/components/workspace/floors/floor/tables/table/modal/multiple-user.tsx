import axios from 'axios'
import { Button } from 'commons/button'
import { Modal } from 'commons/modal'
import Search from 'commons/search'
import { ToastContainer } from 'commons/utils'
import { useDialog } from 'commons/vaul/use-dialog'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { TrashIcon } from 'icons'
import React from 'react'
import { toast } from 'sonner'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { type User } from 'types'
import { type Table, type TableCompanion } from 'types/table'

type Props = {
  table: NewTypeTable
}

export function MultipleUsers({ table }: Props) {
  if (!table.accept_mutiple || table.current_users.length < 1) return null

  const { onClose, open, setOpen, onOpen } = useDialog()
  const setTables = useTables((store) => store.setTables)
  const tables = useTables((store) => store.tables)

  const { debouncedValue, onChange } = useDebouncedInput('init', 500)
  const [users, setUsers] = React.useState<User[]>([])

  const handler = async (v: string) => {
    try {
      const { data } = await axios.get(`/api/users?limit=10&q=${v}`)
      setUsers(data as User[])
    } catch (error) {
      console.log(error)
    }
  }
  const prevList = table.companions ? table.companions : []

  React.useEffect(() => {
    if (debouncedValue !== null) void handler(debouncedValue)
  }, [debouncedValue])

  const onAdd = async (user: User) => {
    const newCompanion: TableCompanion = {
      _id: user._id,
      email: user.email,
      names: user.names,
      image: user.image
    }
    const companions: Table['companions'] = [...prevList, newCompanion]
    await fetch({ companions }, 'Se agregó un usuario')
    onClose()
  }

  const fetch = async (form: any, msg: string) => {
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
      toast(ToastContainer(msg))
    } catch (error) {
      console.error(error)
    }
  }

  const onRemove = async (companion: TableCompanion) => {
    const companions = prevList.filter((e) => e._id !== companion._id)
    await fetch({ companions }, 'Usuario removido')
  }

  const usersList = users.filter((e) => {
    return !prevList.find((u) => u._id === e._id)
  })

  return (
    <>
      <div className="py-2">
        <Button
          variant="black"
          isFilled
          className="w-full text-sm p-2"
          onClick={onOpen}
        >
          Agregar usuario secundario
        </Button>
        <div>
          {table.companions?.map((companion) => {
            return (
              <div
                // onClick={async () => await onAdd(user)}
                key={companion._id.toString()}
                className="flex p-2 rounded-2xl items-center gap-2"
              >
                <div className="w-[40px] bg-stone-100 h-[40px] rounded-full overflow-hidden">
                  {companion.image && (
                    <img
                      width={40}
                      height={40}
                      src={companion.image}
                      className="w-full h-full object-cover"
                      alt={companion.names}
                    />
                  )}
                </div>
                <div className="mr-auto">
                  <h3 className="text-neutral-900 text-sm capitalize font-semibold line-clamp-1">
                    {companion.names.toLocaleLowerCase()}
                  </h3>
                  <p className="text-xs font-normal text-neutral-700">
                    {companion.email}
                  </p>
                </div>
                <button
                  onClick={async () => await onRemove(companion)}
                  className="w-[35px] rounded-full p-2 hover:text-black text-stone-600 aspect-square bg-stone-200"
                >
                  <TrashIcon />
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <Modal hiddenFooter hiddenHeader open={open} onOpenChange={setOpen}>
        <div className="w-[450px] p-2">
          <Search onChange={onChange} autoFocus placeholder="Buscar usuario" />
          <div className="pt-3">
            <div className="flex py-3 flex-col max-h-[500px] overflow-y-auto gap-0 px-0">
              {usersList.length > 0 ? (
                usersList.map((user) => {
                  return (
                    <Button
                      onClick={async () => await onAdd(user)}
                      variant="none"
                      key={user._id.toString()}
                      className="flex hover:bg-neutral-100 p-2 rounded-2xl items-center gap-2"
                    >
                      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                        <img
                          width={40}
                          height={40}
                          src={user.image}
                          className="w-full h-full object-cover"
                          alt={user.names}
                        />
                      </div>
                      <div>
                        <h3 className="text-neutral-900 capitalize font-medium line-clamp-1">
                          {user.names.toLocaleLowerCase()}
                        </h3>
                        <p className="text-sm font-normal text-neutral-700">
                          {user.email}
                        </p>
                      </div>
                    </Button>
                  )
                })
              ) : (
                <div className="text-center p-20">No hay nada que mostrar</div>
              )}
            </div>
            <Button
              onClick={onClose}
              variant="black"
              className="w-full p-2 text-sm"
              isFilled
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
