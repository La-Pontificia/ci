'use client'

import React from 'react'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { type Type } from '.'
import { MoreHorizonralIcon } from 'icons'
import { Toggle } from 'commons/toggle'
import axios from 'axios'
import { toast } from 'sonner'
import { ToastContainer } from 'commons/utils'
import { useAuth } from 'stores'

function DropDownUser({
  setUser,
  user
}: {
  user: Type
  setUser: React.Dispatch<React.SetStateAction<Type>>
}) {
  const session = useAuth((store) => store.session)
  const toogleIsAdmin = async () => {
    try {
      await axios.patch(`/api/users/${user._id}`, {
        is_admin: !user.is_admin
      })
      setUser((prev) => ({ ...prev, is_admin: !user.is_admin }))
      toast(ToastContainer('Estado de administrador cambiado correctamente'))
    } catch (error) {
      console.log(error)
    }
  }

  const toogleIsEditor = async () => {
    try {
      await axios.patch(`/api/users/${user._id}`, {
        is_editor: !user.is_editor
      })
      setUser((prev) => ({ ...prev, is_editor: !user.is_editor }))
      toast(ToastContainer('Estado de editor cambiado correctamente'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropDown
      triggerButton={
        <button className="w-[30px] p-1 min-w-[30px] hover:opacity-80 h-[40px] overflow-hidden rounded-full">
          <MoreHorizonralIcon />
        </button>
      }
    >
      <Toggle
        disabled={!session?.is_admin}
        checked={user.is_editor}
        onChangeValue={toogleIsEditor}
        className="p-2"
      >
        Editor
      </Toggle>
      <Toggle
        disabled={!session?.is_admin}
        checked={user.is_admin}
        onChangeValue={toogleIsAdmin}
        className="p-2"
      >
        Administrador
      </Toggle>
      <DropDownItem disabled={!session?.is_admin} className="text-red-500">
        Eliminar
      </DropDownItem>
    </DropDown>
  )
}

export default DropDownUser
