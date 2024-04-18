import React from 'react'
import { type Record as RecordType } from 'types/record'
import { Clock2Icon, DisplayIcon, LocationIcon, Table2Icon } from 'icons'
import { calculateDateRange } from 'utils'
import { formatSpanishDate } from 'herpers'

type Props = {
  record: RecordType
}

export function Record({ record }: Props) {
  const { fromTime, range, toTime } = calculateDateRange(
    record.current.from,
    record.current.to
  )
  return (
    <div
      key={record._id.toString()}
      className="flex p-2 px-4 rounded-3xl border shadow-sm bg-white dark:bg-neutral-800 dark:border-neutral-700 items-center gap-4 "
    >
      <Clock2Icon className="w-8 text-stone-500" />
      <div>
        <h2 className="font-semibold">
          {fromTime} - {toTime}: {range}
        </h2>
        <p className="space-x-2 text-sm capitalize">
          <span>{formatSpanishDate(record.created_at)}</span>
          <span>
            <LocationIcon className="w-4 inline-flex text-stone-500" />{' '}
            {record.table.floor.headquarder} - {record.table.floor.name}
          </span>
        </p>
        <p className="text-sm gap-2 items-center flex">
          {record.table.type === 'pc' ? (
            <DisplayIcon className="w-4 inline-flex text-lime-500" />
          ) : (
            <Table2Icon className="w-4 inline-flex text-lime-500" />
          )}
          {record.table.name} - Silla: {record.current.chair}
        </p>
      </div>
    </div>
  )
}
