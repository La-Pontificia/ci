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
  const isActive = pathname.startsWith('/workspace' + href)
  return (
    <Link
      href={'/workspace' + href}
      aria-checked={isActive}
      className="aria-checked:text-white font-semibold text-black aria-checked:bg-black flex items-center gap-3 relative p-2 hover:text-neutral-900 text-center rounded-xl"
    >
      <span className="block w-5">{icon}</span>
      <span className="text-sm">{title}</span>
      {/* <span
        aria-hidden={!isActive}
        className="absolute aria-hidden:opacity-0 left-[50%] translate-x-[-50%] bottom-1 w-[40px] h-[4px] bg-blue-500 rounded-full"
      /> */}
    </Link>
  )
}
