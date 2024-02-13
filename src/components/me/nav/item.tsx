'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  href: string
  text: string
  icon: React.ReactNode
}

function ItemNav({ href, text, icon }: Props) {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className="p-2 flex text-[15px] items-center justify-center gap-2 aria-checked:text-black aria-checked:font-semibold aria-checked:border-black aria-checked:border-t-2"
    >
      <span className="w-4 block">{icon}</span>
      {text}
    </Link>
  )
}

export default ItemNav
