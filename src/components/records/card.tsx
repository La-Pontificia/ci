import React from 'react'

type Props = {
  children: React.ReactNode
  title: string
}

export function Card({ children, title }: Props) {
  return (
    <div className="p-2 rounded-3xl bg-neutral-100 border">
      <div className="font-semibold text-lime-950 text-center border-b p-2">
        {title}
      </div>
      <div className="dark:text-lime-950">{children}</div>
    </div>
  )
}
