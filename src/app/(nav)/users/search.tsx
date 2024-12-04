'use client'

import Search, { type SearchCommonType } from 'commons/search'
import { useDebouncedInput } from 'hooks/userDebouncedInput'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface Props extends SearchCommonType {
  default?: string
  queryName?: string
  waitBetween?: number
  onSearch?: (value: string) => void
  searchParams?: boolean
  onStartDebounced?: () => void
  onEndDebounced?: () => void
}

export default function SearchUser({
  queryName = 'q',
  waitBetween = 300,
  searchParams: sp,
  onSearch,
  onStartDebounced,
  onEndDebounced,
  onChange: onChangeExternal,
  ...restProps
}: Props) {
  const { debouncedValue, onChange } = useDebouncedInput('hola', waitBetween)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleSearch = (value: string) => {
    onEndDebounced?.()
    onSearch?.(value)

    if (sp) {
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      if (!debouncedValue) params.delete(queryName)
      else params.set(queryName, debouncedValue)
      void router.replace(`${pathname}/?${params.toString()}`)
    }
  }

  useEffect(() => {
    if (debouncedValue !== null) handleSearch(debouncedValue)
  }, [debouncedValue])

  const defaultValue = searchParams.get(queryName)?.toString()

  return (
    <Search
      defaultValue={defaultValue}
      onChange={(e) => {
        onStartDebounced?.()
        onChange(e)
        onChangeExternal?.(e)
      }}
      {...restProps}
    />
  )
}
