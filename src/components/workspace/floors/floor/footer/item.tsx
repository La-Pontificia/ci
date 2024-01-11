'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/member-delimiter-style
export const ItemFooter = ({
  href,
  title
}: {
  title: string
  href: string
}) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className="aria-checked:text-blue-500 min-w-max p-2 px-3 relative aria-checked:font-medium hover:text-neutral-200 text-neutral-400 text-center"
    >
      {title}
      <span
        aria-hidden={!isActive}
        className="absolute aria-hidden:opacity-0 left-[50%] translate-x-[-50%] bottom-1 w-[20px] h-[4px] bg-blue-500 rounded-full"
      />
    </Link>
  )
}
