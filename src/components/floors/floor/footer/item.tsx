'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUI } from 'stores'

// eslint-disable-next-line @typescript-eslint/member-delimiter-style
export const ItemFooter = ({
  href,
  title
}: {
  title: string
  href: string
}) => {
  const pathname = usePathname()
  const isEditing = useUI((store) => store.isEditing)
  const isActive = pathname.startsWith(href)
  return (
    <Link
      aria-hidden={isEditing}
      href={href}
      role="menuitem"
      aria-checked={isActive}
      className="aria-checked:text-black font-semibold aria-checked:bg-white rounded-full aria-hidden:opacity-30 aria-hidden:pointer-events-none min-w-max p-2 px-3 relative aria-checked:font-semibold text-base hover:text-neutral-200 text-neutral-500 text-center"
    >
      {title}
    </Link>
  )
}
