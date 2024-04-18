'use client'

import React from 'react'
import { useAuth } from 'stores'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function User() {
  const user = useAuth((store) => store.session)
  const pathnme = usePathname()

  if (!user) return null

  const isActive = pathnme.startsWith('/me')

  return (
    <div className="text-xs font-semibold max-md:w-full flex [animation-delay:400ms] animate-fade-in flex-col items-center">
      <Link
        data-active={isActive}
        href="/me"
        className="group w-full px-3 data-[active=true]:dark:text-cyan-100"
      >
        <div
          data-active={isActive}
          className="p-1 h-8 data-[active=true]:dark:bg-cyan-800 data-[active=true]:bg-blue-700 group-hover:data-[active=false]:bg-neutral-400/50 dark:group-hover:data-[active=false]:bg-neutral-700 flex mx-auto items-center justify-center w-14 rounded-full"
        >
          <div className="w-[24px] aspect-square hover:opacity-80 overflow-hidden rounded-full">
            <Image
              className="w-full h-full object-cover"
              src={user.image}
              alt={user.names}
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="text-center">{}</div>
      </Link>
    </div>
  )
}

export default User
