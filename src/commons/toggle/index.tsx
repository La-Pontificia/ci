'use client'
/* eslint-disable react/display-name */
import React, { useRef, useState } from 'react'
import { cn } from 'utils'
export interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string
  checked?: boolean
  defaultChecked?: boolean
  info?: React.ReactNode | string
  placeholder?: string
  isViewError?: boolean
  isLoading?: boolean
  onChangeValue?: (value: boolean) => void
  onClick?: () => void
}

export const Toggle = ({
  disabled,
  className,
  isLoading,
  onChangeValue,
  children,
  onClick,
  defaultChecked,
  checked
}: ToggleProps): React.ReactElement => {
  const ref = useRef<HTMLButtonElement | null>(null)
  const isDisabled = disabled ?? isLoading
  const [value, setValue] = useState<boolean>(
    defaultChecked ?? checked ?? false
  )

  const handleToggleClick = () => {
    if (isDisabled) return
    setValue(!value)
    onChangeValue?.(!value)
    onClick?.()
  }

  const isSelected = value

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        ref={ref}
        type="button"
        onClick={handleToggleClick}
        className={cn(
          'bg-neutral-300 dark:bg-neutral-700 h-8 w-[50px] duration-300 relative rounded-full flex items-center transition-all',
          isDisabled && 'opacity-60 cursor-not-allowed',
          isSelected && 'bg-black dark:bg-white'
        )}
      >
        <div
          style={{
            transform: isSelected ? 'translateX(20px)' : 'translateX(3px)'
          }}
          className={cn(
            'bg-white absolute duration-200 transition-transform h-[28px] w-[28px] rounded-full',
            isSelected ? 'dark:bg-black' : ''
          )}
        />
      </button>
      <div className="text-neutral-800 dark:text-neutral-200 font-medium">
        {children}
      </div>
    </div>
  )
}
