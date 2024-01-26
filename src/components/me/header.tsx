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
      <header className="max-w-3xl px-4 mx-auto justify-center w-full h-full">
        <div className="flex relative items-center max-700:flex-col w-full py-8 max-700:pb-0 gap-5">
          <PhotoProfile />
          <div className="flex relative z-20 max-700:text-center w-full flex-col gap-3 max-700:gap-0">
            <div>
              <h2
                title={user.nick_name}
                className="text-3xl max-w-[300px] max-700:mx-auto text-nowrap flex-nowrap truncate overflow-ellipsis max-700:text-xl leading-8 text-neutral-700 tracking-tight font-bold capitalize"
              >
                {user?.nick_name.toLocaleLowerCase()}
              </h2>
              <p className="text-sm opacity-70">{user.names}</p>
            </div>
            <div className="flex flex-col max-700:pt-2 max-700:items-center pb-2 border-b border-neutral-200 gap-2">
              <a
                href={urlTenant}
                target="_blank"
                rel="noreferrer"
                className="flex max-w-max text-blue-600 items-center font-semibold rounded-full gap-2 p-1"
              >
                <LinkIcon className="w-4" />
                <p>{isElp ? 'Escuela' : 'Instituto'}</p>
              </a>
              <a
                href={`mailto:${user.email}`}
                className="flex max-w-max items-center text-sm text-neutral-600 rounded-full gap-2 p-1"
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
