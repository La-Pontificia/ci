import React from 'react'
import * as Drawer from 'commons/vaul'
import { Button } from 'commons/button'
import { AddCircleIcon, TrashIcon } from 'icons'
import Search from 'commons/search'
import axios from 'axios'
import { type User } from 'types'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { type UseFormSetValue, type UseFormWatch } from 'react-hook-form'
import { getUserProfile } from 'utils'
import Image from 'next/image'
import { type FormData } from './hook'

export function AddUsers({
  user,
  setValue,
  watch
}: {
  user: User
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
}) {
  const { debouncedValue, onChange } = useDebouncedInput('init', 500)
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    if (debouncedValue !== null) void handler(debouncedValue)
  }, [debouncedValue])

  const handler = async (v: string) => {
    try {
      const { data } = await axios.get(`/api/users?limit=10&q=${v}`)
      setUsers(data as User[])
    } catch (error) {
      console.log(error)
    }
  }

  const usersFinal = users.filter(
    (u) => !watch().users?.find((e) => e._id === u._id)
  )

  const onHandler = (user: User) => {
    const prev = watch().users ?? []
    const finded = prev?.find((e) => e._id === user._id)
    setValue(
      'users',
      finded ? [...prev.filter((e) => e._id !== user._id)] : [...prev, user]
    )
  }

  const onRemoveUser = (user: User) => {
    setValue(
      'users',
      (watch().users ?? []).filter((e) => e._id !== user._id)
    )
  }

  return (
    <div>
      <div className="py-3 space-y-2">
        {watch().users?.map((u) => (
          <div key={u._id.toString()} className="flex gap-2 items-center">
            <div className="w-[40px] aspect-square rounded-full overflow-hidden">
              <Image
                src={getUserProfile(u.image)}
                alt=""
                className="w-full h-full object-cover"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{u.nick_name}</h3>
              <p className="text-xs font-normal">{u.email}</p>
            </div>

            {user._id !== u._id && (
              <div className="ml-auto">
                <Button
                  onClick={() => onRemoveUser(u)}
                  variant="none"
                  className="p-1 hover:opacity-65 w-[30px] aspect-square"
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Drawer.root>
        <Drawer.trigger asChild>
          <Button
            variant="none"
            className="w-[250px] border-black/30 border-2 rounded-full hover:bg-transparent justify-center gap-3 flex p-1 text-sm items-center"
          >
            <AddCircleIcon className="w-7" />
            Añadir
          </Button>
        </Drawer.trigger>
        <Drawer.content>
          {({ onClose }) => (
            <div className="max-w-xl w-full mx-auto p-2">
              <Search
                onChange={onChange}
                autoFocus
                className="font-normal"
                placeholder="Buscar estudiantes/compañeros (as)"
              />
              <div className="pt-2">
                <div className="flex flex-col min-h-[500px] max-h-[500px] overflow-y-auto gap-0 px-0">
                  {usersFinal.length > 0 ? (
                    usersFinal.map((user) => {
                      return (
                        <Button
                          onClick={() => {
                            onHandler(user)
                            onClose?.()
                          }}
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
                    <div className="text-center p-20">
                      No hay nada que mostrar
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Drawer.content>
      </Drawer.root>
    </div>
  )
}
