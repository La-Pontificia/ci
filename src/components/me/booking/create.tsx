/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client'

import axios from 'axios'
import { Button } from 'commons/button'
import { Input } from 'commons/input'
import { Modal } from 'commons/modal'
import { Select } from 'commons/select'
import { ToastContainer } from 'commons/utils'
import { parse } from 'date-fns'
import { useModal } from 'hooks/useModal'
import { usePending } from 'hooks/usePending'
import { XmarkIcon } from 'icons'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { type Floor } from 'types'
import { type Table } from 'types/table'
import confetti from 'canvas-confetti'
import {
  calculateDuration,
  converterForma12Hour,
  generateDateRange,
  generateFullDayHourList,
  isDateInRange,
  parseTimeStringToDate
} from 'utils'

type FormData = {
  headquarder: Floor['headquarder']
  type: Table['type']
  from: string | null
  to: string | null
  date: string | null
  time: string | null
}

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)

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

function Create() {
  const router = useRouter()
  const { end, isPending, start } = usePending()
  const { onOpenModal, onCloseModal, open, setOpen } = useModal()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      date: tomorrow.toISOString().split('T')[0],
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

    try {
      start()
      await axios.post('/api/booking', {
        ...d,
        from: newDateFrom,
        to: newDateTo,
        date
      })

      fire(0.25, {
        spread: 26,
        startVelocity: 55
      })
      fire(0.2, {
        spread: 60
      })
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
      })
      fire(0.1, {
        spread: 120,
        startVelocity: 45
      })
      onCloseModal()
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

  const { from, to, time } = watch()
  const [fromHour] = useState<string[]>(generateFullDayHourList())
  const [toHour, setToHour] = useState<string[]>(generateFullDayHourList())

  useEffect(() => {
    if (from === '07:00') return
    setToHour(generateFullDayHourList(from).slice(0, 8))
    setValue('to', generateFullDayHourList(from).slice(0, 8)[0])
  }, [from])

  useEffect(() => {
    if (!from) return
    if (!to) return
    setValue('time', calculateDuration(from, to))
  }, [from, to])

  useEffect(() => {
    setValue('from', fromHour[0])
  }, [])

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
        <Button
          onClick={onOpenModal}
          isFilled
          variant="primary"
          className="flex h-11 rounded-xl w-full items-center gap-2 font-semibold justify-center"
        >
          <XmarkIcon className="w-5 rotate-45" />
          <span>Buscar y crear reserva</span>
        </Button>
      }
    >
      <div className="flex h-full p-4 flex-col gap-5">
        <p className="text-yellow-500 text-center p-2">
          Las resevaciones solo se hacen con 1 dia de anticipación y como máximo
          por 2 horas.
        </p>
        <label>
          <Select
            placeholder="Sede"
            control={control}
            rules={{
              required: true
            }}
            name="headquarder"
            className="h-14"
          >
            <option value="alameda">Alameda</option>
            <option value="jazmines">Jazminez</option>
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
            <option value="pc">PC</option>
            <option value="table">Mesa</option>
          </Select>
        </label>
        <div className="grid grid-cols-3 max-800:grid-cols-2 max-400:grid-cols-1 gap-4">
          <Input
            type="date"
            placeholder="Fecha"
            control={control}
            rules={{
              required: {
                value: true,
                message: 'La fecha es requerida'
              }
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
              {fromHour.map((item) => {
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
              {toHour.map((item) => {
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
            variant="primary"
            isFilled
            className="h-12 mt-auto rounded-xl w-full"
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
