'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queries from 'queries'
import React from 'react'
import { type Floor } from 'types'
import { type Table } from 'types/table'

export function TablesSelect() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()

  // TABLES

  const { data: DataTables } = useQuery({
    queryKey: ['getTables'],
    queryFn: async () => await queries.fetchAllTables()
  })
  const { data: DataFloors } = useQuery({
    queryKey: ['getFloors'],
    queryFn: async () => await queries.fetchAllFloors()
  })

  const tables = DataTables as Table[]
  const floors = DataFloors as Floor[]

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    handleChangeParams(value)
    router.replace(`${pathname}/?${params.toString()}`)
  }

  const handleChangeParams = (value: string | undefined) => {
    if (!value) params.delete('cubicle')
    else params.set('cubicle', value)
  }

  return (
    <div>
      <select
        onChange={onChange}
        className="w-full border-2 rounded-xl flex p-2 border-black/30 items-center justify-center text-left font-normal"
      >
        <option selected value="">
          Mesa/Computadora
        </option>
        {floors?.map((floor) => (
          <optgroup
            key={floor._id.toString()}
            label={`${floor.headquarder}-${floor.name}`}
          >
            {tables
              ?.filter((e) => e.floor._id === floor._id)
              .map((table) => (
                <option
                  selected={
                    searchParams.get('cubicle') === table._id.toString()
                  }
                  value={table._id.toString()}
                  key={table._id.toString()}
                >
                  {table.name}
                </option>
              ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}
