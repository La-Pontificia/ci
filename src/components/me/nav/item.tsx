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
      role="menuitem"
      className="border-b-2 dark:aria-checked:border-white aria-checked:border-black aria-checked:text-black aria-checked:dark:text-white border-transparent hover:border-neutral-400 p-3 justify-center gap-3 flex text-sm items-center font-semibold"
    >
      <span className="w-6 block">{icon}</span>
      {text}
    </Link>
  )
}

export default ItemNav
