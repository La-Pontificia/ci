'use client'

import React, { useState } from 'react'
import { type User as UserType } from 'types'
import ToggleStatus from './toggle'
import DropDownUser from './dropdown'

export interface Type extends Omit<UserType, '_id'> {
  _id: string
}

function User({ user: userInit }: { user: Type }) {
  const [user, setUser] = useState(userInit)

  const displayStatus = user.is_active ? 'Activo' : 'Inactivo'
  const displayType =
    user.type_user === 'executive' ? 'Ejecutivo' : 'Estudiante'

  return (
    <div className="flex items-start p-2 gap-3">
      <div className="w-[40px] bg-neutral-700 min-w-[40px] h-[40px] rounded-full overflow-hidden">
        <img
          width={40}
          height={40}
          src={user.image}
          className="w-full h-full object-cover"
          alt={user.names}
        />
      </div>
      <div className="border-b pb-4 border-neutral-300 w-full flex items-center">
        <div className="flex flex-col gap-1 text-zinc-800 text-sm tracking-tight font-medium">
          <span className="text-base font-semibold">{user.names}</span>
          <span className="lowercase text-neutral-400 font-light">
            {user.email}
          </span>
          <div className="flex gap-3 divide-x divide-neutral-700">
            <span className="">{displayType}</span>
            <span className="uppercase pl-2">{user.tenant}</span>
            <span
              aria-checked={user.is_active}
              className="aria-checked:text-green-600 text-red-500 pl-2 flex items-center gap-2"
            >
              <span className="w-[6px] h-[6px] rounded-full bg-current" />
              {displayStatus}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <ToggleStatus {...{ setUser, user }} />
          <DropDownUser {...{ setUser, user }} />
        </div>
      </div>
    </div>
  )
}

export default User
