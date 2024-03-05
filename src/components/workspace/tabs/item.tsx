'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line @typescript-eslint/member-delimiter-style
export const ItemTab = ({
  href,
  title,
  icon
}: {
  title: string
  href: string
  icon?: React.ReactNode
}) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)
  return (
    <Link
      href={href}
      aria-checked={isActive}
      className=" aria-checked:text-blue-700 flex items-center gap-1 relative p-3 px-4 hover:text-neutral-900 text-neutral-800 text-center place-content-center rounded-2xl drop-shadow-sm"
    >
      {icon && <span className="w-5 block">{icon}</span>}
      {title}
      <span
        aria-hidden={!isActive}
        className="absolute aria-hidden:opacity-0 left-[50%] translate-x-[-50%] bottom-1 w-[40px] h-[4px] bg-blue-500 rounded-full"
      />
    </Link>
  )
}
