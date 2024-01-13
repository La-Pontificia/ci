import { Button } from 'commons/button'
import { Select } from 'commons/select'
import Image from 'next/image'
import React, { useState } from 'react'
import { type Control } from 'react-hook-form'
import { type User as UserType } from 'types'
import { type TableCurrentUser } from 'types/table'
import { generateHours } from 'utils'

type Props = {
  control: Control<TableCurrentUser>
  user: UserType
  onSubmit: (u: UserType | null) => void
  isPending?: boolean
}

function User({ control, user, onSubmit, isPending }: Props) {
  const [toHour] = useState<Array<{ time: string; displayName: string }>>(
    generateHours(null, '21:00')
  )

  return (
    <div className="absolute z-10 flex flex-col inset-0 rounded-2xl bg-neutral-900 p-3">
      <h2 className="text-center pb-4 pt-1 font-bold text-xl text-neutral-300">
        Configura el usuario
      </h2>
      <div className="grid py-5">
        <span className="w-[200px] mx-auto block h-[200px] rounded-full overflow-hidden">
          <Image
            width={200}
            className="w-full h-full object-cover"
            height={200}
            src={user.image}
            alt={user.names}
          />
        </span>
        <a
          target="_blank"
          href={`/u/${user._id.toString()}`}
          className="hover:underline"
          rel="noreferrer"
        >
          <p className="text-center pt-3 font-semibold text-lg">{user.names}</p>
        </a>
        <span className="text-center font-semibold text-neutral-500 text-sm">
          {user.email} -{' '}
          <span className="text-blue-500 font-semibold">{user.tenant}</span>
        </span>
      </div>
      <div>
        <Select
          control={control}
          rules={{ required: true }}
          className="h-14"
          placeholder="Hasta:"
          name="to"
        >
          {toHour.map((item) => {
            return (
              <option key={item.time} value={item.time}>
                {item.displayName}
              </option>
            )
          })}
        </Select>
      </div>
      <div className="mt-auto flex gap-3 pt-2">
        <Button
          onClick={() => onSubmit(null)}
          className="w-[100px] p-3 bg-neutral-700 text-base rounded-xl text-center"
          variant="none"
          isFilled
        >
          Cancelar
        </Button>
        <Button
          loading={isPending}
          onClick={() => onSubmit(user)}
          className="w-full p-3 text-base rounded-xl text-center"
          variant="primary"
          isFilled
        >
          Agregar usuario a la mesa
        </Button>
      </div>
    </div>
  )
}

export default User
