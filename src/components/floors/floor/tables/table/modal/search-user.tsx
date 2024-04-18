/* eslint-disable @typescript-eslint/no-invalid-void-type */
import axios from 'axios'
import { Button } from 'commons/button'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { AddCircleIcon, SearchIcon } from 'icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { type User as UserType } from 'types'
import { getUserProfile } from 'utils'
import Search from 'commons/search'
import { useModalTable } from './state'

function SearchUser() {
  const { debouncedValue, onChange } = useDebouncedInput('init', 500)
  const [users, setUsers] = useState<UserType[]>([])
  const handler = async (v: string) => {
    try {
      const { data } = await axios.get(`/api/users?limit=6&q=${v}`)
      setUsers(data as UserType[])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (debouncedValue !== null) void handler(debouncedValue)
  }, [debouncedValue])

  return (
    <div className="flex flex-col h-full w-[600px] inset-0 rounded-2xl">
      <div className="flex flex-grow flex-col">
        <div className="">
          <span role="search" className="relative">
            <SearchIcon className="absolute pointer-events-none w-5 text-neutral-500 top-[50%] translate-y-[-50%] left-3" />
            <Search
              autoFocus
              onChange={onChange}
              type="search"
              placeholder="Nombres, dni, correo"
            />
          </span>
        </div>
        {users.length === 0 ? (
          <div className="h-full w-full grid p-32 place-content-center">
            <span className="text-neutral-500 font-semibold text-center pb-2">
              No hay nada que mostrar
            </span>
            {users.length === 0 && debouncedValue !== null && (
              <Button
                onClick={() => useModalTable.getState().setPage('create')}
                icon={<AddCircleIcon className="w-5" />}
                className="w-full rounded-xl dark:bg-blue-200/20 bg-blue-600/40 text-blue-800 dark:text-blue-100 flex items-center gap-3 p-2 px-3 text-base text-center"
                variant="none"
                isFilled
              >
                Agregar nuevo usuario
              </Button>
            )}
          </div>
        ) : (
          <div className="flex py-3 flex-col overflow-y-auto gap-0 px-0">
            {users.map((user) => {
              return (
                <Button
                  onClick={() => {
                    useModalTable.getState().setPage('configure')
                    useModalTable.getState().setUserSelected(user)
                  }}
                  variant="none"
                  key={user._id.toString()}
                  className="flex w-full hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-2xl items-center gap-2"
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
                    <h3 className="text-neutral-900 text-base dark:text-neutral-50 capitalize font-medium line-clamp-1">
                      {user.names.toLocaleLowerCase()}
                    </h3>
                    <p className="text-sm font-normal text-neutral-700 dark:text-neutral-400">
                      {user.email}
                    </p>
                  </div>
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchUser
