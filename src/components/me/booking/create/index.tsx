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
    onSearch
    // time
  } = useBookingCreateDate(props)
  return (
    <Drawer.root open={open} onOpenChange={setOpen}>
      <Drawer.trigger asChild>
        <div onClick={onOpenModal} className="cursor-pointer w-full">
          {trigger}
        </div>
      </Drawer.trigger>
      <Drawer.content className="">
        <div className="max-w-xl overflow-y-auto flex flex-col px-3 h-full w-full mx-auto gap-2 flex-grow">
          <div className="flex flex-col gap-3 flex-grow">
            <div className="w-full grid grid-cols-2 h-fit gap-3">
              {headquarters.map((h, i) => {
                return (
                  <div key={i} role="tablist" className="relative w-full">
                    <button
                      role="tab"
                      disabled={h.isDisabled}
                      aria-checked={headquarder === h.value}
                      className="w-full p-1 disabled:opacity-50 disabled:pointer-events-none disabled:select-none transition-all border-4 aria-checked:bg-black/10 dark:aria-checked:bg-white/5 aria-checked:border-black dark:aria-checked:border-neutral-100/40 border-transparent rounded-3xl"
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
                        <p className="text-xs text-neutral-500">{h.address}</p>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="border-t dark:border-neutral-800 mt-3 pt-3">
              <span className="block pb-2 font-semibold text-sm">
                Tipo de cubículo
              </span>
              <div className="grid grid-cols-6 max-sm:grid-cols-4 p-1 gap-3">
                {types.map((t, i) => {
                  return (
                    <button
                      key={i}
                      aria-checked={type === t.value}
                      onClick={() => setValue('type', t.value as typeof type)}
                      className="p-3 aspect-square rounded-2xl text-neutral-600 aria-checked:text-black dark:text-neutral-400 dark:aria-checked:text-white aria-checked:outline aria-checked:bg-black/10 dark:aria-checked:bg-neutral-100/5 aria-checked:outline-black dark:aria-checked:outline-neutral-200/50 aria-checked:outline-4 border-black/20 w-full border dark:border-neutral-800"
                    >
                      <span className="w-7 mx-auto block">{t.icon}</span>
                      <span className="text-xs font-semibold">{t.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="border-t dark:border-neutral-800  mt-3">
              <div className="pt-2">
                <AddUsers {...{ user, setValue, watch }} />
              </div>
            </div>
            <div className="border-t dark:border-neutral-800 pt-3">
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
                    className="h-16 rounded-2xl dark:bg-neutral-900 shadow-md border-stone-200 bg-transparent"
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
                    className="h-16 rounded-2xl dark:bg-neutral-900 shadow-md border-stone-200 bg-transparent"
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
          </div>
          <div className="space-y-2 mb-2 border-t dark:border-neutral-800 justify-end flex gap-2">
            <Button
              loading={isPending}
              disabled={disable_button}
              onClick={handleSubmit(onSearch)}
              variant="none"
              isFilled
              className="h-12 text-base w-full px-4 justify-center flex items-center bg-lime-700 hover:bg-lime-600/80 text-white mt-auto rounded-xl"
            >
              Reservar
            </Button>
            <Button
              loading={isPending}
              onClick={onCloseModal}
              variant="grey"
              isFilled
              className="h-12 w-fit px-4 rounded-xl"
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
