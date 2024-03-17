'use client'

import * as Drawer from 'commons/vaul'
import { Button } from 'commons/button'
import { Input } from 'commons/input'
import { Select } from 'commons/select'
import React from 'react'
import { type User } from 'types'
import { converterForma12Hour } from 'utils'
import { useBookingCreateDate } from './hook'
import { AddUsers } from './add-users'

export type Props = { trigger: React.ReactNode; user: User }

function Create(props: Props) {
  const { trigger, user } = props
  const {
    fromHour,
    toHour,
    open,
    setOpen,
    onOpenModal,
    headquarters,
    headquarder,
    setValue,
    types,
    type,
    watch,
    control,
    disable_button,
    handleSubmit,
    isPending,
    max,
    min,
    onCloseModal,
    onSearch,
    time
  } = useBookingCreateDate(props)
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
            <div className="border-t mt-3">
              <div className="pt-2">
                <AddUsers {...{ user, setValue, watch }} />
              </div>
            </div>
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
