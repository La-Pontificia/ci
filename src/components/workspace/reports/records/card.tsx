import React from 'react'

type Props = {
  children: React.ReactNode
  title: string
}

export function Card({ children, title }: Props) {
  return (
    <div className="p-2 rounded-2xl bg-white border shadow-sm">
      <div className="text-sm font-semibold text-center border-b p-2">
        {title}
      </div>
      <div>{children}</div>
    </div>
  )
}
