import React from 'react'
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
import { Dialog } from 'commons/dialog'

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
      const { data } = await axios.get(`/api/users?limit=6&q=${v}`)
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
              <h3 className="font-semibold capitalize">
                {u.nick_name.toLowerCase()}
              </h3>
              <p className=" font-normal dark:text-neutral-400">{u.email}</p>
            </div>

            {user._id !== u._id && (
              <div className="ml-auto">
                <Button
                  onClick={() => onRemoveUser(u)}
                  variant="none"
                  className="p-1 hover:opacity-65 w-[25px] aspect-square"
                >
                  <TrashIcon />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      {watch().users.length < 12 && (
        <Dialog
          backdrop_blur="sm"
          className="p-3 w-[450px] max-md:w-full"
          trigger={
            <Button
              variant="none"
              className="w-[250px] bg-neutral-300 hover:bg-neutral-200 dark:bg-neutral-800 rounded-xl justify-center gap-3 flex p-1 text-sm items-center"
            >
              <AddCircleIcon className="w-7" />
              Añadir
            </Button>
          }
        >
          {({ onClose }) => (
            <div className="max-w-xl w-full mx-auto pt-0">
              <h1 className="text-xl font-semibold text-center py-3">
                Añadir compañeros(as)
              </h1>
              <Search
                onChange={onChange}
                autoFocus
                className="font-normal"
                placeholder="Buscar estudiantes/compañeros (as)"
              />
              <div className="pt-2">
                <div className="flex flex-col max-h-[500px] overflow-y-auto gap-0 px-0">
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
                          className="flex hover:bg-neutral-100 dark:hover:bg-neutral-100/5 p-2 rounded-2xl items-center gap-2"
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
                            <h3 className="text-neutral-900 text-base dark:text-white capitalize font-medium line-clamp-1">
                              {user.names.toLocaleLowerCase()}
                            </h3>
                            <p className=" text-neutral-700 dark:text-neutral-300">
                              {user.email}
                            </p>
                          </div>
                        </Button>
                      )
                    })
                  ) : (
                    <div className="text-center p-10 text-lg font-semibold ">
                      No hay nada que mostrar
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Dialog>
      )}
    </div>
  )
}
