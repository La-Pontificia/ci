/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import axios from 'axios'
import { Button } from 'commons/button'
import { Input } from 'commons/input'
import { Modal } from 'commons/modal'
import { Select } from 'commons/select'
import { ToastContainer } from 'commons/utils'
import { parse, format, toDate } from 'date-fns'
import { useModal } from 'hooks/useModal'
import { usePending } from 'hooks/usePending'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type Floor } from 'types'
import { type Table } from 'types/table'
import confetti from 'canvas-confetti'
import {
  converterForma12Hour,
  generateDateRange,
  isDateInRange,
  parseTimeStringToDate
} from 'utils'
import { useBookingCreateDate } from './hook'

export type FormData = {
  headquarder: Floor['headquarder']
  type: Table['type']
  from: string | null
  to: string | null
  date: string | null
  time: string | null
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

function Create({ trigger }: { trigger: React.ReactNode }) {
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
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      date: formattedDate,
      headquarder: 'alameda',
      from: undefined,
      to: undefined,
      type: 'pc',
      time: '00:00'
    }
  })

  const onSearch = async (d: FormData) => {
    const date = parse(d.date ?? '', 'yyyy-MM-dd', new Date())
    const newDateFrom = parseTimeStringToDate(d.from!, date)
    const newDateTo = parseTimeStringToDate(d.to!, date)
    if (!isDateInRange(date)) return

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

  const { time } = watch()
  const disable_button = time === '00:00' || Object.entries(errors).length > 0
  const { max, min } = generateDateRange()

  return (
    <Modal
      title="Crear una reserva"
      onOpenChange={setOpen}
      hiddenFooter
      {...{ open, isPending }}
      width={520}
      trigger={
        <div onClick={onOpenModal} className="cursor-pointer w-full">
          {trigger}
        </div>
      }
    >
      <div className="flex h-full p-4 flex-col gap-5">
        <p className="text-stone-800 text-left text-sm p-2">
          Se permitirá un margen de tolerancia de 10 minutos para su reserva; en
          caso de no hacer uso de la misma dentro de este período, la reserva
          será cancelada automáticamente.
        </p>
        <div className="grid grid-cols-2 gap-2">
          <label>
            <Select
              placeholder="Sede"
              control={control}
              rules={{
                required: 'Seleciona una sede'
              }}
              name="headquarder"
              className="h-14"
            >
              <option value="alameda">Sede Alameda: Pabellón D-101 </option>
              <option value="jazmines">Sede Jazmines: Pabellón S-201</option>
            </Select>
          </label>
          <label>
            <Select
              placeholder="Tipo de cubículo"
              control={control}
              rules={{
                required: true
              }}
              name="type"
              className="h-14"
            >
              <option value="pc">Computadora</option>
              <option value="table">Cubículo</option>
            </Select>
          </label>
        </div>
        <div className="grid grid-cols-3 max-800:grid-cols-2 max-400:grid-cols-1 gap-4">
          <Input
            type="date"
            placeholder="Fecha"
            control={control}
            rules={{
              required: 'La fecha es requerida'
            }}
            name="date"
            className="h-14"
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
              className="h-14"
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
              className="h-14"
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
        <div className="text-center text-neutral-500 max-700:5xl font-semibold text-7xl">
          <span className="block text-sm">Tiempo:</span>
          <p className="tracking-tight">{time}:00</p>
        </div>
        <div className="space-y-2">
          <Button
            loading={isPending}
            disabled={disable_button}
            onClick={handleSubmit(onSearch)}
            variant="none"
            isFilled
            className="h-12 justify-center flex items-center bg-black hover:bg-black/80 text-white mt-auto rounded-xl w-full"
          >
            Reservar
          </Button>
          <Button
            loading={isPending}
            onClick={onCloseModal}
            variant="grey"
            isFilled
            className="h-12 mt-auto rounded-xl w-full"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default Create
