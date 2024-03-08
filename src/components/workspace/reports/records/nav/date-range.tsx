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

  return (
    <div className="w-[300px]">
      <DatePickerWithRange
        defaultValue={{
          from: params.get('from') ? new Date(params.get('from')!) : undefined,
          to: params.get('to') ? new Date(params.get('to')!) : undefined
        }}
        onChange={handleChange}
      />
    </div>
  )
}
