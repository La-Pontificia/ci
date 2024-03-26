'use client'

import { format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { type DateRange } from 'react-day-picker'
import { DatePickerWithRange } from 'ui/date-picker'

export function DateRangeNav() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (date?: DateRange) => {
    handleChangeParams(date?.from, 'from')
    handleChangeParams(date?.to, 'to')
    router.replace(`${pathname}/?${params.toString()}`)
  }

  const handleChangeParams = (value: any | undefined, queryName: string) => {
    if (!value) params.delete(queryName)
    else params.set(queryName, format(value, 'MM-dd-yyyy'))
  }

  let defaultFrom = params.get('from')
    ? new Date(params.get('from')!)
    : undefined
  let defaultTo = params.get('to') ? new Date(params.get('to')!) : undefined

  // Add default range if no parameters are present
  if (!defaultFrom && !defaultTo) {
    const today = new Date()
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay()
    )
    const endOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + (6 - today.getDay())
    )
    defaultFrom = startOfWeek
    defaultTo = endOfWeek
  }

  return (
    <div className="w-[300px]">
      <DatePickerWithRange
        defaultValue={{
          from: defaultFrom,
          to: defaultTo
        }}
        onChange={handleChange}
      />
    </div>
  )
}
