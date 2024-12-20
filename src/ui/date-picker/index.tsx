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
  value?: DateRange
  defaultValue?: DateRange
}
export function DatePickerWithRange({
  className,
  onChange,
  defaultValue
}: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(defaultValue)

  React.useEffect(() => {
    if (date === defaultValue) return
    onChange?.(date)
  }, [date])

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            id="date"
            className={cn(
              'border-0 rounded-full flex items-center gap-2 justify-center p-3 bg-neutral-200 font-semibold dark:bg-neutral-700',
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
            sideOffset={5}
            className="w-auto z-20 p-2 border rounded-3xl shadow-md bg-white dark:bg-neutral-800 dark:border-neutral-700"
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
