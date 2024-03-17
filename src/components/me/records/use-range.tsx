import { useState, useEffect } from 'react'
import { format, differenceInMinutes } from 'date-fns'

export function useDateRange(from: Date, to: Date) {
  const [fromTime, setFromTime] = useState<string | null>(null)
  const [toTime, setToTime] = useState<string | null>(null)
  const [range, setRange] = useState<number | null>(null)

  useEffect(() => {
    setFromTime(format(from, 'hh:mm a'))
    setToTime(format(to, 'hh:mm a'))

    const diffInMinutes = differenceInMinutes(to, from)
    setRange(diffInMinutes)
  }, [from, to])

  return { fromTime, toTime, range }
}
