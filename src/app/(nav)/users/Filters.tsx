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
      status: status ?? '',
      tenant: tenant ?? '',
      type: type ?? ''
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
    <div className="flex w-fit gap-2 items-center max-md:flex-wrap">
      <Select
        onChange={() => changeURL('type')}
        placeholder="Tipo de usuario"
        control={control}
        className="border-0 rounded-full w-[200px] max-md:w-full bg-neutral-200 font-semibold dark:bg-neutral-700"
        name="type"
      >
        <option value="">Seleciona una opción</option>
        <option value="student">Estudiante</option>
        <option value="executive">Ejecutivo</option>
      </Select>
      <Select
        onChange={() => changeURL('status')}
        placeholder="Estado"
        className="border-0 w-[200px] max-md:w-full rounded-full bg-neutral-200 font-semibold dark:bg-neutral-700"
        control={control}
        name="status"
      >
        <option value="">Seleciona una opción</option>
        <option value="active">Activos</option>
        <option value="inactive">Inactivos</option>
      </Select>
      <Select
        onChange={() => changeURL('tenant')}
        placeholder="Institucion"
        control={control}
        className="border-0 w-[200px] max-md:w-full rounded-full bg-neutral-200 font-semibold dark:bg-neutral-700"
        name="tenant"
      >
        <option value="">Seleciona una opción</option>
        <option value="ilp">ILP</option>
        <option value="elp">ELP</option>
      </Select>
    </div>
  )
}

export default Filters
