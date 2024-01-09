'use client'

import React from 'react'
import PhotoProfile from './photo-profile'
import DropDownNav from './dropdown'
import { LinkIcon, MailIcon } from 'icons'
import Nav from './nav'
import { useAuth } from 'stores'

function Header() {
  const user = useAuth((store) => store.session)
  if (!user) return null

  const isElp = user?.tenant === 'elp'
  const urlTenant = isElp ? 'https://elp.edu.pe' : 'https://ilp.edu.pe'

  return (
    <div className="w-full">
      <header className="max-w-2xl px-4 mx-auto justify-center w-full h-full">
        <div className="flex items-center w-full py-8 gap-5">
          <PhotoProfile />
          <div className="flex w-full flex-col gap-1">
            <h2
              title={user.names}
              className="text-3xl leading-7 text-neutral-200 tracking-tight font-bold capitalize"
            >
              {user?.names.toLocaleLowerCase()}
            </h2>
            <div className="flex flex-col gap-2">
              <a
                href={urlTenant}
                target="_blank"
                rel="noreferrer"
                className="flex max-w-max items-center text-sm text-white rounded-full gap-2 p-1 px-3 bg-blue-700"
              >
                <LinkIcon className="w-4" />
                <p>{isElp ? 'Escuela' : 'Instituto'}</p>
              </a>
              <a
                href={`mailto:${user.email}`}
                className="px-2 flex max-w-min text-sm items-center gap-2 text-neutral-300 font-medium hover:underline"
              >
                <MailIcon className="w-5" />
                {user.email}
              </a>
            </div>
          </div>
          <DropDownNav />
        </div>
        <Nav />
      </header>
    </div>
  )
}

export const SkeletonNav = () => {
  return (
    <div className="w-full my-2">
      <nav className="max-w-xl mx-auto justify-center w-full h-full">
        <div className="flex items-center justify-between w-full py-8 gap-5">
          <div className="flex basis-0 flex-grow flex-col gap-1">
            <div className="flex gap-2">
              <div className=" p-4 w-[100px] rounded-full animate-pulse bg-neutral-800"></div>
            </div>
          </div>
          <div className="relative">
            <div className="w-[120px] border bg-neutral-800 animate-pulse border-neutral-800 h-[120px] overflow-hidden rounded-full"></div>
          </div>
          <div className="basis-0 flex-grow justify-end flex">
            <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse"></div>
          </div>
        </div>
        <div className=" text-center grid grid-cols-3">
          <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
          <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
          <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
        </div>
      </nav>
    </div>
  )
}

export default Header
