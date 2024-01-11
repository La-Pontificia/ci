'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { useAuth } from 'stores'
import Image from 'next/image'

function DropDownUser() {
  const user = useAuth((store) => store.session)

  if (!user) return null
  const [loadings, setLoadings] = useState({
    logout: false
  })
  const LogOut = async () => {
    setLoadings({
      ...loadings,
      logout: true
    })
    await signOut()
  }

  return (
    <DropDown
      triggerButton={({ open }) => (
        <button className="w-[40px] hover:opacity-80 h-[40px] overflow-hidden rounded-full">
          <Image
            className="w-full h-full object-cover"
            src={user.image}
            alt={user.names}
            width={50}
            height={50}
          />
        </button>
      )}
    >
      <DropDownItem href={'/me'} isLink>
        Perfil
      </DropDownItem>
      <DropDownItem
        className="text-red-500"
        loading={loadings.logout}
        onClick={LogOut}
      >
        Cerrar sesión
      </DropDownItem>
    </DropDown>
  )
}

export default DropDownUser
