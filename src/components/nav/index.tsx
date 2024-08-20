'use client'

import React from 'react'
import Link from 'next/link'
import {
  BookIcon,
  CircleInformationIcon,
  DaustinnIcon,
  LogoutIcon,
  // SerchInstIcon,
  // LPIcon,
  StopIcon
} from 'icons'
import { HiOutlineUsers } from 'react-icons/hi'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'
import { useAuth } from 'stores'
import { cn } from 'utils'
import Image from 'next/image'
import { ExternalLinkIcon } from '@radix-ui/react-icons'
import { signOut } from 'next-auth/react'

export default function Nav() {
  const pathnme = usePathname()
  const user = useAuth((store) => store.session)
  const items = [
    {
      image: user?.image,
      name: 'Perfil',
      href: '/me'
    },
    // {
    //   icon: SerchInstIcon,
    //   name: 'Buscar',
    //   href: '/search'
    // },
    {
      icon: StopIcon,
      name: 'Pisos y sedes',
      href: '/floors'
    },
    {
      icon: HiOutlineUsers,
      name: 'Usuarios',
      href: '/users'
    },
    {
      icon: BookIcon,
      name: 'Registros',
      href: '/records'
    },
    // {
    //   icon: BookIcon,
    //   name: 'Reservas',
    //   href: '/bookings'
    // },
    {
      icon: CircleInformationIcon,
      name: 'Info',
      href: '/info'
    },
    // {
    //   icon: LPIcon,
    //   name: 'La Pontificia',
    //   href: '#'
    // },
    {
      icon: LogoutIcon,
      name: 'Salir',
      onclick: async () => {
        await signOut()
        window.location.href = '/'
      }
    },
    {
      icon: DaustinnIcon,
      name: "Davi'd",
      slogan: '(Maintainer)',
      href: 'https://daustinn.com'
    }
  ]

  const itemsAdmin = [1, 2, 3]
  const itemsisDismiss = [1, 2, 3]

  return (
    <div className="w-[--sidebar-width] max-md:h-[90px] max-md:gap-0 max-md:bottom-0 max-md:w-full flex dark:bg-black bg-white flex-col overflow-y-auto h-svh gap-3 fixed z-20 border-r max-md:border-t dark:border-neutral-900">
      <nav className="text-center max-md:py-0 max-md:px-2 p-3 max-md:w-full overflow-y-auto gap-1 max-md:gap-0 dark:text-neutral-300 text-neutral-700 flex flex-col max-md:flex-row items-center flex-grow max-md:mx-auto max-md:justify-between">
        <div className="py-4 max-md:hidden">
          <Link title="Grupo La Pontificia" href="/me">
            {/* <svg
              width="40"
              viewBox="0 0 179 179"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="179"
                height="179"
                rx="42"
                fill="currentColor"
                className="text-black dark:text-white"
              />
              <path
                d="M52.9377 23.0293C52.7986 23.6135 52.2979 26.1451 51.7971 28.6767C51.3242 31.2083 50.8234 33.8234 50.6843 34.5189C50.5452 35.2144 50.1558 37.2174 49.8497 38.9701C49.5159 40.7227 49.0708 43.0318 48.876 44.1168C48.6535 45.1739 48.4031 46.5093 48.3196 47.0379C48.2362 47.5664 47.9858 48.874 47.7632 49.9589C47.3738 51.9063 45.1482 63.4238 44.4249 67.3464C44.0354 69.4607 42.1715 79.0585 40.1128 89.6857C39.5008 92.885 39 95.5557 39 95.6113C39 95.667 54.5235 95.7226 73.4966 95.7226C107.604 95.7226 107.993 95.7226 109.495 95.1384C111.638 94.3595 113.613 92.4677 114.726 90.2143C115.56 88.5173 115.644 88.1278 115.616 85.9579C115.588 83.8992 115.477 83.3428 114.781 81.9518C113.752 79.8931 111.526 77.8623 109.523 77.1111C107.993 76.5269 107.548 76.5269 85.1809 76.5269C72.662 76.5269 62.3408 76.4435 62.2852 76.3044C62.2017 76.1931 63.0642 71.3524 64.177 65.5381C65.2897 59.7237 66.8477 51.5169 67.6266 47.3161C69.3236 38.4415 69.5184 37.3844 70.965 29.9286C71.5492 26.8684 72.1334 23.8361 72.2447 23.1684L72.4394 22H62.8138H53.2159L52.9377 23.0293Z"
                fill="currentColor"
                className="text-white dark:text-black"
              />
              <path
                d="M77.9467 48.5963C77.7798 48.9858 77.6685 49.4866 77.6685 49.7091C77.6685 49.9317 77.3625 51.6565 77.0009 53.5204C76.6114 55.3844 75.9159 58.9731 75.443 61.5047C74.97 64.0363 74.5249 66.3732 74.4414 66.707L74.3302 67.3469H92.4965C109.745 67.3469 110.802 67.3747 112.888 67.9033C116.394 68.7935 118.898 70.2123 121.485 72.7718C126.743 78.0019 128.301 85.235 125.686 92.3569C123.933 97.1419 119.454 101.426 114.307 103.151L112.026 103.93L93.7484 104.013C83.6776 104.041 75.443 104.125 75.443 104.18C75.443 104.208 75.1369 105.794 74.7753 107.713C74.3858 109.605 73.8294 112.61 73.4956 114.362C73.1617 116.115 72.7166 118.424 72.5219 119.509C72.2993 120.566 72.0489 121.902 71.9655 122.43C71.882 122.959 71.6316 124.266 71.4091 125.351C71.2144 126.408 70.7692 128.745 70.4354 130.498C70.1294 132.251 69.7121 134.281 69.573 135.005L69.267 136.34H65.8173C63.0353 136.34 62.3677 136.257 62.3677 135.951C62.3677 135.728 62.7293 133.697 63.1744 131.416C63.6195 129.163 64.2594 125.852 64.5932 124.099C64.9271 122.347 65.4835 119.398 65.8451 117.562C66.2068 115.726 66.7075 113.027 66.9857 111.58C67.2361 110.134 67.6812 107.88 67.9316 106.573L68.3767 104.208L58.8067 104.125C53.521 104.097 49.1532 104.125 49.0976 104.18C48.9585 104.319 48.5968 106.072 47.345 112.693C46.872 115.225 46.1765 118.786 45.8149 120.622C45.2028 123.682 44.0344 129.802 43.0051 135.366C42.7825 136.59 42.4765 138.148 42.3374 138.844C42.1983 139.539 41.5028 143.1 40.8073 146.773C40.1118 150.445 39.4441 153.922 39.305 154.506C39.1103 155.258 39.1381 155.619 39.3607 155.703C39.5554 155.758 49.9044 155.786 62.3677 155.758L85.0408 155.675L85.7919 151.78C86.2092 149.638 86.6265 147.468 86.71 146.967C86.7934 146.466 87.0438 145.131 87.2386 144.046C87.4611 142.933 88.0453 139.901 88.5461 137.314C89.019 134.699 89.8258 130.581 90.2987 128.133L91.1612 123.682L101.872 123.515C113.278 123.32 115.197 123.126 119.955 121.568C132.028 117.645 141.626 107.407 144.826 94.9442C149.305 77.6959 140.653 59.3904 124.35 51.6565C122.625 50.8219 120.066 49.8204 118.703 49.4309C113.751 48.0399 111.024 47.873 93.9153 47.873H78.2249L77.9467 48.5963Z"
                fill="currentColor"
                className="text-white dark:text-black"
              />
            </svg> */}
            <img src="/favicon.png" width={35} alt="" />
          </Link>
        </div>
        {items.map((item, index) => {
          const isActive = pathnme.startsWith(item.href ?? '')

          const isMd = itemsisDismiss.includes(index)
          const isNotPermitted = itemsAdmin.includes(index) && !user?.is_admin
          if (isNotPermitted) return null
          const isExternal = item.href?.startsWith('http')
          return (
            <Link
              data-active={isActive}
              key={index}
              href={item.href ?? '#'}
              onClick={item.onclick}
              target={isExternal ? '_blank' : undefined}
              data-bottom={index === items.length - 1}
              className={cn(
                'flex justify-start gap-3 max-md:flex-col data-[active=true]:font-bold dark:text-white/90 text-black dark:hover:bg-neutral-900 hover:bg-neutral-200 p-2.5 rounded-xl items-center group data-[bottom=true]:mt-auto max-md:data-[bottom=true]:mt-0 w-full px-3 data-[active=true]:dark:text-white data-[active=true]:text-neutral-900',
                isMd && 'max-md:hidden'
              )}
            >
              {item.image && (
                <div className="w-[30px] aspect-square hover:opacity-80 overflow-hidden rounded-full">
                  <Image
                    className="w-full h-full object-cover"
                    src={item.image}
                    alt={item.name ?? ''}
                    width={30}
                    height={30}
                  />
                </div>
              )}
              {item.icon && (
                <item.icon
                  strokeWidth={1.5}
                  className="w-6 h-6 max-md:w-6 group-hover:scale-110 transition-all"
                />
              )}
              <div className="text-base max-md:text-xs">
                {item.name}{' '}
                <span className="max-md:hidden text-xs opacity-70">
                  {item.slogan}
                </span>
              </div>
              {isExternal && (
                <ExternalLinkIcon className="ml-auto max-md:hidden" />
              )}
            </Link>
          )
        })}
        <ThemeToggle />
      </nav>
    </div>
  )
}
