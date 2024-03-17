import axios from 'axios'
import { Button } from 'commons/button'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { SearchIcon } from 'icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { type User } from 'types'
import { getUserProfile } from 'utils'

type Props = {
  onAdd: (v: User | null) => void
}

function Users({ onAdd }: Props) {
  const { debouncedValue, onChange } = useDebouncedInput('init', 500)
  const [users, setUsers] = useState<User[]>([])
  const handler = async (v: string) => {
    try {
      const { data } = await axios.get(`/api/users?limit=10&q=${v}`)
      setUsers(data as User[])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (debouncedValue !== null) void handler(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="absolute z-10 flex flex-col inset-0 rounded-2xl bg-white p-3">
      <h2 className="text-center pb-4 pt-1 font-bold text-xl text-neutral-800">
        Selecciona un usuario
      </h2>
      <div className="">
        <span role="search" className="relative">
          <SearchIcon className="absolute pointer-events-none w-5 text-neutral-500 top-[50%] translate-y-[-50%] left-3" />
          <input
            autoFocus
            onChange={onChange}
            type="search"
            className="w-full focus:bg-neutral-200 border outline-none pl-14 placeholder:text-neutral-500 bg-neutral-100 rounded-2xl p-4"
            placeholder="Nombres, dni, correo"
          />
        </span>
      </div>
      {users.length === 0 ? (
        <div className="h-full w-full grid place-content-center">
          <span className="text-blue-500">No hay nada que mostrar</span>
        </div>
      ) : (
        <div className="flex py-3 flex-col overflow-y-auto gap-0 px-0">
          {users.map((user) => {
            return (
              <Button
                onClick={() => onAdd(user)}
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
          })}
        </div>
      )}
      <div className="mt-auto">
        <Button
          onClick={() => onAdd(null)}
          className="w-full p-3 bg-neutral-200 text-base rounded-xl text-center"
          variant="none"
          isFilled
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default Users
