'use client'

import React from 'react'

import './styles.css'
import { cn } from 'utils'

type Props = {
  size?: 10 | 20 | 25 | 30 | 35 | 40 | 50 | 60 | 70 | 80 | 90 | 100
  className?: string
}

export function LineLoading({ className, size }: Props) {
  const iW = (size ?? 30) / 3
  const iH = (size ?? 30) / 3
  return (
    <span
      className={cn(
        'grid grid-cols-3 line-loading gap-1 items-center dark:text-white',
        className
      )}
    >
      <span
        style={{ width: iW, height: iH }}
        className="block rounded-full bg-current"
      />
      <span
        style={{ width: iW, height: iH }}
        className="block rounded-full bg-current"
      />
      <span
        style={{ width: iW, height: iH }}
        className="block rounded-full bg-current"
      />
    </span>
  )
}
