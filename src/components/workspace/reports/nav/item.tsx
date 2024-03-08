'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function NavItem({
  href,
  title,
  icon
}: {
  title: string
  href: string
  icon?: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      aria-checked={isActive}
      href={href}
      className="p-1 px-2 font-semibold flex flex-col gap-2 items-center text-black/60 aria-checked:text-black rounded-xl "
    >
      {title}
    </Link>
  )
}
