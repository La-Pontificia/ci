/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
'use client'

/* eslint-disable react/display-name */
import React, { useState } from 'react'
import {
  type RegisterOptions,
  type FieldValues,
  type Path,
  useController,
  type Control
} from 'react-hook-form'
import { cn } from 'utils'

export interface SelectProps<T extends FieldValues>
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  control: Control<T>
  rules?: RegisterOptions
  name: Path<T>
  info?: React.ReactNode | string
  placeholder?: string
  className?: string
  icon?: React.ReactNode
  isLoading?: boolean
  currency?: 'USD' | 'PEN' | 'EUR'
  label?: string | React.ReactNode
  autoFocus?: boolean
  start?: React.ReactNode
}

export const Select = <T extends FieldValues>({
  control,
  name,
  info,
  rules,
  placeholder,
  className,
  disabled,
  icon,
  isLoading,
  onBlur: onBlurOrigin,
  onChange: onChangeOrigin,
  currency,
  label,
  start,
  children,
  ...rest
}: SelectProps<T>): React.ReactElement => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
    formState: { isLoading: isLoadingFormState }
  } = useController({ control, name, rules })

  const [focus, setFocus] = useState(false)

  const isDisabled = disabled ?? isLoading ?? isLoadingFormState

  const simbolCurrency =
    currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'S/.'

  const converterDecimalNumber = (v: any) => {
    const parsedValue = parseFloat(v)
    return !isNaN(parsedValue) ? parsedValue.toFixed(2) : '0.00'
  }

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    onBlur()
    onBlurOrigin?.(e)
    setFocus(false)

    if (!isDisabled && currency) {
      onChange(converterDecimalNumber(e.target.value))
    }
  }

  const handleFocus = () => setFocus(true)

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isDisabled) return
    onChange(e)
    onChangeOrigin?.(e)
  }

  const getInputValue = () => {
    return value ?? ''
  }

  const isMoveTop = (focus && placeholder) ?? (value === 0 && placeholder)

  const classname = cn(
    'p-4 h-12 border-neutral-700 rounded-xl text-neutral-200 appearance-none transition-all w-full border outline outline-transparent outline-0 focus:border-neutral-300 placeholder:text-neutral-400 bg-neutral-800',
    (isMoveTop || (value && placeholder)) && 'pt-7',
    (icon ?? currency ?? start) && 'pl-8',
    className,
    isLoading && 'pointer-events-none animate-pulse select-none',
    disabled && 'cursor-not-allowed text-white'
  )

  return (
    <label className="w-full">
      {label && <span className="block p-1 px-2 text-sm">{label}</span>}
      <div
        className={cn(
          'w-full relative',
          disabled && 'cursor-not-allowed opacity-60 text-white'
        )}
      >
        {icon && (
          <div className="absolute pointer-events-none z-[1] top-[50%] translate-y-[-50%] left-2">
            <span className="w-6 block text-neutral-300">{icon}</span>
          </div>
        )}
        {currency && (
          <div className="absolute pointer-events-none opacity-70 z-[1] top-[50%] translate-y-[-50%] left-2">
            {simbolCurrency}
          </div>
        )}
        {start && (
          <div className="absolute pointer-events-none opacity-70 z-[1] top-[50%] translate-y-[-50%] left-3">
            {start}
          </div>
        )}
        <select
          ref={ref}
          disabled={isDisabled}
          value={getInputValue()}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          className={classname}
          {...rest}
        >
          {children}
        </select>
        {placeholder && (
          <div
            className={cn(
              'absolute font-light pointer-events-none transition-all select-none top-[50%] translate-y-[-50%] left-4',
              (isMoveTop || value) && 'top-[33%] text-xs',
              (icon ?? currency ?? start) && 'pl-4'
            )}
          >
            <div className="opacity-60 line-clamp-1">
              <span>{placeholder}</span>
            </div>
          </div>
        )}
      </div>
      {error && (
        <span className="text-xs font-medium leading-4 p-1 block text-red-500">
          {error.message}
        </span>
      )}
      {info && (
        <span className="block text-xs font-light p-1 text-neutral-300">
          {info}
        </span>
      )}
    </label>
  )
}
