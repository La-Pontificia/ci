'use client'

import React from 'react'
import PhotoProfile from './photo-profile'
import { MailIcon } from 'icons'
import Nav from './nav'
import { useAuth } from 'stores'
import { EditProfile } from './edit-profile'

function Header() {
  const user = useAuth((store) => store.session)
  if (!user) return null
  return (
    <div className="w-full">
      <header className="max-w-xl px-4 mx-auto justify-center w-full h-full">
        <div className="py-8 space-y-2">
          <div className="flex relative items-center w-full gap-5">
            <div className="relative z-20 space-y-2 w-full">
              <h2
                title={user.names}
                className="text-xl capitalize max-w-[300px] text-nowrap flex-nowrap truncate overflow-ellipsis max-700:text-lg leading-8 text-neutral-700 tracking-tight font-bold"
              >
                {user?.nick_name}
              </h2>
              <p className="text-sm">{user?.names}</p>
              {user.bio && <p className="text-sm">{user.bio}</p>}
              <a
                href={`mailto:${user.email}`}
                className="flex px-3 items-center p-1 text-xs rounded-full bg-black/5 w-fit font-semibold gap-2"
              >
                <MailIcon className="w-5" />
                {user.email}
              </a>
            </div>
            <PhotoProfile />
          </div>
          <EditProfile />
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
