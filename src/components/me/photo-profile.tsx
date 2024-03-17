'use client'

import { Dialog } from 'commons/dialog'
import { CAREERS } from '../../constants'
import { useModal } from 'hooks/useModal'
import {
  CalculatorIcon,
  ChartIcon,
  CodeIcon,
  LaptopIcon,
  PharmacyIcon,
  VercelIcon
} from 'icons'
import Image from 'next/image'
import React from 'react'
import { useAuth } from 'stores'

function PhotoProfile() {
  const user = useAuth((store) => store.session)
  if (!user) return null

  const { onOpenModal, open, setOpen } = useModal()

  const userCareerIcon =
    user.career === 'EIS' ? (
      <CodeIcon />
    ) : user.career === 'ECF' ? (
      <CalculatorIcon />
    ) : user.career === 'EAE' ? (
      <ChartIcon />
    ) : user.career === 'IET' ? (
      <PharmacyIcon />
    ) : user.career === 'ICT' ? (
      <CalculatorIcon />
    ) : user.career === 'IAE' ? (
      <ChartIcon />
    ) : user.career === 'DOC' ? (
      <LaptopIcon />
    ) : (
      <VercelIcon />
    )

  return (
    <Dialog
      classNameOutline="bg-white/90"
      backdropBlur
      open={open}
      onOpenChange={setOpen}
      trigger={
        <div className="relative">
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
          <div className="z-[1] absolute -bottom-3 w-full pointer-events-none flex justify-center">
            <div
              title={user.career ? CAREERS[user.career] : 'Vercel'}
              className="w-[40px] cursor-pointer p-2 pointer-events-auto text-neutral-800 bg-white rounded-full aspect-square border shadow-md"
            >
              {userCareerIcon}
            </div>
          </div>
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
