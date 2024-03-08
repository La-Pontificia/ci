'use client'

import { Select } from 'commons/select'
import React from 'react'
import { useForm } from 'react-hook-form'
import { type Props } from './page'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type FormData = {
  type: string
  status: string
  tenant: string
}
function Filters({ searchParams: { status, tenant, type } }: Props) {
  const { control, getValues } = useForm<FormData>({
    defaultValues: {
      status,
      tenant,
      type
    }
  })

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const changeURL = (name: any) => {
    const val = getValues(name)
    const params = new URLSearchParams(searchParams)
    if (!val) params.delete(name as string)
    else params.set(name as string, val as string)
    void router.replace(`${pathname}/?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 items-center pt-4">
      <Select
        onChange={(e) => changeURL('type')}
        placeholder="Tipo de usuario"
        control={control}
        name="type"
      >
        <option value=""></option>
        <option value="student">Estudiante</option>
        <option value="executive">Ejecutivo</option>
      </Select>
      <Select
        onChange={(e) => changeURL('status')}
        placeholder="Estado"
        control={control}
        name="status"
      >
        <option value=""></option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </Select>
      <Select
        onChange={(e) => changeURL('tenant')}
        placeholder="Institucion"
        control={control}
        name="tenant"
      >
        <option value=""></option>
        <option value="ilp">ILP</option>
        <option value="elp">ELP</option>
      </Select>
    </div>
  )
}

export default Filters
