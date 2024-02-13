/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
'use client'

/* eslint-disable react/display-name */
import React from 'react'
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

  const isDisabled = disabled ?? isLoading ?? isLoadingFormState

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    onBlur()
    onBlurOrigin?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isDisabled) return
    onChange(e)
    onChangeOrigin?.(e)
  }

  const isValue = typeof value !== 'undefined'

  const classname = cn(
    'px-3 h-12 border-neutral-400 rounded-xl text-neutral-800 transition-all w-full border outline outline-transparent outline-0 focus:border-neutral-300 placeholder:text-neutral-400 bg-neutral-100',
    isValue && placeholder && 'pt-4',
    (icon ?? start) && 'pl-6',
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
        {start && (
          <div className="absolute pointer-events-none opacity-70 z-[1] top-[50%] translate-y-[-50%] left-3">
            {start}
          </div>
        )}
        <select
          ref={ref}
          disabled={isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          className={classname}
          value={value}
          {...rest}
        >
          {children}
        </select>
        {placeholder && (
          <div
            className={cn(
              'absolute pointer-events-none transition-all select-none top-[50%] translate-y-[-50%] left-4',
              isValue && 'top-[33%] text-xs',
              (icon ?? start) && 'pl-4'
            )}
          >
            <div className="opacity-80 line-clamp-1">
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
