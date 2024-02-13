import { parseISO, toDate } from 'date-fns'
import { useEffect, useState } from 'react'
import type {
  UseFormClearErrors,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form'
import { calculateDuration, generateFullDayHourList } from 'utils'
import type { FormData } from './create'

export const useBookingCreateDate = ({
  setValue,
  watch,
  clearErrors
}: {
  setValue: UseFormSetValue<FormData>
  watch: UseFormWatch<FormData>
  clearErrors: UseFormClearErrors<FormData>
}) => {
  const now = toDate(new Date())

  const [fromHour, setFromHour] = useState<string[]>([])
  const [toHour, setToHour] = useState<string[]>([])

  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const { from, to, date } = watch()

  const isCurent = (date: string) => now.getDate() === parseISO(date).getDate()

  useEffect(() => {
    const list = generateFullDayHourList(`${currentHour}:${currentMinute}`)
    setFromHour(list)
    setValue('from', list[0])
  }, [])

  useEffect(() => {
    if (!from) return setToHour([])
    const list = generateFullDayHourList(from).slice(1, 5)
    setToHour(list)
    setValue('to', list[0])
  }, [from])

  useEffect(() => {
    if (from && to) {
      setValue('time', calculateDuration(from, to))
    }
  }, [from, to])

  useEffect(() => {
    if (!date) return

    if (!isCurent(date)) {
      const list = generateFullDayHourList()
      setFromHour(list)
      setValue('from', list[0])
      return
    }

    const list = generateFullDayHourList(`${currentHour}:${currentMinute}`)
    setFromHour(list)
    setValue('from', list[0])
  }, [date])

  useEffect(() => {
    clearErrors()
  }, [date, from, to])

  return {
    fromHour,
    toHour
  }
}
