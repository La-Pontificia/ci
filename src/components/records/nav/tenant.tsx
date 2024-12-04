'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export function TenantSelect() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(Array.from(searchParams.entries()))
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
        className="w-[230px] border-0 rounded-full flex items-center gap-2 justify-center p-3 bg-neutral-200 font-semibold dark:bg-neutral-700"
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
