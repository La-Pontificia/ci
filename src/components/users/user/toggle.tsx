'use client'

import React from 'react'
import { type Type } from '.'
import { Toggle } from 'commons/toggle'
import axios from 'axios'
import { toast } from 'sonner'
import { useAuth } from 'stores'

type Props = {
  user: Type
  setUser: React.Dispatch<React.SetStateAction<Type>>
}

function ToggleStatus({ user, setUser }: Props) {
  const session = useAuth((store) => store.session)
  const toogleStatus = async () => {
    try {
      toast.promise(
        axios.patch(`/api/users/${user._id}`, {
          is_active: !user.is_active
        }),
        {
          success: 'Estado cambiado correctamente',
          error: 'Error al cambiar el estado',
          loading: 'Cambiando estado',
          finally: () => {
            setUser((prev) => ({ ...prev, is_active: !user.is_active }))
          }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Toggle
      disabled={!session?.is_admin}
      onChangeValue={toogleStatus}
      checked={user.is_active}
    />
  )
}

export default ToggleStatus
