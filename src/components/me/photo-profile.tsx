'use client'

import { Dialog } from 'commons/dialog'
import { useModal } from 'hooks/useModal'
import Image from 'next/image'
import React from 'react'
import { useAuth } from 'stores'

function PhotoProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null

  const { onOpenModal, open, setOpen } = useModal()

  return (
    <Dialog
      classNameOutline="bg-white/90"
      backdropBlur
      open={open}
      onOpenChange={setOpen}
      trigger={
        <div
          onClick={onOpenModal}
          className="w-[100px] aspect-square border cursor-pointer overflow-hidden rounded-full"
        >
          <Image
            className="w-full h-full object-cover"
            width={150}
            height={150}
            src={user.image}
            alt=""
          />
        </div>
      }
    >
      <div className="w-[300px] border h-[300px] overflow-hidden rounded-full">
        <Image
          className="w-full h-full object-cover"
          width={300}
          height={300}
          src={user.image}
          alt=""
        />
      </div>
    </Dialog>
  )
}

export default PhotoProfile
