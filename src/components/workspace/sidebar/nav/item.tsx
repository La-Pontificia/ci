'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ItemNav = ({
  Icon,
  href,
  title
}: {
  Icon: React.ReactNode
  title: string
  href: string
}) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className="aria-checked:text-white hover:text-neutral-200 text-neutral-400 text-center grid place-content-center rounded-2xl drop-shadow-sm"
    >
      <span className="w-10 mx-auto">{Icon}</span>
      <span className="text-xs pt-1">{title}</span>
    </Link>
  )
}
