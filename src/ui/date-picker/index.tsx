'use client'
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/prop-types */
import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { type DateRange } from 'react-day-picker'

import { cn } from 'utils'
import * as Popover from '@radix-ui/react-popover'
import { Calendar } from 'ui/calendar'

interface Props
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'defaultValue'
  > {
  onChange?: (e: DateRange | undefined) => void
  defaultValue?: DateRange
}
export function DatePickerWithRange({
  className,
  onChange,
  defaultValue
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultValue)

  React.useEffect(() => {
    onChange?.(date)
  }, [date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            id="date"
            className={cn(
              'w-full border rounded-xl flex p-2 border-black/30 items-center justify-center text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Seleciona un rango de fecha</span>
            )}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="w-auto z-20 p-2 border rounded-2xl shadow-md bg-white"
            align="start"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  )
}
