'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export function TenantSelect() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const router = useRouter()
  const pathname = usePathname()

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target

    handleChangeParams(value)
    router.replace(`${pathname}/?${params.toString()}`)
  }

  const handleChangeParams = (value: string | undefined) => {
    if (!value) params.delete('tenant')
    else params.set('tenant', value)
  }

  return (
    <div>
      <select
        onChange={onChange}
        className="w-[230px] border-2 rounded-xl flex p-2 border-black/30 items-center justify-center text-left font-normal"
      >
        <option selected value="">
          Institucion
        </option>
        <option selected={searchParams.get('tenant') === 'ilp'} value="ilp">
          ILP - Intituto La Pontificia
        </option>
        <option selected={searchParams.get('tenant') === 'elp'} value="elp">
          ELP - Escuela Superior La Pontificia
        </option>
      </select>
    </div>
  )
}
