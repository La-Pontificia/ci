'use client'

import React from 'react'
import DropDownUser from './user-dropdown'
import { usePathname } from 'next/navigation'
import CloseButton from './close-button'
import Link from 'next/link'

export default function Nav() {
  const pathnme = usePathname()
  const isFloors = pathnme?.includes('floors/')
  return (
    <div className="w-full h-16 gap-3 border-b fixed backdrop-blur-xl flex items-center p-2 px-3 z-20">
      {isFloors && (
        <>
          <CloseButton />
          <span className="h-6 w-[1px] rotate-12 border-l border-black/50" />
        </>
      )}

      <nav className="font-medium items-center mx-auto gap-2 flex w-full text-stone-400">
        <div className="text-black flex gap-4 items-center">
          <svg
            height="25"
            viewBox="0 0 235 203"
            fill="none"
            aria-label="Vercel Logo"
          >
            <path
              d="M117.082 0L234.164 202.794H0L117.082 0Z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="h-6 w-[1px] rotate-12 border-l border-black/50" />
          <Link href="/">
            <div className="w-9 saturate-150">
              <img
                src="/optimize/favicon.webp"
                className="object-cover w-full h-full"
                alt="Logo La Pontificia - Centro de información"
              />
            </div>
          </Link>
        </div>
      </nav>
      <DropDownUser />
    </div>
  )
}
