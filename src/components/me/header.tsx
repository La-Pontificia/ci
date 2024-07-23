'use client'

import React from 'react'
import PhotoProfile from './photo-profile'
import { useAuth } from 'stores'
import { EditProfile } from './edit-profile'
import { ExternalLinkIcon } from '@radix-ui/react-icons'

function Header() {
  const user = useAuth((store) => store.session)
  if (!user) return null

  const tenant = {
    elp: 'Escuela Superior La Pontificia',
    ilp: 'Intituto La Pontificia',
    lp: 'Grupo La Pontificia',
    undefined: 'Undefined'
  }

  return (
    <header className=" w-[300px] max-md:w-full h-full">
      <PhotoProfile />
      <div className="py-4 space-y-3 text-left">
        <div>
          <h2 className="text-2xl leading-7 capitalize line-clamp-1 overflow-ellipsis text-neutral-700 dark:text-neutral-200 tracking-tight font-bold">
            {user?.nick_name.split(' ').slice(0, 2).join(' ')}
          </h2>
          <p className="text-xl font-light dark:text-neutral-100/60 capitalize">
            {user?.names.toLocaleLowerCase()}
          </p>
        </div>
        {user.bio && <p className="">{user.bio}</p>}
        <div className="space-y-1 max-md:hidden text-base dark:text-neutral-300">
          <a href={`mailto:${user.email}`} className="flex items-center gap-2">
            {user.email}
            <ExternalLinkIcon />
          </a>
          <a
            target="_blank"
            href={`https://${user.tenant}.edu.pe`}
            className="flex items-center gap-2"
            rel="noreferrer"
          >
            {tenant[user.tenant]}
            <ExternalLinkIcon />
          </a>
        </div>
      </div>
      <EditProfile />
      {/* <footer className="text-xs mb-4 px-1 max-md:hidden dark:text-neutral-400 text-neutral-600">
        <a href="https://daustinn.com" className="ml-2 hover:underline">
          Maintained by Daustinn <DaustinnIcon className="w-3 inline-block" />{' '}
        </a>
      </footer> */}
    </header>
  )
}

// export const SkeletonNav = () => {
//   return (
//     <div className="w-full my-2">
//       <nav className="max-w-xl mx-auto justify-center w-full h-full">
//         <div className="flex items-center justify-between w-full py-8 gap-5">
//           <div className="flex basis-0 flex-grow flex-col gap-1">
//             <div className="flex gap-2">
//               <div className=" p-4 w-[100px] rounded-full animate-pulse bg-neutral-800"></div>
//             </div>
//           </div>
//           <div className="relative">
//             <div className="w-[120px] border bg-neutral-800 animate-pulse border-neutral-800 h-[120px] overflow-hidden rounded-full"></div>
//           </div>
//           <div className="basis-0 flex-grow justify-end flex">
//             <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse"></div>
//           </div>
//         </div>
//         <div className=" text-center grid grid-cols-3">
//           <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
//           <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
//           <span className="bg-neutral-800 rounded-full mx-3 p-3 block" />
//         </div>
//       </nav>
//     </div>
//   )
// }

export default Header
