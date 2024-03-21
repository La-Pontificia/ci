import axios from 'axios'
import { Button } from 'commons/button'
import Search from 'commons/search'
import { useDialog } from 'commons/vaul/use-dialog'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { AddCircleIcon, PlusIcon, TrashIcon } from 'icons'
import * as Drawer from 'commons/vaul'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { type User } from 'types'
import { type TableCurrentUser, type Table } from 'types/table'
import { getUserProfile } from 'utils'
import { AddNewUser } from './chairs/chair/add-new-user'

type Props = {
  table: NewTypeTable
}

export function MultipleUsers({ table }: Props) {
  if (!table.accept_mutiple || table.current_users.length < 1) return null
  const current_users = table.current_users.slice(1)

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

  React.useEffect(() => {
    if (debouncedValue !== null) void handler(debouncedValue)
  }, [debouncedValue])

  const onAdd = async (user: User) => {
    const newCurrentUser: TableCurrentUser = {
      ...table.current_users[0],
      chair: table.current_users.length + 1,
      user: {
        _id: user._id,
        email: user.email,
        names: user.names,
        image: user.image
      }
    }
    const new_current_users: Table['current_users'] = [
      ...table.current_users,
      newCurrentUser
    ]
    toast.promise(fetch({ current_users: new_current_users }), {
      loading: 'Agregando usuario...',
      success: () => {
        return 'Usuario agregado con éxito'
      },
      error: 'Error'
    })
    onClose()
  }

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

  const usersList = users.filter((e) => {
    return !table.current_users.find((u) => u.user._id === e._id)
  })

  return (
    <>
      <div className="py-2 z-[0] overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {current_users?.map((item) => {
            return (
              <div
                key={item.user._id.toString()}
                className="grid relative place-content-center border aspect-square p-2 rounded-2xl gap-2"
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
                  <h3 className="text-neutral-900 text-xs capitalize font-semibold">
                    {item.user.names.toLocaleLowerCase()}
                  </h3>
                  <p className="text-xs font-normal text-neutral-700">
                    {item.user.email}
                  </p>
                </div>
                <button
                  onClick={async () => await onRemove(item)}
                  className="w-[35px] absolute top-2 right-2 rounded-full p-2 hover:text-black text-stone-600 aspect-square bg-stone-200"
                >
                  <TrashIcon />
                </button>
              </div>
            )
          })}
          <Drawer.root open={open} onOpenChange={setOpen}>
            <Drawer.trigger asChild>
              <Button
                variant="none"
                className="aspect-square hover:border-black/80 grid place-content-center border-dashed border-2 rounded-2xl text-sm p-2"
                onClick={onOpen}
              >
                <PlusIcon className="w-7" />
              </Button>
            </Drawer.trigger>
            <Drawer.content>
              <div className=" max-w-[31rem] mx-auto p-2">
                <Search
                  onChange={onChange}
                  autoFocus
                  placeholder="Buscar usuario"
                />
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
                              <Image
                                width={40}
                                height={40}
                                src={getUserProfile(user.image)}
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
                      <>
                        {users.length === 0 && debouncedValue !== null && (
                          <AddNewUser
                            onEnd={async (u) => {
                              // eslint-disable-next-line no-void
                              u && void onAdd(u)
                            }}
                          >
                            <Button
                              icon={<AddCircleIcon className="w-5" />}
                              className="mx-auto w-60 flex items-center gap-3 p-2 text-base rounded-xl text-center"
                              variant="black"
                              isFilled
                            >
                              Registrar nuevo usuario
                            </Button>
                          </AddNewUser>
                        )}
                        <div className="text-center p-20">
                          No hay nada que mostrar
                        </div>
                      </>
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
            </Drawer.content>
          </Drawer.root>
        </div>
      </div>
    </>
  )
}
