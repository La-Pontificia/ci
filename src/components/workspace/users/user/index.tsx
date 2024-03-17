'use client'

import React, { useState } from 'react'
import { type User as UserType } from 'types'
import ToggleStatus from './toggle'
import DropDownUser from './dropdown'
import Image from 'next/image'
import { StudentHeadIcon, TeacherIcon, UserIcon } from 'icons'
import { getUserProfile } from 'utils'

export interface Type extends Omit<UserType, '_id'> {
  _id: string
}

function User({ user: userInit }: { user: Type }) {
  const [user, setUser] = useState(userInit)

  const displayStatus = user.is_active ? 'Activo' : 'Inactivo'
  const displayType =
    user.type_user === 'executive'
      ? 'Ejecutivo'
      : user.type_user === 'student'
      ? 'Estudiante'
      : 'Docente'

  const icon =
    user.type_user === 'executive' ? (
      <UserIcon className="w-4" />
    ) : user.type_user === 'student' ? (
      <StudentHeadIcon className="w-5" />
    ) : (
      <TeacherIcon className="w-5" />
    )

  return (
    <div className="flex items-start p-2 gap-3">
      <div className="w-[40px] bg-neutral-700 min-w-[40px] h-[40px] rounded-full overflow-hidden">
        <Image
          width={40}
          height={40}
          src={getUserProfile(user.image)}
          className="w-full h-full object-cover"
          alt={user.names}
        />
      </div>
      <div className="border-b pb-4 border-neutral-300 w-full flex items-center">
        <div className="flex flex-col gap-1 text-zinc-800 text-sm tracking-tight font-medium">
          <span className="text-base font-semibold">{user.names}</span>
          <div className="flex gap-3 divide-x divide-neutral-700">
            <span className="lowercase text-neutral-600 font-light">
              {user.email}
            </span>
            <span className="pl-2 flex items-center gap-1">
              {icon}
              {displayType}
            </span>
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
