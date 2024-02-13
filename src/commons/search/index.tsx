/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { SearchIcon, XmarkIcon } from 'icons'

export interface SearchCommonType
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hiddenButton?: boolean
}

function Search({
  className,
  defaultValue,
  onChange,
  hiddenButton,
  ...restProps
}: SearchCommonType) {
  const [inputValue, setInputValue] = useState(defaultValue ?? '')

  const handleClearClick = () => {
    setInputValue('')
    onChange?.({
      target: {
        value: ''
      }
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (restProps.disabled) return
    setInputValue(value)
    onChange?.(e)
  }

  return (
    <div role="search" className="w-full block relative">
      <SearchIcon className="w-6 pointer-events-none block absolute top-[50%] translate-y-[-50%] left-5 opacity-50" />
      <input
        onChange={handleChange}
        className={clsx(
          'h-14 outline-none focus:shadow-md disabled:opacity-80 shadow-black/50 transition-all px-14 appearance-none placeholder:text-neutral-400 focus:placeholder:text-neutral-700 w-full rounded-2xl border bg-neutral-white border-neutral-300',
          className
        )}
        value={inputValue}
        placeholder="Search"
        {...restProps}
      />
      {!hiddenButton && (
        <button
          aria-hidden={!inputValue}
          onClick={handleClearClick}
          className="absolute top-[50%] aria-hidden:pointer-events-none aria-hidden:opacity-0 opacity-100 translate-y-[-50%] transition-opacity right-5 bg-neutral-300 rounded-full p-1 text-black"
        >
          <XmarkIcon className="w-3" />
        </button>
      )}
    </div>
  )
}

export default Search
