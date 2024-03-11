import { Button } from 'commons/button'
import { Select } from 'commons/select'
import Image from 'next/image'
import React, { useState } from 'react'
import { type Control } from 'react-hook-form'
import { type User as UserType } from 'types'
import { converterForma12Hour, generateFullDayHourList } from 'utils'
import { type TypeForm } from '.'
import { toDate } from 'date-fns'

type Props = {
  control: Control<TypeForm>
  user: UserType
  onSubmit: (u: UserType | null) => void
  isPending?: boolean
}

function User({ control, user, onSubmit, isPending }: Props) {
  const now = toDate(new Date())

  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const [toHour] = useState<string[]>(
    generateFullDayHourList(`${currentHour}:${currentMinute}`).slice(1, 6)
  )

  return (
    <div className="absolute z-10 flex flex-col inset-0 rounded-2xl bg-white p-3">
      <h2 className="text-center pb-4 pt-1 font-bold text-xl text-neutral-900">
        Configura el tiempo de uso
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
        <span className="text-lg font-medium mx-auto pt-2">{user.names}</span>
        <span className="text-center pt-3 block text-neutral-500 text-sm">
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
              <option key={item} value={item}>
                {converterForma12Hour(item)}
              </option>
            )
          })}
        </Select>
      </div>
      <div className="mt-auto flex gap-3 pt-2">
        <Button
          onClick={() => onSubmit(null)}
          className="w-[100px] p-3 bg-neutral-200 text-sm rounded-full text-center"
          variant="none"
          isFilled
        >
          Cancelar
        </Button>
        <Button
          loading={isPending}
          onClick={() => onSubmit(user)}
          className="w-full bg-black p-3 text-sm rounded-full text-center"
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
