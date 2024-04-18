import { format, parse, parseISO, toDate } from 'date-fns'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  calculateDuration,
  generateDateRange,
  generateFullDayHourList,
  isDateInRange,
  parseTimeStringToDate
} from 'utils'
import { type Props } from '.'
import confetti from 'canvas-confetti'
import { type User, type Floor } from 'types'
import { usePending } from 'hooks/usePending'
import { useModal } from 'hooks/useModal'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { DisplayIcon, Grid2Icon, Table2Icon } from 'icons'

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void confetti({
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

interface UseProps extends Props {}
export const useBookingCreateDate = ({ user }: UseProps) => {
  const now = toDate(new Date())
  const formattedDate = format(now, 'yyyy-MM-dd')
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
  const [fromHour, setFromHour] = useState<string[]>([])
  const [toHour, setToHour] = useState<string[]>([])

  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()

  const { from, to, date } = watch()

  const isCurrent = (date: string) => now.getDate() === parseISO(date).getDate()

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

    if (!isCurrent(date)) {
      const list = generateFullDayHourList()
      setFromHour(list)
      setValue('from', list[0])
      return
    }

    const list = generateFullDayHourList(
      `${currentHour}:${currentMinute}`
    ).slice(4)
    setFromHour(list)
    setValue('from', list[0])
  }, [date])

  useEffect(() => {
    clearErrors()
  }, [date, from, to])

  const router = useRouter()
  const { end, isPending, start } = usePending()
  const { onOpenModal, onCloseModal, open, setOpen } = useModal()

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
      ids: d.users.map((u) => u._id),
      date
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { users, time, ...form } = newData
    try {
      start()
      await axios.post('/api/booking', form)
      onCloseModal()
      congratulations()
      reset()
      router.refresh()
    } catch (error) {
      toast.error('No pudimos encontrar una reserva', {
        description:
          'Por favor, intenta con otra sede, fecha, horario o tipo de cubículo.'
      })
    } finally {
      end()
    }
  }

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
      label: 'Sala',
      value: 'room',
      icon: <Grid2Icon />
    },
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

  return {
    fromHour,
    toHour,
    control,
    handleSubmit,
    watch,
    setValue,
    onSearch,
    onOpenModal,
    onCloseModal,
    open,
    setOpen,
    disable_button,
    headquarters,
    types,
    max,
    min,
    headquarder,
    type,
    time,
    isPending
  }
}
