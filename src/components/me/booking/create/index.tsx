/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import * as Drawer from 'commons/vaul'
import axios from 'axios'
import { Button } from 'commons/button'
import { Input } from 'commons/input'
import { Select } from 'commons/select'
import { ToastContainer } from 'commons/utils'
import { parse, format, toDate } from 'date-fns'
import { useModal } from 'hooks/useModal'
import { usePending } from 'hooks/usePending'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type User, type Floor } from 'types'
import confetti from 'canvas-confetti'

import {
  converterForma12Hour,
  generateDateRange,
  isDateInRange,
  parseTimeStringToDate
} from 'utils'
import { useBookingCreateDate } from './hook'
import { DisplayIcon, Table2Icon } from 'icons'
import { AddUsers } from './add-users'

export type FormData = {
  headquarder: Floor['headquarder']
  type: 'table' | 'pc'
  from: string | null
  to: string | null
  date: string | null
  time: string | null
  users: User[]
}

const count = 200
const defaults = {
  origin: { y: 0.7 }
}

function fire(particleRatio: number, opts: any) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  })
}

const congratulations = () => {
  fire(0.25, {
    spread: 26,
    startVelocity: 55
  })
  fire(0.2, {
    spread: 60
  })
}

function Create({ trigger, user }: { trigger: React.ReactNode; user: User }) {
  const now = toDate(new Date())
  const formattedDate = format(now, 'yyyy-MM-dd')

  const router = useRouter()
  const { end, isPending, start } = usePending()
  const { onOpenModal, onCloseModal, open, setOpen } = useModal()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    reset,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      date: formattedDate,
      headquarder: 'alameda',
      from: undefined,
      to: undefined,
      type: 'pc',
      time: '00:00',
      users: [user]
    }
  })

  const onSearch = async (d: FormData) => {
    const date = parse(d.date ?? '', 'yyyy-MM-dd', new Date())
    const newDateFrom = parseTimeStringToDate(d.from!, date)
    const newDateTo = parseTimeStringToDate(d.to!, date)
    if (!isDateInRange(date)) {
      return setError('date', {
        type: 'date',
        message: 'La fecha debe estar dentro del rango de fechas permitido'
      })
    }
    const newData = {
      ...d,
      from: newDateFrom,
      to: newDateTo,
      date
    }
    try {
      start()
      await axios.post('/api/booking', newData)
      onCloseModal()
      congratulations()
      reset()
      router.refresh()
    } catch (error) {
      console.log(error)
      toast(
        ToastContainer(
          'No se pudo establecer una reserva con lo datos ingresados'
        )
      )
    } finally {
      end()
    }
  }

  const { fromHour, toHour } = useBookingCreateDate({
    setValue,
    watch,
    clearErrors
  })

  const { time, headquarder, type } = watch()
  const disable_button = time === '00:00' || Object.entries(errors).length > 0
  const { max, min } = generateDateRange()

  const headquarters = [
    {
      label: 'Sede Alameda',
      value: 'alameda',
      address: 'Av. Carmen Alto 390',
      img: '/address-alameda.png',
      isDisabled: false
    },
    {
      label: 'Sede Jazmines',
      value: 'jazmines',
      address: 'Jr. Los Jazmines 191 - Urb. Jardín',
      img: '/address-jasmines.png',
      isDisabled: false
    }
  ]

  const types = [
    {
      label: 'Mesa',
      value: 'table',
      icon: <Table2Icon />
    },
    {
      label: 'PC',
      value: 'pc',
      icon: <DisplayIcon />
    }
  ]

  return (
    <Drawer.root open={open} onOpenChange={setOpen}>
      <Drawer.trigger asChild>
        <div onClick={onOpenModal} className="cursor-pointer w-full">
          {trigger}
        </div>
      </Drawer.trigger>
      <Drawer.content className="">
        <div className="max-w-xl flex flex-col h-full w-full mx-auto p-4 pt-0 gap-2 flex-grow">
          <div className="flex flex-col gap-3 flex-grow">
            <div className="w-full grid grid-cols-2 h-fit gap-3">
              {headquarters.map((h, i) => {
                return (
                  <div key={i} className="relative w-full">
                    <button
                      disabled={h.isDisabled}
                      aria-checked={headquarder === h.value}
                      className="w-full p-1 disabled:opacity-50 disabled:pointer-events-none disabled:select-none transition-all border-4 border-dashed aria-checked:bg-black/10 aria-checked:border-black border-transparent rounded-3xl"
                      onClick={() =>
                        setValue('headquarder', h.value as typeof headquarder)
                      }
                    >
                      <div className="rounded-2xl shadow-lg group h-[150px] overflow-hidden">
                        <img
                          loading="lazy"
                          width={200}
                          height={200}
                          src={h.img}
                          className="object-cover transition-all scale-125 group-hover:scale-150 w-full h-full"
                          alt="Google maps screenshot"
                        />
                      </div>
                      <div>
                        <div className="font-semibold tracking-tight">
                          {h.label}
                        </div>
                        <p className="text-xs">{h.address}</p>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="border-t mt-3 pt-3">
              <span className="block pb-2 font-semibold text-sm">
                Tipo de cubículo
              </span>
              <div className="grid grid-cols-4 max-700:grid-cols-3 max-500:grid-cols-2 p-1 gap-3">
                {types.map((t, i) => {
                  return (
                    <button
                      key={i}
                      aria-checked={type === t.value}
                      onClick={() => setValue('type', t.value as typeof type)}
                      className="p-3 rounded-2xl h-[80px] aria-checked:outline-dashed aria-checked:bg-black/10 aria-checked:outline-black aria-checked:outline-2 border-black/20 w-full border"
                    >
                      <span className="w-8 mx-auto block">{t.icon}</span>
                      <span className="text-xs font-semibold">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            {type === 'table' && (
              <div className="border-t mt-3">
                <div className="pt-2">
                  <AddUsers {...{ user, setValue, watch }} />
                </div>
              </div>
            )}
            <div className="border-t pt-3">
              <span className="block pb-2 font-semibold text-sm">
                Fecha y hora
              </span>
              <div className="grid grid-cols-3 max-800:grid-cols-2 max-400:grid-cols-1 gap-2">
                <Input
                  type="date"
                  placeholder="Fecha"
                  control={control}
                  rules={{
                    required: 'La fecha es requerida'
                  }}
                  name="date"
                  className="h-16 rounded-2xl shadow-md border-stone-200"
                  min={min}
                  max={max}
                />
                <label>
                  <Select
                    placeholder="Hora de inicio"
                    control={control}
                    name="from"
                    rules={{
                      required: {
                        value: true,
                        message: 'La hora de inicio es requerida'
                      }
                    }}
                    className="h-16 rounded-2xl shadow-md border-stone-200 bg-transparent"
                  >
                    {fromHour?.map((item) => {
                      return (
                        <option key={`${item}-from`} value={item}>
                          {converterForma12Hour(item)}
                        </option>
                      )
                    })}
                  </Select>
                </label>
                <label>
                  <Select
                    placeholder="Hora de fin"
                    control={control}
                    name="to"
                    rules={{
                      required: {
                        value: true,
                        message: 'La hora de fin es requerida'
                      }
                    }}
                    className="h-16 rounded-2xl shadow-md border-stone-200 bg-transparent"
                  >
                    {toHour?.map((item) => {
                      return (
                        <option key={`${item}-to`} value={item}>
                          {converterForma12Hour(item)}
                        </option>
                      )
                    })}
                  </Select>
                </label>
              </div>
            </div>
            <div className="border-t mt-3 pt-3">
              <span className="block pb-2 font-semibold text-sm">
                Tiempo de reserva
              </span>
              <div className="text-left text-neutral-500 max-700:5xl font-semibold text-2xl">
                <p className="tracking-tight">{time}:00</p>
              </div>
              <p className="text-black text-left text-xs py-2">
                Se permitirá un margen de tolerancia de 10 minutos para su
                reserva; en caso de no hacer uso de la misma dentro de este
                período, la reserva será cancelada automáticamente.
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t justify-end flex gap-2">
            <Button
              loading={isPending}
              disabled={disable_button}
              onClick={handleSubmit(onSearch)}
              variant="none"
              isFilled
              className="h-12 w-fit px-4 justify-center flex items-center bg-blue-600 hover:bg-blue-600/80 text-white mt-auto rounded-full"
            >
              Reservar
            </Button>
            <Button
              loading={isPending}
              onClick={onCloseModal}
              variant="grey"
              isFilled
              className="h-12 w-fit px-4 rounded-full"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Drawer.content>
    </Drawer.root>
  )
}

export default Create
