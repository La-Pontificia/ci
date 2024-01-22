'use client'

import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { cn } from 'utils'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { useAuth } from 'stores'
import { Menu2Icon } from 'icons'

function DropDownNav() {
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

  const urlVirtualClassroom = `https://aulavirtual.${user.tenant}.edu.pe/login/index.php`
  const urlPontisis = `https://pontisis.${user.tenant}.edu.pe/`

  return (
    <DropDown
      triggerButton={({ open }) => (
        <button
          className={cn(
            'flex text-neutral-800 justify-center rounded-xl group font-medium transition-colors items-center relative gap-2 max-900:gap-0',
            open && 'text-neutral-900'
          )}
        >
          <Menu2Icon className="w-7" />
        </button>
      )}
    >
      {(user.is_admin || user.is_editor) && (
        <DropDownItem href="/workspace" isLink>
          Centro de información
        </DropDownItem>
      )}
      <DropDownItem href={urlVirtualClassroom} isLink isExternalLink>
        Aula virtual
      </DropDownItem>
      <DropDownItem href={urlPontisis} isLink isExternalLink>
        Pontisis
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

export default DropDownNav
