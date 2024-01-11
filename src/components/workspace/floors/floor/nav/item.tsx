'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/member-delimiter-style
export const ItemNav = ({ href, title }: { title: string; href: string }) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className="aria-checked:text-white relative p-3 px-5 hover:text-neutral-200 text-neutral-400 text-center grid place-content-center rounded-2xl drop-shadow-sm"
    >
      {title}
      <span
        aria-hidden={!isActive}
        className="absolute aria-hidden:opacity-0 left-[50%] translate-x-[-50%] bottom-1 w-[20px] h-[4px] bg-blue-500 rounded-full"
      />
    </Link>
  )
}
