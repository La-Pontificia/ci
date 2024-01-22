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
      date: null,
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
    setToHour(generateFullDayHourList(from))
    setValue('to', from)
  }, [from])

  useEffect(() => {
    if (!from) return
    if (!to) return
    setValue('time', calculateDuration(from, to))
  }, [from, to])

  const disable_button = time === '00:00' || Object.entries(errors).length > 0

  const { max, min } = generateDateRange()

  return (
    <Modal
      backdropBlur
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
              <option value=""></option>
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
              <option value=""></option>

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
        {/* {to && (
          <div className="flex justify-center max-700:hidden">
            <div className="bg-neutral-800 pb-2 hover:scale-105 relative border-neutral-700 border rounded-3xl">
              <QRNormal
                className="scale-110"
                value={to}
                size={90}
                posType="round"
                type="round"
                opacity={90}
                otherColor="currentColor"
                posColor="currentColor"
              />
              <span className="absolute bottom-1 opacity-50 text-center text-xs inset-x-0">
                By daustinn
              </span>
            </div>
          </div>
        )} */}
        <Button
          loading={isPending}
          disabled={disable_button}
          onClick={handleSubmit(onSearch)}
          variant="primary"
          isFilled
          className="h-12 mt-auto rounded-xl w-full"
        >
          Buscar
        </Button>
      </div>
    </Modal>
  )
}

export default Create
