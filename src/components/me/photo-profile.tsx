'use client'

import { Dialog } from 'commons/dialog'

import Image from 'next/image'
import React from 'react'
import { useAuth } from 'stores'

function PhotoProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null

  return (
    <Dialog
      backdrop_blur="sm"
      empty
      className="w-[400px]"
      trigger={
        <div className="relative w-full flex justify-center">
          <div className="w-[250px] max-md:w-[120px] aspect-square border dark:border-neutral-700 cursor-pointer overflow-hidden rounded-full">
            <Image
              className="w-full h-full object-cover"
              width={250}
              height={250}
              src={user.image}
              alt=""
            />
          </div>
        </div>
      }
    >
      <div className="aspect-square w-[400px] max-md:w-[300px] max-md:mx-auto border overflow-hidden rounded-full dark:border-stone-600">
        <Image
          className="w-full h-full object-cover"
          width={400}
          height={400}
          src={user.image}
          alt=""
        />
      </div>
    </Dialog>
  )
}

export default PhotoProfile
