'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
  href: string
  text: string
}

function ItemNav({ href, text }: Props) {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className="p-2 aria-checked:text-black aria-checked:border-black aria-checked:border-b-2"
    >
      {text}
    </Link>
  )
}

export default ItemNav
