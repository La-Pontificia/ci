'use client'

import { cn } from 'utils'
import React, { useRef } from 'react'
import { LineLoading } from 'commons/loading/line'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  children?: React.ReactNode
  variant?:
    | 'black'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'white'
    | 'grey'
    | 'primary-transparent'
    | 'white-secondary'
    | 'none'
  icon?: React.ReactNode
  loading?: boolean
  isFilled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  icon,
  className,
  loading,
  disabled,
  isFilled,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null)

  const buttonClassName = `p-1 rounded-full transition-all outline outline-transparent px-3 border text-base font-medium focus-visible:outline-2 focus-visible:outline-neutral-300 ${
    variant === 'primary'
      ? isFilled
        ? 'bg-blue-600 hover:bg-blue-700 border-0 text-white'
        : 'hover:bg-blue-700/50 focus-visible:outline-2 focus-visible:outline-blue-700 text-blue-600 border-blue-700'
      : variant === 'secondary'
      ? isFilled
        ? 'bg-neutral-700 border-0 hover:bg-neutral-800 text-neutral-300'
        : 'border-neutral-500 hover:bg-neutral-600/40 text-neutral-300'
      : variant === 'white'
      ? isFilled
        ? 'border-0 bg-neutral-50 hover:bg-neutral-200 text-black'
        : 'border-neutral-50 text-neutral-50 hover:bg-neutral-100 hover:border-neutral-100 hover:text-black'
      : variant === 'white-secondary'
      ? isFilled
        ? 'border-0 bg-neutral-200/70 hover:bg-neutral-200 text-black'
        : 'border-neutral-50/20 text-neutral-50 focus-visible:outline-2 focus-visible:outline-white hover:bg-neutral-100/20 hover:border-neutral-100/60 hover:text-white'
      : variant === 'grey'
      ? isFilled
        ? 'border-0 bg-neutral-300 text-black hover:bg-neutral-200'
        : 'border-neutral-300 text-neutral-200 hover:bg-neutral-300 hover:border-neutral-200 hover:text-black'
      : variant === 'black'
      ? isFilled
        ? 'border-0 bg-black text-white border shadow-sm shadow-neutral-600/20 border-neutral-800 hover:bg-black/70'
        : 'border-neutral-300 border-2 text-black border-black hover:bg-black hover:text-white'
      : variant === 'danger'
      ? 'bg-red-500 text-white'
      : variant === 'none'
      ? 'p-0 rounded-none font-normal text-left border-0 transition-all outline outline-transparent text-sm font-semibold'
      : ''
  }`

  const isDisabled = disabled ?? loading

  return (
    <button
      disabled={isDisabled}
      className={cn(
        'relative outline-0 focus-visible:outline-offset-2',
        buttonClassName,
        isDisabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      {...rest}
      ref={ref}
    >
      {loading && (
        <span className="bg-inherit z-10 rounded-[inherit] absolute inset-0 grid place-content-center">
          <LineLoading size={25} />
        </span>
      )}
      {icon}
      {children}
    </button>
  )
}
