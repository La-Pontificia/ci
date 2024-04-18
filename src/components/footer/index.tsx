'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export function Footer() {
  const pathname = usePathname()
  const items = [
    { href: 'https://ilp.edu.pe', text: 'Instituto' },
    { href: 'https://elp.edu.pe', text: 'Escuela' },
    { href: 'https://www.continualp.edu.pe/', text: 'Educación Continua' },
    { href: 'https://www.idiomaslp.edu.pe/', text: 'Idiomas' },
    { href: '/home', text: 'Landing' },
    { href: '/home/#termn', text: 'Términos de uso' }
  ]

  const isPanelGrid = pathname.includes('/floors')
  if (isPanelGrid) return null
  return (
    <div className="">
      <svg
        aria-hidden="true"
        width="100%"
        height="8"
        className="dark:text-lime-50/40"
        fill="none"
      >
        <pattern id="a" width="91" height="8" patternUnits="userSpaceOnUse">
          <g clipPath="url(#clip0_2426_11367)">
            <path
              d="M114 4c-5.067 4.667-10.133 4.667-15.2 0S88.667-.667 83.6 4 73.467 8.667 68.4 4 58.267-.667 53.2 4 43.067 8.667 38 4 27.867-.667 22.8 4 12.667 8.667 7.6 4-2.533-.667-7.6 4s-10.133 4.667-15.2 0S-32.933-.667-38 4s-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0-10.133-4.667-15.2 0-10.133 4.667-15.2 0"
              stroke="currentColor"
              strokeLinecap="square"
            ></path>
          </g>
        </pattern>
        <rect width="100%" height="100%" fill="url(#a)"></rect>
      </svg>
      <div className="p-5 py-14 text-sm">
        <div className="text-left w-full text-neutral-900 dark:text-neutral-400">
          <div className="mb-4">
            <p className="flex flex-wrap gap-3">
              {items.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : ''}
                  className="hover:underline flex justify-center gap-1"
                >
                  {item.text}
                </Link>
              ))}
            </p>
          </div>
          <p className="font-canela font-semibold">
            Centro de Información - © 2024 La Pontifica
          </p>
        </div>
      </div>
    </div>
  )
}
