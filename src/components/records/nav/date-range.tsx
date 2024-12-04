'use client'

import { format } from 'date-fns'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { type DateRange } from 'react-day-picker'
import { DatePickerWithRange } from 'ui/date-picker'
import { getWekRange } from 'utils'

export function DateRangeNav() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(Array.from(searchParams.entries()))
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
    const [startOfWeek, endOfWeek] = getWekRange()
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
